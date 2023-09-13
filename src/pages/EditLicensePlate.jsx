import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import UpdateLicensePlate from "../components/license_plate/UpdateLicensePlate";
import { fetcher } from "../helpers/axios";
import Stack from "react-bootstrap/Stack";
import TopNavbar from "../components/TopNavbar";
import { Nav } from "react-bootstrap";

function EditLicensePlate() {
  const { profileId, licensePlateId, cameraId } = useParams();

  const license_plate = useSWR(
    `/camera/${cameraId}/license_plate/${licensePlateId}/`,
    fetcher
  );

  console.log(license_plate.data)

  return license_plate.data ? (
    <>
      <TopNavbar>
        <Nav.Link href={`/profile/${profileId}/`}>Мій профіль</Nav.Link>
        <Nav.Link href={`/profile/${profileId}/cameras/`}>
          Список камер
        </Nav.Link>
      </TopNavbar>

      <Stack gap={3} className="col-md-5 mx-auto">
        <div className="container p-2"></div>
        <div className="container p-2">
          <div className="content text-center px-2">
            <h3 className="text-dark ">Редагування номерного знаку</h3>
          </div>
        </div>
        <div className="row">
          <UpdateLicensePlate license_plate={license_plate.data} />
        </div>
      </Stack>
    </>
  ) : (
    <div>Loading...</div>
  );
}

export default EditLicensePlate;
