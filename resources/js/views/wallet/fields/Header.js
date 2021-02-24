import {WalletContext} from '../store/WalletContext';
import React, {useContext } from 'react';
//todo всплывающие подсказки onMouseOver deleter
function Header(props) {
    const clickInput = (event) => {
        console.log(event.target.value);
    };
    const {styleCard, Panel, errors } = useContext(
        WalletContext
    );
    return (
        <div className="p-2 wallet-row flex flex-column">
            <div className='flex'>
                <input type="file" id="headerLogo" name="headerLogo" accept="image/png" onChange={e => Panel.changeImg(e, 'logo')}
                       className='hidden'/>

                <div className="col-3 card-logo check wallet-item" onClick={e => document.getElementById('headerLogo').click()}>
                    <img className='header-img' src={Panel.logo} alt=""/>
                </div>
                <input className="col-6 check wallet-item text-center bg-transparent"  name='card[title]'
                       style={styleCard}
                       onChange={event => clickInput(event)}
                       placeholder={Lang.get('content.wallet.layout.headerLogoTitle')}

                />
                <div id='headerField' className="col-3 t-item text-center wallet-item ml-auto" onClick={(type, id) => Panel.set('Field', 'headerField')}>
                    <input type='hidden' name='headerFields[0][key]'  className='key' />
                    <input type='hidden' name='headerFields[0][changeMessage]'  className='push'/>
                    <input className='label field-elem' name='headerFields[0][label]' style={styleCard} />
                    <input className='value field-elem' name='headerFields[0][value]'   style={styleCard}/>
                </div>
            </div>
            <div className="flex">
                <div className="col-3"><span className='text-danger '>{ errors.card && errors.headerLogo ? errors.headerLogo : ''}</span></div>
                <div className="col-6 text-center"><span className='text-danger '>{ errors.card && errors.card.title ? errors.card.title : ''}</span></div>
                <div className="col-3 text-center"><span className='text-danger '>{ errors.headerFields && errors.headerFields[0] ? errors.headerFields[0]: ''}</span></div>
            </div>

        </div>
    );
}
export default Header;
