import "./AdmTableTickets.scss"
import {useState} from "react";

const AdmTableTickets = ({flights, tickets, updateTickets}) => {
  const [isPopUpVisible, setPopUpVisible] = useState(false)
  const token = localStorage.getItem("authToken");

  const [formPassNum, setFormPassNum] = useState("");
  const [formNamePassenger, setNamePassenger] = useState("")
  const [formLogin, setLogin] = useState("")
  const [formFlight, setFlight] = useState("")
  const [currentTicket, setCurrentTicket] = useState()
  const [clientError, setClientErr] = useState("")


  const dellFlight = async id => {
    await fetch(`http://localhost:3000/tickets/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        updateTickets();
      }, (errServer) => {
        console.log(errServer);
      })
  }

  function preEditFlight(item) {
    setNamePassenger(item.FIO_pass) // / Заполнение формы для редактирования
    setFlight(item.flight.id)
    setLogin(item.login.login)
    setFormPassNum(item.numPass)
    setCurrentTicket(item);
    console.log(item)
    setPopUpVisible(true)
  }

  async function editTicket() {
    const token = localStorage.getItem("authToken")
    await fetch(`http://localhost:3000/tickets/${currentTicket?.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        "FIO_pass": formNamePassenger,
        "flight": formFlight,
        "login": formLogin,
        "numPass": formPassNum,
      }),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.json())
      .then(result => {
          console.log(result)
          setPopUpVisible(false)
          updateTickets()
        }, (errServer) => {
          console.log(errServer);
        }
      )
  }

  async function updateStatus(el, item) {
    console.log(el.target.textContent);
    let newStatus = "";
    switch (item.status) {
      case "Забронирован":
        el.target.classList = ("btn_edit btnGreen")
        newStatus = "Оплачен";
        break;
      case "Оплачен":
        newStatus = "Отменён";
        el.target.classList = ("btn_edit btnRed")
        break;
      case "Отменён":
        el.target.classList = ("btn_edit btn_additional")
        newStatus = "Забронирован";
        break;
      default:
        break;
    }
    await fetch(`http://localhost:3000/tickets/${item?.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        status: newStatus
      }),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.json())
      .then(result => {
          updateTickets()
        }, (errServer) => {
          console.log(errServer);
        }
      )
  }

  function clearFields() {
    setNamePassenger("")
    setFlight("")
    setFormPassNum("")
    setLogin("")
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

  const resTickets = tickets?.map(item => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.FIO_pass}</td>
        <td>{item.numPass}</td>
        <td>{item.login.login}</td>
        <td>{item.flight.flightNum}</td>
        <td>{item.numPlace}</td>
        <td><button onClick={(el) => updateStatus(el, item)} className={(item.status === "Оплачен") ? "btn_edit btnGreen" : (item.status === "Отменён") ? "btn_edit btnRed" : "btn_edit btn_additional"}>{item.status}</button></td>
        <td>
          <button onClick={() => preEditFlight(item)} className="btn_edit">Edit</button>
        </td>
        <td>
          <button onClick={() => dellFlight(item.id)} className="btn_edit btnRed">Delete</button>
        </td>
      </tr>
    )
  })



  return (
    <>
      <table>
        <thead>
        <tr>
          <th className="nameTable">Билеты</th>
          <th>ФИО</th>
          <th>Номер паспорта</th>
          <th>Пользователь</th>
          <th>Рейс</th>
          <th>Номер места</th>
          <th>Статус</th>
          <th></th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {resTickets}
        </tbody>
      </table>
      {isPopUpVisible && (
        <div className="popUpEditFlight">
          <div className="content">
            <form>
              <div className="topLineForm">
                <p><b>Редактирование билета</b></p>
                <button onClick={() => {
                  setPopUpVisible(false);
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
              <div className="form-row">
                <div className="form-group col-md-4">
                  <button onClick={(e) => {
                    e.preventDefault();
                    editTicket()
                  }} className="btn_form">Сохранить
                  </button>
                </div>
                {(clientError) && <p className="form-group col-md-6 textError">{clientError}</p>}
              </div>
            </form>
          </div>
        </div>)
      }
    </>
  )
}

export default AdmTableTickets
