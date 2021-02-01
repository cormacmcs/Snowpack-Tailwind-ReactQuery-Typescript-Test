export const byName = (a, b) => {
  var nameA = a.name?.toUpperCase();
  var nameB = b.name?.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  return 0;
};
