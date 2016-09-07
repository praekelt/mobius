import React from 'react';
import { withRouter } from 'react-router'

import auth from 'utils/auth';

import Listing from 'components/organisms/Listing';

var App = React.createClass({

    logoutHandler: function() {
        auth.logout()
        this.props.router.replace('/radmin/login/')
    },

    render: function () {
        return (
            <div>
                <Listing/>
                <button onClick={this.logoutHandler}>Log out</button>
            </div>
        );
    }
});

module.exports = withRouter(App);