import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  card: {
    display: 'flex',
    maxWidth: 700,
    margin: 10,
    backgroundColor: '#EEE',
    opacity: 0.7,
  },
  avatar: {
    width: 50,
    height: 50,
  }
});

function HelpCard(props) {
  const { classes, children } = props;

  return (
    <Card className={classes.card}>
        <CardContent>
          <Avatar className={classes.avatar}>Info</Avatar>
        </CardContent>
        <CardContent>
          { children }
        </CardContent>
    </Card>
  );
}

HelpCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default withStyles(styles, { withTheme: true })(HelpCard);