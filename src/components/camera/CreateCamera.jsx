import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import cctv_camera from "../../img/cctv_camera.png";
import axiosService from "../../helpers/axios";
import { ToasterContext } from "../ToasterProvider";
import { mutate } from "swr";

function CreateCamera(props) {
  const toasterContext = React.useContext(ToasterContext);
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    owner: "",
    name: "",
    model: "",
    location: "",
    status: "Офлайн",
    broadcast: "",
  });

  //const cameraId = useParams();

  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updateProfileForm = event.currentTarget;

    if (updateProfileForm.checkValidity() === false) {
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
      .post(`/camera/`, data)
      .then(() => {
        toasterContext.showToast(
          "Камеру створено!",
          "Камеру успішно створено 🚀",
          "success"
        );
        mutate(`/camera/`);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
        setError(err.request.response);
        toasterContext.showToast(
          "Помилка!",
          "При створенні камери сталася помилка",
          "danger"
        );
      });
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
        <div className="row">
          <div className="container text-center pb-4">
            <img
              src={cctv_camera}
              alt=""
              width="15%"
              height="15%"
              className="img-fluid"
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Form.Group className="mb-3">
              <Form.Control
                value={form.owner}
                onChange={(e) => setForm({ ...form, owner: e.target.value })}
                type="text"
                required
                placeholder="Введіть UUID власника"
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
                placeholder="Введіть назву камери"
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
                placeholder="Введіть модель"
                style={{ border: "none", background: "LightGray" }}
              />
              <Form.Control.Feedback type="invalid">
                Введіть коректну модель
              </Form.Control.Feedback>
            </Form.Group>
          </div>

          <div className="col">
            <Form.Group className="mb-3">
              <Form.Control
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                type="text"
                required
                placeholder="Введіть локацію"
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
                <option value="Офлайн" className="text-danger">
                  Офлайн
                </option>
                <option value="Онлайн" className="text-success">
                  Онлайн
                </option>
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
                placeholder="Введіть ID трансляції"
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

export default CreateCamera;
