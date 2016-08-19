/**
 * Created by peterringelmann on 2016/08/18.
 */

import React from 'react';
import { render } from 'react-dom';

var HelloMessage = React.createClass({
    render: function () {
        return <h1>...and now it's even radder!</h1>;
    }
});

render(<HelloMessage/>, document.getElementById('radmin'));

module.hot.accept()