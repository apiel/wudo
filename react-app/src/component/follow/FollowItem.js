import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import Avatar from '../Avatar';
import styles from '../../styles/card.style';

import TagItems from '../TagItems';

class FollowItem extends React.Component {
  constructor(props) {
    super(props);
    const { tags } = this.props.user;
    this.state = {
      tags
    };
  }

  onClick = (idTag) => () => {
    const tags = this.state.tags;
    const tagIndex = tags.findIndex(tag => tag.idTag === idTag);
    // const tag = tags[tagIndex];
    tags[tagIndex].active = !tags[tagIndex].active;
    this.setState({ tags });
    // console.log('this.state.tags', this.state.tags);
    // console.log('tag clicked', idTag, this.props.user);
  }

  render() {
    const { classes, user } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar user={user} />
          }
          title={user.name}
        />
        <CardContent>
        <TagItems tags={this.state.tags} onClick={this.onClick} />
        </CardContent>
      </Card>
    );
  }
}

FollowItem.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withStyles(styles)(FollowItem);
