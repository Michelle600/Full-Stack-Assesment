import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Form, Modal, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";

export default function Login() {
    const url = import.meta.env.VITE_API_KEY;
    const [modalShow, setModalShow] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (authToken) {
            navigate("/home");
        }
    }, [authToken, navigate]);

    const handleShowSignUp = () => setModalShow("SignUp");
    const handleShowLogin = () => setModalShow("Login");

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/signup`, { username, password });
            console.log(res.data);
            setModalShow(null);
            setUsername("");
            setPassword("");
        } catch (error) {
            setErrorMessage("Failed to sign up. Please try again.");
            console.error(error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/login`, { username, password });
            if (res.data && res.data.auth === true && res.data.token) {
                setAuthToken(res.data.token);
                console.log("Login was successful, token saved");
                setUsername("");
                setPassword("");
                setModalShow(null);
            }
            console.log(res.data);
        } catch (error) {
            setErrorMessage("Login failed. Please check your credentials.");
            console.error(error);
        }
    };

    const handleClose = () => {
        setModalShow(null);
        setErrorMessage("");
    };

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                margin: 0,
                padding: 0,
                backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwT-O3TXQiGhFyKOdf85kT_SxYiVzoJCZCTySvCLGEV3EVwj1T9Xsta5ON_r_RS8So8uM&usqp=CAU")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Container
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "20px",
                    padding: "40px",
                    maxWidth: "420px",
                    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                    textAlign: "center",
                }}
            >
                <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#343a40" }}>Welcome!</h1>
                <p style={{ fontSize: "1.1rem", color: "#6c757d" }}>Join us and enjoy seamless booking experiences.</p>

                <div className="d-grid gap-3 mt-4">
                    <Button className="rounded-pill" variant="primary" size="lg" aria-label="Sign up with Google">
                        <i className="bi bi-google"></i> Sign up with Google
                    </Button>
                    <Button className="rounded-pill" variant="dark" size="lg" aria-label="Sign up with Apple">
                        <i className="bi bi-apple"></i> Sign up with Apple
                    </Button>
                </div>

                <p className="mt-4" style={{ fontSize: "0.95rem", color: "#6c757d" }}>or</p>
                <Button className="rounded-pill w-100" variant="success" size="lg" aria-label="Create an account" onClick={handleShowSignUp}>
                    Create an account
                </Button>

                <p className="mt-3" style={{ fontSize: "0.85rem", color: "#6c757d" }}>
                    By signing up, you agree to our <a href="#" style={{ color: "#007bff", textDecoration: "none" }}>Terms of Service</a> and <a href="#" style={{ color: "#007bff", textDecoration: "none" }}>Privacy Policy</a>.
                </p>

                <p className="mt-4" style={{ fontSize: "1rem", fontWeight: "bold", color: "#343a40" }}>Already have an account?</p>
                <Button className="rounded-pill w-100" variant="outline-primary" size="lg" aria-label="Sign In" onClick={handleShowLogin}>
                    Sign In
                </Button>
            </Container>

            <Modal show={modalShow !== null} onHide={handleClose} animation={true} centered>
                <Modal.Body>
                    <h2 className="mb-4" style={{ fontWeight: "bold" }}>
                        {modalShow === "SignUp" ? "Create Your Account" : "Login To Your Account"}
                    </h2>

                    {/* Show error message if any */}
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                    <Form className="d-grid gap-2 px-5" onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                onChange={(e) => setUsername(e.target.value)}
                                type="email"
                                placeholder="Enter Email"
                                value={username}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Password"
                                value={password}
                            />
                        </Form.Group>


                        {modalShow === "SignUp" && (
                            <p style={{ fontSize: "0.85rem", color: "#6c757d" }}>
                                By signing up, you agree to our Terms and Condition. Learn more.
                            </p>
                        )}
                        <Button className="rounded-pill" variant="primary" size="lg" type="submit">
                            {modalShow === "SignUp" ? "Sign Up" : "Login"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}
