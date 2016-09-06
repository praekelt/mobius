import React from 'react';
import { render } from 'react-dom';

var SubmitButton = React.createClass({

    render: function () {
        return (
            <div>
                <input type='submit'
                       value='log in'/>
            </div>
        );
    }
});

module.exports = SubmitButton;

module.hot.accept();