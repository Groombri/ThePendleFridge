/**
 * Takes an hour string e.g. "08:32" and converts it into a Date Object.
 * Needed for Date calculations.
 */
export function StringToDate(string) {
  const splitString = string.split(":");
  const hour = splitString[0];
  const minute = splitString[1];

  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
    minute
  );
}

/**
 * Formats a date object into HH:mm string
 */
export function DateToString(date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/**
 * Calculates if the current time falls between two given times.
 * This is to be used for users who have selected to only be notified between certain hours.
 * @param {*} array array of the two times e.g. ["10:30", "17:00"]
 * @returns true if within given times, false if not.
 */
export function WithinGivenTimes(array) {
  //get current date/time
  const now = new Date();

  //converts both given times into date format
  const firstTime = StringToDate(array[0]);
  const secondTime = StringToDate(array[1]);

  /**
   * if given times cross midnight e.g. ["23:00", "13:00"]:
   * now can either be bigger than the first or smaller than the second.
   * if given times don't cross midnight e.g. ["10:30", "17:00"]:
   * now must be bigger than the first time but smaller than the second
   */
  return firstTime > secondTime
    ? now >= firstTime || now <= secondTime
    : now >= firstTime && now <= secondTime;
}
