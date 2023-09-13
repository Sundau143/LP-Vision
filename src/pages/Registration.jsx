import React from "react";
import Nav from 'react-bootstrap/Nav';
import RegistrationForm from "../components/authentication/RegistrationForm";
import Stack from 'react-bootstrap/Stack';
import TopNavbar from "../components/TopNavbar";

function Registration() {
  return (
    <>
    <TopNavbar>
      <Nav.Link href="/login/">Авторизація</Nav.Link>
    </TopNavbar>
    
  <Stack gap={3} className="col-md-5 mx-auto">
      <div className="container p-2"></div>
        <div className="container p-2">
          <div className="content text-center px-2">
            <h3 className="text-dark ">Зареєструйте новий акаунт</h3>
          </div>
        </div>
      <div className="row">
        <RegistrationForm />
      </div>
    </Stack>
    </>
  );
}

export default Registration;