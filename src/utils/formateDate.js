export function formatDate(isoDateString) {
  const date = new Date(isoDateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function isDateExpired(isoDateString) {
  const currentDate = new Date();
  const inputDate = new Date(isoDateString);

  return inputDate < currentDate;
}
