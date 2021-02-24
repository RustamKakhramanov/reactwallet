import React, {useState, useEffect} from 'react';
import {formatsSrc} from '../../../../helpers/WalletWorker';

function BarCodeEditor(props) {
    const [barCodeMessageTypeFieldValue, setBarCodeMessageTypeField] = useState('id');
    const [advancedAltText, changeAdvancedAltText] = useState('');
    const [activeItem, changeActiveItem] = useState('');
    const { panel } = props;

    useEffect(() => {
        if(panel.advancedAltText !== '{Card ID}'){
            setBarCodeMessageTypeField('message');
            changeAdvancedAltText(true);
        }
        if(!activeItem)
            changeActiveItem(panel.barCodeFormat);
    });

    const changeBarcodeType = (type) => {
        changeActiveItem(type);
        console.log(activeItem);
        console.log(type)
       // barcodeImage.src = formatsSrc[type];
        panel.setBarCodeFormat(type)
    };
    const changeAltText = (e) =>{
        let type = e.target.value
        setBarCodeMessageTypeField(type);

        if(type === 'id'){
            changeAdvancedAltText(false);
            panel.setText('{Card ID}')

        }else{
            changeAdvancedAltText(true);
            panel.setText(panel.advancedAltText)
        }

    };

    const pressAltText = (e) =>{
        let value = e.target.value
        panel.setText( value);
    };

    return(
        <div className='barcode-panel'>
            <h4 className='mt-2 mb-3'>{Lang.get('content.wallet.change_barcode_format')}</h4>
            <div className='barcodeTypes flex flex-column content-between'>


                <div className= 'flex flex-row  bk'>
                    <div onClick={e => changeBarcodeType('PKBarcodeFormatAztec')} className={activeItem === 'PKBarcodeFormatAztec' ? 'active elem': 'elem'}>
                        <img src={formatsSrc['PKBarcodeFormatAztec']} alt=""/>
                    </div>
                    <div onClick={e => changeBarcodeType('PKBarcodeFormatQR')} className={activeItem === 'PKBarcodeFormatQR' ? 'active elem': 'elem'}>
                        <img src={formatsSrc['PKBarcodeFormatQR']} alt=""/>
                    </div>
                </div>
                <div onClick={e => changeBarcodeType('PKBarcodeFormatCode128')} className={activeItem === 'PKBarcodeFormatCode128' ? 'active elem': 'elem'}>
                    <img src={formatsSrc['PKBarcodeFormatCode128']} alt=""/>
                </div>
                <div onClick={e => changeBarcodeType('PKBarcodeFormatPDF417')} className={activeItem === 'PKBarcodeFormatPDF417' ? 'active elem': 'elem'}>
                    <img src={formatsSrc['PKBarcodeFormatPDF417']} alt=""/>
                </div>
            </div>
            <div>
                {/*<div className="form-group flex flex-column">*/}
                {/*    <label htmlFor="fieldEditorTypeField">{Lang.get('actions.messageTypeBarCode')}</label>*/}
                {/*    <select id='fieldEditorTypeField'  onChange={e => changeBarcodeField(e)}  value={fieldEditorTypeFieldValue}>*/}
                {/*        <option value="id" >{Lang.get('content.wallet.labels.id')}</option>*/}
                {/*        <option value="message">{Lang.get('content.wallet.labels.message')}</option>*/}
                {/*    </select>*/}
                {/*</div>*/}
                <div className="form-group flex flex-column">
                    <label htmlFor="barCodeMessageTypeField">{Lang.get('actions.messageTypeBarCode')}</label>
                    <select className='form-control' id='barCodeMessageTypeField'  onChange={e => changeAltText(e)} value={barCodeMessageTypeFieldValue}>
                        <option value="id">{Lang.get('content.wallet.labels.id')}</option>
                        <option value="message">{Lang.get('content.wallet.labels.static')}</option>
                    </select>
                    <small id="staticPushyHelp" className="form-text text-muted">{Lang.get('content.wallet.help.only_id')}</small>
                </div>
                {advancedAltText &&
                    <div className="form-group  flex flex-column">
                        <label htmlFor="barCodeMessageInput">{Lang.get('content.wallet.altText')}</label>
                        <input className='form-control' id='barCodeMessageInput' type="text"  onKeyUp={e => pressAltText(e)} placeholder={panel.advancedAltText && panel.advancedAltText === '{Card ID}' ? Lang.get('actions.altText'): panel.advancedAltText} maxLength="20"/>
                    </div>
                }
            </div>
        </div>
    );
}

export default BarCodeEditor;
