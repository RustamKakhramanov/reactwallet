import React, {useState, useContext }from 'react';
import ClientContext from '../ClientContext';
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

function Info(props){
    const {classes} = props;
    const {client} = useContext(ClientContext);
    const [inputValues, setInputValues] = useState(client);
      
      const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
      };

    return (
        <Grid item xs={12} sm={4}>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="name" required>
                    {Lang.get('content.client.name')}
                </InputLabel>
                <Input
                    id="name"
                    name="name"
                    value={inputValues.name}
                    onChange={handleOnChange}
                    fullWidth
                    required
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputMask mask="+7(999) 999 99-99"
                 onChange={handleOnChange}
                value={inputValues.phone}
                >
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
                <InputMask mask="99%" 
                    value={inputValues.discount}
                    onChange={handleOnChange}
                >
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
                <InputMask mask={`9999999 ${Lang.get('content.сurrency')}`} 
                    value={inputValues.balance}
                    onChange={handleOnChange}
                >
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

export default withStyles(styles)(Info);