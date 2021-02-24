import React, { useState, useEffect, useContext } from 'react';
import {WalletContext} from '../store/WalletContext';

function Secondary(props) {
    const {styleCard, Panel, errors } = useContext(
        WalletContext
    );
    return (
        <div className="p-2 wallet-row auxiliary flex justify-content-between">
            <div id='secondaryField' className="t-item text-center wallet-item " onClick={(type, id) => Panel.set('Field', 'secondaryField')}>
                <input type='hidden' name='secondaryFields[0][key]'  className='key'/>
                <input type='hidden' name='secondaryFields[0][changeMessage]'  className='push'/>
                <input className='label field-elem text-center' name='secondaryFields[0][label]' style={styleCard}/>
                <input className='value field-elem text-center' name='secondaryFields[0][value]' style={styleCard}/>
                <span className='text-danger '>{ errors.secondaryFields && errors.secondaryFields[0] ? errors.secondaryFields[0]: ''}</span>

            </div>
            <div id='secondSecondaryField' className=" t-item text-center wallet-item " onClick={(type, id) => Panel.set('Field', 'secondSecondaryField')}>
                <input type='hidden' name='secondaryFields[1][key]'  className='key'/>
                <input type='hidden' name='secondaryFields[1][changeMessage]'  className='push'/>
                <input className='label field-elem text-center' name='secondaryFields[1][label]' style={styleCard}/>
                <input className='value field-elem text-center' name='secondaryFields[1][value]' style={styleCard}/>
                <span className='text-danger '>{ errors.secondaryFields && errors.secondaryFields[1] ? errors.secondaryFields[1]: ''}</span>
            </div>
        </div>
    );
}
export default Secondary;
