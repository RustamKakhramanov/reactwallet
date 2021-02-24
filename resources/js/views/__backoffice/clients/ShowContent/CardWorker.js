import React, {useState, useContext} from 'react';
import { Client } from '../../../../models';
import ClientContext from '../ClientContext';
import {handleChange} from '../../../../helpers/ClientWorker';
import {
    TextField,
    Fab,
    Icon,
    Switch,
    FormControl,
    FormControlLabel,
    FormGroup,
    Button,
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
export default function CardWorker(props){
    const {client, changeModal} = useContext(ClientContext);
    const [visibleForm, changeVisibleForm] = useState(false);
    const [formtype, changeTypeForm] = useState(null);
    const [balance, changeBalance] = useState();
    const [transactions, changeTransactions] = useState(client.card.transactions ? true : false);

    const showForm = type => {
        changeTypeForm(type);
        changeVisibleForm(!visibleForm);
        changeBalance('')
    }

    const submitValue = async e => {
        e.preventDefault();
       // console.log(client.id,formtype, balance)
       if(balance){
        let data = await handleChange(client.id, formtype, balance);
        if(data !== false){
            client.balance = data;
            changeVisibleForm(false);
        }else{
            alert(Lang.get('validation.minus_balance'));
        }
       }else {
            alert(Lang.get('actions.changeValue'));
       }
 
    }
    const showTransact = () => {
        handleChange(client.id, 'transactions', client.card.transactions ? false : true);
        changeTransactions(!transactions)
    }

    return (
        <div>
            {client.balance >= 0  &&
                <div className='balance-container ml-3'>
                    <div className='balance-content mt-4'>
                            <div className='text-secondary'>
                                {Lang.get('content.client.labels.balance')}:
                            </div>
                    </div>
                        {
                            visibleForm ?
                                <form onSubmit={e => submitValue(e)}>
                                    <div className='flex items-center mt-2'>
                                        <FormControl>
                                            <TextField
                                                id="filled-number"
                                                label={Lang.get('actions.changeValue')}
                                                type="number"
                                                value={balance}
                                                onChange={e => changeBalance(e.target.value)}
                                            />
                                        </FormControl>
                                        <Fab color="primary" type='submit' size="small" aria-label="plus" className='ml-4'>
                                            <CheckIcon />
                                        </Fab>
                                        <Fab color="secondary" size="small" aria-label="minus" className='ml-2'
                                            onClick={() => changeVisibleForm(false)}
                                        >
                                            <CloseIcon />
                                        </Fab>
                                    </div>
                                </form>
                            :
                                <div className='flex items-center mt-2'>
                                    <div className='value font-bold '>
                                        <span className='h3'> {Lang.get('content.сurrency')} </span> <span className='h1'>{client.balance}</span>
                                    </div>
                                    <div className='ml-3'>
                                        <Fab color="primary" size="small" aria-label="plus" className='ml-2'
                                            onClick={() => showForm('plus_balance')}
                                        >
                                            <AddIcon />
                                        </Fab>
                                        <Fab color="secondary" size="small" aria-label="minus" className='ml-2'
                                            onClick={() => showForm('minus_balance')}
                                        >
                                            <RemoveIcon />
                                        </Fab>
                                    </div>
                                </div>
                        }
                </div>
                
            }
            
            <div className='options mt-3'>
                <FormControl component="fieldset">
                    <FormGroup aria-label="position" row>
                    <FormControlLabel
                        control={
                            <Switch
                                defaultChecked={client.card.transactions ? true : false}
                                onChange={() => showTransact()}
                                color="primary"
                                inputProps={{ 'aria-label': 'checkbox with default color' }}
                            />
                        }

                        label={Lang.get('actions.transactions')}
                        labelPlacement="start"
                    />
                    </FormGroup>
                </FormControl>
            </div>
            <div className="flex flex-column items-start">

                <Button variant="contained" className="flex items-center ml-3 mt-4" color="primary" onClick={() => changeModal('push')}>
                        {Lang.get('content.card.send_push')}  <SendIcon  className='ml-2'/> 
                </Button>
                {
                    transactions &&
                    <div className="flex flex-column items-start mt-4">
                        <Button variant="outlined" className="flex items-center ml-3 mt-1" color="primary" onClick={() => alert(Lang.get('content.demo'))}>
                            {Lang.get('actions.show_transactions')}  <AssignmentIcon  className='ml-2'/> 
                        </Button>
                        <Button variant="outlined" className="flex items-center ml-3 mt-2" color="primary" onClick={() => alert(Lang.get('content.demo'))}>
                            {Lang.get('actions.add_transactions')}  <AddIcon  className='ml-2'/> 
                        </Button>
                    </div>
                }  
                </div>
        </div>
    );
}