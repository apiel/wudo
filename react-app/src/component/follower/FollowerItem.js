import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import CheckCircle from '@material-ui/icons/Done';
import NotInterested from '@material-ui/icons/NotInterested';
import merge from 'lodash/merge';
import pluralize from 'pluralize';

import Avatar from '../Avatar';
import cardStyles from '../../styles/card.style';

const styles = theme => merge(cardStyles(theme), {
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class FollowerItem extends React.Component {
  render() {
    const { classes, users, name, followers } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          title={name}
          subheader={pluralize(`${followers.length} follower`, followers.length)}
        />
        { followers.length > 0 && <CardContent>
          { followers.map(follower => {
              const index = users.findIndex(user => user.idUser === follower.idItem);
              const user = users[index];
              const deleteIcon = follower.accepted ? <CheckCircle /> : <NotInterested />;
              return (
                <Chip
                  className={classes.chip}
                  key={`${name}-${user.idUser}`}
                  avatar={ <Avatar user={user} /> }
                  label={user.name}
                  onDelete={() => {}}
                  deleteIcon={deleteIcon}
                />
              );
            }
          ) }
        </CardContent> }
      </Card>
    );
  }
}

FollowerItem.propTypes = {
  classes: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  followers: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};

export default withStyles(styles)(FollowerItem);
