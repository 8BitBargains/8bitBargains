export const numSort = (arr, field, direction = 'asc') => {
  if (direction === 'asc') {
    return arr.sort((a, b) => a[field] - b[field]);
  } else if (direction === 'desc') {
    return arr.sort((a, b) => b[field] - a[field]);
  }
};

export const alphaSort = (arr, field, direction = 'asc') => {
  if (direction === 'asc') {
    return arr.sort((a, b) => a[field].localeCompare(b[field]));
  } else if (direction === 'desc') {
    return arr.sort((a, b) => b[field].localeCompare(a[field]));
  }
};
