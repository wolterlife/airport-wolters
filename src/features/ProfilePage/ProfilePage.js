import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import InfoAccount from "./components/InfoAccount/InfoAccount";
import ShowTickets from "./components/ShowTickets/ShowTickets";

const ProfilePage = () => {
  return (
    <>
      <Header />
      <InfoAccount />
      <ShowTickets />
      <Footer />
    </>
  )
}

export default ProfilePage;
