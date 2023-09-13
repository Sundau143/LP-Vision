import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import UpdateCamera from "../../components/camera/UpdateCamera";
import { fetcher } from "../../helpers/axios";
import Stack from "react-bootstrap/Stack";
import TopNavbar from "../../components/TopNavbar";
import { Nav } from "react-bootstrap";

function EditCamera() {
  const { profileId, cameraId } = useParams();

  const camera = useSWR(
    `/camera/${cameraId}/`,
    fetcher
  );

  console.log(camera.data)

  return camera.data ? (
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
            <h3 className="text-dark ">Редагування камери</h3>
          </div>
        </div>
        <div className="row">
          <UpdateCamera camera={camera.data} mode={"update"} />
        </div>
      </Stack>
    </>
  ) : (
    <div>Loading...</div>
  );
}

export default EditCamera;
