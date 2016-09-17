import React from 'react';

import Reqwest from 'reqwest';

import ListingItem from 'components/molecules/ListingItem'

var Listing = React.createClass({

    getInitialState: function () {
        return {
            posts: []
        };
    },

    componentDidMount: function() {
        var token = 'JWT <' + localStorage.token + '>';
        console.log(token);
        this.serverRequest = Reqwest({
            url: '/api/v1/post-post/',
            type: 'json',
            method: 'get',
            headers: {
                'Authorization': 'JWT' + localStorage.token
            },
            success: function(res) {
                this.setState({posts: res});
            }.bind(this)
        })

        this.serverRequest2 = Reqwest({
            url: '/api-token-verify/',
            type: 'json',
            method: 'post',
            data: {
                token: localStorage.token
            },
            success: function(res) {
                console.log(res);
            }.bind(this),
            error: function(res) {
                console.log(res);
            }
        })
    },

    componentWillUnmount: function () {
        this.serverRequest.abort();
    },

    render: function () {
        return (
            <ul>
                {this.state.posts.map(function(post, i){
                    return <li key={i}>
                        <ListingItem item={post}/>
                    </li>;
                })}
            </ul>
        );
    }
});

module.exports = Listing;/**
 * Created by peter on 2016/09/07.
 */
