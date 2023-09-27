import React, { useState } from 'react';

function ReadingPreferencesPage() {
    const [booksPerYear, setBooksPerYear] = useState(0);
    const [daysPerWeek, setDaysPerWeek] = useState(0);
    const [readDay, setReadDay] = useState(0);
    const [hoursPerDay, setHoursPerDay] = useState(0);
    const [pagesPerDay, setPagesPerDay] = useState(0);
    const [chaptersPerDay, setChaptersPerDay] = useState(0);
    const [startTime, setStartTime] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log({
            booksPerYear,
            daysPerWeek,
            readDay,
            hoursPerDay,
            pagesPerDay,
            chaptersPerDay,
            startTime,
        });
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3x1 font-bold mb-4">Reading Preferences</h1>
            <form onSubmit={handleFormSubmit}>
                <label>
                    How many books would you like to read in a year?
                    <input 
                    type="number"
                    value={booksPerYear}
                    onChange={(e) => setBooksPerYear(e.target.value)}
                    />    
                </label>
                <br />

                <label>
                    How many days a week would you like to read?
                    <input 
                    type="number"
                    value={daysPerWeek}
                    onChange={(e) => setDaysPerWeek(e.target.value)}
                    />
                </label>
                <br />

                <label>
                    On what day would you like to read?
                    <input
                    type="text"
                    value={readDay}
                    onChange={(e) => setReadDay(e.target.value)}
                    />
                </label>
                <br />

                <label>
                    How many hours would you like to read per day?
                    <input
                    type="number"
                    value="hoursPerDay"
                    onChange={(e) => setHoursPerDay(e.target.value)}
                    />
                </label>
                <br />

                <label>
                    How many pages would you like to read per day?
                    <input
                    type="number"
                    value={pagesPerDay}
                    onChange={(e) => setPagesPerDay(e.target.value)}
                    />
                </label>
                <br />

                <label>
                    How many chapters would you like to read per day?
                    <input 
                    type="number"
                    value={chaptersPerDay}
                    onChange={(e) => setChaptersPerDay(e.target.value)}
                    />
                </label>
                <br />

                <label>
                    What time of day would you like to start reading?
                    <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    />
                </label>
                <br />  

                <button 
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                    Save Preferences 
                </button>     
            </form>
        </div>
    );

}

export default ReadingPreferencesPage;