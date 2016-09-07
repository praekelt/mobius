import React from 'react';
import { withRouter } from 'react-router'

import auth from 'utils/auth';

import InputField from 'components/atoms/InputField';
import SubmitButton from 'components/atoms/SubmitButton';

var LoginForm = React.createClass({

    getInitialState: function() {
        return {
            username: '',
            password: '',
            result: ''
        };
    },

    onUpdate: function(key, value) {
        this.state[key] = value;
        this.setState({key: value});
    },

    handleSubmit: function (event) {
        event.preventDefault();

        var username = this.state.username
        var pass = this.state.password

        auth.login(username, pass, (loggedIn) => {
            if (loggedIn) {
                this.props.router.replace('/radmin/')
            }
        })
    },

    render: function () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <InputField type="username"
                                value={this.state.username}
                                onChange={this.onUpdate}
                    />
                    <InputField type="password"
                                value={this.state.password}
                                onChange={this.onUpdate}
                    />
                    <SubmitButton/>
                </form>
                <h2>{this.state.result}</h2>
            </div>
        );
    }
});

module.exports = withRouter(LoginForm);
