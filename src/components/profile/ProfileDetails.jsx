import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getUser, checkSuperuser } from "../../hooks/user.actions";
import person_icon from "../../img/person.png";
import cctv from "../../img/cctv_camera.png";

function ProfileDetails(props) {
  const { user } = props;
  const navigate = useNavigate();

  const isSuperuser = checkSuperuser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div class="container text-center p-4">
      <div class="row">
        <div class="col">
          <div class="container-fluid border border-dark border-2 p-3 rounded">
            <div class="row">
              <div class="pb-3 pt-2 text-center">
                <b>Мій профіль</b>
              </div>
            </div>
            <div class="row">
              <div class="container text-center pb-2">
                <img
                  src={person_icon}
                  alt=""
                  width="20%"
                  height="20%"
                  class="img-fluid"
                />
              </div>
            </div>
            <div class="row">
              <div class="container text-center pb-2">
                <h3 class="text-center">
                  {user.first_name} {user.last_name}
                </h3>
              </div>
            </div>

            <div class="container py-3">
              <div class="row py-2">
                <div class="col">
                  <b>Пошта:</b>
                </div>
                <div class="col text-center">{user.email}</div>
              </div>
              <div class="row py-2">
                <div class="col">
                  <b>Телефон:</b>
                </div>
                <div class="col text-center">{user.phone}</div>
              </div>
              <div class="row py-2">
                <div class="col">
                  <b>Зареєстровано:</b>
                </div>
                <div class="col text-center">{user.created.slice(0, 10)}</div>
              </div>
            </div>

            {user.id === getUser().id && (
              <Button
                variant="primary"
                size="sm"
                className="w-30 text-center"
                onClick={() => navigate(`/profile/${user.id}/edit/`)}
              >
                Редагувати
              </Button>
            )}
          </div>
        </div>

        <div class="col md-auto">
          <div class="container-fluid border border-dark border-2 p-3 rounded">
            <div class="row">
              <div class="pb-3 pt-2 text-center">
                <b>Мої камери</b>
              </div>
            </div>
            <div class="row">
              <div class="container text-center pb-2">
                <img
                  src={cctv}
                  alt=""
                  width="20%"
                  height="20%"
                  class="img-fluid"
                />
              </div>
            </div>
            <div class="row">
              <div class="container text-center pb-2">
                <h3 class="text-center">Статистика</h3>
              </div>
            </div>

            <div class="container py-3">
              <div class="row py-2">
                <div class="col">
                  <b>Всього камер:</b>
                </div>
                <div class="col text-center">{user.total_cameras}</div>
              </div>
              <div class="row py-2">
                <div class="col">
                  <b>Всього номерів:</b>
                </div>
                <div class="col text-center">{user.total_license_plates}</div>
              </div>
              <div class="row py-2">
                <div class="col">
                  <b>Тарифний план:</b>
                </div>
                <div class="col text-center">
                  <a href={`/profile/${user.id}`}>Стандартний</a>
                </div>
              </div>
            </div>

            {user.id === getUser().id && (
              <Button
                variant="primary"
                size="sm"
                className="w-30 text-center"
                onClick={() => navigate(`/profile/${user.id}/cameras/`)}
              >
                Камери
              </Button>
            )}
          </div>
        </div>
        { isSuperuser && (
        <div class="container p-3">
            <Button onClick={() => navigate(`/profile/${user.id}/users/`)}>Адмін-панель</Button>
        </div> )}

      </div>
    </div>
  );
}

export default ProfileDetails;
