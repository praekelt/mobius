import React from 'react';
import { withRouter } from 'react-router'

import Reqwest from 'reqwest';

import auth from 'utils/auth';
import ListingItem from 'components/molecules/ListingItem'

var Listing = React.createClass({

    getInitialState: function () {
        return {
            posts: [],
            initial: false,
            new: true
        };
    },

    componentDidMount: function() {
        this.updateListings();
    },

    updateListings: function() {
        this.serverRequest = Reqwest({
            url: '/api/v1/post-post/',
            type: 'json',
            method: 'get',
            headers: {
                'Authorization': 'JWT ' + localStorage.token
            },
            success: function(res) {
                console.log(res);
                this.setState({posts: res});
            }.bind(this),
            error: function(res) {
                auth.logout();
                this.props.router.replace('/radmin/login/');
            }.bind(this)
        });
    },

    resetActive: function(){
        this.setState({initial: false});
    },

    componentWillUnmount: function () {
        this.serverRequest.abort();
    },

    render: function () {
        return (
            <ul>
                {this.state.posts.map(function(post, i){
                    return <li key={i}>
                        <ListingItem
                            item={post}
                            initial={this.state.initial}
                            reset={this.resetActive}
                            updatePosts={this.updateListings}
                        />
                    </li>;
                }.bind(this))}
                <li key={this.state.posts.length + 1}>
                    <ListingItem
                        item={{title: '', subtitle: '', slug: '', description: ''}}
                        new={this.state.new}
                        initial={this.state.initial}
                        reset={this.resetActive}
                        updatePosts={this.updateListings}
                    />
                </li>
            </ul>
        );
    }
});

module.exports = withRouter(Listing);/**
 * Created by peter on 2016/09/07.
 */
