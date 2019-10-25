import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';

const getColorTheme = () => ({ ...blue, 500: '#0099FF' });
blue['A400'] = '#0199ff';
grey['A100'] = '#e5eaf0';

export default createMuiTheme({
  palette: {
    primary: { ...grey, strong: '#233944' },
    secondary: blue,
    success: {
      primary: '#72C300',
      secondary: '#BEF078'
    },
    background: {
      default: '#f5f7f9'
    },
    common: {
      arrayFormOuter: '#F5F5F5',
      arrayFormInner: '#E0E0E0',
      lightGreyBackground: '#F5F5F5',
      darkGreyBackground: '#EEEEEE',
      statusOk: '#189a58',
      orange: '#F39C38',
      purple: '#A996D8',
      blue: '#0099FF',
      green: '#72C300',
      gray: '#F6F6F6',
      lightGreen: '#ADEAC0',
      formLabel: 'rgba(0, 0, 0, 0.34)',
      grayText: '#757575'
    },
    eoiStatus: {
      completed: '#5B92E5',
      closed: '#233944',
      open: '#72C300',
      draft: '#A1A1A1'
    },
    userStatus: {
      invited: '#FF6D00',
      active: '#8BC34A',
      deactivated: '#263238'
    },
    dateColors: {
      dark: '#233944',
      green: '#72C300',
      red: '#EA4022',
      blue: '#0099FF',
      orange: '#fec832'
    },
    flags: {
      observation: '#A1A1A1',
      red: '#D50000',
      yellow: '#FFC400',
      escalated: '#FFA000',
      background: '#E5E5E5'
    }
  },
  overrides: {
    MuiList: {
      root: {
        width: '100%'
      },
      padding: {
        paddingTop: 0,
        paddingBottom: 0
      }
    },
    MuiLink: {
      root: {
        fontWeight: 500,
        cursor: 'pointer',
        '&:hover': {
          textDecoration: 'none'
        }
      }
    },
    MuiMenuItem: {
      root: {
        fontSize: '14px',
        minHeight: 24
      },
      gutters: {
        paddingLeft: '16px',
        paddingRight: '16px'
      }
    },
    MuiFormLabel: {
      root: {
        color: 'rgba(0, 0, 0, 0.34)',
        zIndex: 1,
        transform: 'scale(0.75)',
        transformOrigin: 'left top',
        pointerEvents: 'none',
        fontSize: '1rem',
        // transform: 'scale(1)',
        '&focused': {
          color: 'rgba(0, 0, 0, 0.34)'
        }
      }
    },
    MuiInput: {
      // input: {
      //   'label + $formControl > &': {
      //     lineHeight: '1.25rem',
      //     padding: '8px'
      //   }
      // }
    },
    MuiTableCell: {
      root: {
        paddingDefault: {
          '&:not(:first-child)': {
            paddingLeft: '8px'
          }
        }
      }
    },
    MuiTab: {
      rootLabelIcon: {
        height: '48px'
      }
    },
    MuiRadio: {
      root: {
        '&checked': {
          color: getColorTheme()[500]
        }
      }
    },
    MuiCheckbox: {
      root: {
        '&checked': {
          color: getColorTheme()[500]
        },
        '&disabled': {
          color: getColorTheme()[200]
        }
      }
    }
  }
});
