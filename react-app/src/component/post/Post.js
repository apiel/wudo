import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import moment from 'moment';

import Avatar from '../Avatar';
import PostItemTags from './PostItemTags';
import styles from './PostCard.style';

class RecipeReviewCard extends React.Component {
  render() {
    const { classes, post } = this.props;
    const image = null;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar user={post.user} />
          }
          title={post.user.name}
          subheader={moment(post.creationDate).calendar(null, {sameElse : 'llll'})}
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
