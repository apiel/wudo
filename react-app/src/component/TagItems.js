import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit / 2,
    height: 17,
    fontSize: 11,
  },
});

class ChipsArray extends React.Component {
  render() {
    const { classes, tags, onClick = () => () => {} } = this.props;

    return (
      <div className={classes.root}>
        {tags.map(({ idTag, name, active = false }) => {
          const color = active ? 'primary' : 'default';
          return (
            <Chip
              key={idTag}
              label={name}
              className={classes.chip}
              color={color}
              onClick={onClick(idTag)}
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
  onClick: PropTypes.func,
};

export default withStyles(styles)(ChipsArray);
