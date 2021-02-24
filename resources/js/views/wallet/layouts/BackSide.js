import React, {useContext, useEffect, useState} from 'react';
import BackSideInput from '../fields/BackSideInput';
import {WalletContext} from '../store/WalletContext';

function BackSide(props) {
    const {backSideField} = props;
    const {Panel } = useContext(WalletContext);
    const [items, addItems] = useState([]);
    const [owner, setOwner] = useState(false);
    const [fill, fieldFill] = useState(false);
    const [fields, setFields] = useState({});

    useEffect(() =>{
        if(!fill){
            if(backSideField){
                backSideFill(backSideField);
            }
        }
        const timer = setTimeout(() => {
            fieldFill(true);
        }, 300);
        return () => clearTimeout(timer);
    }, [backSideField]);

    const backSideFill = fields => {
        if(fields.owner){
            setOwner(true);
            delete fields.owner;
        }
        let countKeys = Object.keys(fields);
        addItems(countKeys);
        setFields(fields);
        for (let prop in fields) {
            if(prop === 'owner'){

            }else if(prop === 'history'){
                console.log('history');
            }else{

            }
        }
       console.log(document.querySelector('input[name=\'backFields[1][key]\']')) ;

    };

    const changeItems = (type) =>{
        let arrayI = items;
        let newA;
        switch (type) {
            case 'add':
                newA  = arrayI.concat([
                    arrayI.length + 1
                ]);
                break;
            case 'del':
                newA  =  arrayI.splice(0 , arrayI.length -1);
                break;
            case 'owner':
                setOwner(!owner);
                break;
        }
        if(type !== 'owner')
            addItems(newA);
    };

    return (
        <div className='backside p-3'>
            <div className='mb-3 header-backside flex'>
                <img src={Panel.logo} className='header-img' alt=""/>
            </div>
            {
                items.map(item =>
                    <BackSideInput key = {item} item = {item} field = {fields[item]}/>
                )
            }{
                owner &&
                <div className='backside-owner-input backside-item'>
                    <input type="hidden" name={'backFields[owner]'} value={true}/>
                    <p>{Lang.get('content.wallet.owner')}</p>
                    <p className='text-muted'>Алексей Лазутин</p>
                </div>
            }
            <div className='backside-buttons'>
                <div  className='btn btn-success' onClick={type => changeItems('add')}>{Lang.get('actions.addItem')}</div>
                {items.length > 0 &&
                     <div  className='btn btn-danger' onClick={type => changeItems('del')}>{Lang.get('actions.delItem')}</div>
                }
                <div   className='btn btn-primary' onClick={type => changeItems('owner')}>{!owner ? Lang.get('content.wallet.addOwner'): Lang.get('content.wallet.delOwner')}</div>
            </div>
        </div>
    );
}

export default BackSide;
