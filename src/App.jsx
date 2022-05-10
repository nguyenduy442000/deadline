import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './pages/ProductList'
import  Product from './pages/Product'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import {useSelector} from "react-redux"


const App = () => {
  const  user = useSelector(state=>state.user.currentUser)
  return (
    <BrowserRouter>

<Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={user ? <Navigate to="/"/>:<Register />} />
        <Route path="/login"  element={user ? <Navigate to="/"/>:<Login />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart"element={<Cart />} />  
      </Routes>
    </BrowserRouter>
  )
};

export default App;