import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/User/Dashboard";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Events from "./components/Events/Events";

function App() {
  return (
         <>
         <div>
         <Header></Header>
         </div>
   
  
          <Router>
            <div className={'container'}>
              <Routes>
                  <Route path={'/'} element={<Dashboard/>}/>
                  <Route path={'/login'} element={<Login/>}/>
                  <Route path={'/register'} element={<Register/>}/>
                  <Route path={'/events'} element={<Events/>}/>
              </Routes>
            </div>
          </Router>
          <Footer></Footer>
      </>
  );

}

export default App;
