import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Shop from './pages/Shop.jsx'
import LoginSignup from './pages/LoginSignup.jsx'
import RegisterSignup from './pages/RegisterSignup.jsx'

import { ToastContainer } from "react-toastify";
import Product from './pages/Product.jsx'
import ShopCategory from './pages/ShopCategory.jsx'
import Cart from './pages/Cart.jsx'
import Footer from './components/Footer/Footer.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import ScrollToTop from './pages/ScrollTotop.jsx'
import { ShopContext } from './contexts/Shopcontext.jsx'
import axios from 'axios'
import { useContext, useEffect } from 'react'


function App() {

  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(ShopContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/user/customer/me",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);
  return (
  
      <div className='App'>
        <BrowserRouter>
      <Navbar/>
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Shop/>} />
        <Route path='/mens' element={<ShopCategory category="Mens"/>} />
        <Route path='/womens' element={<ShopCategory category="Womens"/>} />
        <Route path='/kids' element={<ShopCategory category="Kids"/>} />
        <Route  path='/product' element={<Product/>} >
        <Route path=':productId' element={<Product/>} />
        </Route>
        <Route path='/login' element={<LoginSignup/>} />
        <Route path='/register' element={<RegisterSignup/>}/>
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>}/>
      </Routes>
    
        <ToastContainer position="top-center" />
        </BrowserRouter>
        <Footer/>
        
      </div>
    
  )
}

export default App
