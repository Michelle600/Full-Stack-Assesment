import { Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();

    function returnToHome() {
        navigate('/');
    }

    return (
        <Container
            fluid
            style={{
                background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '50px 0',
            }}
        >
            <Card
                style={{
                    padding: "3rem 2.5rem",
                    borderRadius: "25px",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    maxWidth: "500px",
                    width: "100%",
                    textAlign: "center",
                    animation: "cardAppear 0.5s ease-out",
                }}
            >
                <Card.Body>
                    <h1
                        style={{
                            fontSize: "5rem",
                            marginBottom: "1.5rem",
                            color: "#000",
                            fontWeight: "bold",
                        }}
                    >
                        Oops!
                    </h1>
                    <p
                        style={{
                            fontSize: "1.4rem",
                            marginBottom: "2rem",
                            color: "#2c3e50",
                            fontWeight: "300",
                        }}
                    >
                        Sorry, the page you are looking for does not exist or is unavailable.
                    </p>
                    <Button
                        variant="warning"
                        size="lg"
                        onClick={returnToHome}
                        style={{
                            padding: "1rem 2rem",
                            fontSize: "1.1rem",
                            borderRadius: "50px",
                            backgroundColor: "#000",
                            borderColor: "#000",
                            color: "#FFFFFF",
                            fontWeight: "bold",
                            textTransform: "uppercase",
                        }}
                    >
                        Go Home
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
}
