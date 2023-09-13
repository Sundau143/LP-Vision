import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useUserActions } from "../../hooks/user.actions";
import person_icon from "../../img/person.png";
import { ToasterContext } from "../ToasterProvider";

function RegistrationForm() {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    confirm_password: ""
  });
  const [error, setError] = useState(null);
  const userActions = useUserActions();

  const toasterContext = React.useContext(ToasterContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const registrationForm = event.currentTarget;

    if (registrationForm.checkValidity() === false) {
      event.stopPropagation();
    }

    if (form.password !== form.confirm_password) {
      setError("Паролі не співпадають");
      setValidated(true);
      toasterContext.showToast("Помилка!", error, "danger");
      return;
    }

    setValidated(true);

    const data = {
      username: form.username,
      password: form.password,
      email: form.email,
      first_name: form.first_name,
      last_name: form.last_name,
      phone: form.phone,
      confirm_password: form.confirm_password
    };

    userActions
      .register(data)
      .then(() => {
        toasterContext.showToast(
          "Зареєстровано",
          "Реєстрація пройшла успішно 🚀",
          "success"
        );
      })
      .catch((err) => {
        if (err.message) {
          setError(err.request.response);
          toasterContext.showToast("Помилка!", error, "danger");
        }
      });
  };

  return (
    <Form
      id="registration-form"
      className="border border-dark border-2 p-4 rounded"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <div class="row">
        <div class="container text-center pb-4">
          <img
            src={person_icon}
            alt=""
            width="15%"
            height="15%"
            class="img-fluid"
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <Form.Group className="mb-3">
            <Form.Control
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              required
              type="text"
              placeholder="Введіть ім'я"
              style={{ border: "none", background: "LightGray" }}
            />
            <Form.Control.Feedback type="invalid">
              Введіть коректне ім'я
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              required
              type="text"
              placeholder="Введіть прізвище"
              style={{ border: "none", background: "LightGray" }}
            />
            <Form.Control.Feedback type="invalid">
              Введіть коректне прізвище
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              type="email"
              placeholder="Введіть e-mail"
              style={{ border: "none", background: "LightGray" }}
            />
            <Form.Control.Feedback type="invalid">
              Введіть коректний e-mail
            </Form.Control.Feedback>
          </Form.Group>
        </div>

        <div class="col">
          <Form.Group className="mb-3">
            <Form.Control
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              type="text"
              placeholder="Введіть телефон"
              style={{ border: "none", background: "LightGray" }}
            />
            <Form.Control.Feedback type="invalid">
              Телефон є обов'язковим
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              value={form.password}
              minLength="8"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              type="password"
              placeholder="Введіть пароль"
              style={{ border: "none", background: "LightGray" }}
            />
            <Form.Control.Feedback type="invalid">
              Введіть коректний пароль
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              value={form.confirm_password}
              minLength="8"
              onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
              type="password"
              placeholder="Повторіть пароль"
              style={{ border: "none", background: "LightGray" }}
            />
            <Form.Control.Feedback type="invalid">
              Введіть коректний пароль
            </Form.Control.Feedback>
          </Form.Group>
        </div>

        <div className="text-content text-danger">
          {error && <p>{error}</p>}
        </div>

        <div className="text-center">
          <Button variant="primary" type="submit">
            Надіслати
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default RegistrationForm;
