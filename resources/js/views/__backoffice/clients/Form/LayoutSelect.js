import React, {useState, useContext} from 'react';
import LayoutsListDialog from './LayoutsListDialog';
import LayoutCard from './LayoutCard';
import ClientContext from '../ClientContext';

import {
    Button,
    Grid,
} from '@material-ui/core';

export default function LayoutSelect(props) {
    const {layoutDB} = useContext(ClientContext);
    const [layout, setLayout] = useState(layoutDB);
    const [open, changeOpen] = useState(false);

    return (
        <Grid item xs={12} sm={5}  container
            direction="column"
            justify="space-around"
            alignItems="center"
        > 
            {layout?  
                <div>
                    <h4>Текущий шаблон для карты клиента</h4>
                </div>
                :
                <div>
                    <h4>Выберите шаблон для карты клиента</h4>
                </div>
            }
            {layout && 
                <div>
                    <input type='hidden' name='layout_id' value={layout.id}/>
                    <LayoutCard layout = {layout}/>
                </div>
            }
                <Button variant="outlined" color="secondary" onClick={() => changeOpen(true)} >
                    {layout ? Lang.get('actions.rechangeLayout') : Lang.get('actions.changeLayoutButton')}
                </Button>
            <LayoutsListDialog setLayout = {setLayout}  open = {open}  changeOpen = {changeOpen}/>
        </Grid>
    )
}