import "./AdmTableAirlines.scss"
import {useEffect, useState} from "react";



const AdmTableAirlines = ({airlines, updateAirlines}) => {
  const [isPopUpVisible, setPopUpVisible] = useState(false)
  const [isPopUpPlanesVisible, setPopUpPlanesVisible] = useState(false)
  const token = localStorage.getItem("authToken");
  const [clientError, setClientErr] = useState("")
  const [formNameAirline, setNameAirline] = useState("")
  const [formCity, setCity] = useState("")
  const [currentAirline, setCurrentAirline] = useState()


  const dellAirline = async id => {
    await fetch(`http://localhost:3000/airlines/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        updateAirlines();
      }, (errServer) => {
        console.log(errServer);
      })
  }

  function showPlanes(item) {
    setPopUpPlanesVisible(true)
    setCurrentAirline(item);
  }

  function preEditFlight(item) {
    console.log(item);
    setPopUpVisible(true)
    setNameAirline(item.nameOfAirline) // Заполнение формы для редактирования
    setCity(item.office)
    setCurrentAirline(item);
  }
  async function editAirline() {
    const token = localStorage.getItem("authToken")
    await fetch(`http://localhost:3000/airlines/${currentAirline?.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        nameOfAirline: formNameAirline,
        office: formCity,
      }),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.json())
      .then(result => {
          if (result.msg) return setClientErr(result.msg)
          setPopUpVisible(false)
          updateAirlines()
        }, (errServer) => {
          console.log(errServer);
        }
      )
  }

  const resPlanes = currentAirline?.planes.map(item => {
    return (
      <p key={item.id}>ID: {item.id} || Модель: {item.model} ({item.year})</p>
    )
  })

  const resAirlines = airlines?.map(item => {
    return (
      <tr key={item.id}>
        <td>{item.nameOfAirline}</td>
        <td>{item.office}</td>
        <td>
          <button onClick={() => showPlanes(item)} className="btn_edit btn_additional">Показать список</button>
        </td>
        <td>
          <button onClick={() => preEditFlight(item)} className="btn_edit">Edit</button>
        </td>
        <td>
          <button onClick={() => dellAirline(item.id)} className="btn_edit btnRed">Delete</button>
        </td>
      </tr>
    )
  })


  return (
    <>
      <table>
        <thead>
        <tr>
          <th className="nameTable">Авиалинии</th>
          <th>Главный офис</th>
          <th>Самолёты</th>
          <th></th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {resAirlines}
        </tbody>
      </table>
      {isPopUpVisible && (
        <div className="popUpEditFlight">
          <div className="content">
            <form>
              <div className="topLineForm">
                <p><b>Изменение {currentAirline?.nameOfAirline}</b></p>
                <button onClick={() => {setPopUpVisible(false); setClientErr("")}} className="closeButton">X</button>
              </div>
              <div className="form-group">
                <label htmlFor="inputNameAirline">Название</label>
                <input value={formNameAirline} onChange={(v) => setNameAirline(v.target.value)} type="text" className="form-control"
                       id="inputNameAirline"/>
              </div>
              <div className="form-group">
                <label htmlFor="inputCity">Расположение главного офиса</label>
                <input value={formCity} onChange={(v) => setCity(v.target.value)} type="text" className="form-control"
                       id="inputCity" placeholder="Минск"/>
              </div>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <button onClick={(e) => {
                    e.preventDefault();
                    editAirline()
                  }} className="btn_form">Сохранить
                  </button>
                </div>
                {(clientError) && <p className="form-group col-md-6 textError">{clientError}</p>}
              </div>
            </form>
          </div>
        </div>)
      }
      {isPopUpPlanesVisible && (
        <div className="popUpEditFlight">
          <div className="content">
            <form>
              <div className="topLineForm">
                <p><b>Список самолётов {currentAirline.nameOfAirline}</b></p>
                <button onClick={() => {setPopUpPlanesVisible(false); setClientErr("")}} className="closeButton">X</button>
              </div>
              {resPlanes}
            </form>
          </div>
        </div>)
      }
    </>
  )
}

export default AdmTableAirlines
