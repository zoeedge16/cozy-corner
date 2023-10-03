export const generateReadingSchedule = function(totalPages, daysToRead, dailyPageGoal) {
  const schedule = [];
  const pagesPerDay = Math.ceil(totalPages / daysToRead);

  for (let day = 1; day <= daysToRead; day++) {
    const pagesRemaining = totalPages - (pagesPerDay * (day - 1));
    const pagesToRead = Math.min(pagesPerDay, pagesRemaining);

  schedule.push({
      day,
      pagesToRead,
  });
}

return schedule;
}