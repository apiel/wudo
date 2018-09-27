import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import CheckCircle from '@material-ui/icons/Done';
import NotInterested from '@material-ui/icons/NotInterested';

import ALLOW_FOLLOWER from '../../gql/mutation/allowFollower';
import Avatar from '../Avatar';

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

  onClick = (user, allowFollower) => async() => {
    this.toggleAccept();
    try {
        await allowFollower({
            variables: { input: {
                idTag: this.props.idTag,
                idUser: this.props.user.idUser,
                allow: this.state.follower.accepted,
            }},
        });
    } catch (error) {
        this.toggleAccept();
        // we could show a snackbars message
        // we should then forward the error
    }
  }

  render() {
    const { classes, user } = this.props;
    const { follower } = this.state;

    return (
        <Mutation mutation={ALLOW_FOLLOWER}>
            {(allowFollower) => {
              const deleteIcon = follower.accepted ? <CheckCircle /> : <NotInterested />;
              return (
                <Chip
                  className={classes.chip}
                  avatar={ <Avatar user={user} /> }
                  label={user.name}
                  onClick={this.onClick(user, allowFollower)}
                  onDelete={this.onClick(user, allowFollower)}
                  deleteIcon={deleteIcon}
                />
              );
            }}
        </Mutation>
    );
  }
}

FollowerChip.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  follower: PropTypes.object.isRequired,
  idTag: PropTypes.number.isRequired,
};

export default withStyles(styles)(FollowerChip);
