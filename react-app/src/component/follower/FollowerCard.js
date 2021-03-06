import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import pluralize from 'pluralize';

import cardStyles from '../../styles/card.style';
import FollowerChip from './FollowerChip';

const styles = theme => cardStyles(theme);

const FollowerCard = ({ classes, name, tagFollowers, idTag }) => (
  <Card className={classes.card}>
    <CardHeader
      title={name}
      subheader={pluralize(`${tagFollowers.length} follower`, tagFollowers.length)}
    />
    { tagFollowers.length > 0 && <CardContent>
      { tagFollowers.map(follower => {
          const user = follower.follower;
          return (
            <FollowerChip
              key={`${name}-${user.idUser}`}
              idTag={idTag}
              user={user}
              follower={follower}
            />
          );
        }
      ) }
    </CardContent> }
  </Card>
);

FollowerCard.propTypes = {
  classes: PropTypes.object.isRequired,
  tagFollowers: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  idTag: PropTypes.number.isRequired,
};

export default withStyles(styles)(FollowerCard);
