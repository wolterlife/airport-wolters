import "./TableFlights.css"
import {useEffect, useState} from "react";

/*
const flights = [
  {
    "id": 1,
    "flightNum": "BM343",
    "airDepart": "Минск",
    "airDest": "Москва",
    "dateDest": "23.03.2002",
    "timeDest": "16:30",
    "dateDepart": "21.03.2001",
    "timeDepart": "15:00",
    "freePlaces": 0,
    "airline": {
      "id": 1,
      "nameOfAirline": "Belavia",
      "office": "Minsk"
    },
    "plane": {
      "id": 8,
      "model": "BOING 737-300R",
      "year": 2009,
      "totalPlaces": 280
    }
  },
  {
    "id": 3,
    "flightNum": "BM343",
    "airDepart": "Минск",
    "airDest": "Москва",
    "dateDest": "23.03.2002",
    "timeDest": "16:30",
    "dateDepart": "21.03.2001",
    "timeDepart": "15:00",
    "freePlaces": 0,
    "airline": {
      "id": 1,
      "nameOfAirline": "Belavia",
      "office": "Minsk"
    },
    "plane": {
      "id": 8,
      "model": "BOING 737-300R",
      "year": 2009,
      "totalPlaces": 280
    }
  },
  {
    "id": 10,
    "flightNum": "BM343",
    "airDepart": "Минск",
    "airDest": "Москва",
    "dateDest": "23.03.2002",
    "timeDest": "16:30",
    "dateDepart": "21.03.2001",
    "timeDepart": "15:00",
    "freePlaces": 3,
    "airline": {
      "id": 1,
      "nameOfAirline": "Belavia",
      "office": "Minsk"
    },
    "plane": {
      "id": 1,
      "model": "BOING 737-300R",
      "year": 2009,
      "totalPlaces": 280
    }
  },
  {
    "id": 11,
    "flightNum": "BM343",
    "airDepart": "Минск",
    "airDest": "Москва",
    "dateDest": "23.03.2002",
    "timeDest": "16:30",
    "dateDepart": "21.03.2001",
    "timeDepart": "15:00",
    "freePlaces": 3,
    "airline": {
      "id": 1,
      "nameOfAirline": "Belavia",
      "office": "Minsk"
    },
    "plane": {
      "id": 1,
      "model": "BOING 737-300R",
      "year": 2009,
      "totalPlaces": 280
    }
  },
  {
    "id": 18,
    "flightNum": "BM343",
    "airDepart": "Минск",
    "airDest": "Москва",
    "dateDest": "23.03.2002",
    "timeDest": "16:30",
    "dateDepart": "21.03.2001",
    "timeDepart": "15:00",
    "freePlaces": 279,
    "airline": {
      "id": 1,
      "nameOfAirline": "Belavia",
      "office": "Minsk"
    },
    "plane": {
      "id": 1,
      "model": "BOING 737-300R",
      "year": 2009,
      "totalPlaces": 280
    }
  },
  {
    "id": 19,
    "flightNum": "BM343",
    "airDepart": "Минск",
    "airDest": "Москва",
    "dateDest": "23.03.2002",
    "timeDest": "16:30",
    "dateDepart": "21.03.2001",
    "timeDepart": "15:00",
    "freePlaces": 0,
    "airline": {
      "id": 3,
      "nameOfAirline": "OneWayAirlines",
      "office": "Rome"
    },
    "plane": {
      "id": 9,
      "model": "BOING 737-300R",
      "year": 2009,
      "totalPlaces": 50
    }
  }
]
*/
const TableFlights = () => {
  const [flights, setFlights] = useState();
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
              {item.dateDepart}
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
              {item.dateDest}
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
