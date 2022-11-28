import "./FormBuyTicket.scss"
import {useEffect, useState} from "react";

const FormBuyTicket = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setFlight] = useState(-1)
  const [isTicketBought, setTicketBought] = useState(false);
  const [date, setDate] = useState(" ")
  const [time, setTime] = useState(" ")
  const [formFIO, setFormFIO] = useState("")
  const [formPass, setFormPass] = useState("")
  const [numPlace, setNumPlace] = useState("__X")
  const [clientError, setClientErr] = useState("")

  const changeSelector = (v) => {
    const selectInfo = v.target.value;
    setFlight(selectInfo);
    console.log(selectInfo);
    setDate(flights.find(item => item.id === +selectInfo)?.dateDepart)
    setTime(flights.find(item => item.id === +selectInfo)?.timeDepart)
  }

  const buyTicketFoo = async () => {
    const token = localStorage.getItem("authToken")
    await fetch("http://localhost:3000/tickets", {
      method: 'POST',
      body: JSON.stringify({
        "FIO_pass": formFIO,
        "flight": selectedFlight,
        "login": localStorage.getItem("authToken"),
        "numPass": formPass,
      }),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.json())
      .then(result => {
          // if (result.msg) return setClientErr(result.msg);
          // setClientErr("");
          // setFormVisible(false);
          // clearFields();
          // updateTickets()
          console.log(result);
          if (result.msg) return setClientErr(result.msg);
          setNumPlace(result.numPlace)
          setTicketBought(true);
          setClientErr("")
        }, (errServer) => {
          console.log(errServer);
        }
      )
  }

  useEffect(() => {
    fetch("http://localhost:3000/flights")
      .then(res => res.json())
      .then((result) => {
        setFlights(result);
      }, (error) => {
        console.log(error)
      })
  }, []) // Flights

  const resFlights = flights.map(item => {
    return (
      <option key={item.id} value={item.id}>{item.flightNum}</option>
    )
  })

  function buyOtherTicket() {
    setTicketBought(false);
    setFormFIO("");
    setFormPass("");
    setNumPlace("__X");
  }

  return (
    <div className="formTicket">
      <div className="inputContainer topLeft">
        <p className="inputText">ФИО</p>
        <input disabled={isTicketBought} onChange={v => setFormFIO(v.target.value)} value={formFIO}
               className="inputField"/>
      </div>
      <div className="inputContainer topRight">
        <p className="inputText">Серия и № паспорта</p>
        <input disabled={isTicketBought} onChange={v => setFormPass(v.target.value)} value={formPass}
               className="inputField"/>
      </div>
      <div className="inputContainer centerLeft smallContainer">
        <p className="inputText">Номер места</p>
        <p className="placeNumber">{numPlace}</p>
      </div>
      {
        (isTicketBought) ?
          (
            <button disabled className="inputContainer centerRight smallContainer buttonBuy buttonBuyGreen">
              <p className="textBuy">Билет успешно куплен</p>
            </button>
          )
          :
          (<button onClick={() => buyTicketFoo()} className="inputContainer centerRight smallContainer buttonBuy">
            <p className="textBuy">Купить</p>
          </button>)
      }
      <p className="inputText textUnderline">Информация о рейсе</p>
      <div className="inputContainer bottomLeft">
        <p className="inputText">Рейс</p>
        <select disabled={isTicketBought} onChange={(v) => changeSelector(v)} className="inputField selectorFlights">
          <option value={-1}>--- Выбор рейса ---</option>
          {resFlights}
        </select>
      </div>
      <div className="inputContainer bottomCenter">
        <p className="inputText">Дата</p>
        <p className="inputField">{date}</p>
      </div>
      <div className="inputContainer bottomRight">
        <p className="inputText">Время</p>
        <p className="inputField">{time}</p>
      </div>
      {
        isTicketBought &&
        <button onClick={() => buyOtherTicket()} className="buttonPlus">
          <img className="buttonNewTicket" src="/img/plus.png" alt="Новый билет"/>
        </button>
      }
      {clientError && <p className="errorText">{clientError}</p>}
    </div>
  )
}

export default FormBuyTicket;
