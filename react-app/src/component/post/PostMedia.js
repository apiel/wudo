import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    display: 'flex',
    backgroundColor: '#f6f6f6',
    borderTop: '1px solid #E6E6E6',
    borderBottom: '1px solid #E6E6E6',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 151,
  },
});

class PostMedia extends React.Component {
  constructor(props) {
    super(props);
    const { og, url, setMedia = () => {} } = props;
    this.state = {
      url,
      title: og.title,
      description: og.description,
      image: og.image,
      video: og.video,
    }
    setMedia(this);
  }

  onClick = () => window.open(this.state.url, '_blank');

  render() {
    const { classes } = this.props;
    const { title, description, image } = this.state;
    return (
        <div className={classes.card} onClick={this.onClick}>
            { image && <CardMedia
                className={classes.cover}
                image={image}
                title="Live from space album cover"
            /> }
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography variant="headline">{title}</Typography>
                    <Typography variant="subheading" color="textSecondary">
                        {description}
                    </Typography>
                </CardContent>
            </div>
        </div>
    );
  }
}

PostMedia.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  og: PropTypes.object.isRequired,
  setMedia: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(PostMedia);