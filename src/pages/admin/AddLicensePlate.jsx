import React from "react";
import { useParams } from "react-router-dom";
import CreateLicensePlate from "../../components/license_plate/CreateLicensePlate";
import Stack from "react-bootstrap/Stack";
import TopNavbar from "../../components/TopNavbar";
import { Nav } from "react-bootstrap";

function AddLicensePlate() {
  const { profileId, cameraId } = useParams();

  console.log(cameraId);

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
            <h3 className="text-dark ">Додавання нового номерного знаку</h3>
          </div>
        </div>
        <div className="row">
          <CreateLicensePlate cameraId={cameraId} />
        </div>
      </Stack>
    </>
  );
}

export default AddLicensePlate;