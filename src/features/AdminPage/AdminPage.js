import Header from "../../components/Header/Header";
import FormFlights from "./components/FormFlights/FormFlights";
import AdmTableFlights from "./components/AdmTableFlights/AdmTableFlights";
import {useEffect, useState} from "react";
import FormPlanes from "./components/FormPlanes/FormPlanes";
import AdmTablePlanes from "./components/AdmTablePlanes/AdmTablePlanes";

const AdminPage = () => {
  const token = localStorage.getItem("authToken")
  const [flights, setFlights] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [airlines, setAirlines] = useState([]);

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


  return (
    <>
      <Header />
      <AdmTableFlights flights={flights} updateFlights={getFlights} />
      <FormFlights planes={planes} updateFlights={getFlights} />
      <AdmTablePlanes airlines={airlines} planes={planes} updatePlanes={getPlanes} />
      <FormPlanes airlines={airlines} updatePlanes={getPlanes} />
    </>
  )
}

export default AdminPage;
