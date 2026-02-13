import { formatDistanceToNow } from "date-fns";

/**
 * Converts a date string or Date object into a human-readable
 * relative time string (e.g., "1 day ago").
 *
 * @param {string | Date} date - A valid ISO date string or Date instance.
 * @returns {string} Relative time from now with suffix.
 *
 * @example
 * formatDateToText("2026-02-13T17:05:04.291Z")
 * // "1 day ago"
 *
 * @throws {RangeError} If the provided date is invalid.
 */
export const formatDateToText = (date) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
};
