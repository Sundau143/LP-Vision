import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import edit_icon from "../../img/edit_icon.png";
import axiosService from "../../helpers/axios";
import { ToasterContext } from "../ToasterProvider";
import { mutate } from 'swr';
import { useParams } from "react-router-dom"; 

function UpdateLicensePlate(props) {

  const toasterContext = React.useContext(ToasterContext);
  const { license_plate } = props;

  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState(license_plate);
  const [error, setError] = useState(null);

  const { cameraId, licensePlateId } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    const updateLicensePlateForm = event.currentTarget;

    if (updateLicensePlateForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      text: form.text,
      country: form.country,
      region: form.region,
    };

    axiosService
      .patch(`/camera/${cameraId}/license_plate/${licensePlateId}/`, data)
      .then(() => {
        toasterContext.showToast('Номерний знак оновлено!', 'Номерний знак успішно оновлено 🚀', 'success');
        mutate(`/camera/${cameraId}/license_plate/${licensePlateId}/`);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
        setError(err.request.response);
        toasterContext.showToast('Помилка!', 'При видаленні номерного знаку сталася помилка', 'danger');
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
                value={form.text}
                onChange={(e) =>
                  setForm({ ...form, text: e.target.value })
                }
                type="text"
                required
                placeholder="Введіть новий текст номерного знаку"
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
                placeholder="Введіть нову країну"
                style={{ border: "none", background: "LightGray" }}
              />
              <Form.Control.Feedback type="invalid">
                Введіть коректну країну
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                value={form.region}
                onChange={(e) => setForm({ ...form, region: e.target.value })}
                type="text"
                required
                placeholder="Введіть новий регіон"
                style={{ border: "none", background: "LightGray" }}
              />
              <Form.Control.Feedback type="invalid">
                Введіть коректний регіон
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

export default UpdateLicensePlate;
