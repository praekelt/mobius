import React from 'react';

import Reqwest from 'reqwest';

import InputField from 'components/atoms/InputField';

var ListingItem = React.createClass({

    getInitialState: function () {
        return {
            active: false,
            title: this.props.item.title,
            subtitle: this.props.item.subtitle,
            description: this.props.item.description
        };
    },

    setActive: function() {
        this.setState({active: true});
    },

    submitChanges: function() {
        this.setState({active: false});
        this.serverRequest = Reqwest({
            url: this.props.item.url,
            type: 'json',
            method: 'put',
            headers: {
                'Authorization': 'Token ' + localStorage.token
            },
            data: {
                title: this.state.title,
                subtitle: this.state.subtitle,
                description: this.state.description
            },
            success: function(res) {
                this.setState({posts: res});
            }.bind(this)
        })
    },

    onUpdate: function(event) {
        var key = event.target.name;
        var value = event.target.value;
        this.state[key] = value;
        this.setState({key: value});
    },

    render: function () {
        var activeContent = undefined;
        if (this.state.active) {
            activeContent = <div className="ListingItem-content">
                <input
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.onUpdate}
                />
                <input
                    type="text"
                    name="subtitle"
                    value={this.state.subtitle}
                    onChange={this.onUpdate}
                />
                <input
                    type="text"
                    name="description"
                    value={this.state.description}
                    onChange={this.onUpdate}
                />
                <button className="closeButton" onClick={this.submitChanges}>Finished</button>
                </div>
        } else {
            activeContent = <input
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.onUpdate}
                    onClick={this.setActive}
                />
        }

        return (
            <div className="ListingItem">
                { activeContent }
            </div>
        );
    }
});

module.exports = ListingItem;/**
 * Created by peter on 2016/09/07.
 */
