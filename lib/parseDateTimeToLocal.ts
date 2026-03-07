export function parseDateTimeToLocal(date: string, time: string): string {
  const dateData = new Date(date);
  const timeData = new Date(time);
  return `${dateData.getFullYear()}-${dateData.getMonth() + 1 >= 10 ? dateData.getMonth() + 1 : `0${dateData.getMonth() + 1}`}-${dateData.getDate() >= 10 ? dateData.getDate() : `0${dateData.getDate()}`}T${timeData.getHours() >= 10 ? timeData.getHours() : `0${timeData.getHours()}`}:${timeData.getMinutes() >= 10 ? timeData.getMinutes() : `0${timeData.getMinutes()}`}:00`;
}
