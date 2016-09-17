import React from 'react';

import Reqwest from 'reqwest';

var Listing = React.createClass({

    getInitialState: function () {
        return {
            posts: []
        };
    },

    componentDidMount: function() {
        this.serverRequest = Reqwest({
            url: '/api/v1/post-post-permitted/',
            type: 'json',
            method: 'get',
            headers: {
                'Authorization': 'Token ' + localStorage.token
            },
            success: function(res) {
                this.setState({posts: res});
            }.bind(this)
        })
    },

    componentWillUnmount: function () {
        this.serverRequest.abort();
    },

    render: function () {
        return (
            <ul>
                {this.state.posts.map(function(post, i){
                    return <li key={i}>{post.title}</li>;
                })}
            </ul>
        );
    }
});

module.exports = Listing;/**
 * Created by peter on 2016/09/07.
 */
