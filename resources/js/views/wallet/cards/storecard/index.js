import PrimaryImage from '../../fields/PrimaryImage';
import Primary from '../../fields/Primary';
import React, {useContext } from 'react';
import {WalletContext} from '../../store/WalletContext';
import Secondary from '../../fields/Secondary';

function StoreCard(props) {
    const {styleCard} = useContext(WalletContext);
    return (
        <div className='store-card card'  style={styleCard}>
            <input type="hidden" name='card[type]' value='storeCard'/>
            <PrimaryImage>
                <Primary type={false}/>
            </PrimaryImage>
            <Secondary/>
            {/*<Secondary panel={props.panel} style={props.style}/>*/}
        </div>
    );
}
export default StoreCard;
