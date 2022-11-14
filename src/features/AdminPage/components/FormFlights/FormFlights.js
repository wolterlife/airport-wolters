import "./FormFlights.scss";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const FormFlights = ({updateFlights}) => {
  const token = localStorage.getItem("authToken")
  const navigate = useNavigate()
  const [isFormVisible, setFormVisible] = useState(false);
  const [planes, setPlanes] = useState([]);

  const [formTimeDepart, setTimeDepart] = useState("")
  const [formDateArrival, setDateArrival] = useState("")
  const [formNFlight, setNFlight] = useState("")
  const [formAirline, setAirline] = useState(0)
  const [formAirDepart, setAirDepart] = useState("")
  const [formAirDest, setAirDest] = useState("")
  const [formDateDepart, setDateDepart] = useState("")
  const [formTimeArrival, setTimeArrival] = useState("")
  const [formPlane, setPlane] = useState("")


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

  const saveData = async () => {
    const token = localStorage.getItem("authToken")
    await fetch("http://localhost:3000/flights", {
      method: 'POST',
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
          updateFlights()
        }, (errServer) => {
          console.log(errServer);
        }
      )
  }

  const changeSelector = v => {
    const selectInfo = v.target.value;
    setPlane(selectInfo);
    setAirline(planes.find(item => item.id === +selectInfo).airline.id)
  }

  const resPlanes = planes?.map(item => {
    return (
      <option value={item.id} key={item.id}>[{item.airline?.nameOfAirline}] #{item.id} - {item.model}</option>
    )
  })


  return (
    <>
      {!isFormVisible ?
        (<div className="topContainer">
          <button onClick={() => setFormVisible(true)} type="button" className="btn_form">Добавить рейс</button>
        </div>)
        :
        (<form>
          <div className="topLineForm">
            <p><b>Добавление рейса</b></p>
            <button onClick={() => setFormVisible(false)} className="closeButton">X</button>
          </div>
          <div className="form-group">
            <label htmlFor="inputNumFlight">Номер рейса</label>
            <input value={formNFlight} onChange={(v) => setNFlight(v.target.value)} type="text" className="form-control"
                   id="inputNumFlight" placeholder="SD***"/>
          </div>
          <div className="form-group">
            <label htmlFor="selectorAirline">Самолёт</label>
            <select value={formPlane} onChange={(v) => changeSelector(v)} className="form-control" id="selectorAirline">
              <option>-----</option>
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
              saveData()
            }} className="btn_form">Сохранить
            </button>
          </div>
        </form>)
      }
    </>
  )
}

export default FormFlights;
