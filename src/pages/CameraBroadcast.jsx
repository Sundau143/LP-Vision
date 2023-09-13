import React from "react";
import TopNavbar from "../components/TopNavbar";
import { Nav } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import Forbidden from './errorPages/Forbidden';
import Unauthorized from "./errorPages/Unauthorized";
import NotFound from "./errorPages/NotFound";
import { checkSuperuser } from "../hooks/user.actions";

const CameraBroadcast = () =>{
  const { profileId, cameraId } = useParams();

  const { data, error } = useSWR(`/camera/${cameraId}/`, fetcher);

  const isSuperuser = checkSuperuser();

  console.log(data)

  const onReady = (event) => {
    const player = event.target;
    player.pauseVideo();
  };

  const opts = {
    width: '800',
    height: '450',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  if (error) {
    if (error.response?.status === 401) {
        return <Forbidden></Forbidden>;
      }
    if (error.response?.status === 403) {
        return <Unauthorized></Unauthorized>;
      }
      if (error.response?.status === 404) {
        return <NotFound></NotFound>
      }
    return <div>Error loading data</div>;
  }

  if (!data) {
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
          </>
        )};
      </TopNavbar>
      <div class="container text-center px-4">
        <div class="row p-4">
          <div class="col col-4 text-center">
            <Badge bg="primary">
              <h2>{data.name}</h2>
            </Badge>
          </div>
          <div class="col col-8 text-center">
            <h2>Трансляція з камери</h2>
          </div>
        </div>
        <div class="container-fluid">
          <YouTube videoId="" opts={opts} onReady={onReady} />
        </div>
      </div>
    </>
  );
}

export default CameraBroadcast;
