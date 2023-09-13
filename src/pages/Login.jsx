import React from "react";
import LoginForm from "../components/authentication/LoginForm";
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Stack';
import TopNavbar from "../components/TopNavbar";

function Login() {
  return (
    <>
    <TopNavbar>
      <Nav.Link href="/register/">Реєстрація</Nav.Link>
    </TopNavbar>

    <Stack gap={3} className="col-md-4 mx-auto">
      <div className="container p-2"></div>
        <div className="container p-2">
          <div className="content text-center px-2">
            <h3 className="text-dark ">Авторизуйтесь в своєму акаунті</h3>
          </div>
        </div>
      <div className="row">
        <LoginForm />
      </div>
    </Stack>
    </>
  );
}

export default Login;