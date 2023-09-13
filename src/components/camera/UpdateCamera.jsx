import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import edit_icon from "../../img/edit_icon.png";
import axiosService from "../../helpers/axios";
import { ToasterContext } from "../../components/ToasterProvider";
import { mutate } from "swr";
import { useParams } from "react-router-dom";

function UpdateCamera(props) {
  const toasterContext = React.useContext(ToasterContext);

  const { cameraId } = useParams();

  const { camera } = props;

  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState(camera);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updateLicensePlateForm = event.currentTarget;

    if (updateLicensePlateForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      owner: form.owner,
      name: form.name,
      model: form.model,
      location: form.location,
      status: form.status,
      broadcast: form.broadcast,
    };

        axiosService
        .patch(`/camera/${cameraId}/`, data)
        .then(() => {
          toasterContext.showToast(
            "Камеру оновлено!",
            "Камеру успішно оновлено 🚀",
            "success"
          );
          mutate(`/camera/${cameraId}/`);
          navigate(-1);
        })
        .catch((err) => {
          console.log(err);
          setError(err.request.response);
          toasterContext.showToast(
            "Помилка!",
            "При оновленні камери сталася помилка",
            "danger"
          );
        });
    }

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
              src={edit_icon}
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
                value={form.owner}
                onChange={(e) => setForm({ ...form, owner: e.target.value })}
                type="text"
                required
                placeholder="Введіть UUID нового власника"
                style={{ border: "none", background: "LightGray" }}
              />
              <Form.Control.Feedback type="invalid">
                Введіть коректний UUID
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                type="text"
                required
                placeholder="Введіть нову назву камери"
                style={{ border: "none", background: "LightGray" }}
              />
              <Form.Control.Feedback type="invalid">
                Введіть коректну назву
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
                type="text"
                required
                placeholder="Введіть нову модель"
                style={{ border: "none", background: "LightGray" }}
              />
              <Form.Control.Feedback type="invalid">
                Введіть коректну модель
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <div class="col">
            <Form.Group className="mb-3">
              <Form.Control
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                type="text"
                required
                placeholder="Введіть нову локацію"
                style={{ border: "none", background: "LightGray" }}
              />
              <Form.Control.Feedback type="invalid">
                Введіть коректну назву локації
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                required
                style={{ border: "none", background: "LightGray" }}
              >
                <option value="Онлайн" className="text-success">Онлайн</option>
                <option value="Офлайн" className="text-danger">Офлайн</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                value={form.broadcast}
                onChange={(e) =>
                  setForm({ ...form, broadcast: e.target.value })
                }
                type="text"
                required
                placeholder="Введіть новий ID трансляції"
                style={{ border: "none", background: "LightGray" }}
              />
              <Form.Control.Feedback type="invalid">
                Введіть коректний ID трансляції
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

export default UpdateCamera;
