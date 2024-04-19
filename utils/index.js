export const formatDate = (date) => {
  var day = date.getDate();
  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var month = monthNames[date.getMonth()];
  var year = date.getFullYear();
  // var year = date.getYear().toString();
  // var formattedDate = `${day} ${month} 20${year.slice(1)}`;
  var formattedDate = `${day} ${month} ${year}`;
  return formattedDate;
};
