import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import UpdateProfile from "../components/profile/UpdateProfile";
import { fetcher } from "../helpers/axios";
import Stack from "react-bootstrap/Stack";
import TopNavbar from "../components/TopNavbar";
import { Nav } from "react-bootstrap";

function EditProfile() {
  const { profileId } = useParams();

  const profile = useSWR(`/user/${profileId}/`, fetcher);

  console.log(profile)

  return profile.data ? (
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
            <h3 className="text-dark ">Редагування особистих даних</h3>
          </div>
        </div>
        <div className="row">
          <UpdateProfile profile={profile.data} mode="user"/>
        </div>
      </Stack>
    </>
  ) : (
    <div>Loading...</div>
  );
}

export default EditProfile;
