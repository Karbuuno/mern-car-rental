export const dayDifference = (from, to) => {
  const d1 = new Date(from);
  const d2 = new Date(to);
  const timeDiff = Math.abs(d2 - d1);
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  // console.log(daysDiff);
  return daysDiff;
};
