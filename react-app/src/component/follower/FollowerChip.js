import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import CheckCircle from '@material-ui/icons/Done';
import NotInterested from '@material-ui/icons/NotInterested';

import ALLOW_FOLLOWER from '../../gql/mutation/allowFollower';
import Avatar from '../Avatar';
import { events, action } from '../Snackbar';

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class FollowerChip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        follower: this.props.follower,
    };
  }

  toggleAccept = () => {
    const { follower } = this.state;
    follower.accepted = !!!follower.accepted;
    this.setState({ follower  });
  }

  onClick = (user) => async() => {
    this.toggleAccept();
    try {
        const allow = this.state.follower.accepted;
        const message = allow ?
          `${this.props.user.name} allowed.` :
          `${this.props.user.name} blocked for this tag.`;
        events.emit(action.open, message);
        await this.props.mutate({
            variables: { input: {
                idTag: this.props.idTag,
                idUser: this.props.user.idUser,
                allow,
            }},
        });
    } catch (error) {
        this.toggleAccept();
        events.emit(action.error, 'Something went wrong while saving.');
        // we could show a snackbars message
        // we should then forward the error
    }
  }

  render() {
    const { classes, user } = this.props;
    const { follower } = this.state;
    const deleteIcon = follower.accepted ? <CheckCircle /> : <NotInterested />;
    return (
      <Chip
        className={classes.chip}
        avatar={ <Avatar user={user} /> }
        label={user.name}
        onClick={this.onClick(user)}
        onDelete={this.onClick(user)}
        deleteIcon={deleteIcon}
      />
    );
  }
}

FollowerChip.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  follower: PropTypes.object.isRequired,
  idTag: PropTypes.number.isRequired,
  mutate: PropTypes.func.isRequired,
};

export default graphql(ALLOW_FOLLOWER)(withStyles(styles)(FollowerChip));
