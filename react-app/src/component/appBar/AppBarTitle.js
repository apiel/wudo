import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import { urls } from '../../Routes';

const AppTittle = ({ classes, title = 'WTF.youdo', link = urls.home }) => (
    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
        <Link to={link} className={classes.link}>{title}</Link>
    </Typography>
);

AppTittle.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  link: PropTypes.string,
};

export default AppTittle;