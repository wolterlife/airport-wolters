import "./AdmTablePlanes.scss"
import {useEffect, useState} from "react";

const AdmTablePlanes = ({planes, updatePlanes, airlines}) => {
  const [isPopUpVisible, setPopUpVisible] = useState(false)
  const [clientError, setClientErr] = useState("")
  const token = localStorage.getItem("authToken");

  const [formNumModel, setNumModel] = useState("")
  const [formAirline, setAirline] = useState(-1)
  const [formYearCreated, setYearCreated] = useState("")
  const [formTotalPlaces, setTotalPlaces] = useState("")
  const [formPlane, setPlane] = useState("")
  const [currentPlane, setCurrentPlane] = useState()


  const dellPlane = async id => {
    await fetch(`http://localhost:3000/planes/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        updatePlanes();
      }, (errServer) => {
        console.log(errServer);
      })
  }

  const changeSelector = v => {
    const selectInfo = v.target.value;
    setPlane(selectInfo);
    setAirline(planes.find(item => item.id === +selectInfo).id)
  }

  function preEditPlanes(item) {
    setPopUpVisible(true);
    setNumModel(item.model)
    setAirline(item.airline.id)
    setYearCreated(item.year)
    setTotalPlaces(item.totalPlaces)
    setCurrentPlane(item);
  }

  function clearFields() {
    setNumModel("")
    setAirline(0)
    setYearCreated("")
    setTotalPlaces("")
  }

  async function editPlanes() {
    const token = localStorage.getItem("authToken")
    await fetch(`http://localhost:3000/planes/${currentPlane?.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        model: formNumModel,
        airline: formAirline,
        year: formYearCreated,
        totalPlaces: formTotalPlaces,
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
          updatePlanes()
        }, (errServer) => {
          console.log(errServer);
        }
      )
  }

  const resAirlines = airlines?.map(item => {
    return (
      <option value={item.id} key={item.id}>{item.nameOfAirline}</option>
    )
  })

  const resPlanes = planes?.map(item => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.model}</td>
        <td>{item.airline?.nameOfAirline}</td>
        <td>{item.year}</td>
        <td>{item.totalPlaces}</td>
        <td>
          <button onClick={() => preEditPlanes(item)} className="btn_edit">Edit</button>
        </td>
        <td>
          <button onClick={() => dellPlane(item.id)} className="btn_edit btnRed">Delete</button>
        </td>
      </tr>
    )
  })



  return (
    <>
      <table>
        <thead>
        <tr>
          <th className="nameTable">Самолёты</th>
          <th>Модель</th>
          <th>Авиакомпания</th>
          <th>Год выпуска</th>
          <th>Кол-во мест</th>
          <th></th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {resPlanes}
        </tbody>
      </table>
      {isPopUpVisible && (
        <div className="popUpEditFlight">
          <div className="content">
            <form>
              <div className="topLineForm">
                <p><b>Редактирование самолёта {currentPlane.id}</b></p>
                <button onClick={() => {
                  setPopUpVisible(false);
                  setClientErr("");
                  clearFields();
                }} className="closeButton">X
                </button>
              </div>
              <div className="form-group">
                <label htmlFor="inputNumModel">Модель</label>
                <input value={formNumModel} onChange={(v) => setNumModel(v.target.value)} type="text" className="form-control"
                       id="inputNumModel" placeholder="BOEING-777"/>
              </div>
              <div className="form-group">
                <label htmlFor="selectorAirline">Авиакомпания</label>
                <select value={formAirline} onChange={(v) => changeSelector(v)} className="form-control" id="selectorAirline">
                  <option value={-1}>-----</option>
                  {resAirlines}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6 firstErow">
                  <label htmlFor="inputYearCreated">Год выпуска</label>
                  <input value={formYearCreated} onChange={(v) => setYearCreated(v.target.value)} type="text"
                         className="form-control" id="inputYearCreated"/>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputTotalPlaces">Вместимость самолёта</label>
                  <input value={formTotalPlaces} onChange={(v) => setTotalPlaces(v.target.value)} type="text"
                         className="form-control" id="inputTotalPlaces"/>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <button onClick={(e) => {
                    e.preventDefault();
                    editPlanes()
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

export default AdmTablePlanes
