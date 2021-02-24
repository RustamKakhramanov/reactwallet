import React, {useContext, useState} from 'react';
import Primary from '../../fields/Primary';
import Auxiliary from '../../fields/Auxiliary';
import {WalletContext} from '../../store/WalletContext';

function Generic(props) {
    const {styleCard} = useContext(WalletContext);

    return (
        <div className='generic-card card'  style={styleCard}>
            <input type="hidden" name='card[type]' value='generic'/>
            <Primary type='thumbnail'/>
            <Auxiliary/>
        </div>
    );
}

export default Generic;
