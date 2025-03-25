import './App.css';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import AddProduct from './Components/AddProduct';
import GetProducts from './Components/GetProducts';
import "bootstrap/dist/js/bootstrap.min.js";
import SingleProduct from './Components/SingleProduct';

function App() {
  return (
   <Router>
     <div className="App">
      <Routes>
     <Route path="/signup" element={<SignUp/>}></Route>
     <Route path="/signin" element={<SignIn/>}></Route>
     <Route path="/addproduct" element={<AddProduct/>}></Route>
     <Route path="/" element={<GetProducts/>}></Route>
     <Route path="/singleproduct" element={<SingleProduct/>}></Route>

    </Routes>
     </div>
   </Router>
  );
}

export default App;
