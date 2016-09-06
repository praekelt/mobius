import React from 'react';
import { render } from 'react-dom';

var InputField = React.createClass({

    getInitialState: function() {
        return {value: 'default'};
    },

    handleChange: function(event) {
        this.props.onChange(this.props.type, event.target.value);
        this.setState({value: event.target.value});
    },

    render: function () {
        return (
            <div>
                <input type={this.props.type === 'password' ? 'password' : 'text'}
                       value={this.state.value}
                       onChange={this.handleChange}/>
            </div>
        );
    }
});

module.exports = InputField;

module.hot.accept();