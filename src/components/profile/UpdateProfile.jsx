import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import person_icon from "../../img/person.png";
import { useUserActions } from "../../hooks/user.actions";
import { ToasterContext } from "../ToasterProvider";

function UpdateProfile(props) {
  const { profile, mode } = props;

  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState(profile);
  const [error, setError] = useState(null);
  const userActions = useUserActions();

  const toasterContext = React.useContext(ToasterContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updateProfileForm = event.currentTarget;

    if (updateProfileForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      phone: form.phone,
      new_password: form.new_password,
      old_password: form.old_password, 
    };

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    });
    
    if (mode === "user") {
    userActions
      .edit(formData, profile.id)
      .then(() => {
        toasterContext.showToast(
          "Профіль оновлено",
          "Профіль успішно оновлено 🚀",
          "success"
        );
          navigate(-1);
      })
      .catch((err) => {
        if (err.message) {
          setError(err.request.response);
          toasterContext.showToast("Помилка!", error, "danger");
        }
      });
    } else if (mode === "admin") {
      userActions
      .update(formData, profile.id)
      .then(() => {
        toasterContext.showToast(
          "Профіль оновлено",
          "Профіль успішно оновлено 🚀",
          "success"
        );
          navigate(-1);
      })
      .catch((err) => {
        if (err.message) {
          setError(err.request.response);
          toasterContext.showToast("Помилка!", error, "danger");
        }
      });
    }
  };

  return (
    <>
      <Form
        id="update-profile-form"
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
                onChange={(e) =>
                  setForm({ ...form, first_name: e.target.value })
                }
                type="text"
                required
                placeholder="Введіть нове ім'я"
                style={{ border: "none", background: "LightGray" }}
              />
              <Form.Control.Feedback type="invalid">
                Введіть коректне ім'я
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                value={form.last_name}
                onChange={(e) =>
                  setForm({ ...form, last_name: e.target.value })
                }
                type="text"
                required
                placeholder="Введіть нове прізвище"
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
                type="email"
                required
                placeholder="Введіть новий e-mail"
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
                type="text"
                required
                placeholder="Введіть новий телефон"
                style={{ border: "none", background: "LightGray" }}
              />
              <Form.Control.Feedback type="invalid">
                Телефон є обов'язковим
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                value={form.old_password}
                onChange={(e) => setForm({ ...form, old_password: e.target.value })}
                type="password"
                placeholder="Введіть старий пароль"
                style={{ border: "none", background: "LightGray" }}
              />
              <Form.Control.Feedback type="invalid">
                Телефон є обов'язковим
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                value={form.new_password}
                onChange={(e) => setForm({ ...form, new_password: e.target.value })}
                type="password"
                placeholder="Введіть новий пароль"
                style={{ border: "none", background: "LightGray" }}
              />
              <Form.Control.Feedback type="invalid">
                Телефон є обов'язковим
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="text-content text-danger">
            {error && <p>{error}</p>}
          </div>

          <div className="text-center">
            <Button variant="primary" type="submit">
              Підтвердити
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
}

export default UpdateProfile;
