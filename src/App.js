import FlightsPage from "./features/FlightsPage/FlightsPage";
import {Route, Routes} from "react-router-dom";
import HomePage from "./features/HomePage/HomePage";
import InfoDepPage from "./features/InfoDepPage/InfoDepPage";
import InfoArrivPage from "./features/infoArivPage/InfoArrivPage";
import WayPage from "./features/WayPage/WayPage";
import MapPage from "./features/MapPage/MapPage";
import AdminPage from "./features/AdminPage/AdminPage";
import LoginPage from "./features/LoginPage/LoginPage";
import TicketPage from "./features/TicketPage/TicketPage";
import ProfilePage from "./features/ProfilePage/ProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/wolters-airport/" element={<HomePage />} />
      <Route path="/wolters-airport/flights" element={<FlightsPage />} />
      <Route path="/wolters-airport/info-departure" element={<InfoDepPage />} />
      <Route path="/wolters-airport/info-arrival" element={<InfoArrivPage />} />
      <Route path="/wolters-airport/way-to-airport" element={<WayPage />} />
      <Route path="/wolters-airport/map" element={<MapPage />} />
      <Route path="/wolters-airport/buy-ticket" element={<TicketPage />} />
      <Route path="/wolters-airport/profile" element={<ProfilePage />} />
      <Route path="/wolters-airport/login" element={<LoginPage />} />
      <Route path="/wolters-airport/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
