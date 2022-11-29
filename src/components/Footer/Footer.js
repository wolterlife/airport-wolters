import "./Footer.scss"

const Footer = () => {
  return (
    <footer>
      <div className="leftBlock">
        <div className="lineContact">
          <img className="linkImg" src="/img/footer_phone.svg" alt="Phone"/>
          <p className="textPhone">+375 33 450 22 88</p>
        </div>
        <div className="lineContact">
          <img className="linkImg" src="/img/footer_mail.svg" alt="Mail"/>
          <p className="textMail">ben_gunn@captan.com</p>
        </div>
      </div>
      <img className="footer_logo" src="/img/footer_logo.svg" alt="logo"/>
      <div className="rightBlock">
        <a href="https://taplink.cc/wolter.life"><button className="linkButton"><img src="/img/vk.svg" alt="vk" className="linkImg"/></button></a>
        <a href="https://taplink.cc/wolter.life"><button className="linkButton"><img className="linkImg" src="/img/inst.svg" alt="inst"/></button></a>
          <a href="https://taplink.cc/wolter.life"><button className="linkButton"><img className="linkImg" src="/img/tg.svg" alt="telegram"/></button></a>
      </div>
    </footer>
  )
}

export default Footer;
