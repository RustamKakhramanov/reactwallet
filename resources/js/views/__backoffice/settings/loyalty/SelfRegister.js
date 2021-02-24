import React, { useState, useEffect, useContext } from 'react';
import { Setting } from '../../../../models';
import InputMask from 'react-input-mask';
import {
    withStyles,
    Paper,
    Grid,
    TextField,
    FormControl,
    Button,
} from '@material-ui/core';


function SelfRegister(props) {
    const {
        classes,
        setMessage,
    } = props;

    const [settings, setSetting] = useState({
        discount: 0,
        balance: 0,
        transactions: false
    });
    const [returnSetting, changeReturn] = useState(false)
    const handleOnChange = event => {
        const { name, value } = event.target;
        setSetting({ ...settings, [name]: value });
      };

    useEffect(() => {
        let data = Setting.getOptions('loyalty');
        if(!returnSetting)
            data.then(res => {
                if(res.data)
                setSetting(res.data);
                changeReturn(true);
            });
    },[settings]);

    const handleSubmit = e => {
        e.preventDefault();
        let data = {
            discount: settings.discount,
            balance: settings.balance,
        };
        Setting.save('loyalty', data).then(res => {
            setMessage({
                type: 'success',
                body:  Lang.get('content.successSave'),
                closed: () => setMessage({}),
            });
        });
    }

    return (
        <Paper elevation={3} className={classes.paper} container direction='column'>
            <h4 className='text-center'>{Lang.get('navigation.setting.changePackage')}</h4>
            <Grid className='mt-2 col-md-4'>
                <form onSubmit={handleSubmit}>
                    <FormControl className={classes.formControl}>
                        <InputMask mask="99%" 
                            value={settings.discount}
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
                            value={settings.balance}
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
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className='mt-4'
                    >
                        {Lang.get('actions.save')}
                    </Button>
                </form>
            </Grid>
        </Paper>
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
    paper: {
        padding: '30px'
    },
     root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
      }
});

export default withStyles(styles)(SelfRegister);
