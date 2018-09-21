import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import urlRegex from 'url-regex';

import findHashtags from '../../utils/hashtag';

class PostInputText extends React.Component {
  state = {
    value: '',
  };

  analyseText = value => {
    const urls = value.match(urlRegex());
    let url = null;
    if (urls) {
        url = urls[0];
    }
    this.props.setUrl(url);
    this.props.setHashTags(findHashtags(value));
  }

  onTextBlur = ({ target }) => {
    const { value } = target;
    this.analyseText(value);
  }

  onTextChange = ({ target }) => {
    const { value } = target;
    this.setState({ value });

    const lastChar = value.slice(-1);
    if (lastChar === ' ' || lastChar === "\n") {
      this.analyseText(value);
    }
  }

  render = (props) => (
    <TextField
        multiline
        fullWidth
        value={this.state.value}
        placeholder="Type your text here"
        onChange={this.onTextChange}
        onBlur={this.onTextBlur}
        {...props}
    />
  );
}

PostInputText.propTypes = {
    setUrl: PropTypes.func.isRequired,
    setHashTags: PropTypes.func.isRequired,
};

export default PostInputText;
