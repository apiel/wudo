import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import red from '@material-ui/core/colors/red';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import SaveIcon from '@material-ui/icons/Save';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import ColorHash from 'color-hash';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import merge from 'lodash/merge';
import urlRegex from 'url-regex';
import moment from 'moment';
import ChipInput from 'material-ui-chip-input';
import Chip from '@material-ui/core/Chip';

import PostOgpQuery from './PostOgpQuery';
import postCardStyles from './PostCard.style';

const styles = theme => merge(postCardStyles(theme), {
  card: {
    marginBottom: 50,
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class RecipeReviewCard extends React.Component {
  state = {
    url: null,
  };

  loadUrl = value => {
    const urls = value.match(urlRegex());
    if (urls) {
      this.setState({ url: urls[0] });
    } else {
      this.setState({ url: null });
    }
  }

  onTextBlur = ({ target }) => {
    const { value } = target;
    this.loadUrl(value);
  }

  onTextChange = ({ target }) => {
    const { value } = target;

    const lastChar = value.slice(-1);
    if (lastChar === ' ' || lastChar === "\n") {
      this.loadUrl(value);
    }
  }

  render() {
    const { classes } = this.props;

    const user = {
        name: 'Alexandre Piel'
    }
    const backgroundColor = (new ColorHash()).hex(user.name);

    return (
      <Card className={classes.card}  style={{  }}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" style={{ backgroundColor }}>
              {user.name[0]}
            </Avatar>
          }
          title={user.name}
          subheader={moment().calendar()} // LLLL
        />
        <CardContent>
          <ChipInput
            defaultValue={['foo', 'bar']}
            fullWidth
            disableUnderline
            placeholder="Enter tags here"
            blurBehavior="add"
          />
        </CardContent>
        <CardContent>
          <TextField
            multiline
            fullWidth
            placeholder="Type your text here"
            onChange={this.onTextChange}
            onBlur={this.onTextBlur}
        />
        </CardContent>
        { this.state.url && <PostOgpQuery url={this.state.url} /> }
        <CardActions className={classes.actions} disableActionSpacing>
            <Button variant="contained" color="primary" className={classes.button}>
                Post
                <Icon className={classes.rightIcon}>send</Icon>
            </Button>
        </CardActions>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
