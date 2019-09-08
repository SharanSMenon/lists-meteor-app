import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
// Components Files
import Signup from './../ui/Signup';
import Dashboard from './../ui/Dashboard';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';
import EditListPage from './../ui/EditList'
const unAuthPages = ['/', '/signup'];
const authPages = ['/dashboard', '/edit'];
const onEnterPublicPage = () => {
    if (Meteor.userId()){
        browserHistory.replace('/dashboard')
    }
}
const onEnterPrivatePage = () => {
    if (!Meteor.userId()){
        browserHistory.replace('/')
    }
}
export const onAuthChange = (isAuthenticated) => {
    const pathname = browserHistory.getCurrentLocation().pathname;
    const isUnAuthPage = unAuthPages.includes(pathname);
    const isAuthPage = authPages.includes(pathname);
    if (isUnAuthPage && isAuthenticated) {
        browserHistory.replace('/dashboard')
    } else if (isAuthPage && !isAuthenticated) {
        browserHistory.replace('/')
    }
};
export const routes = (
    <Router history={browserHistory}>
            <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
            <Route path="/dashboard" component={Dashboard} onEnter={onEnterPrivatePage}/>
            <Route path="/edit/:id" component={EditListPage} onEnter={onEnterPrivatePage}/>
            <Route exact path="/" component={Login} onEnter={onEnterPublicPage}/>
            <Route path="*" component={NotFound}/>
    </Router>
);