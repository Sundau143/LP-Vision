import React from "react";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { useParams } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Col, Button  } from "react-bootstrap";
import Forbidden from "./errorPages/Forbidden";
import Unauthorized from "./errorPages/Unauthorized";
import NotFound from "./errorPages/NotFound";


const Cameras = () => {
  const { data, error } = useSWR("/camera/", fetcher);

  console.log(data);

  const { profileId } = useParams();

  const getStatusColor = (status) => {
    if (status === "Онлайн") {
      return "text-success";
    } else if (status === "Офлайн") {
      return "text-danger";
    } else {
      return "text-warning";
    }
  };

  if (error) {
    if (error?.response?.status === 401) {
      return <Unauthorized></Unauthorized>;
    }
    if (error?.response?.status === 403) {
      return <Forbidden></Forbidden>;
    }
    if (error?.response?.status === 404) {
      return <NotFound></NotFound>;
    }
    return <div>Error loading data</div>;
  }

  if (!data) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      <TopNavbar>
        <Nav.Link href={`/profile/${profileId}/`}>Мій профіль</Nav.Link>
      </TopNavbar>

      <div class="container text-center p-4 rounded">
        <h2>Список наявних камер</h2>
      </div>

      <div class="container text-center px-4">
      {data.count === 0 && (
          <Container className="text-center py-5">
            <Row>
              <Col>
                <h2 className="mb-4">Закріплених камер не знайдено!</h2>
                <p className="lead">
                  Дочекайтися, коли адміністратор закріпить за вами камери
                </p>
                <Button
                  variant="primary"
                  href={`/profile/${profileId}/`}
                >
                  До мого профілю
                </Button>
              </Col>
            </Row>
          </Container>
        )}
      {data.count !== 0 && (
        <div className="table-responsive">
        <table class="table responsive table-striped table-bordered table-hover table-rounded border border-2 border-dark rounded-pill">
          <thead>
            <tr class="border border-2 border-dark">
              <th class="border border-2 border-dark">№</th>
              <th class="border border-2 border-dark">Назва</th>
              <th class="border border-2 border-dark">Модель</th>
              <th class="border border-2 border-dark">Локація</th>
              <th class="border border-2 border-dark">Статус</th>
              <th class="border border-2 border-dark">Номери</th>
              <th class="border border-2 border-dark">Трасляція</th>
            </tr>
          </thead>
          <tbody>
            {data.results.map((item, index) => (
              <tr key={index}>
                <td class="border border-2 border-dark">{index + 1}</td>
                <td class="border border-2 border-dark">{item.name}</td>
                <td class="border border-2 border-dark">{item.model}</td>
                <td class="border border-2 border-dark">{item.location}</td>
                <td class="border border-2 border-dark">
                  <div className={getStatusColor(item.status)}>
                    {item.status}
                  </div>
                </td>
                <td class="border border-2 border-dark">
                  <Link to={`${item.id}/license_plates`}>Відкрити</Link>
                </td>
                <td class="border border-2 border-dark">
                  <Link to={`${item.id}/broadcast/`}>Відкрити</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        )}
      </div>
    </>
  );
};

export default Cameras;
