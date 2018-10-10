import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Events from 'events';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
});

export const events = new Events();
export const action = {
    open: 'open',
    error: 'error',
}

class SimpleSnackbar extends React.Component {
  state = {
    open: false,
    class: '',
    message: '',
  };

  constructor(props) {
    super(props);
    events.on(action.open, this.eventOpen);
    events.on(action.error, this.eventError);
  }

  eventOpen = (message) => {
    this.setState({ open: true, class: '', message });
  }

  eventError = (message) => {
    this.setState({ open: true, class: this.props.classes.error, message });
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={4000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
        >
          <SnackbarContent
            className={this.state.class}
            message={<span id="message-id">{this.state.message}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </Snackbar>
    );
  }
}

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSnackbar);