import "./TableFlights.css"
import {useEffect, useState} from "react";

const TableFlights = () => {
  const [flights, setFlights] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [serverError, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/flights")
      .then(res => res.json())
      .then((result) => {
        setIsLoaded(true);
        setFlights(result);
      }, (error) => {
        setIsLoaded(true);
        setError(error);
      })
  },[])

  const res = flights?.map(item => {
    let formatDateDepart = item.dateDepart.split("-");
    [formatDateDepart[0], formatDateDepart[2]] = [formatDateDepart[2], formatDateDepart[0]]
    formatDateDepart = formatDateDepart.join(".");

    let formatDateArrival = item.dateDest.split("-");
    [formatDateArrival[0], formatDateArrival[2]] = [formatDateArrival[2], formatDateArrival[0]]
    formatDateArrival = formatDateArrival.join(".");
    return (
        <div key={item.id} className="row rowResult">
          <div className="col-2 align-text clrStyl colRes">
            <p className="container__text">
              {item.flightNum}
            </p>
          </div>
          <div className="col-2 align-text clrStyl colRes">
            <p className="container__text">
              {item.airline.nameOfAirline}
            </p>
          </div>
          <div className="col align-text clrStyl colRes">
            <p className="container__text">
              {item.airDepart}
            </p>
          </div>
          <div className="col align-text clrStyl colRes">
            <p className="container__text">
              {formatDateDepart}
            </p>
          </div>
          <div className="col align-text clrStyl colRes">
            <p className="container__text">
              {item.timeDepart}
            </p>
          </div>
          <div className="col align-text clrStyl colRes">
            <p className="container__text">
              {item.airDest}
            </p>
          </div>
          <div className="col align-text clrStyl colRes">
            <p className="container__text">
              {formatDateArrival}
            </p>
          </div>
          <div className="col align-text clrStyl colRes">
            <p className="container__text">
              {item.timeDest}
            </p>
          </div>
        </div>
    )
  })

  return (
    <div>
      {isLoaded ? (<div className="table__container text-center">
        <div className="row">
          <div className="col-2 circleBorderTop align-text">
            <p className="container__text">
              Номер рейса
            </p>
          </div>
          <div className="col-2 circleBorderTop align-text">
            <p className="container__text">
              Авиакомпания
            </p>
          </div>
          <div className="col circleBorderTop">
            <div className="col clrStyl colInside">
              <p className="container__text">
                Отправление
              </p>
            </div>
            <div className="row">
              <div className="col colInside">
                <p className="container__text">
                  Аэропорт
                </p>
              </div>
              <div className="col colInside">
                <p className="container__text">
                  Дата
                </p>
              </div>
              <div className="col colInside">
                <p className="container__text">
                  Время
                </p>
              </div>
            </div>
          </div>
          <div className="col circleBorderTop">
            <div className="col clrStyl">
              <p className="container__text">
                Прибытие
              </p>
            </div>
            <div className="row">
              <div className="col">
                <p className="container__text">
                  Аэропорт
                </p>
              </div>
              <div className="col">
                <p className="container__text">
                  Дата
                </p>
              </div>
              <div className="col">
                <p className="container__text">
                  Время
                </p>
              </div>
            </div>
          </div>
        </div>
        {res}
      </div>) : (<p className="textLoading">Loading...</p>)}
      {serverError && <p className="textLoading">Ошибка запроса к базе данных: {serverError.toString()}</p>}
    </div>
  )
}

export default TableFlights;
