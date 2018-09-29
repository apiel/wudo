import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import merge from 'lodash/merge';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
// before https://github.com/TeamWertarbyte/material-ui-chip-input
//
// need ChipAutoSuggest -> https://material-ui.com/demos/autocomplete/ ->downshift or react-select see multi
// https://www.npmjs.com/package/downshift
// https://www.npmjs.com/package/react-select
// or may be use mention system directly in text edit
// like https://ant.design/components/mention/
// maybe this https://www.npmjs.com/package/react-mentions
//
// or use both mention in textfield + autocomplete tags

import PostOgpQuery from './PostOgpQuery';
import postCardStyles from '../../../styles/card.style';
import PostInputText from './PostInputText';
import Avatar from '../../Avatar';
import TagItems from '../../TagItems';

import GET_POSTS from '../../../gql/query/getPosts';
import GET_ME from '../../../gql/query/getMe';

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
}

class PostForm extends React.Component {
  state = initialState;

  setUrl = url => this.setState({ url });
  setHashTags = tags => this.setState({ tags });

  text = null;
  ogp = null;

  onSubmit = event => {
      event.preventDefault();
      const text = this.text.state.value;
      const tags = this.state.tags;

      if (this.ogp) console.log('yoyoyo', this.ogp.state);
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
            this.setState(initialState);
          },
        });
      }
  }

  onChipsChange = chips => this.setState({ chips });

  getTags = () => this.state.tags.map(tag => ({ idTag: tag, name: tag }));

  render() {
    const { classes } = this.props;

    const error = this.props.result.error ?
      'Something went wrong while sending your post, please try again. If the problem persist, don\'t hesitate to contact us.'
      : this.state.error;

    return (
      <Query query={GET_ME}>
        {({ data: { getMe } }) => (
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
                  error={error}
                  setUrl={this.setUrl}
                  setHashTags={this.setHashTags}
                  ref={node => { this.text = node; }}
                />
              </CardContent>
              { this.state.url &&
                <PostOgpQuery
                  url={this.state.url}
                  setOgp={(ogp) => this.ogp = ogp }
                />
              }
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
        )}
      </Query>
    );
  }
}

PostForm.propTypes = {
  classes: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
  result: PropTypes.object.isRequired, // mutation result
};

export default withStyles(styles)(PostForm);
