import StoreCard from '../views/wallet/cards/storecard';
import EventTicket from '../views/wallet/cards/eventTicket';
import BoardingPass from '../views/wallet/cards/boardingPass';
import Generic from '../views/wallet/cards/generic';
import Coupon from '../views/wallet/cards/coupon';
import React from 'react';
import {Wallet} from '../models/Wallet';
import * as NavigationUtils from '../helpers/Navigation';
export const Cards = {
    'storeCard' : <StoreCard/>,
    'eventTicket' : <EventTicket/>,
    'boardingPass' : <BoardingPass/>,
    'generic' : <Generic/>,
    'coupon' : <Coupon/>
};

export const initialColor = {
    text:{
        r: '0',
        g: '0',
        b: '0',
        a: '1'
    },
    background:{
        r: '255',
        g: '255',
        b: '255',
        a: '1'
    }
};

export const formatsSrc = {
    'PKBarcodeFormatCode128': 'uploads/pattern/assets/barcode/formatCode128.svg',
    'PKBarcodeFormatQR': 'uploads/pattern/assets/barcode/formatQR.svg',
    'PKBarcodeFormatPDF417': 'uploads/pattern/assets/barcode/formatPDF.svg',
    'PKBarcodeFormatAztec': 'uploads/pattern/assets/barcode/formatAztec.svg',
};

export const copyClipboard = (value) => {
    const el = document.createElement('textarea');
    el.value = value;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}
export const submitForm = (event, cardId, Panel, setCardId, setErrors) => {
    event.preventDefault();
    let form =  document.getElementById('form');
    let formData = new FormData(form);
    console.log( Panel.placemarks)
    formData.append('locations', JSON.stringify(Panel.placemarks));
    let  resp = cardId ? Wallet.update(cardId, formData) : Wallet.create(formData);
    let msg =  cardId ? 'layout_updated' : 'layout_created';
    resp.then(res => {
        //console.log(res)
        setCardId(res.data);
        Panel.setMessage({
            type: 'success',
            body: Lang.get(`settings.${msg}`),
            closed: () => Panel.setMessage({}),
        });
        !cardId &&   
            Panel.history.push(
                NavigationUtils.route(
                    'backoffice.wallet.layout.edit',
                    {
                        id: res.data,
                    },
                ),
            )
    })
        .catch(error => {
            let data = error.response.data;
            if(data.uniqueKeys){
                Panel.setMessage({
                    type: 'error',
                    body: data.uniqueKeys,
                    closed: () => Panel.setMessage({}),
                });
                delete data.uniqueKeys;
            }
            if(data.images){
                Panel.setMessage({
                    type: 'error',
                    body: data.images,
                    closed: () => Panel.setMessage({}),
                });
                delete data.images;
            }
            if(data.backFields){
                Panel.setMessage({
                    type: 'error',
                    body: data.backFields,
                    closed: () => Panel.setMessage({}),
                });
                delete data.backFields;
            }
            setErrors(data);
        });
};
