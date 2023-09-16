import React, { useState } from 'react';
import { Form, Col, Row, Container } from 'react-bootstrap';
import atm from "../assets/atm.jpg";
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';

function Card() {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardExpiry: '',
    cvv: ''
  });

  const [formErrors, setFormErrors] = useState({
    cardNumber: '',
    cardExpiry: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    setFormErrors({
      ...formErrors,
      [name]: ''
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;

    Object.keys(formData).forEach(key => {
      if (formData[key] === '') {
        setFormErrors({
          ...formErrors,
          [key]: 'You have to fill this'
        });
        valid = false;
      }
    });

    // Add CVV validation
    if (formData.cvv.length !== 3) {
      setFormErrors({
        ...formErrors,
        cvv: 'CVV must be exactly 3 digits long'
      });
      valid = false;
    }

    if (valid) {
      try {
        const response = await fetch('/validateCard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
          console.log("Card details are valid!");
        } else {
          console.log("Card details are invalid.");
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  return (
    <MDBContainer style={{ backgroundColor: '#400040' }} fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className=' my-5 mx-auto'
            style={{
              borderRadius: '1rem',
              maxWidth: '400px',
              backgroundColor: 'white'
            }}>
            <MDBCardBody className='p-5 d-flex flex-column mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase align-items-center mx-auto">Checkout</h2>
              <p className="-50 mb-5 align-items-center mx-auto">Please enter your card details to pay</p>
              <div>
                <img src={atm} alt="" className='w-100 align-items-center mx-auto' />
              </div>
              <div className='mt-3'>
                <Form.Control
                  type="text"
                  placeholder="CARD NUMBER"
                  name="cardNumber"
                  value={formData.cardNumber}
                  className='p-3'
                  style={{ boxShadow: 'none', fontWeight: 'bolder' }}
                  onChange={handleChange}
                />
                {formErrors.cardNumber && <div className="text-danger">{formErrors.cardNumber}</div>}
              </div>
              <Row className='mt-3'>
                <Col md={6} xs={12}>
                  <div className='mt-2'>
                    <Form.Control
                      type="text"
                      placeholder="Card Expiry"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      className='p-3'
                      style={{ boxShadow: 'none', fontWeight: 'bolder' }}
                      onChange={handleChange}
                    />
                    {formErrors.cardExpiry && <div className="text-danger">{formErrors.cardExpiry}</div>}
                  </div>
                </Col>
                <Col md={6} xs={12}>
                  <div className='mt-2'>
                    <Form.Control
                      type="text"
                      placeholder="CVV"
                      name="cvv"
                      value={formData.cvv}
                      className='p-3'
                      style={{ boxShadow: 'none', fontWeight: 'bolder' }}
                      onChange={handleChange}
                    />
                    {formErrors.cvv && <div className="text-danger">{formErrors.cvv}</div>}
                  </div>
                </Col>
              </Row>
              <MDBBtn
                className="mt-4 w-100 gradient-custom-2"
                style={{
                  padding: '16px 48px',
                  background: "#400040",
                  border: "none",
                  boxShadow: 'none',
                  transition: 'background 0.3s',
                  textTransform: 'none',
                  fontSize: '18px'
                }}
                onMouseEnter={(e) => e.target.style.background = '#000'}
                onMouseLeave={(e) => e.target.style.background = '#400040'}
                type="submit"
                onClick={handleSubmit}
              >
                Proceed
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Card;
