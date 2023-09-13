import React from "react";
import { useParams } from "react-router-dom";
//import useSWR from "swr";
import CreateCamera from "../../components/camera/CreateCamera";
//import { fetcher } from "../../helpers/axios";
import Stack from "react-bootstrap/Stack";
import TopNavbar from "../../components/TopNavbar";
import { Nav } from "react-bootstrap";

function AddCamera() {
  const { profileId } = useParams();

  return (
    <>
      <TopNavbar>
        <Nav.Link href={`/profile/${profileId}/`}>Мій профіль</Nav.Link>
        <Nav.Link href={`/profile/${profileId}/users`}>
          Всі користувачі
        </Nav.Link>
        <Nav.Link href={`/profile/${profileId}/all_cameras/`}>
          Всі камери
        </Nav.Link>
      </TopNavbar>

      <Stack gap={3} className="col-md-5 mx-auto">
        <div className="container p-2"></div>
        <div className="container p-2">
          <div className="content text-center px-2">
            <h3 className="text-dark ">Додавання нової камери</h3>
          </div>
        </div>
        <div className="row">
          <CreateCamera />
        </div>
      </Stack>
    </>
  );
}

export default AddCamera;