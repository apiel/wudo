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
// import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import merge from 'lodash/merge';
// import urlRegex from 'url-regex';
import moment from 'moment';
import ChipInput from 'material-ui-chip-input'; // need ChipAutoSuggest -> https://material-ui.com/demos/autocomplete/ ->downshift or react-select see multi

import gql from 'graphql-tag';

import PostOgpQuery from './PostOgpQuery';
import postCardStyles from './PostCard.style';
import PostInputText from './PostInputText';

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

// https://github.com/neo4j-graphql/neo4j-graphql/issues/59
// https://github.com/apollographql/react-apollo/issues/238
// or make the tags logic in the resolver <- might make more sense
// but lets first implement addTag to play around
const ADD_POST = gql`
  mutation AddPost($type: String!) {
      addPost(
        post: {
          text: "yo"
          tags: [1,2]
        }
      ) {
        idPost
      }
  }
`;

// might need to use redux form
class RecipeReviewCard extends React.Component {
  state = {
    url: null,
    chips: ['foo', 'bar'],
  };

  setUrl = url => this.setState({ url });

  text = null;

  onSubmit = event => {
      event.preventDefault();
      console.log('yoyoyoYO', this.text);
      console.log('chips', this.state.chips);
  }

  onChipsChange = chips => this.setState({ chips });

  render() {
    const { classes } = this.props;

    const user = {
        name: 'Alexandre Piel'
    }
    const backgroundColor = (new ColorHash()).hex(user.name);

    return (
      <form onSubmit={this.onSubmit}>
        <Card className={classes.card}>
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
              defaultValue={this.state.chips}
              fullWidth
              disableUnderline
              placeholder="Enter tags here"
              blurBehavior="add"
              onChange={this.onChipsChange}
            />
          </CardContent>
          <CardContent>
            <PostInputText setUrl={this.setUrl} ref={node => { this.text = node; }} />
          </CardContent>
          { this.state.url && <PostOgpQuery url={this.state.url} /> }
          <CardActions className={classes.actions} disableActionSpacing>
              <Button variant="contained" color="primary" className={classes.button} type="submit">
                  Post
                  <Icon className={classes.rightIcon}>send</Icon>
              </Button>
          </CardActions>
        </Card>
      </form>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
