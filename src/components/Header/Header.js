import "./Header.scss"
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
const Header = () => {
  const navigate = useNavigate();

  useEffect(() => { // change active tab
    let elem = document.getElementsByClassName("nav-link");
    switch (window.location.pathname) {
      case "/wolters-airport/flights":
        elem[0].classList.add("active")
        break;
      case "/wolters-airport/info-departure":
        elem[1].classList.add("active")
        break;
      case "/wolters-airport/info-arrival":
        elem[2].classList.add("active")
        break;
      case "/wolters-airport/way-to-airport":
        elem[3].classList.add("active")
        break;
      case "/wolters-airport/map":
        elem[4].classList.add("active")
        break;
      default:
        break;
    }

  }, [])

  return (
    <header>
      <img onClick={() => navigate("/wolters-airport/")} src="/img/logo.svg" alt="logo"/>
      <div className="topRightContainer">
          <button type="button" className="btn btn-primary"><em>Авторизация</em></button>
        <button className="btnLanguage">EN</button>
        <button className="btnLanguage">RU</button>
      </div>
      <div className="navContainer">
        <ul className="nav nav-tabs">
          <li className="nav-item tab1">
            <p onClick={() => navigate("/wolters-airport/flights")} className="nav-link" aria-current="page">Расписание рейсов</p>
          </li>
          <li className="nav-item tab2">
            <p onClick={() => navigate("/wolters-airport/info-departure")} className="nav-link">Вылетающим</p>
          </li>
          <li className="nav-item tab3">
            <p onClick={() => navigate("/wolters-airport/info-arrival")} className="nav-link">Прилетающим</p>
          </li>
          <li className="nav-item tab4">
            <p onClick={() => navigate("/wolters-airport/way-to-airport")} className="nav-link">Как добраться</p>
          </li>
          <li className="nav-item tab5">
            <p onClick={() => navigate("/wolters-airport/map")} className="nav-link">Карта аэропорта</p>
          </li>
        </ul>

      </div>
    </header>
  )
}

export default Header;
