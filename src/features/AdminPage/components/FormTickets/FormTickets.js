import "./FormTickets.scss";
import {useState} from "react";

const FormTickets = ({updateTickets, flights}) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [clientError, setClientErr] = useState("")
  const [formPassNum, setFormPassNum] = useState("");
  const [formStatus, setFormStatus] = useState("Забронирован");
  const [formNamePassenger, setNamePassenger] = useState("")
  const [formLogin, setLogin] = useState("")
  const [formFlight, setFlight] = useState("")

  function clearFields() {
    setNamePassenger("")
    setFlight("")
    setFormPassNum("")
    setLogin("")
    setFormStatus("Забронирован")
  }

  const saveData = async () => {
    const token = localStorage.getItem("authToken")
    await fetch("http://localhost:3000/tickets", {
      method: 'POST',
      body: JSON.stringify({
        "FIO_pass": formNamePassenger,
        "flight": formFlight,
        "login": formLogin,
        "status": formStatus,
        "numPass": formPassNum
      }),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.json())
      .then(result => {
          if (result.msg) return setClientErr(result.msg);
          setClientErr("");
          setFormVisible(false);
          clearFields();
          updateTickets()
        }, (errServer) => {
          console.log(errServer);
        }
      )
  }

  const changeSelector = v => {
    const selectInfo = v.target.value;
    setFlight(flights.find(item => item.id === +selectInfo).id)
  }

  const resFlights = flights?.map(item => {
    return (
      <option value={item.id} key={item.id}>{item.flightNum} - {item.airline.nameOfAirline} || места - {item.freePlaces} ||</option>
    )
  })


  return (
    <>
      {!isFormVisible ?
        (<div className="topContainer">
          <button onClick={() => setFormVisible(true)} type="button" className="btn_form">Создать билет</button>
        </div>)
        :
        (<form>
          <div className="topLineForm">
            <p><b>Создание билета</b></p>
            <button onClick={() => {
              setFormVisible(false);
              setClientErr("");
              clearFields();
            }} className="closeButton">X
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="inputNamePassenger">ФИО пассажира</label>
            <input value={formNamePassenger} onChange={(v) => setNamePassenger(v.target.value)} type="text" className="form-control"
                   id="inputNamePassenger"/>
          </div>
          <div className="form-group">
            <label htmlFor="selectorFlight">Рейс</label>
            <select value={formFlight} onChange={(v) => changeSelector(v)} className="form-control" id="selectorFlight">
              <option value={-1}>-----</option>
              {resFlights}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="inputLoginFormTicket">Логин пользователя</label>
            <input value={formLogin} onChange={(v) => setLogin(v.target.value)} type="text" className="form-control"
                   id="inputLoginFormTicket"/>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassNum">Номер паспорта</label>
            <input value={formPassNum} onChange={(v) => setFormPassNum(v.target.value)} type="text" className="form-control"
                   id="inputPassNum"/>
          </div>
          <div className="form-group">
            <div className="form-check">
              <input onChange={() => setFormStatus("Забронирован")} value="Забронирован" className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked/>
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Забронирован
              </label>
            </div>
            <div className="form-check">
              <input onChange={() => setFormStatus("Оплачен")} value="Оплачен" className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Оплачен
              </label>
            </div>
            <div className="form-check">
              <input onChange={() => setFormStatus("Отменён")} value="Отменён" className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                <label className="form-check-label" htmlFor="flexRadioDefault3">
                  Отменён
                </label>
            </div>

          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <button onClick={(e) => {
                e.preventDefault();
                saveData()
              }} className="btn_form">Сохранить
              </button>
            </div>
            {(clientError) && <p className="form-group col-md-6 textError">{clientError}</p>}
          </div>
        </form>)
      }
    </>
  )
}

export default FormTickets;
