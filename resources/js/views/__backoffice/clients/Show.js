import React, { useState, useEffect} from 'react';
import {Master as MasterLayout} from '../layouts';
import ClientContext from './ClientContext';
import Form from './Form/index';
import SendPush from './Form/SendPush';
import { Client } from '../../../models';
import { CardWorker } from './ShowContent';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Smartphone from '@material-ui/icons/Smartphone';
import InputMask from 'react-input-mask';
import RedeemIcon from '@material-ui/icons/Redeem';
import EditIcon from '@material-ui/icons/Edit';
import {
    withStyles,
    Paper,
    ListItem,
    List,
    ListItemIcon,
    Dialog,
    DialogTitle,
    DialogContent,
    ListItemText,
    Button,
    Grid,
} from '@material-ui/core';
//TODOoСценарий генерации карты, несколько карт
//Отправить пуши
//Отправить клиенту карту
function Show(props) {
        const [message, setMessage] = useState({});
        const { classes, ...other} = props;
        const { history} = props;
        const [client, setClient] = useState(false);
        const [modal, showModal] = useState(false);
        const [modalType, changeTypeModal] = useState('form');
        const [layoutDB, setLayout] = useState({});
        let params = props.match

        useEffect(() =>{
            if(client)
                return;
           let  id = params.params.id;
           fetchClient(id);
          // setClient()
        }, [client]);

        const changeModal = type => {
            changeTypeModal(type);
            showModal(true);
        }

        const fetchClient = async id => {
            let client =  await Client.show(id)
            setClient(client)
            setLayout(client.layout)
           // console.log(client)
        };

        const renderCard = () =>{
            if(!client.card){
                return (
                    <div>
                        {Lang.get('content.client.not_card')}
                    </div>
                    );
            }else if(!client.card.device){
                return (
                    <div className='pl-3'>
                        <div>{Lang.get('content.client.not_device')}</div>
                        <div>{Lang.get('resources.cardLink')}</div>
                        <div class="test-link mt-2">{window.location.hostname}/download-card/{client.card.id}</div>
                    </div>);
            }else{
                return(
                    <div>
                        <CardWorker/>
                    </div>
                );
            }
        };

        return (
            <MasterLayout
                {...other}
                pageTitle = {Lang.get('content.titles.showClient', {'client': client.name})}
                tabs={[]}
                message={message}
            >
            <ClientContext.Provider
                value={{setClient, client, setMessage, history, layoutDB}}
            >
                <Dialog onClose={()=> showModal(false)} aria-labelledby="simple-dialog-title" open={modal} maxWidth={modalType == 'form'? 'lg' : 'sm' }  fullWidth={true}>
                    <DialogContent>
                           {modalType == 'form'? <Form update={true}/> : <SendPush client={client} setMessage={setMessage} showModal = {showModal}/> }
                    </DialogContent>
                </Dialog>
                <Grid className={classes.pageContentContainer} container  justify='space-around'>
                    <div className={classes.pageContentWrapper} >
                        <Paper>
                            <div className={classes.pageContent}>
                                <Grid container spacing={24 } justify={ 'space-around'}>
                                <ClientContext.Provider  value={{client, changeModal}} >
                                    <Grid item xs={12} sm={6}>
                                        <h3 className='mb-2'>{Lang.get('content.client_info')}</h3>
                                        <Grid item >
                                            <List component="nav">
                                                <ListItem >
                                                    <ListItemIcon>
                                                        <AccountBoxIcon fontSize="large" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={Lang.get('content.client.name')} secondary={client.name}/>
                                                </ListItem>
                                                <ListItem >
                                                    <ListItemIcon>
                                                        <Smartphone fontSize="large" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={Lang.get('content.client.phone')} secondary={client.phone}/>
                                                </ListItem>
                                                {
                                                    client.discount &&
                                                        <ListItem >
                                                        <ListItemIcon>
                                                            <RedeemIcon/>
                                                        </ListItemIcon>
                                                        <ListItemText primary={Lang.get('content.wallet.labels.discount')} secondary={client.discount+' %'}/>
                                                    </ListItem>
                                                }
                                            </List>
                                        </Grid>
                                        <Button variant="outlined" className="flex items-center ml-3 " color="secondary"  onClick={()=>changeModal('form')}>
                                            {Lang.get('actions.edit')}  <EditIcon  className='ml-2'/>
                                        </Button>

                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <h3 className='mb-2'>{Lang.get('content.card_info')}</h3>
                                        {renderCard()}
                                    </Grid>
                                </ClientContext.Provider>

                                </Grid>
                            </div>
                        </Paper>
                    </div>
                </Grid>
            </ClientContext.Provider>
        </MasterLayout>
    );
}

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        minHeight: '75vh',
    },
    listItem:{
        marginTop: '20px',
    },
    pageContentWrapper: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        minHeight: '75vh',
        overflowX: 'auto',
    },
    pageContent: {
        padding: theme.spacing.unit * 7,
    },
    pageContentContainer: {
        width:'100%',
    },
});

export default withStyles(styles)(Show);
