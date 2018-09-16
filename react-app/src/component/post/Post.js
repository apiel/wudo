import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import ColorHash from 'color-hash';

import moment from 'moment';

import PostItemTags from './PostItemTags';
import styles from './PostCard.style';

class RecipeReviewCard extends React.Component {
  render() {
    const { classes, post } = this.props;

    const image = null;
    const backgroundColor = (new ColorHash()).hex(post.user.name);

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" style={{ backgroundColor }}>
              {post.user.name[0]}
            </Avatar>
          }
          title={post.user.name}
          subheader={moment(post.creationDate).format('llll')} // LLLL
        />
        <CardActions style={{ paddingTop: 0, paddingBottom: 0 }}>
          <PostItemTags tags={post.tags} />
        </CardActions>
        { image && <CardMedia
          className={classes.media}
          image={image}
          title="Contemplative Reptile"
        /> }
        <CardContent>
          <Typography component="p">
            {post.text}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
