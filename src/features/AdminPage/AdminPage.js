import Header from "../../components/Header/Header";
import FormFlights from "./components/FormFlights/FormFlights";
import AdmTableFlights from "./components/AdmTableFlights/AdmTableFlights";
import {useEffect, useState} from "react";

const AdminPage = () => {
  const token = localStorage.getItem("authToken")
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/flights")
      .then(res => res.json())
      .then((result) => {
        setFlights(result);
      }, (error) => {
        console.log(error)
      })
  },[]) // Flights



  const getFlights = async () => {
    fetch("http://localhost:3000/flights")
      .then(res => res.json())
      .then((result) => {
        setFlights(result);
      }, (error) => {
        console.log(error)
      })
  }

  return (
    <>
      <Header />
      <AdmTableFlights flights={flights} updateFlights={getFlights} />
      <FormFlights updateFlights={getFlights} />
    </>
  )
}

export default AdminPage;
