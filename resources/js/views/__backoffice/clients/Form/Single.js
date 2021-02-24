import React, {useEffect, useState }from 'react';
import ClientContext from '../ClientContext'
import InputMask from 'react-input-mask';
import {
    Button,
    FormControl,
    FormHelperText,
    Input,
    Grid,
    InputLabel,
    TextField,
    withStyles,
} from '@material-ui/core';

export default function Single(props){
    const {classes, value} = props;
    const [inputValue, ChangeInputValue] = useState(false);
    useEffect(() => {

    });

    return (
        <Grid item xs={12} sm={4}>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name" required>
                    {Lang.get('content.client.name')}
                </InputLabel>
                <Input
                    id="name"
                    name="name"
                    fullWidth
                    required
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputMask mask="+7(999) 999 99-99" >
                {() => <TextField ref="phone"
                            label={Lang.get('content.client.phone')}
                            name="phone"
                            margin="normal"
                            type="text"
                            required
                            id='phone'
                            />
                        }
                </InputMask>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputMask mask="99%" >
                {() => <TextField
                            label= {Lang.get('content.wallet.labels.discount')}
                            name="discount"
                            margin="normal"
                            type="text"
                            />
                        }
                </InputMask>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputMask mask={`9999999 ${Lang.get('content.сurrency')}`} >
                {() => <TextField
                            label= {Lang.get('content.wallet.labels.balance')}
                            name="balance"
                            margin="normal"
                            type="text"
                            />
                        }
                </InputMask>
            </FormControl>
        </Grid>
    );
}
const styles = theme => ({
    formControl: {
        minWidth: '100%',
        marginTop: '30px'
    },

    required: {
        color: theme.palette.error.main,
    },
});
