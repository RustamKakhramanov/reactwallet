import React, {useState, useEffect, useContext} from 'react';
import ClientContext from '../ClientContext';
import CropOriginal from '@material-ui/icons/CropOriginal';
import { Wallet } from '../../../../models/Wallet';
import BrushOutlinedIcon from '@material-ui/icons/BrushOutlined';
import {
    Dialog,
    DialogTitle,
    ListItemText,
    ListItemAvatar,
    ListItemIcon,
    ListItem,
    List,
    Avatar,
} from '@material-ui/core';

export default function LayoutsListDialog(props) {
    const [layouts, setLayouts] = useState(false);
    const {setLayout, open, changeOpen} = props;
    const {history} = useContext(ClientContext);
    useEffect(() => {
        //console.log(layouts)
        if (layouts) {
            return;
        }
        let data = Wallet.paginated();
        data.then(res => {
            if(res.data)
                setLayouts(res.data)
        });
    });

    const handleClose = () => {
        changeOpen(false);
    };

    const changeLayout = item => {
        setLayout(item);
        changeOpen(false)
    };
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullWidth={true}>
        <DialogTitle id="simple-dialog-title">{Lang.get(`actions.${layouts.length !== 0 ? 'changeLayout': 'not_layouts'}`)}</DialogTitle>
        <List>
        {layouts.length !== 0 && layouts?
            layouts.map((item, key) => (
                <ListItem button onClick={() => changeLayout(item)} key = {key}>
                    <ListItemAvatar>
                    <Avatar>
                        <CropOriginal />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.title} />
                    <ListItemText primary={Lang.get(`content.wallet.${item.type}`)} />
                    <ListItemText primary={item.created_at} />
                </ListItem>
            ))
            :
            <ListItem container justify='center' button onClick={() => history.push('/wallet/layout/create')} variant="outlined" color="secondary">
                <ListItemIcon>
                    <BrushOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={Lang.get(`actions.create_layout`) } />
            </ListItem>
        }
        </List>
      </Dialog>
    );
}