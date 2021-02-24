import React, {useContext } from 'react';
import {WalletContext} from '../store/WalletContext';

function Auxiliary(props) {
    const {styleCard, Panel, errors } = useContext(
        WalletContext
    );
    return (
        <div className="p-2 wallet-row auxiliary flex justify-content-between">
            <div id='auxiliaryField' className="t-item text-center wallet-item " onClick={(type, id) => Panel.set('Field', 'auxiliaryField')}>
                <input type='hidden' name='auxiliaryFields[0][key]'  className='key'/>
                <input type='hidden' name='auxiliaryFields[0][changeMessage]'  className='push'/>
                <input  id='asdsad' className='label field-elem text-center' name='auxiliaryFields[0][label]' style={styleCard}/>
                <input className='value field-elem text-center' name='auxiliaryFields[0][value]' style={styleCard}/>
                <span className='text-danger '>{ errors.auxiliaryFields && errors.auxiliaryFields[0] ? errors.auxiliaryFields[0]: ''}</span>

            </div>
            <div id='secondAuxiliaryField' className=" t-item text-center wallet-item " onClick={(type, id) => Panel.set('Field', 'secondAuxiliaryField')}>
                <input type='hidden' name='auxiliaryFields[1][key]'  className='key'/>
                <input type='hidden' name='auxiliaryFields[1][changeMessage]'  className='push'/>
                <input className='label field-elem text-center' name='auxiliaryFields[1][label]' style={styleCard}/>
                <input className='value field-elem text-center' name='auxiliaryFields[1][value]' style={styleCard}/>
                <span className='text-danger '>{ errors.auxiliaryFields && errors.auxiliaryFields[1] ? errors.auxiliaryFields[1]: ''}</span>
            </div>
        </div>
    );
}
export default Auxiliary;
