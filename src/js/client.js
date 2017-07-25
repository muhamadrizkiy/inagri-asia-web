/**
 * Created by muhamadrizki on 24/07/17.
 */

import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {hashHistory, IndexRoute, Route, Router} from "react-router";

//Pages

import Auth from "./pages/auth";
import ActivitiesPage from "./pages/activities-page";
import ContentPage from "./pages/content-pages";
import ContentUploadPage from "./pages/content-upload"
import Home from "./pages/home";
import Layout from "./pages/layout";

//Components

import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import store from "./store";

const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={Layout}>
                <IndexRoute component={Home} />
                <Route path="home" name="home" component={Home} />
                <Route path="activities" name="activities" component={ActivitiesPage} />
                <Route path="pages/:parent/:contentPage" component={ContentPage} />
            </Route>
            <Route path='/auth' component={Auth}>
                <IndexRoute component={Login} />
                <Route path="login" name="login" component={Login} />
                <Route path="signup" name="signup" component={Signup} />
            </Route>
        </Router>
    </Provider>
    , app);
