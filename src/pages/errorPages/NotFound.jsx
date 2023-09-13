import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";

function NotFound() {
    return (
  <Container className="text-center py-5">
    <Row>
      <Col>
        <h1 className="display-4">404</h1>
        <h2 className="mb-4">Сторінку не знайдено</h2>
        <p className="lead">
          Упс! Неможливо знайти сторінку, яку ви шукаєте.
        </p>
        <Button variant="primary" href="/">
          На головну
        </Button>
      </Col>
    </Row>
  </Container> );

}

export default NotFound;
