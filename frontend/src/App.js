import React, { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import Footer from './components/layout/Footer'
import Header from './components/layout/Header'

import Home from './components/Home'
import ProductDetails from './components/product/ProductDetails'

// Cart Imports
import Cart from './components/cart/Cart'
import ConfirmOrder from './components/cart/ConfirmOrder'
import OrderSuccess from './components/cart/OrderSuccess'
import Payment from './components/cart/Payment'
import Shipping from './components/cart/Shipping'

// Order Imports
import ListOrders from './components/order/ListOrders'
import OrderDetails from './components/order/OrderDetails'

// Auth or User imports
import LookAccount from './components/admin/LookAccount'
import Login from './components/user/Login'
import Profile from './components/user/Profile'
import Register from './components/user/Register'
import UpdatePassword from './components/user/UpdatePassword'
import UpdateProfile from './components/user/UpdateProfile'

// Admin Imports
import Dashboard from './components/admin/Dashboard'
import NewProduct from './components/admin/NewProduct'
import OrdersList from './components/admin/OrdersList'
import ProcessOrder from './components/admin/ProcessOrder'
import ProductReviews from './components/admin/ProductReviews'
import ProductsList from './components/admin/ProductsList'
import UpdateProduct from './components/admin/UpdateProduct'
import UpdateUser from './components/admin/UpdateUser'
import UsersList from './components/admin/UsersList'


import axios from 'axios'
import { useSelector } from 'react-redux'
import { loadUser } from './actions/userActions'
import ProtectedRoute from './components/route/ProtectedRoute'
import store from './store'


// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'



function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');

      setStripeApiKey(data.stripeApiKey)
    }

    getStripApiKey();

  }, [])
  const { user, isAuthenticated, loading } = useSelector(state => state.auth)

  return (
    <Router>
      <div className="App">
        <Header />
        <div>
          <Route path="/" component={Home} exact />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" component={ProductDetails} exact />

          {!loading && (!isAuthenticated || user.role !== 'admin') && (
            <Route path="/cart" component={Cart} exact />       
          )}
          {!loading && (!isAuthenticated || user.role !== 'admin') && (
            <ProtectedRoute path="/orders/me" component={ListOrders} exact />
          )}
          {!loading && (!isAuthenticated || user.role !== 'admin') && (
            <ProtectedRoute path="/shipping" component={Shipping} />
          )}
          {!loading && (!isAuthenticated || user.role !== 'admin') && (
            <ProtectedRoute path="/confirm" component={ConfirmOrder} exact />
          )} 
          <ProtectedRoute path="/success" component={OrderSuccess} />
          {stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
          }

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute path="/me" component={Profile} exact />
          <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
          <ProtectedRoute path="/password/update" component={UpdatePassword} exact />

          {/* <ProtectedRoute path="/orders/me" component={ListOrders} exact /> */}
          <ProtectedRoute path="/order/:id" component={OrderDetails} exact />
        </div>

        <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact />
        <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductsList} exact />
        <ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct} exact />
        <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact />
        <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrdersList} exact />
        <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProcessOrder} exact />
        <ProtectedRoute path="/admin/users" isAdmin={true} component={UsersList} exact />
        <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser} exact />
        <ProtectedRoute path="/admin/reviews" isAdmin={true} component={ProductReviews} exact />
        <ProtectedRoute path="/admin/look_user/:id" isAdmin={true} component={LookAccount} exact />

        {/* {!loading && (!isAuthenticated || user.role !== 'admin') && (
          <Footer />
        )} */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
