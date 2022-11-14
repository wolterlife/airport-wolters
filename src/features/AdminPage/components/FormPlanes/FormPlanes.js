import "./FormPlanes.scss";
import {useState} from "react";

const FormPlanes = ({updatePlanes, airlines}) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [clientError, setClientErr] = useState("")

  const [formNumModel, setNumModel] = useState("")
  const [formAirline, setAirline] = useState(-1)
  const [formYearCreated, setYearCreated] = useState("")
  const [formTotalPlaces, setTotalPlaces] = useState("")
  const [formPlane, setPlane] = useState("")


  function clearFields() {
    setNumModel("")
    setAirline(0)
    setYearCreated("")
    setTotalPlaces("")
  }

  const saveData = async () => {
    const token = localStorage.getItem("authToken")
    await fetch("http://localhost:3000/planes", {
      method: 'POST',
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
          if (result.msg) return setClientErr(result.msg);
          setClientErr("");
          setFormVisible(false);
          clearFields();
          updatePlanes()
        }, (errServer) => {
          console.log(errServer);
        }
      )
  }

  const changeSelector = v => {
    const selectInfo = v.target.value;
    setPlane(selectInfo);
    setAirline(airlines.find(item => item.id === +selectInfo).id)
  }

  const resAirlines = airlines?.map(item => {
    return (
      <option value={item.id} key={item.id}>{item.nameOfAirline}</option>
    )
  })


  return (
    <>
      {!isFormVisible ?
        (<div className="topContainer">
          <button onClick={() => setFormVisible(true)} type="button" className="btn_form">Добавить самолёт</button>
        </div>)
        :
        (<form>
          <div className="topLineForm">
            <p><b>Добавление самолёта</b></p>
            <button onClick={() => {
              setFormVisible(false);
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

export default FormPlanes;
