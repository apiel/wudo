import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    display: 'flex',
    backgroundColor: '#f6f6f6',
    borderTop: '1px solid #E6E6E6',
    borderBottom: '1px solid #E6E6E6',
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
    height: 151,
  },
});

const MediaControlCard = ({ classes, theme, ogp }) => (
    <div className={classes.card}>
        { ogp.image && <CardMedia
            className={classes.cover}
            image={ogp.image.url}
            title="Live from space album cover"
        /> }
        <div className={classes.details}>
            <CardContent className={classes.content}>
                <Typography variant="headline">{ogp.title}</Typography>
                <Typography variant="subheading" color="textSecondary">
                    {ogp.description}
                </Typography>
            </CardContent>
        </div>
    </div>
);

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  ogp: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);