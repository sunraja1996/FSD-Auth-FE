import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { env } from '../environment';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Profile() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate()

  const fetchData = async () => {
    const token = sessionStorage.getItem('token');

    if (token) {
      try {
        const res = await axios.get(`${env.apiurl}/users/userprofile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.data.statusCode === 200) {
          setUser(res.data.user);
        } else {
          console.log(res.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('No Token Found');
    }
    setIsLoading(false);
  };

  let logout = () => {
    sessionStorage.clear()
    navigate('./login')
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="vh-100" style={{ backgroundColor: '#9de2ff' }}>
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col md={9} lg={7} xl={5}>
            <Card style={{ borderRadius: '15px' }}>
              <Card.Body className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <img
                      src={user.imageUrl}
                      alt=""
                      className="img-fluid"
                      style={{ width: '180px', borderRadius: '10px' }}
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="mb-1">{user.firstName}</h5>
                    <p className="mb-2 pb-1" style={{ color: '#2b2a2a' }}>
                      {user.email}
                    </p>
                    
                    <div className="d-flex pt-1">
                      <Button variant="danger" className="me-1 flex-grow-1"  onClick={()=>logout()}>
                        Log-out
                      </Button>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Profile;
