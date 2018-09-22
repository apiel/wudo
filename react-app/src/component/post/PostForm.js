import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import merge from 'lodash/merge';
import moment from 'moment';
// need ChipAutoSuggest -> https://material-ui.com/demos/autocomplete/ ->downshift or react-select see multi

import PostOgpQuery from './PostOgpQuery';
import postCardStyles from './PostCard.style';
import PostInputText from './PostInputText';
import GET_POSTS from '../../gql/getPosts';
import Avatar from '../Avatar';
import PostItemTags from './PostItemTags';

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

class PostForm extends React.Component {
  state = {
    error: null,
    url: null,
    tags: [],
  };

  setUrl = url => this.setState({ url });
  setHashTags = tags => this.setState({ tags });

  text = null;

  onSubmit = event => {
      event.preventDefault();
      const text = this.text.state.value;
      const tags = this.state.tags;
      if (!tags.length) {
        this.setState({
          error: 'Please specify at least one #tag. A tag should start by the character "#" for example #hello-world',
        });
      } else {
        this.setState({error: null});
        this.props.addPost({
          variables: { text, tags },
          update: (proxy, { data: { addPostAndTag } }) => {
            const query = GET_POSTS;
            const data = proxy.readQuery({ query });
            data.getPosts.unshift(addPostAndTag);
            proxy.writeQuery({ query, data });
            this.text.setState({value: ''});
            this.setState({tags: [], error: null});
          },
        });
      }
  }

  onChipsChange = chips => this.setState({ chips });

  getTags = () => this.state.tags.map(tag => ({ idTag: tag, name: tag }));

  render() {
    const { classes } = this.props;

    const user = {
        name: 'Alexandre Piel'
    }

    const error = this.props.result.error ?
      'Something went wrong while sending your post, please try again. If the problem persist, don\'t hesitate to contact us.'
      : this.state.error;

    return (
          <form onSubmit={this.onSubmit}>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar user={user} />
                }
                title={user.name}
                subheader={moment().calendar()} // LLLL
              />
              { this.state.tags &&
                <CardActions style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <PostItemTags tags={this.getTags()} />
                </CardActions>
              }
              <CardContent>
                <PostInputText
                  error={error}
                  setUrl={this.setUrl}
                  setHashTags={this.setHashTags}
                  ref={node => { this.text = node; }}
                />
              </CardContent>
              { this.state.url && <PostOgpQuery url={this.state.url} /> }
              <CardActions className={classes.actions} disableActionSpacing>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    type="submit"
                    disabled={this.props.result.loading}
                  >
                      Post
                      {this.props.result.loading ?
                        'ing...'
                        : (<Icon className={classes.rightIcon}>send</Icon>)
                      }
                  </Button>
              </CardActions>
            </Card>
          </form>
    );
  }
}

PostForm.propTypes = {
  classes: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired, // mutation result
};

export default withStyles(styles)(PostForm);
