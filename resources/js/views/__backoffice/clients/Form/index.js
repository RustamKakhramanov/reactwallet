import React, {useContext }from 'react';
import { Client } from '../../../../models';
import Info from './Info';
import LayoutSelect from './LayoutSelect';
import ClientContext from '../ClientContext';
import * as NavigationUtils from '../../../../helpers/Navigation';

import {
    Button,
    Grid,
    withStyles,
} from '@material-ui/core';

function Form(props){
    const {setMessage, self, client, history} = useContext(ClientContext);
    const {update} = props;
    const submitForm = (e) =>{
        e.preventDefault();
        //alert(1)
        let formData = new FormData(e.target);
        let  resp = update ? Client.update(client.id, formData) : Client.create(formData);
        resp.then(res => {
            if(update){
                setMessage({
                    type: 'success',
                    body: Lang.get(`resources.data_updated`, {name:Lang.get(`content.titles.client`)}),
                    closed: () => setMessage({}),
                });
            }else{
                history.push(
                    NavigationUtils.route(
                        'backoffice.clients.show',
                        {
                            id: res.data,
                        },
                    ),
                );
            }

            //setMessage({
            //     type: 'success',
            //     body: Lang.get(`settings.${msg}`),
            //     closed: () => Panel.setMessage({}),
            // });
        }).catch(error => {
            console.log(error)
                // setMessage({
                //     type: 'error',
                //     body: error.response.data,
                //     closed: () => setMessage({}),
                // });
            });
    };

    return (
        <form id='form' method="POST" onSubmit={e => submitForm(e)}>
            <Grid container spacing={24 } justify={!self ? 'space-around' : 'center' }>
                <Info client={client}/>
                {self ?
                    self &&  <input type='hidden' name='self' value={true}/>
                    :
                    <LayoutSelect/>
                }
            </Grid>
            <Grid container spacing={24} justify='center'>
                <Grid item>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        {Lang.get('actions.submit')}
                    </Button>
                </Grid>
            </Grid>
        </form>
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

export default withStyles(styles)(Form);