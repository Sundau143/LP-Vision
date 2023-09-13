import React from "react";
import { useParams } from "react-router-dom";
import ProfileDetails from "../components/profile/ProfileDetails";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import TopNavbar from "../components/TopNavbar";
import Forbidden from "./errorPages/Forbidden";
import Unauthorized from "./errorPages/Unauthorized";
import NotFound from "./errorPages/NotFound";
import Spinner from "react-bootstrap/Spinner";
import { checkSuperuser } from "../hooks/user.actions";

function Profile() {
  const { profileId } = useParams();

  const { data: user, error } = useSWR(`/user/${profileId}/`, fetcher);

  console.log(user);

  const isSuperuser = checkSuperuser();

  if (error) {
    if (error.response?.status === 401) {
      return <Unauthorized></Unauthorized>;
    }
    if (error.response?.status === 403) {
      return <Forbidden></Forbidden>;
    }
    if (error.response?.status === 404) {
      return <NotFound></NotFound>;
    }
    return <div>Error loading data</div>;
  }

  if (!user) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <> 
      <TopNavbar>
        <Nav.Link href={`/profile/${profileId}/cameras/`}>Мої камери</Nav.Link>
        {isSuperuser && (
          <>
          <Nav.Link href={`/profile/${profileId}/users/`}>Всі користувачі</Nav.Link>
          <Nav.Link href={`/profile/${profileId}/all_cameras/`}>Всі камери</Nav.Link>
          </>
        )};
      </TopNavbar>

      <Row className="justify-content-evenly p-4">
        <Col sm={8}>
          <div class="p-2">
            <ProfileDetails user={user} />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Profile;
