/**
 * Sort an array of objects by a given column
 *
 * @param {string[] | number[]} arrayToSort - Array of objects to sort
 * @param {string} columnToSort - Key/column to sort by
 * @param {"asc"|"desc"} [order="asc"] - Sort order (ascending by default)
 * @returns {Array} - Sorted array
 */
export function sortItems(arrayToSort, columnToSort, order = "asc") {
  if (!Array.isArray(arrayToSort)) return [];
  if (!columnToSort) return arrayToSort;

  const sortedArr = [...arrayToSort].sort((a, b) => {
    const valA = a[columnToSort];
    const valB = b[columnToSort];

    if (valA == null && valB == null) return 0;
    if (valA == null) return order === "asc" ? -1 : 1;
    if (valB == null) return order === "asc" ? 1 : -1;

    // Handle strings
    if (typeof valA === "string" && typeof valB === "string") {
      return order === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    // Handle numbers or dates
    if (valA > valB) return order === "asc" ? 1 : -1;
    if (valA < valB) return order === "asc" ? -1 : 1;
    return 0;
  });

  return sortedArr;
}
