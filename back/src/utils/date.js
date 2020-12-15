const formatMainDate = (days, month, year) => `${days}.${month}.${year}`;

const getTodayFormattedDate = () => {
  const date = new Date();

  const days = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  return formatMainDate(days, month, year);
};

module.exports = {
  getTodayFormattedDate,
  formatMainDate
};