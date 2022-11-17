import "./AdmTableFlights.scss"
import {useEffect, useState} from "react";

const AdmTableFlights = ({flights, updateFlights}) => {
  const [isPopUpVisible, setPopUpVisible] = useState(false)
  const token = localStorage.getItem("authToken");

  const [formTimeDepart, setTimeDepart] = useState("")
  const [formDateArrival, setDateArrival] = useState("")
  const [formNFlight, setNFlight] = useState("")
  const [formAirDepart, setAirDepart] = useState("")
  const [formAirDest, setAirDest] = useState("")
  const [formDateDepart, setDateDepart] = useState("")
  const [formTimeArrival, setTimeArrival] = useState("")
  const [formPlane, setPlane] = useState("")
  const [planes, setPlanes] = useState([]);
  const [formAirline, setAirline] = useState(-1)
  const [currentFlight, setCurrentFlight] = useState()


  useEffect(() => {
    fetch("http://localhost:3000/planes", {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then((result) => {
        setPlanes(result);
      }, (errServer) => {
        console.log(errServer);
      })
  }, []) // Planes

  const dellFlight = async id => {
    await fetch(`http://localhost:3000/flights/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        updateFlights();
      }, (errServer) => {
        console.log(errServer);
      })
  }

  const resPlanes = planes?.map(item => {
    return (
      <option value={item.id} key={item.id}>[{item.airline?.nameOfAirline}] #{item.id} - {item.model}</option>
    )
  })

  const changeSelector = v => {
    const selectInfo = v.target.value;
    setPlane(selectInfo);
    setAirline(planes.find(item => item.id === +selectInfo)?.airline?.id)
  }

  function preEditFlight(item) {
    setPopUpVisible(true)
    setNFlight(item.flightNum) // Заполнение формы для редактирования
    setAirDepart(item.airDepart)
    setAirDest(item.airDest)
    setAirline(item.airline.id)
    console.log(item.dateDepart)
    setDateDepart(item.dateDepart);
    setDateArrival(item.dateDest);
    setPlane(item.plane.id)
    setTimeDepart(item.timeDepart)
    setTimeArrival(item.timeDest)
    setCurrentFlight(item);
  }

  async function editFlight() {
    const token = localStorage.getItem("authToken")
    await fetch(`http://localhost:3000/flights/${currentFlight?.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        flightNum: formNFlight,
        airline: formAirline,
        airDepart: formAirDepart,
        airDest: formAirDest,
        dateDest: formDateArrival,
        timeDest: formTimeArrival,
        dateDepart: formDateDepart,
        timeDepart: formTimeDepart,
        plane: formPlane
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
          updateFlights()
        }, (errServer) => {
          console.log(errServer);
        }
      )
  }

  const resFlights = flights?.map(item => {
    let formatDateDepart = item.dateDepart.split("-");
    [formatDateDepart[0], formatDateDepart[2]] = [formatDateDepart[2], formatDateDepart[0]]
    formatDateDepart = formatDateDepart.join(".");

    let formatDateArrival = item.dateDest.split("-");
    [formatDateArrival[0], formatDateArrival[2]] = [formatDateArrival[2], formatDateArrival[0]]
    formatDateArrival = formatDateArrival.join(".");
    return (
      <tr key={item.id}>
        <td>{item.flightNum}</td>
        <td>{item.airline.nameOfAirline}</td>
        <td>{item.airDepart}</td>
        <td>{formatDateDepart}</td>
        <td>{item.timeDepart}</td>
        <td>{item.airDest}</td>
        <td>{formatDateArrival}</td>
        <td>{item.timeDest}</td>
        <td>{item.freePlaces}</td>
        <td>#{item.plane.id} {item.plane.model}</td>
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
          <th className="nameTable">Рейсы</th>
          <th>Авиакомпания</th>
          <th>Аэропорт отправления</th>
          <th>Дата отправления</th>
          <th>Время отправления</th>
          <th>Аэропорт прибытия</th>
          <th>Дата прибытия</th>
          <th>Время прибытия</th>
          <th>Свободных мест</th>
          <th>Самолёт</th>
          <th></th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {resFlights}
        </tbody>
      </table>
      {isPopUpVisible && (
        <div className="popUpEditFlight">
          <div className="content">
            <form>
              <div className="topLineForm">
                <p><b>Редактирование рейса {currentFlight?.flightNum}</b></p>
                <button onClick={() => setPopUpVisible(false)} className="closeButton">X</button>
              </div>
              <div className="form-group">
                <label htmlFor="inputNumFlight">Номер рейса</label>
                <input value={formNFlight} onChange={(v) => setNFlight(v.target.value)} type="text" className="form-control"
                       id="inputNumFlight" placeholder="SD***"/>
              </div>
              <div className="form-group">
                <label htmlFor="selectorAirline">Самолёт</label>
                <select value={formPlane} onChange={(v) => changeSelector(v)} className="form-control" id="selectorAirline">
                  <option value={-1}>-----</option>
                  {resPlanes}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6 firstErow">
                  <label htmlFor="inputAirDepart">Аэропорт отправления</label>
                  <input value={formAirDepart} onChange={(v) => setAirDepart(v.target.value)} type="text"
                         className="form-control" id="inputAirDepart"/>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputAirArrival">Аэропорт прибытия</label>
                  <input value={formAirDest} onChange={(v) => setAirDest(v.target.value)} type="text"
                         className="form-control" id="inputAirArrival"/>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6 firstErow">
                  <label htmlFor="inputDateDepart">Дата отправления</label>
                  <input value={formDateDepart} onChange={(v) => setDateDepart(v.target.value)} type="date"
                         className="form-control" id="inputDateDepart"/>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputTimeDepart">Время отправления</label>
                  <input value={formTimeDepart} onChange={(v) => setTimeDepart(v.target.value)} type="time"
                         className="form-control" id="inputTimeDepart"/>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6 firstErow">
                  <label htmlFor="inputDateArrival">Дата прибытия</label>
                  <input value={formDateArrival} onChange={(v) => setDateArrival(v.target.value)} type="date"
                         className="form-control" id="inputDateArrival"/>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputTimeArrival">Время прибытия</label>
                  <input value={formTimeArrival} onChange={(v) => setTimeArrival(v.target.value)} type="time"
                         className="form-control" id="inputTimeArrival"/>
                </div>
              </div>
              <div className="form-group col-md-4">
                <button onClick={(e) => {
                  e.preventDefault();
                  editFlight();
                }} className="btn_form">Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>)
      }
    </>
  )
}

export default AdmTableFlights
