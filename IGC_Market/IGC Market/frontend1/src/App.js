import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import { signout } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import ChatScreen from './screens/ChatScreen';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import ChatBox from './components/ChatBox';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="header">
        <div>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
          <Link className="brand" to="/">
            <img className="header_logo" src="/images/KakaoTalk_20210404_171431185.png" alt="HeaderLogo"/>
          </Link>
        </div>

        <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>

        <div>
            <div className="header_nav">
               <div className='header_option'>
               <span className='header_optionLine1'>
                       <Link to="sell.html"><img className="sell_logo" src="/images/KakaoTalk_20210404_181730390.png" alt="SellLogo"/></Link>
                   </span>
                   <span className='header_optionLine2'>
                    <Link to="/productlist/seller">Sell</Link>
                   </span>
               </div>

               <div className='header_option'>
               <span className='header_optionLine1'>
                        <Link to="chat.html"><img className="chat_logo" src="/images/KakaoTalk_20210404_183949748.png" alt="ChatLogo"/></Link>
                   </span>
                   <span className='header_optionLine2'>
                           <Link to="/chat">Chat</Link>
                       </span>
               </div>
               <div className='header_option'>
                <span className='header_optionLine1'>
                {
                       userInfo ? <Link to="/profile"><img className="account_logo" src="/images/KakaoTalk_20210404_191931497.png" alt="AccountLogo"/></Link>:
                          <Link to="/signin"><img className="account_logo" src="/images/KakaoTalk_20210404_191931497.png" alt="AccountLogo"/></Link>

                   }
                </span>
                <span className='header_optionLine2'>
                  {userInfo ? (
                    <div className="dropdown">
                      <Link to="#">
                        {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                      </Link>
                      <ul className="dropdown-content">
                        <li>
                          <Link to="/profile">User Profile</Link>
                        </li>
                        <li>
                          <Link to="#signout" onClick={signoutHandler}>
                            Sign Out
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <Link to="/signin">Sign In</Link>
                  )}
                              {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                </ul>
              </div>
            )}
                              {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
                </span>

               </div>
               
            </div>
        </div>
      </header>
      <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
      <main>
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/product/:id" component={ProductScreen} exact></Route>
        <Route path="/" component={HomeScreen} exact></Route>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
        <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
        <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
        <PrivateRoute
          path="/chat"
          component={ChatScreen}
        ></PrivateRoute>
        <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
        ></AdminRoute>
        <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
        ></Route>
        <AdminRoute
          path="/user/:id/edit"
          component={UserEditScreen}
        ></AdminRoute>
                  <SellerRoute
            path="/productlist/seller"
            component={ProductListScreen}
          ></SellerRoute>
        <Route path="/seller/:id" component={SellerScreen}></Route>
        <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route>
          <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
          ></AdminRoute>
      </main>
      <footer className="row center">
          {userInfo && <ChatBox userInfo={userInfo} />}
          <div>All right reserved</div>{' '}
        </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;