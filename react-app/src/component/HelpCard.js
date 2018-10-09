import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

// import merge from 'lodash';
// import cardStyles from '../styles/card.style';
// const styles = theme => merge(cardStyles(theme), {
//     cover: {
//         width: 151,
//     },
// });

const styles = theme => ({
  card: {
    display: 'flex',
    maxWidth: 700,
    margin: 10,
    backgroundColor: '#EEE',
    opacity: 0.7,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  // cover: {
  //   width: 50,
  // },
  avatar: {
    width: 50,
    height: 50,
  }
});

function HelpCard(props) {
  const { classes, children } = props;

  return (
    <Card className={classes.card}>
        {/* <CardMedia
            className={classes.cover}
            image="/info1.png"
            title="Info"
        /> */}
        <CardContent className={classes.cover}>
          <Avatar className={classes.avatar}>Info</Avatar>
        </CardContent>
        <CardContent className={classes.content}>
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