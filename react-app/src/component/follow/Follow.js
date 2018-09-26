import React from 'react';

import AppBarSearch from '../appBar/AppBarSearch';
import FollowQuery from './FollowQuery';
import FollowSearch from './FollowSearch';

export default class Follow extends React.Component {
    state = {
        search: '',
    };

    searchTimer = null;

    onSearch = (e) => {
        const search = e.target.value;
        clearTimeout(this.searchTimer);
        this.searchTimer = setTimeout(
            () => this.setState({ search }),
            500,
        );
    }

    render() {
        return (
            <div>
                <AppBarSearch onSearch={this.onSearch} />
                <FollowQuery search={this.state.search} />
                <FollowSearch search={this.state.search} />
                <p>Need tooltip component: click tag to follow or unfollow</p>
            </div>
        );
    }
}
