import "./LoginForm.scss"
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isRegVisible, setRegVisible] = useState(false);
  const [clientError, setClientError] = useState("");

  async function loginFoo() {
    await fetch("http://localhost:3000/login", {
      method: "POST",
      body: JSON.stringify(
        {
          login: document.getElementsByClassName("inputForm")[0].value,
          password: document.getElementsByClassName("inputForm")[1].value,
        }
      ),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      }
    })
      .then(res => res.json())
      .then(result => {
        if (result.msg) return setClientError(result.msg)
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("login", result.user.login);
        navigate("/wolters-airport/");
      })
  }

  async function registerFoo() {
    await fetch("http://localhost:3000/registration", {
      method: "POST",
      body: JSON.stringify(
        {
          login: document.getElementsByClassName("inputForm")[0].value,
          password: document.getElementsByClassName("inputForm")[1].value,
        }
      ),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      }
    })
      .then(res => res.json())
      .then(result => {
        if (result.msg !== "Пользователь успешно зарегистрирован") return setClientError(result.msg)
        loginFoo();
      })
  }

  return (
    (isRegVisible) ?
      (
        <div className="loginContainer">
          <div className="formInside">
            <p className="textTop">Регистрация</p>
            <input className="inputForm" placeholder="Логин"/>
            <input type="password" className="inputForm" placeholder="Пароль"/>
            <button onClick={() => registerFoo()} className="buttonLogin">Зарегистрироваться</button>
            <div className="bottomContainer">
              <button onClick={() => {setRegVisible(false); setClientError("")}} className="lower_button">Уже есть аккаунт</button>
            </div>
            <p className="errorText">
              {clientError}
            </p>
          </div>
        </div>
      )
      : (
        <div className="loginContainer">
          <div className="formInside">
            <p className="textTop">Вход в личный кабинет</p>
            <input className="inputForm" placeholder="Логин"/>
            <input type="password" className="inputForm" placeholder="Пароль"/>
            <button onClick={() => loginFoo()} className="buttonLogin">Войти</button>
            <p className="errorText">
              {clientError}
            </p>
            <div className="bottomContainer">
              <button onClick={() => {setRegVisible(true); setClientError("")}} className="lower_button">Регистрация</button>
              <p className="divider">|</p>
              <button className="lower_button">Забыли пароль?</button>
            </div>
          </div>
        </div>
      )
  )
}

export default LoginForm;
