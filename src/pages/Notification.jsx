import { Container, Alert } from 'react-bootstrap';

export default function Notification() {
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
            <Container className="text-center">
                <Alert variant="info">
                    <h3>No Notifications for now</h3>
                    <p>You haven&#39;t received any notifications yet.</p>
                </Alert>
            </Container>
        </div>
    );
}
