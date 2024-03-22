import "./App.css";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import NoPage from "./components/Common/NoPage";
import { Route, Routes } from "react-router-dom";
import LaunchesList from "./components/Launches/LaunchesList";
import Launches from "./components/Launches/Launches";
import PayloadsList from "./components/Payloads/PayloadsList";
import Payloads from "./components/Payloads/Payloads";
import CoresList from "./components/Cores/CoresList";
import Cores from "./components/Cores/Cores";
import RocketsList from "./components/Rockets/RocketsList";
import Rockets from "./components/Rockets/Rockets";
import ShipsList from "./components/Ships/ShipsList";
import Ships from "./components/Ships/Ships";
import LaunchpadsList from "./components/Launchpads/LaunchpadsList";
import Launchpads from "./components/Launchpads/Launchpads";
import History from "./components/History";
import Searchres from "./components/Common/searchres"

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<History />} />
          <Route path="/searchresults/:searchTerm" element={<Searchres />} />
          <Route path="/launches/page/:page" element={<LaunchesList />} />
          <Route path="/launches/:id" element={<Launches />} />
          <Route path="/payloads/page/:page" element={<PayloadsList />} />
          <Route path="/payloads/:id" element={<Payloads />} />
          <Route path="/cores/page/:page" element={<CoresList />} />
          <Route path="/cores/:id" element={<Cores />} />
          <Route path="/rockets/page/:page" element={<RocketsList />} />
          <Route path="/rockets/:id" element={<Rockets />} />
          <Route path="/ships/page/:page" element={<ShipsList />} />
          <Route path="/ships/:id" element={<Ships />} />
          <Route path="/launchpads/page/:page" element={<LaunchpadsList />} />
          <Route path="/launchpads/:id" element={<Launchpads />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
