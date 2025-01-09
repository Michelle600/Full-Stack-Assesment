import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Table, Alert, Spinner, Button, Modal, Form, Toast } from 'react-bootstrap';

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editBooking, setEditBooking] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const url = import.meta.env.VITE_API_KEY;

    // Format date to DD/MM/YYYY
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const getCurrentDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const getTravelStatus = (startDate, endDate) => {
        const today = new Date();
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        if (startDateObj.toDateString() === tomorrow.toDateString()) {
            return (
                <span style={{ color: 'orange', fontWeight: 'bold' }}>
                    Travel Tomorrow 🥳
                </span>
            );
        }

        if (endDateObj <= today) {
            return (
                <span style={{ color: 'red', fontWeight: 'bold' }}>
                    Travel Ended 😭
                </span>
            );
        }

        const twoDaysAhead = new Date(today);
        twoDaysAhead.setDate(today.getDate() + 2);
        if (startDateObj <= twoDaysAhead && startDateObj > today && endDateObj > today) {
            return (
                <span style={{ color: 'green', fontWeight: 'bold' }}>
                    Upcoming Travel 🤩
                </span>
            );
        }

        return (
            <span style={{ color: 'green', fontWeight: 'bold' }}>
                Upcoming Travel 🤩
            </span>
        );
    };

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(`${url}/bookings`);
                if (res.status === 200) {
                    setBookings(res.data);
                } else {
                    setError('Failed to fetch bookings');
                }
            } catch (err) {
                console.error('Error fetching bookings:', err);
                setError('An error occurred while fetching bookings.');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${url}/bookings/${id}`);
            if (res.status === 200) {
                setBookings(bookings.filter(booking => booking.id !== id));
                setToastMessage('Booking deleted successfully!');
                setShowToast(true);
            } else {
                alert('Failed to delete booking');
            }
        } catch (err) {
            console.error('Error deleting booking:', err);
            alert('An error occurred while deleting the booking.');
        }
    };

    const handleEdit = (booking) => {
        setEditBooking(booking);
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            const res = await axios.put(`${url}/bookings/${editBooking.id}`, editBooking);
            if (res.status === 200) {
                setBookings(bookings.map(booking =>
                    booking.id === editBooking.id ? res.data : booking
                ));
                setShowModal(false);
                setEditBooking(null);
                setToastMessage('Booking updated successfully!');
                setShowToast(true);
            } else {
                alert('Failed to update booking');
            }
        } catch (err) {
            console.error('Error updating booking:', err);
            alert('An error occurred while updating the booking.');
        }
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" />
                <p>Loading your bookings...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

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
                <h2 className="text-center mb-4" style={{ color: "white", fontSize: '2rem', fontWeight: '700' }}>
                    My Bookings
                </h2>
                {bookings.length === 0 ? (
                    <Alert variant="info">No bookings found.</Alert>
                ) : (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr style={{ backgroundColor: '#3a3a3a', color: 'white' }}>
                                <th>#</th>
                                <th>Booking Type</th>
                                <th>Location</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Pax</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking, index) => (
                                <tr key={booking.id} style={{ transition: 'all 0.3s ease' }}>
                                    <td>{index + 1}</td>
                                    <td>{booking.booking_type}</td>
                                    <td>{booking.location}</td>
                                    <td>{formatDate(booking.start_date)}</td>
                                    <td>{formatDate(booking.end_date)}</td>
                                    <td>{booking.pax}</td>
                                    <td>{booking.phone}</td>
                                    <td>{booking.email}</td>
                                    <td>
                                        <span>{getTravelStatus(booking.start_date, booking.end_date)}</span>
                                    </td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            onClick={() => handleEdit(booking)}
                                            style={{
                                                borderRadius: '50%',
                                                transition: 'background-color 0.3s ease',
                                            }}
                                            className="mx-1"
                                        >
                                            <i className="bi bi-pencil-square"></i>
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(booking.id)}
                                            style={{
                                                borderRadius: '50%',
                                                transition: 'background-color 0.3s ease',
                                            }}
                                            className="mx-1"
                                        >
                                            <i className="bi bi-trash3-fill"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}

                {/* Edit Booking Modal */}
                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Booking</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Booking Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editBooking?.booking_type || ''}
                                    onChange={(e) => setEditBooking({ ...editBooking, booking_type: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editBooking?.location || ''}
                                    onChange={(e) => setEditBooking({ ...editBooking, location: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={editBooking?.start_date || ''}
                                    min={getCurrentDate()}
                                    onChange={(e) => setEditBooking({ ...editBooking, start_date: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={editBooking?.end_date || ''}
                                    min={getCurrentDate()}
                                    onChange={(e) => setEditBooking({ ...editBooking, end_date: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Pax</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={editBooking?.pax || ''}
                                    onChange={(e) => setEditBooking({ ...editBooking, pax: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editBooking?.phone || ''}
                                    onChange={(e) => setEditBooking({ ...editBooking, phone: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={editBooking?.email || ''}
                                    onChange={(e) => setEditBooking({ ...editBooking, email: e.target.value })}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Popup Message */}
                <Toast
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    delay={10000}
                    autohide
                    style={{
                        position: 'fixed',
                        top: '10%',
                        right: '10%',
                        background: "green",
                        color: "white",
                        textAlign: "center",
                        borderRadius: '8px',
                    }}
                >
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </Container>
        </div>
    );
}
