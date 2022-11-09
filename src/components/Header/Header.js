import "./Header.scss"
const Header = () => {
  return (
    <header>
      <img src="/img/logo.svg" alt="logo"/>
      <div className="topRightContainer">
          <button type="button" className="btn btn-primary"><em>Авторизация</em></button>
        <button className="btnLanguage">EN</button>
        <button className="btnLanguage">RU</button>
      </div>
      <div className="navContainer">
        <ul className="nav nav-tabs">
          <li className="nav-item tab1">
            <a className="nav-link active" aria-current="page" href="#">Расписание рейсов</a>
          </li>
          <li className="nav-item tab2">
            <a className="nav-link" href="#">Вылетающим</a>
          </li>
          <li className="nav-item tab3">
            <a className="nav-link" href="#">Прилетающим</a>
          </li>
          <li className="nav-item tab4">
            <a className="nav-link" href="#">Как добраться</a>
          </li>
          <li className="nav-item tab5">
            <a className="nav-link" href="#">Карта аэропорта</a>
          </li>
        </ul>

      </div>
    </header>
  )
}

export default Header;
