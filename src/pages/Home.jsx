import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

export default function Home() {
    const [bookingType, setBookingType] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [pax, setPax] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const url = import.meta.env.VITE_API_KEY;

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!bookingType || !location || !startDate || !endDate || !pax) {
            alert('Please fill in all the required fields: Booking Type, Location, Start Date, End Date, and Number of Pax.');
            return;
        }

        try {

            const res = await axios.post(`${url}/bookings`, {
                booking_type: bookingType,
                location,
                start_date: startDate,
                end_date: endDate,
                pax,
                phone,
                email,
            });

            if (res.status === 201) {
                console.log('Booking Created:', res.data);
                setShowNotification(true);
            } else {
                console.error('Error Response:', res.data);
                alert('Failed to create booking');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the booking');
        }
    };


    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [showNotification]);

    return (
        <div
            style={{
                background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '50px 0',
            }}
        >
            <Container>
                <Row className="justify-content-center" style={{ marginTop: '50px' }}>
                    <Col md={6} lg={4}>
                        <h2 className="text-center mb-4 text-white">Make a Booking</h2>

                        {/* Show Notification if Form is Submitted */}
                        {showNotification && (
                            <Alert variant="success" className="mb-4 fadeInNotification">
                                Submitted successfully!
                            </Alert>
                        )}

                        <Form onSubmit={handleSubmit}>
                            {/* Booking Type Selection */}
                            <Form.Group className="mb-3">
                                <Form.Label className="text-white">Select Booking Type</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={bookingType}
                                    onChange={(e) => setBookingType(e.target.value)}
                                >
                                    <option value="">Choose an option</option>
                                    <option value="hotel">Hotel Rooms</option>
                                    <option value="restaurant">Restaurant Tables</option>
                                    <option value="flights">Flight Tickets</option>
                                    <option value="trains">Train Tickets</option>
                                    <option value="buses">Bus Tickets</option>
                                </Form.Control>
                            </Form.Group>

                            {/* Location Input */}
                            <Form.Group className="mb-3">
                                <Form.Label className="text-white">Location (Where are you going?)</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Enter destination"
                                />
                            </Form.Group>

                            {/* Start Date Input */}
                            <Form.Group className="mb-3">
                                <Form.Label className="text-white">Start Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </Form.Group>

                            {/* End Date Input */}
                            <Form.Group className="mb-3">
                                <Form.Label className="text-white">End Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    min={startDate}
                                />
                            </Form.Group>

                            {/* Number of Pax Input */}
                            <Form.Group className="mb-3">
                                <Form.Label className="text-white">Number of Pax</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={pax}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value >= 1) {
                                            setPax(value);
                                        }
                                    }}
                                    placeholder="Enter number of passengers"
                                    min="0"
                                />
                            </Form.Group>

                            {/* Phone Number Input */}
                            <Form.Group className="mb-3">
                                <Form.Label className="text-white">Phone Number</Form.Label>
                                <Form.Control
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter your phone number"
                                />
                            </Form.Group>

                            {/* Email Input */}
                            <Form.Group className="mb-3">
                                <Form.Label className="text-white">Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                />
                            </Form.Group>

                            {/* Submit Button */}
                            <Button variant="primary" type="submit" className="w-100">
                                Book Now
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
