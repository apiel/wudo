import React from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

import postCardStyles from '../../../styles/card.style';

const styles = theme => merge(postCardStyles(theme), {
    button: {
      margin: theme.spacing.unit,
    },
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
});

const PostFormButton = ({ classes, loading }) => (
    <CardActions className={classes.actions} disableActionSpacing>
        <Button
        variant="contained"
        color="primary"
        className={classes.button}
        type="submit"
        disabled={loading}
        >
            Post
            {loading ?
            'ing...'
            : (<Icon className={classes.rightIcon}>send</Icon>)
            }
        </Button>
    </CardActions>
);

PostFormButton.propTypes = {
    classes: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default withStyles(styles)(PostFormButton);
