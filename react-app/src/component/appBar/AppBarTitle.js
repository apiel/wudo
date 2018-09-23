import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const AppTittle = ({ classes, profile }) => (
    <Typography className={classes.title} variant="title" color="inherit" noWrap>
        <Link to="/" className={classes.link}>WUDo</Link>
    </Typography>
);

AppTittle.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AppTittle;