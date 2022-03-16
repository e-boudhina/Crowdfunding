import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/User/Dashboard";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
//import EventDetails from "./components/Events/EventDetails";
//import Events from "./components/Events/Events";
import Events from "./pages/Events/Event";
import EventsDetails from "./pages/Events/EventDetails";
import Home from "./pages/Home";

function App() {
  return (
         <>
   <Header></Header>

          <Router>
              <Routes>
                  <Route path={'/'} element={<Home/>}/>
                  <Route path={'/login'} element={<Login/>}/>
                  <Route path={'/register'} element={<Register/>}/>
               
                  <Route path={'/events'} element={<Events/>}/>
                  <Route path={'/eventsdet'} element={<EventsDetails/>}/>
              </Routes>
          </Router>
          <Footer></Footer>

      </>
  );

}

export default App;
