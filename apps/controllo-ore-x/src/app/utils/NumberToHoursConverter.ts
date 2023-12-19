/**
 * Function to convert a number into a string with the format HH:MM.
 */
export function convertNumberToHours(hoursToConvert?: number): string {
  if (!!!hoursToConvert) {
    return '00:00';
  }
  const hours = Math.floor(hoursToConvert);
  const minutes = Math.round((hoursToConvert - hours) * 60).toString();
  return hours.toString().padStart(2, '0') + ':' + minutes.padStart(2, '0');
}
