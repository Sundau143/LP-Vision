import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button } from "react-bootstrap";
import { useUserActions, getUser } from "../hooks/user.actions";
import ukraine from "../img/ukraine.png";
import gb from "../img/flag-united-kingdom.png";
import lp_logo from "../img/LP_logo.png";
import { useState } from "react";

const TopNavbar = ({ children }) => {
  const navigate = useNavigate();

  const userActions = useUserActions();

  const handleLogout = () => {
    userActions.logout();
  };

  const user = getUser();
  const isAuthenticated = !!user;

  const [selectedLanguage, setSelectedLanguage] = useState("UKR"); // Изначально выбран Украинский

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img src={lp_logo} width="64" height="26" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate(-1)}>❮ Назад</Nav.Link>
            {children}
          </Nav>
          <Nav>
            <NavDropdown
              title={
                <img
                  src={selectedLanguage === "UKR" ? ukraine : gb}
                  width="30"
                  height="30"
                  alt=""
                />
              }
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item onClick={() => handleLanguageChange("UKR")}>
                <img src={ukraine} width="30" height="30" alt="" /> UKR
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleLanguageChange("EN")}>
                <img src={gb} width="30" height="30" alt="" /> EN
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {isAuthenticated && ( // Render the button only if the user is authenticated
            <Button variant="danger" className="align-middle text-center" onClick={handleLogout}>
              Вихід
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
