import { fade } from '@material-ui/core/styles/colorManipulator';
import { nominalTypeHack } from 'prop-types';

const styles = theme => ({
    root: {
      width: '100%',
    },
    grow: {
      flexGrow: 1,
    },
    menuButtons: {
      marginRight: theme.spacing.unit,
    },
    title: {
      display: 'block',
      marginRight: theme.spacing.unit,
    },
    link: {
      color: '#FFF',
      textDecoration: 'none',
    },
    toolbar: {
      maxWidth: 700,
    },
    bold: {
      fontWeight: 'bolder',
    },

    /* Search start */
    searchMobileHide: { // should add a search icon, that show input field (over icon) and focus, on blur it hide again
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit,
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 7,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 7,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 150,
        '&:focus': {
          width: 220,
        },
      },
    },
    /* Search end */
});

export default styles;