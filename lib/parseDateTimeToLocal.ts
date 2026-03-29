export function parseDateTimeToLocal(date: string, time: string): string {
  const dateData = new Date(date);
  const timeData = new Date(time);

  const yyyy = dateData.getFullYear();
  const mm =
    dateData.getMonth() + 1 >= 10
      ? dateData.getMonth() + 1
      : `0${dateData.getMonth() + 1}`;
  const dd =
    dateData.getDate() >= 10 ? dateData.getDate() : `0${dateData.getDate()}`;
  const HH =
    timeData.getHours() >= 10 ? timeData.getHours() : `0${timeData.getHours()}`;
  const MM =
    timeData.getMinutes() >= 10
      ? timeData.getMinutes()
      : `0${timeData.getMinutes()}`;

  return `${yyyy}-${mm}-${dd}T${HH}:${MM}:00.000`;
}
