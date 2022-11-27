import "./FormBuyTicket.scss"
import {useEffect, useState} from "react";

const FormBuyTicket = () => {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setFlight] = useState(-1)
  const [isTicketBought, setTicketBought] = useState(true);
  const [date, setDate] = useState(" ")
  const [time, setTime] = useState(" ")

  const changeSelector = (v) => {
    const selectInfo = v.target.value;
    setFlight(selectInfo);
    console.log(selectInfo);
    setDate(flights.find(item => item.id === +selectInfo)?.dateDepart)
    setTime(flights.find(item => item.id === +selectInfo)?.timeDepart)
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

  return (
    <div className="formTicket">
      <div className="inputContainer topLeft">
        <p className="inputText">ФИО</p>
        <input className="inputField"/>
      </div>
      <div className="inputContainer topRight">
        <p className="inputText">Серия и № паспорта</p>
        <input className="inputField"/>
      </div>
      <div className="inputContainer centerLeft smallContainer">
        <p className="inputText">Номер места</p>
        <p className="placeNumber">__X</p>
      </div>
        {
          (isTicketBought) ?
            (
              <button disabled className="inputContainer centerRight smallContainer buttonBuy buttonBuyGreen">
                <p className="textBuy">Билет успешно куплен</p>
              </button>
            )
            :
            (<button className="inputContainer centerRight smallContainer buttonBuy">
              <p className="textBuy">Купить</p>
            </button>)
        }
      <p className="inputText textUnderline">Информация о рейсе</p>
      <div className="inputContainer bottomLeft">
        <p className="inputText">Рейс</p>
        <select onChange={(v) => changeSelector(v)} className="inputField selectorFlights">
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
    </div>
  )
}

export default FormBuyTicket;
