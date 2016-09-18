import React from 'react';

import Reqwest from 'reqwest';

import ListingItem from 'components/molecules/ListingItem'

var Listing = React.createClass({

    getInitialState: function () {
        return {
            posts: [],
            initial: false
        };
    },

    componentDidMount: function() {
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
                        <ListingItem item={post} initial={this.state.initial} reset={this.resetActive}/>
                    </li>;
                }.bind(this))}
            </ul>
        );
    }
});

module.exports = Listing;/**
 * Created by peter on 2016/09/07.
 */
