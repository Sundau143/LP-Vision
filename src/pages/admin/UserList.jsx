import React from "react";
import useSWR, { mutate } from "swr";
import { fetcher } from "../../helpers/axios";
import axiosService from "../../helpers/axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Col, Button  } from "react-bootstrap";
import Forbidden from "../errorPages/Forbidden";
import Unauthorized from "../errorPages/Unauthorized";
import NotFound from "../errorPages/NotFound";
import { ToasterContext } from "../../components/ToasterProvider";
import TopNavbar from "../../components/TopNavbar";

const UserList = () => {
  const { data, error } = useSWR("/user/", fetcher);

  console.log(data);

  const toasterContext = React.useContext(ToasterContext);

  const navigate = useNavigate();

  const { profileId } = useParams();

  const handleDelete = (item) => {
    axiosService
      .delete(`/user/${item.id}/`)
      .then(() => {
        toasterContext.showToast('Видалено!', 'Користувача успішно видалено 🚀', 'success');
        // Call mutate to update the locally cached data
        mutate(`/user/`, (cachedData) => {
          // Filter out the deleted item from the cached data
          return {
            ...cachedData,
            results: cachedData.results.filter((result) => result.id !== item.id),
            count: cachedData.count - 1,
          };
        }, false);
      })
      .catch((error) => {
        console.log(error);
        toasterContext.showToast('Помилка!', 'При видаленні користувача сталася помилка', 'danger');
      });
  };

  const setAdminStatus = (status) => {
    if (status === true) {
      return (<div className="text-success">✔️</div>);
    } else if (status === false) {
      return (<div className="text-danger">❌</div>);
    } else {
      return (<div className="text-warning">?</div>)
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
      <Nav.Link href={`/profile/${profileId}/`}>
          Мій профіль
        </Nav.Link>
        <Nav.Link href={`/profile/${profileId}/all_cameras/`}>
          Всі камери
        </Nav.Link>
      </TopNavbar>
      <div class="container text-center p-4 rounded">
        <h2>Список всіх акаунтів</h2>
      </div>

      <div class="container-fluid text-center px-4">
      {data.count === 0 && (
          <Container className="text-center py-5">
            <Row>
              <Col>
                <h2 className="mb-4">Жодного акаунту не знайдено!</h2>
                <p className="lead">
                  Дочекайтися, коли у системі зареєструється хоча б один користувач
                </p>
                <Button
                  variant="primary"
                  href={`/`}
                >
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
            <th className="border border-2 border-dark">Ім'я</th>
            <th className="border border-2 border-dark">Прізвище</th>
            <th className="border border-2 border-dark">Телефон</th>
            <th className="border border-2 border-dark">Електронна пошта</th>
            <th className="border border-2 border-dark">Адміністратор</th>
            <th className="border border-2 border-dark">Зареєстровано</th>
            <th className="border border-2 border-dark">Оновлено</th>
            <th className="border border-2 border-dark">Всього камер</th>
            <th className="border border-2 border-dark">Всього номерів</th>
            <th className="border border-2 border-dark">Камери</th>
            <th className="border border-2 border-dark">Редагувати ✏️</th>
            <th className="border border-2 border-dark">Видалити 🗑️</th>
          </tr>
        </thead>
        <tbody>
          {data.results.map((item, index) => (
            <tr key={index}>
              <td className="border border-2 border-dark col-1">{index + 1}</td>
              <td className="border border-2 border-dark col-1">{item.id}</td>
              <td className="border border-2 border-dark col-2">{item.first_name}</td>
              <td className="border border-2 border-dark col-2">{item.last_name}</td>
              <td className="border border-2 border-dark col-2">{item.phone}</td>
              <td className="border border-2 border-dark col-2">{item.email}</td>
              <td className="border border-2 border-dark col-1">{setAdminStatus(item.is_superuser)}</td>
              <td className="border border-2 border-dark col-2">{item.created.slice(0, 10)}</td>
              <td className="border border-2 border-dark col-2">{item.updated.slice(0, 10)}</td>
              <td className="border border-2 border-dark col-1">{item.total_cameras}</td>
              <td className="border border-2 border-dark col-1">{item.total_license_plates}</td>
              <td className="border border-2 border-dark col-1">
                <Link to={`/profile/${item.id}/cameras`}>Відкрити</Link>
              </td>
              <td className="border border-2 border-dark col-1">
                <Button variant="outline-primary" onClick={() => navigate(`${item.id}/edit/`)}>✏️</Button>
              </td>
              <td className="border border-2 border-dark col-1">
                <Button variant="outline-danger" onClick={() => handleDelete(item)}>❌</Button>
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

export default UserList;
