import "./FormAirlines.scss";
import {useState} from "react";

const FormAirlines = ({updateAirlines, airlines}) => {
  const [isFormVisible, setFormVisible] = useState(false);
  const [clientError, setClientErr] = useState("")

  const [formNameAirline, setNameAirline] = useState("")
  const [formCity, setCity] = useState("")

  function clearFields() {
    setNameAirline("")
    setCity("")
  }

  const saveData = async () => {
    const token = localStorage.getItem("authToken")
    await fetch("http://localhost:3000/airlines", {
      method: 'POST',
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
          if (result.msg) return setClientErr(result.msg);
          setClientErr("");
          setFormVisible(false);
          clearFields();
          updateAirlines()
        }, (errServer) => {
          console.log(errServer);
        }
      )
  }

  return (
    <>
      {!isFormVisible ?
        (<div className="topContainer">
          <button onClick={() => setFormVisible(true)} type="button" className="btn_form">Добавить авиалинию</button>
        </div>)
        :
        (<form>
          <div className="topLineForm">
            <p><b>Добавление авиалинии</b></p>
            <button onClick={() => {
              setFormVisible(false);
              setClientErr("");
              clearFields();
            }} className="closeButton">X
            </button>
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

export default FormAirlines;
