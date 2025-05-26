import {Request, Response} from "express";

import models from "../database/models";
import bcryptjs from "bcryptjs";
import {IPermission, IUser} from "../utils/interfaces";
import {Op} from "sequelize";
/*
// Controlador para Users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await models.User.findAll({paranoid: false, include: [{model: models.Group}]});
    res.json(users);
  } catch (error) {
    console.error("❌ Error al obtener los usuarios:", error);
    res.status(500).json({error: "Error al obtener los usuarios"});
  }
};*/

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const {all, id_sector_process, type_module, type_screen} = req.query;

    const users = await models.SystemUser.findAll({
      paranoid: all ? false : true,
      include: [
        {model: models.WorkGroup},
        {
          model: models.Permission,
          required: type_module || id_sector_process || type_screen ? true : false,
          where: {
            type_module: type_module ? type_module : {[Op.ne]: null},
            id_sector_process: id_sector_process ? id_sector_process : {[Op.ne]: null},
            type_screen: type_screen ? type_screen : {[Op.ne]: null},
          },
        },
      ],
    });
    res.json(users);
  } catch (error) {
    console.error("❌ Error al obtener los usuarios:", error);
    res.status(500).json({error: "Error al obtener los usuarios"});
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const {id_sector_process, type_module} = req.query;

    const user = await models.SystemUser.findByPk(id, {
      include: [
        {
          model: models.Permission,
          required: false,
          where: {
            type_module: type_module ? type_module : {[Op.ne]: null},
            id_sector_process: id_sector_process ? id_sector_process : {[Op.ne]: null},
          },
        },
      ],
    });

    if (!user) {
      res.status(404).json({error: "Usuario no encontrado"});
      return;
    }
    res.json(user);
  } catch (error) {
    console.error("❌ Error al obtener el usuario:", error);
    res.status(500).json({error: "Error al obtener el usuario"});
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Encriptar la contraseña antes de crear el usuario
    const hashedPassword = await bcryptjs.hash(req.body.pass, 8); // Usando un factor de costo de 10
    req.body.pass = hashedPassword;

    // Convertir el nombre de usuario a minúsculas
    req.body.user = (req.body.user as string).toLowerCase();

    // Crear el usuario en la base de datos
    const newUser = await models.SystemUser.create(req.body);

    // Responder con el usuario creado (sin la contraseña)
    const {pass, ...userWithoutPassword} = newUser.toJSON(); // Excluir el hash de la respuesta
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("❌ Error al crear el usuario:", error);
    res.status(500).json({error: "Error al crear el usuario"});
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const TempUser = await models.SystemUser.findByPk(id);
    if (!TempUser) {
      res.status(404).json({error: "Usuario no encontrado"});
      return;
    }

    // Excluir la contraseña del cuerpo de la solicitud
    const {password, ...updateData} = req.body;

    console.log(updateData);
    await TempUser.update(updateData);
    res.json(TempUser);
  } catch (error) {
    console.error("❌ Error al actualizar el usuario:", error);
    res.status(500).json({error: "Error al actualizar el usuario"});
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const user = await models.SystemUser.findByPk(id);
    if (!user) {
      res.status(404).json({error: "Usuario no encontrado"});
      return;
    }
    await user.destroy();
    res.json({message: "Usuario eliminado correctamente"});
  } catch (error) {
    console.error("❌ Error al eliminar el usuario:", error);
    res.status(500).json({error: "Error al eliminar el usuario"});
  }
};

export const recoverUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempUser = await models.SystemUser.findByPk(id, {paranoid: false});
    if (!TempUser) {
      res.status(404).json({error: "Usuario no encontrado"});
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempUser.restore();

    // Busca nuevamente el registro para confirmar
    const updatedUser = await models.SystemUser.findByPk(id);
    // Devuelve el registro actualizado
    res.json(updatedUser);
  } catch (error) {
    console.error("❌ Error al recuperar el usuario:", error);
    res.status(500).json({error: "Error al recuperar el usuario"});
  }
};

///////////////////////////////////////////////////////////////////////////////

export const updateUserPermissions = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params; // ID del usuario
    const {permissions, id_sector_process, type_module} = req.body; // Array de permisos enviados en el body

    // Buscar el usuario
    const user = await models.SystemUser.findByPk(id, {
      include: [
        {
          model: models.Permission,
          as: "permissions",
          required: false,
          where: {
            id_sector_process: id_sector_process ? id_sector_process : {[Op.ne]: null},
            type_module: type_module ? type_module : {[Op.ne]: null},
          },
        },
      ],
    });
    console.log("🚩🚩🚩", JSON.stringify(user));

    if (!user) {
      res.status(404).json({error: "Usuario no encontrado"});
      return;
    }

    const userData = user.get({plain: true});
    const currentPermissions = userData.permissions.map((perm: any) => perm.id);

    // Determinar los permisos a crear, actualizar y eliminar
    const newPermissions: IPermission[] = (permissions as []).filter(
      (perm: any) => !currentPermissions.includes(perm.id)
    );

    const updatedPermissions: IPermission[] = (permissions as []).filter((perm: any) =>
      currentPermissions.includes(perm.id)
    );
    const deletedPermissions: IPermission[] = currentPermissions.filter(
      (permId: number) => !(permissions as [])?.some((perm: any) => perm.id === permId)
    );

    // Actualizar permisos existentes
    for (const perm of updatedPermissions) {
      await models.Permission.update(perm, {where: {id: perm.id}});
    }

    // Crear nuevos permisos
    for (const perm of newPermissions) {
      await models.Permission.create({...perm, userId: id});
    }

    // Eliminar permisos que ya no existen
    await models.Permission.destroy({
      where: {
        id: deletedPermissions,
        id_sector_process: id_sector_process ? id_sector_process : {[Op.ne]: null},
        type_module: type_module ? type_module : {[Op.ne]: null},
      },
      force: true,
    });

    // Devolver la respuesta actualizada
    const updatedUser = await models.SystemUser.findByPk(id, {
      include: [
        {
          model: models.Permission,
          as: "permissions",
        },
      ],
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("❌ Error al actualizar los permisos del usuario:", error);
    res.status(500).json({error: "Error al actualizar los permisos del usuario"});
  }
};
