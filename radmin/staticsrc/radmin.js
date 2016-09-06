/**
 * Created by peterringelmann on 2016/08/18.
 */

import React from 'react';
import { render } from 'react-dom';
import InputField from './components/atoms/InputField';
import SubmitButton from './components/atoms/SubmitButton';
import Reqwest from 'reqwest';

var AdminForm = React.createClass({

    getInitialState: function() {
        return {
            username: 'enter username',
            password: 'password',
            result: ''
        };
    },

    onUpdate: function(key, value) {
        this.state[key] = value;
    },

    handleSubmit: function (event) {
        event.preventDefault();
        Reqwest({
            url: '/api-auth/',
            type: 'json',
            method: 'post',
            data: {
                username: this.state.username,
                password: this.state.password
            },
            success: function (resp) {
                this.setState({result: 'Your token ' + resp.token});
            }.bind(this),
            error: function (err) {
                this.setState({result: 'Invalid credentials'});
            }.bind(this)
        });
    },

    render: function () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <InputField type="username"
                                onChange={this.onUpdate}
                    />
                    <InputField type="password"
                                onChange={this.onUpdate}
                    />
                    <SubmitButton/>
                </form>
                <h2>{this.state.result}</h2>
            </div>
        );
    }
});

render(<AdminForm/>, document.getElementById('radmin'));

module.hot.accept()