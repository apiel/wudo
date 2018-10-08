import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

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
  cover: {
    width: 151,
  },
});

function HelpCard(props) {
  const { classes, theme } = props;

  return (
    <Card className={classes.card}>
        <CardMedia
            className={classes.cover}
            image="/info1.png"
            title="Info"
        />
        <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
            Live From Space
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
            Mac Miller
            </Typography>
        </CardContent>
    </Card>
  );
}

HelpCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(HelpCard);