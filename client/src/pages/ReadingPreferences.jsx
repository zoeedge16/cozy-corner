import { useState } from 'react';

function ReadingPreferencesPage() {
    const [totalPages, setTotalPages] = useState(0);
    const [daysToRead, setDaysToRead] = useState(0);
    const [dailyPageGoal, setPageGoal] = useState(0);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log({
            totalPages,
            daysToRead,
            dailyPageGoal
        });
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3x1 font-bold mb-4">Reading Preferences</h1>
            <form onSubmit={handleFormSubmit}>
                <label>
                    How many pages a day would you like to read?
                    <input 
                    type="number"
                    value={dailyPageGoal}
                    onChange={(e) => setPageGoal(e.target.value)}
                    />    
                </label>
                <br />

                <label>
                    How many pages are in your book?
                    <input 
                    type="number"
                    value={totalPages}
                    onChange={(e) => setTotalPages(e.target.value)}
                    />
                </label>
                <br />

                <label>
                    How many days will you be reading your book?
                    <input
                    type="number"
                    value={daysToRead}
                    onChange={(e) => setDaysToRead(e.target.value)}
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