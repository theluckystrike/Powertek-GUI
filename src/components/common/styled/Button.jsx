import React from 'react';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

function MuiButton(props) {

    return (
        <Button
            variant={props.variant || 'contained'}
            color={props.color || 'primary'}
            size={props.size || 'medium'}
            onClick={props.onClick}
            sx={{
                width: "10%",
                padding: "8px 20px",
                ...props.sx, // Allow additional custom styles to be passed
            }}
        >
            {props.children}
        </Button>
    );
}

export default MuiButton;