import {useEffect, useState} from "react";
import "./ShowTickets.scss"

const ShowTickets = () => {
  const [tickets, setTickets] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/tickets/${localStorage.getItem("login")}?method=by-user`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${localStorage.getItem("authToken")}`
      },
    })
      .then(res => res.json())
      .then((result) => {
        setTickets(result);
      }, (error) => {
        console.log(error)
      })
  }, [])

  const resTickets = tickets?.map(item => {
    console.log(item);
    return (
      <div key={item.id} className="formShowTicket">
        <div className="inputContainer topLeft">
          <p className="inputText">ФИО</p>
          <input disabled value={item.FIO_pass}
                 className="inputField"/>
        </div>
        <div className="inputContainer topRight">
          <p className="inputText">Серия и № паспорта</p>
          <input disabled value={item.numPass}
                 className="inputField"/>
        </div>
        <div className="inputContainer centerLeft smallContainer">
          <p className="inputText">Номер места</p>
          <p className="placeNumber">{item.numPlace}</p>
        </div>
        <div className="inputContainer centerRight buttonBuy">
          <p className="inputText">Статус</p>
          <p className="placeNumber"><b>{item.status}</b></p>
        </div>
        <p className="inputText textUnderline">Информация о рейсе</p>
        <div className="inputContainer bottomLeft">
          <p className="inputText">Рейс</p>
          <select disabled className="inputField selectorFlights">
            <option value={-1}>{item.flight.flightNum}</option>
          </select>
        </div>
        <div className="inputContainer bottomCenter">
          <p className="inputText">Дата</p>
          <p className="inputField">{item.flight.dateDepart}</p>
        </div>
        <div className="inputContainer bottomRight">
          <p className="inputText">Время</p>
          <p className="inputField">{item.flight.timeDepart}</p>
        </div>
      </div>
    )
  })

  return (
    <div>
      {resTickets}
    </div>
  )
}

export default ShowTickets;
