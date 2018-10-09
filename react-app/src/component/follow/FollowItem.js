import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { graphql } from 'react-apollo';

import FOLLOW_USER_TAG from '../../gql/mutation/followUserTag';

import Avatar from '../Avatar';
import styles from '../../styles/card.style';

import TagItems from '../TagItems';
import { events, action } from '../Snackbar';

class FollowItem extends React.Component {
  constructor(props) {
    super(props);
    const { tags } = this.props.user;
    this.state = {
      tags
    };
  }

  onClick = (idTag) => async () => {
    const tags = this.state.tags;
    const tagIndex = tags.findIndex(tag => tag.idTag === idTag);
    // const tag = tags[tagIndex];
    const active = !tags[tagIndex].active;
    tags[tagIndex].active = active;
    this.setState({ tags });
    try {
      await this.props.mutate({
        variables: { input: { idTag, active, idUser: this.props.user.idUser }},
      });
      const message = active ?
        `You are following the tag #${tags[tagIndex].name}.` :
        `You are not following the tag #${tags[tagIndex].name} anymore.`;
      events.emit(action.open, message);
    } catch (error) {
      tags[tagIndex].active = !active;
      this.setState({ tags });
      // we could show a snackbars message
      // we should then forward the error
    }
  }

  render() {
    const { classes, user } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar user={user} />
          }
          title={user.name}
        />
        <CardContent>
        <TagItems
          tags={this.state.tags}
          onClick={this.onClick}
          activeTitle="You are following this tag"
          inactiveTitle="Click to follow this tag"
        />
        </CardContent>
      </Card>
    );
  }
}

FollowItem.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired,
};

export default graphql(FOLLOW_USER_TAG)(withStyles(styles)(FollowItem));
