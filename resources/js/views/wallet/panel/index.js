import React, {useContext, useState} from 'react';
import {ChromePicker, CirclePicker} from 'react-color';
import {WalletContext} from '../store/WalletContext';
import { submitForm , copyClipboard} from '../../../helpers/WalletWorker';
import * as NavigationUtils from '../../../helpers/Navigation';
import html2canvas from 'html2canvas';

export default function CardPanel(props) {
    const {Color, Panel, cardId, setCardId, setErrors} = useContext(WalletContext);
    const [detailPicker, changePicker] = useState(false);
    const [visibleCardId, setVisibleCardId] = useState(false);
    const [visibleDowload, setVisibleDowload] = useState(false);
    let text = !Color.type ? 'active' : '';
    let background = Color.type ? 'active' : '';
    let showMaps = Panel.showMaps ? ' active' : '';
    let cardLink = location.protocol+'//'+location.hostname+(location.port ? ':'+ location.port: '') + '/layouts/download-test/' + cardId;
    let signupLink = location.protocol+'//'+location.hostname+(location.port ? ':'+ location.port: '') + '/signup/' + cardId;
    const changeBackSide = () => {
        Panel.changeBackSide(!Panel.backSide);
        Panel.set('');
    };
    const {history} = props;

    const linkWorked = (value, testVisible) => {
        let visible =  testVisible ? !visibleCardId : !visibleDowload;
        if(testVisible)
            setVisibleCardId(!visibleCardId);
        else {
            setVisibleDowload(!visibleDowload);
        }
        if(visible){
            copyClipboard(value);
            Panel.setMessage({
                type: 'success',
                body: Lang.get('content.copied'),
                closed: () => Panel.setMessage({}),
            });
        }
    };

    const submitLayout = e => {
        // html2canvas(document.querySelector("#wallet-car-body"),).then(canvas => {
        //     var myImage = canvas.toDataURL("image/png");
        //     console.log(myImage)
        // });

       submitForm(e, cardId, Panel, setCardId, setErrors);
       // history.push('/wallet/layouts');
    };

    return (
       <div className="col-md-4 col-sm-12  ml-auto panel-bar">
           <nav className="nav nav-pills nav-fill mb-1">
               <div className={'nav-item nav-link map-show btn-outline-primary' + showMaps}  onClick={() => Panel.setshowMaps(true)}>{Lang.get('actions.map.show')}</div>
           </nav>
           <nav className="nav nav-pills nav-fill mb-4">
               <div className={'nav-item nav-link ' + background} onClick={() => Color.setType(true)}>{Lang.get('content.wallet.cardColor')}</div>
               <div className={'nav-item nav-link ' + text}  onClick={() => Color.setType(false)}>{Lang.get('content.wallet.textColor')}</div>
           </nav>
            { detailPicker
                ? <div>
                    <ChromePicker
                        color={Color.type ? Color.background : Color.text}
                        onChangeComplete={colors => Color.changeColor(colors.rgb)} />
                </div>
                : <div>
                    <CirclePicker
                        color={Color.type ? Color.background: Color.text}
                        onChangeComplete={colors => Color.changeColor(colors.rgb)}
                        colors={ ['#fff', '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#65bc50', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b']}
                    />
                </div>
            }

           <div className='panel-buttons  content-between'>
               <button type='button' className='btn btn-primary mt-4' onClick={e => changeBackSide() }>{Lang.get('content.wallet.changeSide')}</button>
               <button type='button' className='btn btn-success mt-4' onClick={event => submitLayout(event)}>{Lang.get('actions.save')}</button>
               <button className="btn btn-outline-primary mt-4" onClick={ () => changePicker(!detailPicker)}>{detailPicker? Lang.get('actions.collapse')  :Lang.get('actions.detail')}</button>
           </div>

           {cardId &&
           <div className='panel-buttons mt-3 fl-st flex items-center'>
               <button className='btn btn-success' onClick={e => linkWorked(cardLink, true)} > {visibleCardId ? Lang.get('actions.hide_link') : Lang.get('actions.show_test_link')}</button>
               {visibleCardId &&
                    <div className='test-link mt-xs-2 ml-2' onClick={e => linkWorked(cardLink)}>{cardLink}</div>
               }
               <div className='flex justify-content-center wrap align-items-center mt-2'>
                    <button className='btn btn-success' onClick={e => linkWorked(signupLink, false)} > {visibleDowload ? Lang.get('actions.hide_link') : Lang.get('actions.show_signup_link')}</button>
                    {visibleDowload &&
                        <div className='test-link mt-xs-2 ml-2' onClick={e => linkWorked(signupLink)}>{signupLink}</div>
                    }
               </div>
           </div>
           }
            <div id='items-panel' className='mt-5'>
                {Panel.panelItem}
            </div>
        </div>
   );
}



