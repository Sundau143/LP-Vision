import React from "react";
import useSWR, { mutate } from 'swr'; 
import { fetcher } from "../helpers/axios";
import axiosService from "../helpers/axios";
import Nav from "react-bootstrap/Nav";
import { useParams, useNavigate } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import Badge from "react-bootstrap/Badge";
import Forbidden from "./errorPages/Forbidden";
import Unauthorized from "./errorPages/Unauthorized";
import NotFound from "./errorPages/NotFound";
import { Container, Row, Col, Button  } from "react-bootstrap";
import { ToasterContext } from "../components/ToasterProvider";
import { checkSuperuser } from "../hooks/user.actions";

const LicensePlates = () => {

  const { profileId, cameraId } = useParams();

  const navigate = useNavigate();
  const handleDelete = (item) => {
    axiosService
      .delete(`/camera/${cameraId}/license_plate/${item.id}/`)
      .then(() => {
        toasterContext.showToast('Видалено!', 'Номерний знак успішно видалено 🚀', 'success');
        // Call mutate to update the locally cached data
        mutate(`/camera/${cameraId}/license_plate/`, (cachedData) => {
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
        toasterContext.showToast('Помилка!', 'При видаленні номерного знаку сталася помилка', 'danger');
      });
  };

  const toasterContext = React.useContext(ToasterContext);


  // console.log(cameraId);
  const { data: camData, error: camError } = useSWR(
    `/camera/${cameraId}/`,
    fetcher
  );

  const { data, error } = useSWR(`/camera/${cameraId}/license_plate/`, fetcher);

  console.log(data);
  console.log("camdata " + camData);

  const isSuperuser = checkSuperuser();

  if (error || camError) {
    if (error?.response?.status === 401 || camError.response?.status === 401) {
      return <Unauthorized></Unauthorized>;
    }
    if (error?.response?.status === 403 || camError.response?.status === 403) {
      return <Forbidden></Forbidden>;
    }
    if (error?.response?.status === 404 || camError.response?.status === 404) {
      return <NotFound></NotFound>;
    }
    return <div>Error loading data</div>;
  }

  if (!data || !camData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TopNavbar>
        <Nav.Link href={`/profile/${profileId}/`}>Мій профіль</Nav.Link>
        <Nav.Link href={`/profile/${profileId}/cameras`}>Мої камери</Nav.Link>
        {isSuperuser && (
          <>
          <Nav.Link href={`/profile/${profileId}/all_cameras/`}>Всі камери</Nav.Link>
          <Nav.Link href={`create/`}>Додати номер</Nav.Link>
          </>
        )};
      </TopNavbar>

      <div class="container text-center px-4">
        <div class="row p-4">
          <div class="col col-4 text-center">
            <Badge bg="primary">
              <h2>{camData.name}</h2>
            </Badge>
          </div>
          <div class="col col-8 text-center">
            <h2>Проскановані номерні знаки</h2>
          </div>
        </div>
        {data.count === 0 && (
          <Container className="text-center py-5">
            <Row>
              <Col>
                <h2 className="mb-4">Просканованих номерів не знайдено!</h2>
                <p className="lead">
                  Тут відображатимуться номерні знаки, проскановані цією камерою
                </p>
                <Button
                  variant="primary"
                  href={`/profile/${profileId}/cameras`}
                >
                  До списку камер
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
                { isSuperuser && (
                  <>
                  <th class="border border-2 border-dark">id</th>
                  </>
                )
                }
                <th class="border border-2 border-dark">Номер</th>
                <th class="border border-2 border-dark">Країна</th>
                <th class="border border-2 border-dark">Регіон</th>
                <th class="border border-2 border-dark">Час розпізнавання</th>
                { isSuperuser && (
                  <>
                  <th class="border border-2 border-dark">Змінено</th>
                  </>
                )
                }
                <th class="border border-2 border-dark">Кадр</th>
                <th class="border border-2 border-dark">Редагувати ✏️</th>
                <th class="border border-2 border-dark">Видалити 🗑️</th>
              </tr>
            </thead>
            <tbody>
              {data.results.map((item, index) => (
                <tr style={{ verticalAlign: 'middle' }} key={index}>
                  <td class="border border-2 border-dark">{index + 1}</td>
                  { isSuperuser && (
                  <>
                  <td class="border border-2 border-dark">{item.id}</td>
                  </>
                )
                }
                  <td class="border border-2 border-dark">{item.text}</td>
                  <td class="border border-2 border-dark">{item.country}</td>
                  <td class="border border-2 border-dark">{item.region}</td>
                  <td class="border border-2 border-dark">
                    {item.created.replace("T", " ").substr(0, 19)}
                  </td>
                  { isSuperuser && (
                  <>
                  <td class="border border-2 border-dark">
                    {item.updated.replace("T", " ").substr(0, 19)}
                  </td>
                  </>
                )
                }
                  <td class="border border-2 border-dark"><img src={item.frame} width="128" height="96" alt="" /></td>
                  <td class="border border-2 border-dark">
                    <Button variant="outline-primary" onClick={() => navigate(`${item.id}/edit/`)}>✏️</Button>
                  </td>
                  <td class="border border-2 border-dark">
                    <Button variant="outline-danger" onClick={() => handleDelete(item)}>❌</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
        {isSuperuser && (
        <div class="container p-3">
        <Button onClick={() => navigate(`create/`)}>Додати номерний знак</Button>
      </div>
        )}
      </div>
    </>
  );
};

export default LicensePlates;
