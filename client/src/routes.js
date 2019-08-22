import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';
import Auth from './hoc/auth';

import Home from './components/Home';
import RegisterLogin from './components/Register_login'
import Register from './components/Register_login/register';

import UserDashboard from './components/User/index';

function Routes() {
    return(
        <Layout>
            <Switch>
                <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)}/>

                <Route path="/register" exact component={Auth(Register, true)}/>
                <Route path="/register_login" exact component={Auth(RegisterLogin, true)}/>
                <Route path="/" exact component={Auth(Home, true)}/>
            </Switch>
        </Layout>
    )
}

export default Routes;