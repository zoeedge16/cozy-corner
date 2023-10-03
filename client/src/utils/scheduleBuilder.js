// export const generateReadingSchedule = function(totalPages, daysToRead, dailyPageGoal) {
//   const schedule = [];
//   const pagesPerDay = Math.ceil(totalPages / daysToRead);

//   for (let day = 1; day <= daysToRead; day++) {
//     const pagesRemaining = totalPages - (pagesPerDay * (day - 1));
//     const pagesToRead = Math.min(pagesPerDay, pagesRemaining);

//     schedule.push({
//         day,
//         pagesToRead,
//     });
//   }

// return schedule;
// }

export const generateReadingSchedule = function(totalPages, daysToRead) {
  const schedule = [];
  let pagesRemaining = totalPages;
  const pagesPerDay = Math.min(Math.ceil(totalPages / daysToRead));

  for (let day = 1; day <= daysToRead; day++) {
    const pagesToRead = Math.min(pagesPerDay, pagesRemaining);

    schedule.push({
      day,
      pagesToRead,
    });

    pagesRemaining -= pagesToRead;

    if (pagesRemaining <= 0) {
      break; // All pages have been distributed
    }
  }

  return schedule;
};