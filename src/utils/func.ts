export const formatDate = (date: any) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
  const year = String(d.getFullYear()); // Últimos 2 dígitos del año
  return `${day}${month}${year}`;
};
