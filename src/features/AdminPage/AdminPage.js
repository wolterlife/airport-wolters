import Header from "../../components/Header/Header";
import FormFlights from "./components/FormFlights/FormFlights";
import AdmTableFlights from "./components/AdmTableFlights/AdmTableFlights";
import {useEffect, useState} from "react";
import FormPlanes from "./components/FormPlanes/FormPlanes";
import AdmTablePlanes from "./components/AdmTablePlanes/AdmTablePlanes";
import AdmTableAirlines from "./components/AdmTableAirlines/AdmTableAirlines";
import FormAirlines from "./components/FormAirlines/FormAirlines";
import AdmTableTickets from "./components/AdmTableTickets/AdmTableTickets";
import FormTickets from "./components/FormTickets/FormTickets";
import AdmTableUsers from "./components/AdmTableUsers/AdmTableUsers";

const AdminPage = () => {
  const token = localStorage.getItem("authToken")
  const [flights, setFlights] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/flights")
      .then(res => res.json())
      .then((result) => {
        setFlights(result);
      }, (error) => {
        console.log(error)
      })
  },[]) // Flights

  useEffect(() => {
    fetch("http://localhost:3000/planes", {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.json())
      .then((result) => {
        setPlanes(result);
      }, (error) => {
        console.log(error)
      })
  },[]) // Planes

  useEffect(() => {
    fetch("http://localhost:3000/airlines", {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.json())
      .then((result) => {
        setAirlines(result);
      }, (error) => {
        console.log(error)
      })
  },[]) // Airlines

  useEffect(() => {
    fetch("http://localhost:3000/tickets", {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.json())
      .then((result) => {
        setTickets(result);
      }, (error) => {
        console.log(error)
      })
  },[]) // Tickets

  useEffect(() => {
    fetch("http://localhost:3000/users", {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.json())
      .then((result) => {
        setUsers(result);
      }, (error) => {
        console.log(error)
      })
  },[]) // Users

  const getFlights = async () => {
    fetch("http://localhost:3000/flights")
      .then(res => res.json())
      .then((result) => {
        setFlights(result);
      }, (error) => {
        console.log(error)
      })
  }

  const getPlanes = async () => {
    fetch("http://localhost:3000/planes",{
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.json())
      .then((result) => {
        setPlanes(result);
      }, (error) => {
        console.log(error)
      })
  }

  const getAirlines = async () => {
    fetch("http://localhost:3000/airlines",{
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.json())
      .then((result) => {
        setAirlines(result);
      }, (error) => {
        console.log(error)
      })
  }

  const getTickets = async () => {
    fetch("http://localhost:3000/tickets",{
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.json())
      .then((result) => {
        setTickets(result);
      }, (error) => {
        console.log(error)
      })
  }

  const getUsers = async () => {
    fetch("http://localhost:3000/users",{
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.json())
      .then((result) => {
        setUsers(result);
      }, (error) => {
        console.log(error)
      })
  }

  return (
    <>
      <Header />
      <AdmTableFlights planes={planes} flights={flights} updateFlights={getFlights} />
      <FormFlights planes={planes} updateFlights={getFlights} />
      <AdmTablePlanes airlines={airlines} planes={planes} updatePlanes={getPlanes} />
      <FormPlanes airlines={airlines} updatePlanes={getPlanes} />
      <AdmTableAirlines airlines={airlines} updateAirlines={getAirlines} />
      <FormAirlines airlines={airlines} updateAirlines={getAirlines} />
      <AdmTableTickets tickets={tickets} flights={flights} updateTickets={getTickets} />
      <FormTickets flights={flights} updateTickets={getTickets}/>
      <AdmTableUsers users={users} updateUsers={getUsers} />
    </>
  )
}

export default AdminPage;
