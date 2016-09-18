import React from 'react';
import { withRouter } from 'react-router'

import auth from 'utils/auth';
import Reqwest from 'reqwest';

import InputField from 'components/atoms/InputField';

var ListingItem = React.createClass({

    getInitialState: function () {
        return {
            active: this.props.initial,
            title: this.props.item.title,
            subtitle: this.props.item.subtitle,
            description: this.props.item.description,
            slug: this.props.item.slug
        };
    },

    componentWillReceiveProps: function () {
        this.setState(
            {
                active: this.props.initial,
                title: this.props.item.title,
                subtitle: this.props.item.subtitle,
                description: this.props.item.description,
                slug: this.props.item.slug
            }
        );
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
            method: 'patch',
            type: 'json',
            headers: {
                'Authorization': 'JWT ' + localStorage.token
            },
            data: {
                title: this.state.title,
                subtitle: this.state.subtitle,
                description: this.state.description,
                slug: this.state.slug
            },
            success: function(res) {
                this.setState({posts: res});
            }.bind(this),
            error: function(res) {
                auth.logout();
                this.props.router.replace('/radmin/login/')
            }.bind(this)
        })
    },

    createNew: function() {
        this.setState({active: false});
        this.serverRequest = Reqwest({
            url: '/api/v1/post-post/',
            method: 'post',
            type: 'json',
            headers: {
                'Authorization': 'JWT ' + localStorage.token
            },
            data: {
                title: this.state.title,
                subtitle: this.state.subtitle,
                description: this.state.description,
                slug: this.state.slug
            },
            success: function(res) {
                this.setState({posts: res});
                this.props.updatePosts();
            }.bind(this),
            error: function(res) {
                auth.logout();
                this.props.router.replace('/radmin/login/')
            }.bind(this)
        })
    },

    deleteItem: function() {
        this.setState({active: false});
        this.serverRequest = Reqwest({
            url: this.props.item.url,
            method: 'delete',
            type: 'json',
            headers: {
                'Authorization': 'JWT ' + localStorage.token
            },
            success: function(res) {
                this.setState({posts: res});
                this.props.updatePosts();
            }.bind(this),
            error: function(res) {
                auth.logout();
                this.props.router.replace('/radmin/login/')
            }.bind(this)
        })
    },

    onUpdate: function(event) {
        console.log('update');
        var key = event.target.name;
        var value = event.target.value;
        this.state[key] = value;
        this.setState({key: value});
    },

    render: function () {
        var activeContent = undefined;
        if (this.state.active) {
            activeContent = <div className="ListingItem-content">
                <label>Slug</label>
                <input
                    type="text"
                    name="slug"
                    value={this.state.slug}
                    onChange={this.onUpdate}
                />
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
                <button
                    className="closeButton"
                    onClick={this.props.new ? this.createNew : this.submitChanges}
                >+</button>
                <button className="deleteButton" onClick={this.deleteItem}>×</button>
                </div>
        }
        return (
            <div className={ this.state.active ? 'ListingItem is-active' : 'ListingItem' }>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    className={this.props.new ? 'createNew' : ''}
                    value={this.state.title}
                    placeholder={this.props.new ? 'Create new +' : ''}
                    onChange={this.onUpdate}
                    onClick={this.state.active ? null : this.setActive}
                />
                { activeContent }
            </div>
        );
    }
});

module.exports = withRouter(ListingItem);/**
 * Created by peter on 2016/09/07.
 */
