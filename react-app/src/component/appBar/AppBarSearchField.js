import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';

import styles from './AppBarStyle';

const AppBarSearch = ({ classes, onSearch, title = null }) => (
    <div className={classes.search}>
        <div className={classes.searchIcon}>
        <SearchIcon />
        </div>
        <Input
        placeholder={ title || 'Search…' }
        disableUnderline
        classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
        }}
        onChange={onSearch}
        />
    </div>
);

AppBarSearch.propTypes = {
  classes: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default withStyles(styles)(AppBarSearch);