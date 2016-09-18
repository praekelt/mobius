import React from 'react';

import Reqwest from 'reqwest';

import InputField from 'components/atoms/InputField';

var ListingItem = React.createClass({

    getInitialState: function () {
        return {
            active: this.props.initial,
            title: this.props.item.title,
            subtitle: this.props.item.subtitle,
            description: this.props.item.description
        };
    },

    componentWillReceiveProps: function () {
        this.setState({active: this.props.initial});
    },

    setActive: function() {
        this.props.reset();
        setTimeout(function(){
            this.setState({active: true});
        }.bind(this), 0)
    },

    submitChanges: function() {
        this.setState({active: false});
        this.serverRequest = Reqwest({
            url: this.props.item.url,
            method: 'put',
            type: 'json',
            headers: {
                'Authorization': 'JWT ' + localStorage.token
            },
            data: {
                title: this.state.title,
                subtitle: this.state.subtitle,
                description: this.state.description
            },
            success: function(res) {
                this.setState({posts: res});
            }.bind(this),
            error: function(res) {
                console.log(res);
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
                <label>Subtitle</label>
                <input
                    type="text"
                    name="subtitle"
                    value={this.state.subtitle}
                    onChange={this.onUpdate}
                />
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    value={this.state.description}
                    onChange={this.onUpdate}
                />
                <button className="closeButton" onClick={this.submitChanges}></button>
                </div>
        }
        return (
            <div className={ this.state.active ? 'ListingItem is-active' : 'ListingItem' }>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.onUpdate}
                    onClick={this.state.active ? null : this.setActive}
                />
                { activeContent }
            </div>
        );
    }
});

module.exports = ListingItem;/**
 * Created by peter on 2016/09/07.
 */
