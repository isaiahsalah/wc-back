import {Request, Response} from "express";

import models from "../database/models";
import bcryptjs from "bcryptjs";
import {IPermission, IUser} from "../utils/interfaces";
import {Op} from "sequelize";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const {all, id_sector_process, type_module, type_screen, id_work_group} = req.query;

    const users = await models.SysUser.findAll({
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
      where: {
        [Op.or]: [
          {id_work_group: id_work_group ? id_work_group : {[Op.ne]: null}}, // Coincide con el valor especificado
          {id_work_group: null}, // Incluye los nulos
        ],
      },
    });

    const plainUsers = users.map((user) => user.get({plain: true}));
    res.json(plainUsers);
  } catch (error) {
    console.error("❌ Error al obtener los usuarios:", error);
    res.status(500).json({error: "Error al obtener los usuarios"});
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;
    const {id_sector_process, type_module} = req.query;

    const user = await models.SysUser.findByPk(id, {
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
    // Convertir el nombre de usuario a minúsculas
    const username = (req.body.user as string).toLowerCase();

    // Verificar si el nombre de usuario ya existe
    const existingUser = await models.SysUser.findOne({where: {user: username}});
    if (existingUser) {
      res.status(400).json({error: "El nombre de usuario ya está en uso."});
      return;
    }

    // Encriptar la contraseña antes de crear el usuario
    const hashedPassword = await bcryptjs.hash(req.body.pass, 8); // Usando un factor de costo de 8
    req.body.pass = hashedPassword;
    req.body.user = username;

    // Crear el usuario en la base de datos
    const newUser = await models.SysUser.create(req.body);

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

    const TempUser = await models.SysUser.findByPk(id);
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

export const softDeleteSysUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    const sysUser = await models.SysUser.findByPk(id);
    if (!sysUser) {
      res.status(404).json({error: "Usuario del sistema no encontrado"});
      return;
    }

    // Soft delete: Marca el registro como eliminado
    await sysUser.destroy();

    res.status(200).json({message: "Usuario del sistema eliminado lógicamente (soft delete)."});
  } catch (error) {
    console.error("❌ Error en el soft delete:", error);
    res.status(500).json({error: "Error al eliminar el usuario del sistema lógicamente"});
  }
};

export const hardDeleteSysUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    // Buscar el usuario del sistema sin importar el soft delete
    const sysUser = await models.SysUser.findOne({where: {id}, paranoid: false});
    if (!sysUser) {
      res.status(404).json({error: "Usuario del sistema no encontrado"});
      return;
    }

    // Verificar si el usuario tiene producciones asociadas
    const productions = await models.ProductionUser.findAll({where: {id_sys_user: id}});
    if (productions.length > 0) {
      res.status(400).json({
        error: "No se puede eliminar el usuario porque tiene producciones asociadas.",
        productions,
      });
      return;
    }

    // Buscar y eliminar los permisos asociados al usuario
    await models.Permission.destroy({
      where: {id_sys_user: id},
      force: true,
    });

    // Hard delete: Elimina físicamente el registro
    await sysUser.destroy({force: true});

    res.status(200).json({message: "Usuario del sistema eliminado completamente (hard delete)."});
  } catch (error) {
    console.error("❌ Error en el hard delete:", error);
    res.status(500).json({error: "Error al eliminar el usuario del sistema completamente"});
  }
};

export const recoverUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id} = req.params;

    // Busca el registro incluso si está marcado como eliminado
    const TempUser = await models.SysUser.findByPk(id, {paranoid: false});
    if (!TempUser) {
      res.status(404).json({error: "Usuario no encontrado"});
      return;
    }

    // Recupera el registro marcándolo como activo
    await TempUser.restore();

    // Busca nuevamente el registro para confirmar
    const updatedUser = await models.SysUser.findByPk(id);
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
    const user = await models.SysUser.findByPk(id, {
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
    const updatedUser = await models.SysUser.findByPk(id, {
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
