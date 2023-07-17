import{BrowserRouter,Route, Routes} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import './App.css';
import Home from "./Pages/Home/Home.js";
import AddEdit from "./Pages/AddEdit/AddEdit";
import View from "./Pages/Plus/View";
import Header from "./Components/Header/Header";

function App() {
  return (
   <BrowserRouter>
        <div className="App">
          <Header />
          <ToastContainer position="top-center" />
          <Routes>
            <Route exact path="/" Component={Home} />
            <Route path="/add" Component={AddEdit} />
            <Route path="/update/:id" Component={AddEdit} />
            <Route path="/view/:id" Component={View} />
            </Routes>
        </div>
   </BrowserRouter>
  );
}

export default App;
