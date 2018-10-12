import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import merge from 'lodash/merge';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import PostMediaQuery from './PostMediaQuery';
import postCardStyles from '../../../styles/card.style';
import PostInputText from './PostInputText';
import TagItems from '../../TagItems';

import PostFormHeader from './PostFormHeader';
import PostFormButton from './PostFormButton';

import GET_POSTS from '../../../gql/query/getPosts';
import ADD_POST from '../../../gql/mutation/addPost';

const styles = theme => merge(postCardStyles(theme), {
  card: {
    marginBottom: 50,
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

  text = null;
  media = null;

  setMedia = (media) => {
    this.media = media;
  }

  onChipsChange = chips => this.setState({ chips });

  setHashTags = tags => this.setState({ tags });

  getTags = () => this.state.tags.map(tag => ({ idTag: tag, name: tag }));

  setUrl = url => {
    this.setState({ url });
    if (!url) {
      this.setMedia(null);
    }
  }

  savePost = async (text, tags, openGraph) => {
    this.setState({ error: null, loading: true });
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

  onSubmit = async(event) => {
    try {
      event.preventDefault();
      const text = this.text.state.value;
      const tags = this.state.tags;
      const openGraph = this.media ? this.media.state : null;

      if (!tags.length) {
        throw Error('Please specify at least one #tag. A tag should start by the character "#" for example #hello-world');
      } else {
        await this.savePost(text, tags, openGraph);
      }
    } catch (err) {
      const error = err.constructor.name !== 'ApolloError' ? err.message
          : 'Something went wrong while sending your post, please try again. If the problem persist, don\'t hesitate to contact us.';
      this.setState({error, loading: false});
    }
  }

  render() {
    const { classes } = this.props;
    const { loading, url, tags, error } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <Card className={classes.card}>
          <PostFormHeader />
          { tags &&
            <CardActions style={{ paddingTop: 0, paddingBottom: 0 }}>
              <TagItems tags={this.getTags()} />
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
          { url &&
            <PostMediaQuery url={url} setMedia={this.setMedia} />
          }
          <PostFormButton loading={loading} />
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
  withStyles(styles),
)(PostForm);
