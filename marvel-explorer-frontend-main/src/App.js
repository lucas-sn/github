import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import StoreProvider from "./store/Provider"
import PrivateRoutes from './PrivateRoutes'

import Home from './Pages/Home';
import Characters from './Pages/Characters';
import Favorites from './Pages/Favorites';
import Collections from './Pages/Collections';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {
    return (
        <BrowserRouter>
            <StoreProvider>
                <Route exact path='/' component={Login} />
                <Route path='/register' component={Register} />
                <PrivateRoutes exact path='/home' component={Home} />
                <PrivateRoutes exact path='/collections' component={Collections} />
                <PrivateRoutes exact path='/characters' component={Characters} />
                <PrivateRoutes exact path='/fav' component={Favorites} />
            </StoreProvider>
        </BrowserRouter>
    );
}

export default App;
