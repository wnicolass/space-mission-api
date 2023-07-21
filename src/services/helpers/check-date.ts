export function isValidDate(incomingDate: string): boolean {
  const incomingDateWithMaximumDayHour = new Date(incomingDate).setHours(
    23,
    59,
    59,
    999,
  );

  if (isNaN(incomingDateWithMaximumDayHour)) {
    return false;
  }

  if (incomingDateWithMaximumDayHour < Date.now()) {
    return false;
  }

  return true;
}
