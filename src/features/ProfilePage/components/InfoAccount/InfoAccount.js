import "./InfoAccount.scss"
import {useNavigate} from "react-router-dom";

const InfoAccount = () => {
  const navigate = useNavigate()
  const exitFoo = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("authToken");
    navigate("/wolters-airport/")
  }

  return (
    <div className="infoContainer">
      <div className="formContainer">
        <p className="loginText">Ваш логин: {localStorage.getItem("login")}</p>
        <button onClick={() => exitFoo()} className="buttonExit">Выход</button>
      </div>
    </div>
  )
}

export default InfoAccount;
