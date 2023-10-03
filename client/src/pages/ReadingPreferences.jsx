import { useState } from 'react';
import { generateReadingSchedule } from '../utils/scheduleBuilder';
import { Row, Col, Card, Container } from 'react-bootstrap';

function ReadingPreferencesPage() {

    const [totalPages, setTotalPages] = useState(0);
    const [daysToRead, setDaysToRead] = useState(0);
    // const [dailyPageGoal, setPageGoal] = useState(0);
    const [schedule, setSchedule] = useState([]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setSchedule(generateReadingSchedule(totalPages, daysToRead));
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3x1 font-bold mb-4 page-header">Reading Preferences</h1>
            <form onSubmit={handleFormSubmit}>
                <label className='mt-3 mb-3'>
                    How many pages are in your book?
                    <input
                    className='ms-3 pref-input' 
                    type="number"
                    value={totalPages}
                    onChange={(e) => setTotalPages(e.target.value)}
                    />
                </label>
                <br />

                {/* <label>
                    How many pages a day would you like to read?
                    <input 
                    type="number"
                    value={dailyPageGoal}
                    onChange={(e) => setPageGoal(e.target.value)}
                    />    
                </label>
                <br /> */}

                <label className='mt-3 mb-3'>
                    How many days will you be reading your book?
                    <input
                    className='ms-3 pref-input'
                    type="number"
                    value={daysToRead}
                    onChange={(e) => setDaysToRead(e.target.value)}
                    />
                </label>
                <br /> 

                <button 
                type="submit"
                className="pref-btn"
                >
                    Save Preferences 
                </button>     
            </form>
            <h3 className='m-5'>Reading Schedule</h3>
            <Container className='d-flex justify-content-center mb-4'>
                <Row>
                    {schedule.length!=0 ? schedule.map((item) => {
                        return (
                            <Col key={item} xs={12} md={2} className='d-flex justify-content-center mt-3 mb-5'>
                                <Card border='dark'>
                                <Card.Body>
                                    <Card.Title className='fw-bold'>Day {item.day}</Card.Title>
                                    <Card.Text className='fw-bold schedule-text'>{item.pagesToRead} pages</Card.Text>
                                </Card.Body>
                                </Card>
                            </Col>
                        );
                    }) : `No preferences yet!`}
                </Row>
            </Container>
        </div>
    );

}

export default ReadingPreferencesPage;