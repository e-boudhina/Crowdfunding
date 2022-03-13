import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/User/Dashboard";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Events from "./components/Events/Events";
import EventDetails from "./components/Events/EventDetails";
function App() {
  return (
         <>
   <Header></Header>

          <Router>
            <div className={'container'}>
              <Routes>
                  <Route path={'/'} element={<Dashboard/>}/>
                  <Route path={'/login'} element={<Login/>}/>
                  <Route path={'/register'} element={<Register/>}/>
                  <Route path={'/events'} element={<Events/>}/>
                  <Route path={'/eventsdet'} element={<EventDetails/>}/>
              </Routes>
            </div>
          </Router><Footer></Footer>

      </>
  );

}

export default App;
