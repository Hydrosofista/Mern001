import axios from "axios";
import { useState } from "react";
import Select from "./Select";
import config from "../config";
import "./Form.css";

const Form = () => {
  const [name, setName] = useState("");
  const [event, setEvent] = useState({ key: "", val: "" });
  const [city, setCity] = useState({ key: "", val: "" });
  const [errors, setErrors] = useState([]);

  const choicesEvents = [
    { value: "", text: "---" },
    { value: "front-end-react", text: "Front End - ReactJS" },
    { value: "back-end-react", text: "Back End - Node.js" },
    { value: "full-stack-react", text: "Full Stack - MERN" },
    { value: "tester-manual", text: "Tester Manualny" },
  ];

  const choiceCities = [
    { value: "", text: "---" },
    { value: "online", text: "Online" },
    { value: "warsaw", text: "Warszawa" },
    { value: "cracow", text: "Kraków" },
  ];

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeEvent = (e) => {
    setEvent({
      key: e.target.value,
      val: e.target.options[e.target.selectedIndex].text,
    });
  };

  const handleChangeCity = (e) => {
    setCity({
      key: e.target.value,
      val: e.target.options[e.target.selectedIndex].text,
    });
  };

  const validateForm = () => {
    const newErrors = [];
    if (!name) {
      newErrors.push("Imię i nazwisko jest wymagane.");
    }
    if (!event.key) {
      newErrors.push("Wybór wydarzenia jest wymagany.");
    }
    if (!city.key) {
      newErrors.push("Wybór miasta jest wymagany.");
    }
    return newErrors;
  };

  // handle submit /start
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);

    try {
      const response = await axios.post(`${config.apiUrl}/add`, {
        name,
        event: { key: event.key, val: event.val },
        city: { key: city.key, val: city.val },
      });

      // console.log("Form submitted successfully:", response.data);
      // alert("Zapis na szkolenie zakończony sukcesem!");
      window.location.reload();


      setName("");
      setEvent({ key: "", val: "" });
      setCity({ key: "", val: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors(["Wystąpił błąd podczas wysyłania formularza."]);
    }
  };
  // handle submit /end

  return (
    <div className="formWrapper">
      <form onSubmit={handleSubmit}>
        <div className="wrapper">
          <label htmlFor="name">Imię i Nazwisko</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleChangeName}
          />
        </div>
        <div className="wrapper">
          <label htmlFor="event">Wydarzenie</label>
          <Select
            id="event"
            values={choicesEvents}
            selectedValue={event.key}
            onValueChange={handleChangeEvent}
          />
        </div>
        <div className="wrapper">
          <label htmlFor="city">Miasto</label>
          <Select
            id="city"
            values={choiceCities}
            selectedValue={city.key}
            onValueChange={handleChangeCity}
          />
        </div>
        <div className="wrapper">
          <button type="submit">zapis na szkolenie</button>
        </div>
      </form>

      <div className="errorsWrapper">
        <ul className="errors">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Form;
