import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import merge from 'lodash/merge';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

import PostMediaQuery from './PostMediaQuery';
import postCardStyles from '../../../styles/card.style';
import PostInputText from './PostInputText';
import Avatar from '../../Avatar';
import TagItems from '../../TagItems';

import GET_POSTS from '../../../gql/query/getPosts';
import GET_ME from '../../../gql/query/getMe';
import ADD_POST from '../../../gql/mutation/addPost';

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

const initialState = {
  error: null,
  url: null,
  tags: [],
  openGraph: null,
  loading: false,
}

class PostForm extends React.Component {
  state = initialState;

  setUrl = url => {
    this.setState({ url });
    if (!url) {
      this.setMedia(null);
    }
  }
  setHashTags = tags => this.setState({ tags });

  text = null;
  media = null;

  setMedia = (media) => {
    this.media = media;
  }

  onSubmit = async(event) => {
      try {
        event.preventDefault();
        const text = this.text.state.value;
        const tags = this.state.tags;

        if (!tags.length) {
          throw Error('Please specify at least one #tag. A tag should start by the character "#" for example #hello-world');
        } else {
          this.setState({ error: null, loading: true });
          const openGraph = this.media ? this.media.state : null;
          await this.props.mutate(
            {
              variables: { text, tags, openGraph },
              update: (store, { data: { addPostAndTag } }) => {
                const query = GET_POSTS;
                const data = store.readQuery({ query });
                store.writeQuery({ query, data: {
                  getPosts: [addPostAndTag, ...data.getPosts],
                }});
              },
            }
          );
          this.text.setState({value: ''});
          this.setState(initialState);
        }
      } catch (err) {
        const error = err.constructor.name !== 'ApolloError' ? err.message
            : 'Something went wrong while sending your post, please try again. If the problem persist, don\'t hesitate to contact us.';
        this.setState({error, loading: false});
      }
  }

  onChipsChange = chips => this.setState({ chips });

  getTags = () => this.state.tags.map(tag => ({ idTag: tag, name: tag }));

  render() {
    const { classes, data: { getMe } } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar user={getMe} />
            }
            title={getMe.name}
            subheader={moment().calendar()} // LLLL
          />
          { this.state.tags &&
            <CardActions style={{ paddingTop: 0, paddingBottom: 0 }}>
              <TagItems tags={this.getTags()} />
            </CardActions>
          }
          <CardContent>
            <PostInputText
              error={this.state.error}
              setUrl={this.setUrl}
              setHashTags={this.setHashTags}
              ref={node => { this.text = node; }}
            />
          </CardContent>
          { this.state.url &&
            <PostMediaQuery
              url={this.state.url}
              setMedia={this.setMedia}
            />
          }
          <CardActions className={classes.actions} disableActionSpacing>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"
                disabled={this.state.loading}
              >
                  Post
                  {this.state.loading ?
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
  mutate: PropTypes.func.isRequired,
};

export default compose(
  graphql(ADD_POST),
  graphql(GET_ME),
  withStyles(styles),
)(PostForm);
