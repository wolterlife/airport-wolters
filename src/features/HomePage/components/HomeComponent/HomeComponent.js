import './HomeComponent.scss'
import {useNavigate} from "react-router-dom";

const HomeComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="textContainer">
        <p className="mainText">Аэропорт твоей мечты</p>
      </div>
      <button onClick={() => navigate("/wolters-airport/buy-ticket")} className="buttonBuyTicket">Купить билеты</button>
    </div>
  )
}

export default HomeComponent;
