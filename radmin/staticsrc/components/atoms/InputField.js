import React from 'react';
import { render } from 'react-dom';

var InputField = React.createClass({

    handleChange: function(event) {
        this.props.onChange(this.props.type, event.target.value);
    },

    render: function () {
        return (
            <div>
                <input type={this.props.type === 'password' ? 'password' : 'text'}
                       value={this.props.value}
                       placeholder={this.props.type}
                       onChange={this.handleChange}/>
            </div>
        );
    }
});

module.exports = InputField;
