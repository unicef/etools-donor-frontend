import { makeStyles, createStyles } from '@material-ui/styles';

const useFilterStyles = makeStyles(theme =>
  createStyles({
    filterContainer: {
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
      background: theme.palette.primary['A100']
    },
    button: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'flex-end'
    },
    filterIcon: {
      fontSize: 20,
      height: 20,
      paddingRight: theme.spacing(1),
      width: 20,
      boxSizing: 'initial'
    },
    filterBtn: {
      cursor: 'pointer',
      padding: '0 16px 0 12px',
      borderRadius: 14,
      backgroundColor: '#e5eaf0',
      fontWeight: 400,
      lineHeight: `${theme.spacing(3)}px`
    },
    textField: {
      marginRight: theme.spacing(2)
    },
    formBtn: {
      fontSize: '0.875rem',
      marginLeft: theme.spacing(1)
    },
    formControl: {
      width: '100%'
    },
    placeholder: {
      overflowX: 'hidden',
      textOverflow: 'ellipsis',
      color: 'currentColor',
      opacity: theme.palette.type === 'light' ? 0.42 : 0.5,
      font: 'inherit',
      transition: theme.transitions.create('opacity', {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.ease
      })
    },
    chips: {
      '& > *': {
        margin: `0 ${theme.spacing(0.5)}px`,
        height: 28
      }
    }
  })
);
export default useFilterStyles;
