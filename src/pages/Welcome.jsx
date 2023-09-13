import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TopNavbar from "../components/TopNavbar";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import { getUser } from "../hooks/user.actions";

const Welcome = () => {
  const navigate = useNavigate();

  const user = getUser();
  console.log(user);
  const isAuthenticated = !!user;

  return (
    <>
      <TopNavbar>
        <Nav.Link href="/login/">Авторизація</Nav.Link>
        <Nav.Link href="/register/">Реєстрація</Nav.Link>
        {isAuthenticated && <Nav.Link  href={`/profile/${user.id}/`}>Мій профіль</Nav.Link>}
      </TopNavbar>
      <Container fluid text-center>
        <Row text-center>
          <div className="text-center p-4">
            <h1>Вітаємо!</h1>
          </div>
        </Row>
        <Row>
          <div className="text-center p-2">
            <b>
              <i>
                Раді бачити Вас на сайті нашої автоматизованої системи
                розпізнавання номерних знаків автомобілів!
              </i>
            </b>
          </div>
        </Row>
        <Row>
          <div className="text-center p-4">
            <div className="text-center mx-5">
              Ми раді вас вітати тут, у місці, де технологія зустрічається з
              безпекою та ефективністю. Наша система розпізнавання номерних
              знаків LP Visison оснащена передовими алгоритмами та штучним
              інтелектом, які дозволяють нам швидко та точно ідентифікувати
              номери автомобілів. Незалежно від того, чи ви використовуєте нашу
              систему для контролю парковки, забезпечення безпеки на дорозі чи
              будь-яких інших цілей, ми гарантуємо вам високу якість та
              надійність нашої послуги. Наші алгоритми працюють швидко та
              ефективно, щоб забезпечити вам найкращий досвід. <br />
              <br />
            </div>
          </div>
        </Row>
        <Row>
          <div className="text-center p-4">
            <h5 className="text-dark ">
              Авторизуйтесь або створіть новий акаунт для початку роботи з
              системою
            </h5>
          </div>
        </Row>
        <Row className="text-center px-5">
          <Col className="text-right">
            <div className="px-4">
              <Button
                variant="primary"
                size="sm"
                className="w-30 text-center"
                onClick={() => navigate(`/login`)}
              >
                Авторизація
              </Button>
            </div>
          </Col>
          <Col className="text-right">
            <div className="px-5">
              <Button
                variant="primary"
                size="sm"
                className="w-30 text-center"
                onClick={() => navigate(`/register`)}
              >
                Реєстрація
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Welcome;
