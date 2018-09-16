import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
// import Paper from '@material-ui/core/Paper';
// import TagFacesIcon from '@material-ui/icons/TagFaces';

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit / 2,
    height: 17,
    fontSize: 11,
  },
});

class ChipsArray extends React.Component {
  render() {
    const { classes, tags } = this.props;

    return (
      <div className={classes.root}>
        {tags.map(({ idTag, name }) => {
          return (
            <Chip
              key={idTag}
              label={name}
              className={classes.chip}
            />
          );
        })}
      </div>
    );
  }
}

ChipsArray.propTypes = {
  classes: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
};

export default withStyles(styles)(ChipsArray);
