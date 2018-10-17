import React from 'react';
import Typography from '@material-ui/core/Typography';

import AppBarSearch from '../appBar/AppBarSearch';
import FollowQuery from './FollowQuery';
import FollowSearch from './FollowSearch';
import Snackbar from '../Snackbar';
import HelpCard from '../HelpCard';
import TagItems from '../TagItems';

export default class Follow extends React.Component {
    state = {
        search: '',
    };

    searchTimer = null;

    tagsExample = [
        { idTag: 'tagFollow', name: 'follow', active: true },
        { idTag: 'tagUnfollow', name: 'unfollow', active: false },
    ];

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
                <AppBarSearch onSearch={this.onSearch} title="Peoples and tags" />
                <FollowQuery search={this.state.search} />
                <FollowSearch search={this.state.search} />
                <HelpCard>
                    <Typography variant="body1" gutterBottom>
                        Search for people or/and #tags. You can then click on tag to follow or unfollow.
                    </Typography>
                    <TagItems tags={this.tagsExample} />
                </HelpCard>
                <Snackbar />
            </div>
        );
    }
}
