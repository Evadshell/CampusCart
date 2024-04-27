import './App.css';
import React from 'react'
import {Routes,Route} from "react-router-dom";
import Footer from './Components/Customers/Footer';
import Login from './Components/Customers/Login';
import Home from './Components/Customers/Home';
import Store from './Components/Customers/Store';
import MerchantLogin from './Components/Merchant/MerchantLogin';
import ProductsEdit from './Components/Merchant/ProductsEdit';
const App = () => {
  return (
      <div className="app-container">
      <div className="content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/merchantlogin' element={<MerchantLogin />} />
          {/* <Route path='products/:id' element={<Products />} /> */}
          <Route path='/products' element={<ProductsEdit />} />

          <Route path="store/:id" element={<Store />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App