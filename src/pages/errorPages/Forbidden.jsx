import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Forbidden = () => {
  return (
    <Container className="text-center py-5">
      <Row>
        <Col>
          <h1 className="display-4">403</h1>
          <h2 className="mb-4">Доступ заборонено</h2>
          <p className="lead">Упс! У вас немає прав для перегляду цієї сторінки</p>
          <Button variant="primary" href="/">На головну</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Forbidden;