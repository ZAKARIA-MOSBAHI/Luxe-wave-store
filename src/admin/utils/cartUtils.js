// Helper function to convert time difference strings to comparable numbers
export const getTimeDifference = (timeString) => {
  const number = parseInt(timeString.split(" ")[0]);
  if (timeString.includes("minute")) return number;
  if (timeString.includes("hour")) return number * 60;
  if (timeString.includes("day")) return number * 60 * 24;
  return 0;
};

// JS doesn't have TypeScript's type definitions
// Instead, we can use JSDoc for documentation and IDE support
/**
 * @typedef {Object} Cart
 * @property {string} id - Cart identifier
 * @property {string} user - User name
 * @property {string} email - User email
 * @property {number} items - Number of items in cart
 * @property {string} totalValue - Total value as string with currency
 * @property {string} lastUpdated - Time since last update
 * @property {('active'|'abandoned')} status - Cart status
 */

/**
 * @typedef {'asc'|'desc'} SortDirection
 */

/**
 * @typedef {'lastUpdated'|'totalValue'|'items'} SortBy
 */

// If you need to export these "types" as values for runtime usage:
export const SortDirections = {
  ASC: "asc",
  DESC: "desc",
};

export const SortByOptions = {
  LAST_UPDATED: "lastUpdated",
  TOTAL_VALUE: "totalValue",
  ITEMS: "items",
};
