import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/User/Dashboard";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProjectDetails from "./components/Projects/ProjectDetails";


function App() {
  return (
         <>
   <Header></Header>


          <Router>
            <div className={'container'}>
              <Routes>
                  <Route path={'/'} element={<Dashboard/>}/>
                  <Route exact path={'/ProjectDetails'} element={<ProjectDetails/>}/>
                  <Route path={'/login'} element={<Login/>}/>
                  <Route path={'/register'} element={<Register/>}/>
              </Routes>
            </div>
          </Router>

          <Footer></Footer>
      </>
  );

}

export default App;
