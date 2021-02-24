import React, {useContext, useState} from 'react';
import Primary from '../../fields/Primary';
import Auxiliary from '../../fields/Auxiliary';
import Secondary from '../../fields/Secondary';
import Footer from '../../fields/Footer';
import {WalletContext} from '../../store/WalletContext';

export default function boardingPass(props) {
    const {styleCard} = useContext(WalletContext);
    return (
        <div className='boarding-pass card' style={styleCard}>
            <input type="hidden" name='card[type]' value='boardingPass'/>
            <Primary type='dual'/>
            <Auxiliary/>
            <Secondary/>
            <Footer/>
        </div>
    );
}


