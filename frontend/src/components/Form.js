import axios from 'axios';
import { useState } from 'react';
import Select from './Select';
import './Form.css';

const Form = () => {
  const [name, setName] = useState('')
  const [event, setEvent] = useState({key: '', val: ''})
  const [city, setCity] = useState({key: '', val: ''})
  const [errors, setErrors] = useState([])

  const choicesEvents = [
    ['','---'],
    ['front-end-react', 'Front End - ReactJS'],
    ['back-end-react', 'Back End - Node.js'],
    ['full-stack-react', 'Full Stack - MERN'],
    ['tester-manual', 'Tester Manualny']


  ]

const handleChangeEvent= (e) => {
  setEvent({
    key: e.target.value,
    val: e.target.options[e.target.selectedIndex].InnerText
    
  })
}

  return (
    <div className="formWrapper">
      <form action="#">
        <div className="wrapper">
          <label htmlFor="name">Imię i Nazwisko</label>
          <input type="text" id="name" />
        </div>
        <div className="wrapper">
          <label htmlFor="event">Wydarzenie</label>
          <Select
          values={choicesEvents}
          selectedValue={event.key}
          onValueChange={handleChangeEvent}
          />
        </div>
        <div className="wrapper">
          <label htmlFor="city">Miasto</label>
        </div>
        <div className="wrapper">
          <button type="submit">zapis na szkolenie</button>
        </div>

      </form>

      <div className="errorsWrapper">
        <ul className="errors"></ul>
      </div>

    </div>
  )
}

export default Form