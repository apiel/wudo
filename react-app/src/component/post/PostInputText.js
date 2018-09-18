import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import urlRegex from 'url-regex';

class PostInputText extends React.Component {
  findUrl = value => {
    const urls = value.match(urlRegex());
    let url = null;
    if (urls) {
        url = urls[0];
    }
    this.props.setUrl(url);
  }

  onTextBlur = ({ target }) => {
    const { value } = target;
    this.findUrl(value);
  }

  onTextChange = ({ target }) => {
    const { value } = target;

    const lastChar = value.slice(-1);
    if (lastChar === ' ' || lastChar === "\n") {
      this.findUrl(value);
    }
  }

  render = (props) => (
    <TextField
        multiline
        fullWidth
        placeholder="Type your text here"
        onChange={this.onTextChange}
        onBlur={this.onTextBlur}
    />
  );
}

PostInputText.propTypes = {
    setUrl: PropTypes.func.isRequired,
};

export default PostInputText;
