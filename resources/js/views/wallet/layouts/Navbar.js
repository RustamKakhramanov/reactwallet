import {Grid} from '@material-ui/core';
import React from 'react';

export default function Navbar(props) {
    const {changeCard, activeItem} = props;

    return(
        <ul className="nav nav-pills  mb-4">
            <li className="nav-item">
                <button className={ activeItem === 'storeCard' ? 'nav-link  active': 'nav-link '} onClick={() => changeCard('storeCard')}>{Lang.get('content.wallet.storeCard')}</button>
            </li>
            {/* <li className="nav-item">
                <button className={ activeItem === 'eventTicket' ? 'nav-link  active': 'nav-link '}  onClick={() => changeCard('eventTicket')}>{Lang.get('content.wallet.eventTicket')}</button>
            </li>
            <li className="nav-item">
                <button className={ activeItem === 'boardingPass' ? 'nav-link  active': 'nav-link '}  onClick={() => changeCard('boardingPass')}>{Lang.get('content.wallet.boardingPass')}</button>
            </li>
            <li className="nav-item">
                <button className={ activeItem === 'generic' ? 'nav-link  active': 'nav-link '}  onClick={() =>  changeCard('generic')}>{Lang.get('content.wallet.generic')}</button>
            </li>
            <li className="nav-item">
                <button className={ activeItem === 'coupon' ? 'nav-link  active': 'nav-link '}  onClick={() => changeCard('coupon')}>{Lang.get('content.wallet.coupon')}</button>
            </li> */}
        </ul>
    );
};
