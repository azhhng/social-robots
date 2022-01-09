import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header/Header';
import About from './components/About/About';
import HomePage from './components/HomePage/HomePage';
import NotFound from './components/NotFound/NotFound';
import References from './components/References/References';
import RobotFactory from "./components/RobotFactory/RobotFactory";
import FactoryEntrance from "./components/FactoryEntrance/FactoryEntrance";
import Orientation from "./components/Orientation/Orientation";
import RobotUnion from "./components/RobotUnion/RobotUnion";
import DeveloperOffice from "./components/DeveloperOffice/DeveloperOffice";
import Ending2 from "./components/Ending2/Ending2";
import Ending1 from "./components/Ending1/Ending1";
import Ending1A from "./components/Ending1A/Ending1A";

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Routes>

          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/factory-entrance" element={<FactoryEntrance />}></Route>
          <Route exact path="/robot-factory" element={<RobotFactory />}></Route>
          <Route exact path="/orientation" element={<Orientation />}></Route>
          <Route exact path="/robot-union" element={<RobotUnion />}></Route>
          <Route exact path="/developer-office" element={<DeveloperOffice />}></Route>

          <Route exact path="/ending1" element={<Ending1 />}></Route>
          <Route exact path="/ending1A" element={<Ending1A />}></Route>
          <Route exact path="/ending2" element={<Ending2 />}></Route>

          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/references" element={<References />}></Route>

          <Route exact path="*" element={<NotFound />}></Route>

        </Routes>

      </div>
    </Router>
  );
}

export default App;
