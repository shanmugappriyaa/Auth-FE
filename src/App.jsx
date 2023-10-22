import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Loginpage from "./components/Loginpage";
import Resetpage from "./components/Resetpage";
import ForgotPassword from "./components/ForgotPassword";
import Register from "./components/Register";
import OtpPage from "./components/OtpPage";

function App() {
  return <>


 <BrowserRouter>
 <Routes>
  <Route path='/' element={<Loginpage></Loginpage>}/>
  <Route path='/forgetpassword' element={<ForgotPassword/>}/>
  <Route path='/reset/:id' element={<Resetpage/>}/>
  <Route path='/register' element={<Register/>}/>
  <Route path="/otp/:id" element={<OtpPage />}/>
  
  
 </Routes>
 </BrowserRouter>




    </>
  
}

export default App;
