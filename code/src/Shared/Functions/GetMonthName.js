// convert number to month name

export const getMonthName = num => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[num - 1].substring(0, 3);
}
