import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import lp_icon from "../../img/lp_icon.png";
import axiosService from "../../helpers/axios";
import { ToasterContext } from "../ToasterProvider";
import { mutate } from "swr";

function CreateLicensePlate(props) {
  const toasterContext = React.useContext(ToasterContext);
  const navigate = useNavigate();

  const cameraId = props.cameraId;

  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    camera: cameraId,
    text: "",
    region: "",
    country: "",
    file: null, // добавлено поле для хранения загруженного файла
  });
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const createLicensePlateForm = event.currentTarget;

    if (createLicensePlateForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const data = new FormData(); // создаем объект FormData для отправки файла
    data.append("camera", form.camera);
    data.append("text", form.text);
    data.append("country", form.country);
    data.append("region", form.region);
    data.append("file", form.file); // добавляем загруженный файл в FormData

    axiosService
      .post(`/camera/${form.camera}/license_plate/`, data, {
        headers: {
          "Content-Type": "multipart/form-data", // устанавливаем правильный заголовок Content-Type
        },
      })
      .then(() => {
        toasterContext.showToast(
          "Номерний знак створено!",
          "Номерний знак успішно створено 🚀",
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
          "При створенні номерного знаку сталася помилка",
          "danger"
        );
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setForm({ ...form, file });
  };

  return (
    <>
      <Form
        id="create-license-plate-form"
        className="border border-dark border-2 p-4 rounded"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <div className="row">
          <div className="container text-center pb-4">
            <img
              src={lp_icon}
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
                value={form.camera}
                onChange={(e) =>
                  setForm({ ...form, camera: e.target.value })
                }
                type="text"
                required
                placeholder="Введіть UUID камери"
                style={{ border: "none", background: "LightGray" }}
              />
              <Form.Control.Feedback type="invalid">
                Введіть коректний UUID
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                type="text"
                required
                placeholder="Введіть текст номерного знаку"
                style={{ border: "none", background: "LightGray" }}
              />
              <Form.Control.Feedback type="invalid">
                Введіть коректний текст
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                value={form.country}
                onChange={(e) =>
                  setForm({ ...form, country: e.target.value })
                }
                type="text"
                required
                placeholder="Введіть країну"
                style={{ border: "none", background: "LightGray" }}
              />
              <Form.Control.Feedback type="invalid">
                Введіть коректну країну
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                value={form.region}
                onChange={(e) =>
                  setForm({ ...form, region: e.target.value })
                }
                type="text"
                required
                placeholder="Введіть регіон"
                style={{ border: "none", background: "LightGray" }}
              />
              <Form.Control.Feedback type="invalid">
                Введіть коректний регіон
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Виберіть файл зображення
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

export default CreateLicensePlate;
