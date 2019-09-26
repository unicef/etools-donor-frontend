import React from 'react';
import { ButtonBase, makeStyles, createStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme =>
    createStyles({
        basse: {
            padding: 8,
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: 'transparent',
            color: 'inherit'
        },
        text: {
            marginLeft: 8
        }
    })
);

export default function IconTextButton({ onClick, icon, text, textProps }) {
    const classes = useStyles();
    return (
        <ButtonBase className={classes.base} aria-label={text} onClick={onClick} disableRipple>
            {icon}
            <Typography className={classes.text} color="inherit" {...textProps}>
                {text || ''}
            </Typography>
        </ButtonBase>
    );
}
