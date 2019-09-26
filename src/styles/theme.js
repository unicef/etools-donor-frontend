import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/deepPurple';
import grey from '@material-ui/core/colors/grey';

const getColorTheme = () => ({ ...purple, 500: '#6B5CA5' });

export default createMuiTheme({
    palette: {
        primary: { ...grey, strong: '#233944' },
        secondary: purple,
        success: {
            primary: '#72C300',
            secondary: '#BEF078'
        },
        common: {
            arrayFormOuter: '#F5F5F5',
            arrayFormInner: '#E0E0E0',
            lightGreyBackground: '#F5F5F5',
            darkGreyBackground: '#EEEEEE',
            statusOk: '#189a58',
            orange: '#F39C38',
            purple: '#A996D8',
            blue: '#87B0EE',
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
    typography: {
        fontSize: 20
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
        MuiListItem: {
            default: {
                paddingTop: '1.5em',
                paddingBottom: '1.5em'
            },
            gutters: {
                paddingLeft: '16px',
                paddingRight: '16px'
            }
        },
        MuiTypography: {
            headline: {
                color: 'inherit'
            },
            root: {
                wordBreak: 'break-word'
            }
        },
        MuiFormLabel: {
            root: {
                color: 'rgba(0, 0, 0, 0.34)',
                zIndex: 1,
                transform: 'scale(0.75)',
                transformOrigin: 'left top',
                pointerEvents: 'none',
                '&focused': {
                    color: 'rgba(0, 0, 0, 0.34)'
                }
            }
        },
        MuiInput: {
            input: {
                'label + $formControl > &': {
                    opacity: 0.5
                }
            }
        },
        MuiTableCell: {
            paddingDefault: {
                '&:not(:first-child)': {
                    paddingLeft: '8px'
                }
            }
        },
        MuiDefaultTab: {
            fontWeight: 400
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
