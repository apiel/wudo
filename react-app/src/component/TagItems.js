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
    const { classes, tags, onClick = () => () => {}, activeTitle = '', inactiveTitle = '' } = this.props;

    return (
      <div className={classes.root}>
        {tags.map(({ idTag, name, active = false }) => {
          const color = active ? 'primary' : 'default';
          const title = active ? activeTitle : inactiveTitle;
          return (
            <Chip
              key={idTag}
              label={name}
              className={classes.chip}
              color={color}
              onClick={onClick(idTag)}
              title={title}
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
  activeTitle: PropTypes.string,
  inactiveTitle: PropTypes.string,
};

export default withStyles(styles)(ChipsArray);
