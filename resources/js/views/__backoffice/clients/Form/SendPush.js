import React, {useState, useContext }from 'react';
import ClientContext from '../ClientContext';
import { Client } from '../../../../models';
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

function SendPush(props){
    const {classes, client, setMessage, showModal} = props;
    const[pushBody, changePushBody] = useState('');
    const sendPush = e => {
        e.preventDefault();
        if(!pushBody){
            return;
        }
        let data = {body: pushBody};
        let resp = Client.sendPush(client ? client.id : false, data);
        resp.then(res => {
                setMessage({
                    type: 'success',
                    body: Lang.get(`resources.successPush`),
                    closed: () => setMessage({}),
                });
                showModal(false);
        }).catch(error => {
                setMessage({
                    type: 'error',
                    body: error.response.data,
                    closed: () => setMessage({}),
                });
            });
    }

    return (
        <Grid item xs={12} sm={12}>
            <FormControl className={classes.formControl}>
                <TextField
                    label= {Lang.get('actions.pushContent')}
                    name="pushBody"
                    margin="normal"
                    multiline
                    rows="4"
                    type="text"
                    value={pushBody}
                    onChange={(e) => changePushBody(e.target.value)}
                    variant="outlined"
                />
            </FormControl>
            <Grid container spacing={24} justify='center'>
                <Grid item>
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={(e) => sendPush(e)}
                    >
                        {Lang.get('actions.submit')}
                    </Button>
                </Grid>
            </Grid>
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

export default withStyles(styles)(SendPush);