import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit*5,
    },
    span: {
        marginLeft: theme.spacing.unit*2,
    },
});

const Footer = ({ classes }) => (
  <div className={classes.root}>
    <span className={classes.span}>
        <a className="github-button" href="https://github.com/apiel/wudo" data-size="large" aria-label="Star apiel/wudo on GitHub">Star</a>
    </span>
    <span className={classes.span}>
        <a className="github-button" href="https://github.com/apiel/wudo/fork" data-size="large" aria-label="Fork apiel/wudo on GitHub">Fork</a>
    </span>
    <span className={classes.span}>
        <a className="github-button" href="https://github.com/apiel/wudo/issues" data-size="large" data-show-count="true" aria-label="Issue apiel/wudo on GitHub">Issue</a>
    </span>
    <script async defer src="https://buttons.github.io/buttons.js"></script>
  </div>
);

export default withStyles(styles)(Footer);