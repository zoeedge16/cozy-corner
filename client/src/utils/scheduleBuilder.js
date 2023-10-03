export const generateYearlyReadingSchedule = function yearlySchedule(books) {
    const schedule = [];
    const totalDaysInYear = 365; // Adjust for leap years if necessary
  
    // Calculate the total number of pages to read in a year
    const totalPagesToRead = books.reduce((total, book) => total + book.pages, 0);
  
    for (const book of books) {
      const pagesToReadPerDay = Math.ceil(book.pages / totalDaysInYear);
  
      for (let day = 1; day <= totalDaysInYear; day++) {
        const pagesRemaining = book.pages - (pagesToReadPerDay * (day - 1));
        const pagesToRead = Math.min(pagesToReadPerDay, pagesRemaining);
  
        schedule.push({
          bookTitle: book.title,
          day,
          pagesToRead,
        });
      }
    }
  
    return {
        totalPagesToRead,
        schedule
    };
  }


  