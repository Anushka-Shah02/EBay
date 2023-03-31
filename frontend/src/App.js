import './App.css';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Private from './components/Private';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import Banner from './components/Banner';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AddToCart from './components/AddToCart';
import Profile from './components/Profile';
import Favorite from './components/Favorite';
import Cart from './components/Cart';

function App() {
  
  
  return (
    <div className="App">
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route element={<Private/>}>
          <Route path='/' element={<Banner/>}></Route>
          <Route path="/products" element={<ProductList/>}></Route>
          <Route path="/add" element={<AddProduct/>}></Route>
          <Route path="/update/:id" element={<UpdateProduct/>}></Route>
          <Route path="/logout" element={{}}></Route>
          <Route exact path="/profile" element={<Profile/>}></Route>
          <Route exact path="/favrt" element={<Favorite/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          </Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
