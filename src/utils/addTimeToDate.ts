export function addTimeToDate(date: Date, timeString: string): Date {
  const timeValue = parseInt(timeString, 10);
  const timeUnit = timeString.slice(-1);

  const newDate = new Date(date);

  switch (timeUnit) {
    case 'm': // minutes
      newDate.setMinutes(newDate.getMinutes() + timeValue);
      break;
    case 'h': // hours
      newDate.setHours(newDate.getHours() + timeValue);
      break;
    case 'd': // days
      newDate.setDate(newDate.getDate() + timeValue);
      break;
    default:
      throw new Error(
        'Unsupported time unit. Use "m" for minutes, "h" for hours, or "d" for days.',
      );
  }

  return newDate;
}
