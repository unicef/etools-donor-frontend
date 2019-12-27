import { makeStyles, createStyles } from '@material-ui/styles';
import clsx from 'clsx';

const useFilterStyles = makeStyles(theme =>
  createStyles({
    filterContainer: {
      borderRadius: 8,
      padding: `${theme.spacing(3)}px ${theme.spacing(2)}px ${theme.spacing(2)}px `,
      background: theme.palette.common.white
    },
    button: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'flex-end'
    },
    filterComponents: {
      margin: 0
    },
    filterIcon: {
      fontSize: 20,
      height: 20,
      paddingRight: theme.spacing(1),
      width: 20,
      boxSizing: 'initial'
    },
    filterBox: {
      margin: `0 ${theme.spacing(2)}px ${theme.spacing(3)}px 0 `,
      maxWidth: 400
    },
    btn: {
      backgroundColor: '#e5eaf0'
    },
    selectMenu: {
      borderRadius: 8,
      lineHeight: '24px',
      padding: 4
    },
    filterBtn: {
      cursor: 'pointer',
      padding: '4px 16px 4px 12px',
      fontWeight: 400,
      marginTop: theme.spacing(1),
      fontSize: 14,
      borderRadius: 14,
      lineHeight: `${theme.spacing(3)}px`,
      border: `1px solid #e5eaf0;`
    },
    filterMenu: {
      marginRight: 32
    },
    textField: {
      marginRight: theme.spacing(2)
    },
    formBtn: {
      fontSize: '0.875rem',
      marginLeft: theme.spacing(1)
    },
    formControl: {
      width: '100%',
      marginTop: `-${theme.spacing(2)}px`
    },
    formControlLabel: {
      left: theme.spacing(1)
    },
    labelShrink: {
      left: 0
    },
    disabled: {
      opacity: 0.5
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
    },
    checkBox: {
      padding: 0,
      margin: `0 ${theme.spacing(2)}px 0 0 `,
      height: 18,
      width: 18
    },
    loneLabel: {
      marginBottom: theme.spacing(1.5),
      '&.hidden': {
        visibility: 'hidden'
      }
    }
  })
);
export default useFilterStyles;

export const useGetFilterClasses = () => {
  const classes = useFilterStyles();

  const labelClasses = {
    formControl: classes.formControlLabel,
    shrink: classes.labelShrink
  };

  const labelProps = {
    classes: labelClasses
  };

  const selectProps = {
    classes: {
      selectMenu: clsx(classes.btn, classes.selectMenu)
    },
    disableUnderline: true
  };

  return { classes, labelProps, selectProps };
};
