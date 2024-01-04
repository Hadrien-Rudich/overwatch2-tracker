export function getCurrentDate(): string {
  const currentDate: Date = new Date();
  const day: number = currentDate.getDate();
  const month: number = currentDate.getMonth() + 1;
  const year: number = currentDate.getFullYear() % 100;

  const formattedDate: string = `${day.toString().padStart(2, '0')}/${month
    .toString()
    .padStart(2, '0')}/${year.toString().padStart(2, '0')}`;

  return formattedDate;
}

export function generateIncrementalId(arr: any[]): number {
  let id = arr.length;

  return id + 1;
}
