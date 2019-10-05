import { makeStyles, createStyles } from '@material-ui/styles';

const useFilterStyles = makeStyles(theme =>
  createStyles({
    filterContainer: {
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
      background: theme.palette.primary[300]
    },
    button: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'flex-end'
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
