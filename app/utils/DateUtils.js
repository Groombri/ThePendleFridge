/**
 * Takes an hour string e.g. "08:32" and converts it into a Date Object.
 * Needed for Date calculations.
 */
export default function StringToDate(string) {
  const splitString = string.split(":");
  const hour = splitString[0];
  const minute = splitString[1];

  return new Date(null, null, null, hour, minute);
}

/**
 * Formats a date object into HH:mm string
 */
export function DateToString(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
