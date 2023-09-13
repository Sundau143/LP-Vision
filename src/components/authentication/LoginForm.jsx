import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useUserActions } from "../../hooks/user.actions";
import person_icon from "../../img/person.png";
import { ToasterContext } from "../ToasterProvider";

function LoginForm() {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const userActions = useUserActions();

  const toasterContext = React.useContext(ToasterContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginForm = event.currentTarget;

    if (loginForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      email: form.email,
      password: form.password,
    };

    userActions.login(data).then(
      () => {
        toasterContext.showToast(
          "Авторизовано",
          "Авторизація пройшла успішно 🚀",
          "success"
        );
      }
    ).catch((err) => {
      if (err.message) {
        setError(err.request.response);
        toasterContext.showToast("Помилка!", error, "danger");
      }
    });
  };

  return (
    <Form
      id="login-form"
      className="border border-dark border-2 p-4 rounded"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3 border-solid border-dark">
        <div class="container text-center pb-4">
          <img
            src={person_icon}
            alt=""
            width="20%"
            height="20%"
            class="img-fluid"
          />
        </div>
        <Form.Control
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          type="text"
          placeholder="Електронна пошта"
          style={{ border: "none", background: "LightGray" }}
        />
        <Form.Control.Feedback type="invalid">
          Введіть коректний email
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          value={form.password}
          minLength="8"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          type="password"
          placeholder="Пароль"
          style={{ border: "none", background: "LightGray" }}
        />
        <Form.Control.Feedback type="invalid">
          Введіть коректний пароль
        </Form.Control.Feedback>
      </Form.Group>

      <div className="text-content text-danger">{error && <p>{error}</p>}</div>

      <div className="text-center">
        <Button variant="primary" type="submit">
          Надіслати
        </Button>
      </div>
    </Form>
  );
}

export default LoginForm;
