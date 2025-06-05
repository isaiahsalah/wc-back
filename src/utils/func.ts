import QueryString, {ParsedQs} from "qs"; // Solo si estás usando la librería `qs`

export const formatDate = (date: any) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
  const year = String(d.getFullYear()); // Últimos 2 dígitos del año
  return `${day}${month}${year}`;
};

export function setSecondsToEndOfMinute(date: Date): Date {
  const newDate = new Date(date);
  newDate.setSeconds(59, 999);
  return newDate;
}

export function normalizeDateParam(
  param: string | ParsedQs | (string | ParsedQs)[] | undefined
): string | undefined {
  if (!param) return undefined;
  if (Array.isArray(param)) {
    // Si es array, tomamos el primer elemento que sea string, o undefined
    const first = param.find((p) => typeof p === "string");
    return typeof first === "string" ? first : undefined;
  }
  if (typeof param === "string") {
    return param;
  }
  // Si es ParsedQs (objeto), no podemos convertir directo, retornamos undefined
  return undefined;
}

// Función para calcular la Threshold Date, igual que antes
export const calculateThresholdDate = (inputDate: Date): Date => {
  const date = new Date(inputDate);
  const limitTime = new Date(date);
  limitTime.setHours(7, 30, 0, 0);

  if (date < limitTime) {
    date.setDate(date.getDate() - 1);
  }
  date.setHours(0, 0, 0, 0);
  return date;
};
