import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import ColorHash from 'color-hash';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import merge from 'lodash/merge';
import moment from 'moment';
import ChipInput from 'material-ui-chip-input'; // need ChipAutoSuggest -> https://material-ui.com/demos/autocomplete/ ->downshift or react-select see multi

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

class PostForm extends React.Component {
  state = {
    url: null,
    chips: ['foo', 'bar'],
  };

  setUrl = url => this.setState({ url });

  text = null;

  onSubmit = event => {
      event.preventDefault();
      const text = this.text.state.value;
      console.log('yoyoyoYO', text);
      console.log('chips', this.state.chips);
      this.props.addPost({ variables: { text } });
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

PostForm.propTypes = {
  classes: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
};

export default withStyles(styles)(PostForm);
