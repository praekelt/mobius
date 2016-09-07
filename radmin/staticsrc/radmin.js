/**
 * Created by peterringelmann on 2016/08/18.
 */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import auth from 'utils/auth';

import LoginForm from 'components/organisms/LoginForm';
import App from 'components/App';

function requireAuth(nextState, replace) {
    if (!auth.loggedIn()) {
        replace({
            pathname:'/radmin/login/',
            state: {nextPathname: '/radmin/'}
        })
    }
}


render(
    <Router history={browserHistory}>
        <Route path='/radmin/login/' component={LoginForm} />
        <Route path='/radmin/' component={App} onEnter={requireAuth} />
    </Router>,
    document.getElementById('radmin')
);

module.hot.accept()