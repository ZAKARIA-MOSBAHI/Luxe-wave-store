// Helper function to convert time difference strings to comparable numbers
export const getTimeDifference = (timeString) => {
  const number = parseInt(timeString.split(" ")[0]);
  if (timeString.includes("minute")) return number;
  if (timeString.includes("hour")) return number * 60;
  if (timeString.includes("day")) return number * 60 * 24;
  return 0;
};

// Sample data - in a real application, this would come from an API
export const carts = [
  {
    id: "cart-001",
    user: "John Doe",
    email: "john.doe@example.com",
    items: 3,
    totalValue: "$245.99",
    lastUpdated: "10 minutes ago",
    status: "active",
  },
  {
    id: "cart-002",
    user: "Jane Smith",
    email: "jane.smith@example.com",
    items: 2,
    totalValue: "$189.50",
    lastUpdated: "2 hours ago",
    status: "active",
  },
  {
    id: "cart-003",
    user: "Robert Johnson",
    email: "robert.johnson@example.com",
    items: 1,
    totalValue: "$78.25",
    lastUpdated: "1 day ago",
    status: "abandoned",
  },
  {
    id: "cart-004",
    user: "Emily Davis",
    email: "emily.davis@example.com",
    items: 4,
    totalValue: "$342.00",
    lastUpdated: "3 hours ago",
    status: "active",
  },
  {
    id: "cart-005",
    user: "Michael Wilson",
    email: "michael.wilson@example.com",
    items: 2,
    totalValue: "$125.75",
    lastUpdated: "3 days ago",
    status: "abandoned",
  },
  {
    id: "cart-006",
    user: "Guest User",
    email: "unknown",
    items: 1,
    totalValue: "$59.99",
    lastUpdated: "5 hours ago",
    status: "active",
  },
];

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
