import React, {useContext} from 'react';
import {Barcode} from './index';
import {WalletContext} from '../store/WalletContext';
import {formatsSrc} from '../../../helpers/WalletWorker';

function Thumbnail(props) {
    const { Panel } = useContext(
        WalletContext
    );
    const {
        barCodeFormat,
        advancedAltText
    } = props;

    return(
        <div className='barcode-container'>
            <div className='barcode' onClick={(type, id) => Panel.set('Barcode', false)}>
                <input type='hidden' name='barcode[format]'  id='barCodeFormat'  value={barCodeFormat} readOnly required/>
                <input type='hidden' name='barcode[message]'  id='barCodeMessage'  value='id' readOnly required/>
                <input type='hidden' name='barcode[messageEncoding]'  id='barCodeMessageEncoding'  value='iso-8859-1' readOnly required/>
                <div className="barcode-image">
                    <img  id='barcodeImage' src={formatsSrc[barCodeFormat]} alt=""/>
                </div>
                <input id='barCodeAltText' className='label field-elem' name='barcode[altText]' value={advancedAltText} readOnly required/>
            </div>
        </div>

    )

}
export default Thumbnail;
