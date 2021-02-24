import React, {useContext, useState} from 'react';
import PrimaryImage from '../../fields/PrimaryImage';
import Primary from '../../fields/Primary';
import Auxiliary from '../../fields/Auxiliary';
import {WalletContext} from '../../store/WalletContext';

export default function Coupon(props) {
    const {styleCard} = useContext(WalletContext);
    return (
        <div className='coupon card'  style={styleCard}>
            <input type="hidden" name='card[type]' value='coupon'/>
            <PrimaryImage>
                <Primary type={false}/>
            </PrimaryImage>
            <Auxiliary/>
        </div>
    );
}
