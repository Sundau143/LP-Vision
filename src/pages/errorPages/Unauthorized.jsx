import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Unauthorized = () => {
  return (
    <Container className="text-center py-5">
      <Row>
        <Col>
          <h1 className="display-4">401</h1>
          <h2 className="mb-4">Потрібна авторизація</h2>
          <p className="lead">Упс! Ви повинні авторизуватися для перегляду цієї сторінки.</p>
          <Button variant="primary" href="/">Авторизація</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Unauthorized;