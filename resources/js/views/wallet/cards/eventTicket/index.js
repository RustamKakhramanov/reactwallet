import React, {useContext, useState} from 'react';
import Primary from '../../fields/Primary';
import Auxiliary from '../../fields/Auxiliary';
import Secondary from '../../fields/Secondary';
import Footer from '../../fields/Footer';
import {WalletContext} from '../../store/WalletContext';

function EventTicket(props) {
    const {styleCard} = useContext(WalletContext);
    return (
        <div className='event-ticket card' style={styleCard}>
            <input type="hidden" name='card[type]' value='eventTicket'/>

        </div>
    );
}
export default EventTicket;
