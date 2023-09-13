import React from "react";
import useSWR, { mutate } from "swr";
import { fetcher } from "../../helpers/axios";
import axiosService from "../../helpers/axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Col, Button } from "react-bootstrap";
import Forbidden from "../errorPages/Forbidden";
import Unauthorized from "../errorPages/Unauthorized";
import NotFound from "../errorPages/NotFound";
import { ToasterContext } from "../../components/ToasterProvider";
import TopNavbar from "../../components/TopNavbar";

const CameraList = () => {
  const { data, error } = useSWR("/camera/", fetcher);

  console.log(data);

  const toasterContext = React.useContext(ToasterContext);

  const navigate = useNavigate();

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

  const handleDelete = (item) => {
    axiosService
      .delete(`/camera/${item.id}/`)
      .then(() => {
        toasterContext.showToast(
          "Видалено!",
          "Камеру успішно видалено 🚀",
          "success"
        );
        // Call mutate to update the locally cached data
        mutate(
          `/camera/`,
          (cachedData) => {
            // Filter out the deleted item from the cached data
            return {
              ...cachedData,
              results: cachedData.results.filter(
                (result) => result.id !== item.id
              ),
              count: cachedData.count - 1,
            };
          },
          false
        );
      })
      .catch((error) => {
        console.log(error);
        toasterContext.showToast(
          "Помилка!",
          "При видаленні камери сталася помилка",
          "danger"
        );
      });
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
        <Nav.Link href={`/profile/${profileId}/users`}>Всі користувачі</Nav.Link>
        <Nav.Link href={`create/`}>Додати камеру</Nav.Link>
      </TopNavbar>
      <div class="container text-center p-4 rounded">
        <h2>Список всіх камер системи</h2>
      </div>
      <div class="container-fluid text-center px-4">
        {data.count === 0 && (
          <Container className="text-center py-5">
            <Row>
              <Col>
                <h2 className="mb-4">Жодної камери не знайдено!</h2>
                <p className="lead">
                  Дочекайтеся, коли у системі буде хоча б одна камера, або
                  додайте її самостійно
                </p>
                <Button variant="primary" href={`/`}>
                  На головну
                </Button>
              </Col>
            </Row>
          </Container>
        )}
        {data.count !== 0 && (
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover table-rounded border border-2 border-dark rounded-pill responsive">
              <thead>
                <tr className="border border-2 border-dark">
                  <th className="border border-2 border-dark">№</th>
                  <th className="border border-2 border-dark">id</th>
                  <th className="border border-2 border-dark">Власник</th>
                  <th className="border border-2 border-dark">Назва</th>
                  <th className="border border-2 border-dark">Модель</th>
                  <th className="border border-2 border-dark">Локація</th>
                  <th className="border border-2 border-dark">Статус</th>
                  <th className="border border-2 border-dark">Створено</th>
                  <th className="border border-2 border-dark">Оновлено</th>
                  <th className="border border-2 border-dark">Номери</th>
                  <th className="border border-2 border-dark">Трансляція</th>
                  <th className="border border-2 border-dark">Редагувати ✏️</th>
                  <th className="border border-2 border-dark">Видалити 🗑️</th>
                </tr>
              </thead>
              <tbody>
                {data.results.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-2 border-dark col-1">
                      {index + 1}
                    </td>
                    <td className="border border-2 border-dark col-1">
                      {item.id}
                    </td>
                    <td className="border border-2 border-dark col-2">
                      {item.owner}
                    </td>
                    <td className="border border-2 border-dark col-2">
                      {item.name}
                    </td>
                    <td className="border border-2 border-dark col-2">
                      {item.model}
                    </td>
                    <td className="border border-2 border-dark col-2">
                      {item.location}
                    </td>
                    <td className="border border-2 border-dark col-2">
                      <div className={getStatusColor(item.status)}>
                        {item.status}
                      </div>
                    </td>
                    <td className="border border-2 border-dark col-2">
                      {item.created.slice(0, 10)}
                    </td>
                    <td className="border border-2 border-dark col-2">
                      {item.updated.slice(0, 10)}
                    </td>
                    <td className="border border-2 border-dark col-1">
                      <Link to={`${item.id}/license_plates`}>Відкрити</Link>
                    </td>
                    <td className="border border-2 border-dark col-1">
                      <Link to={`${item.id}/broadcast`}>Відкрити</Link>
                    </td>
                    <td className="border border-2 border-dark col-1">
                      <Button
                        variant="outline-primary"
                        onClick={() => navigate(`${item.id}/edit/`)}
                      >
                        ✏️
                      </Button>
                    </td>
                    <td className="border border-2 border-dark col-1">
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDelete(item)}
                      >
                        ❌
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}  
        <div class="container p-3">
          <Button onClick={() => navigate(`create/`)}>Додати камеру</Button>
        </div>
      </div>
    </>
  );
};

export default CameraList;
