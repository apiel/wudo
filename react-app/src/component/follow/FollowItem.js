import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import Avatar from '../Avatar';
import styles from '../../styles/card.style';

import TagItems from '../TagItems';

class FollowItem extends React.Component {
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
        <TagItems tags={user.tags} />
        </CardContent>
      </Card>
    );
  }
}

FollowItem.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withStyles(styles)(FollowItem);
