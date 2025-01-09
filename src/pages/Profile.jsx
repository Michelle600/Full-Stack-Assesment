
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Profile() {
    const [userInfo, setUserInfo] = useState({
        username: 'Michelle',
        email: 'abc@example.com',
        phone: '0123456789',
        address: 'Malaysia',
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            setUserInfo({
                username: 'Michelle',
                email: 'abc@example.com',
                phone: '0123456789',
                address: 'Malaysia',
            });
        };
        fetchUserInfo();
    }, []);

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
                <Row>
                    <Col lg={6} md={8} className="mx-auto">
                        <Card className="shadow-lg" style={{ borderRadius: '15px' }}>
                            <Card.Header className="bg-dark text-white text-center" style={{ borderRadius: '15px 15px 0 0' }}>
                                <h3><em>PROFILE</em></h3>
                            </Card.Header>
                            <Card.Body style={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '0 0 15px 15px' }}>
                                {/* Profile Picture */}
                                <div className="text-center mb-3">
                                    <img
                                        src="https://s2-ug.ap4r.com/image-aigc-article/seoPic/origin/ddb50e2ac0eb736a77408d935ad33991b727bcee.jpg"
                                        alt="Profile Picture"
                                        style={{
                                            width: '150px',
                                            height: '150px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            border: '5px solid #fff',
                                            boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
                                        }}
                                    />
                                </div>

                                <form>
                                    {/* username */}
                                    <div className="mb-3">
                                        <label>Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={userInfo.username || ''}
                                            readOnly
                                            className="form-control"
                                        />
                                    </div>
                                    {/* email */}
                                    <div className="mb-3">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={userInfo.email || ''}
                                            readOnly
                                            className="form-control"
                                        />
                                    </div>
                                    {/* phone number */}
                                    <div className="mb-3">
                                        <label>Phone Number</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={userInfo.phone || ''}
                                            readOnly
                                            className="form-control"
                                        />
                                    </div>
                                    {/* address */}
                                    <div className="mb-3">
                                        <label>Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={userInfo.address || ''}
                                            readOnly
                                            className="form-control"
                                        />
                                    </div>

                                </form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
