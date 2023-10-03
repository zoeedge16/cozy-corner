import { useState } from 'react';
import { generateReadingSchedule } from '../utils/scheduleBuilder';
import { Row, Card } from 'react-bootstrap';

function ReadingPreferencesPage() {
    const [totalPages, setTotalPages] = useState(0);
    const [daysToRead, setDaysToRead] = useState(0);
    const [dailyPageGoal, setPageGoal] = useState(0);
    const [schedule, setSchedule] = useState([]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setSchedule(generateReadingSchedule(totalPages, daysToRead, dailyPageGoal));
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3x1 font-bold mb-4">Reading Preferences</h1>
            <form onSubmit={handleFormSubmit}>
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
                    How many pages a day would you like to read?
                    <input 
                    type="number"
                    value={dailyPageGoal}
                    onChange={(e) => setPageGoal(e.target.value)}
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
            <h3 className='m-5'>Reading Schedule</h3>
            <div className='container d-flex flex-wrap gap-3 m-5'>
            {schedule.length!=0 ? schedule.map((item) => {
                 return (
                    <div className='d-flex'>
                      <Card border='dark'>
                        <Card.Body>
                          <Card.Title>Day {item.day}</Card.Title>
                          <Card.Text>{item.pagesToRead} pages</Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  );
            }) : `No preferences yet!`}
            </div>
        </div>
    );

}

export default ReadingPreferencesPage;