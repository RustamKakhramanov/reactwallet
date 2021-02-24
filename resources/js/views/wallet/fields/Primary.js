import React, {useContext } from 'react';
import Thumbnail from './Thumbnail';
import {WalletContext} from '../store/WalletContext';

function Primary(props) {
    const { Panel, errors } = useContext(
        WalletContext
    );
    const {
        type,
    } = props;

    const setPanel = (e, type, id) =>{
        e.stopPropagation();
        e.cancelBubble = true;
        Panel.set(type, id);
    }

    let primaryClass = 'primary-row';
    if(type)
        primaryClass += type;
    return (
        <div className={primaryClass} >
            <div className="primary-fields">
                <div id='firstPrimary' className="text-center wallet-item first-primary  flex flex-column justify-content-around" onClick={event => setPanel(event,'Field', 'firstPrimary')}>
                    <input type='hidden' name='primaryFields[0][key]'  className='key'/>
                    <input type='hidden' name='primaryFields[0][changeMessage]'  className='push'/>
                    <input className='label field-elem text-center  f-l' name='primaryFields[0][label]'/>
                    <input className='value field-elem text-center f-l' name='primaryFields[0][value]'/>
                    <span className='text-danger '>{ errors.primaryFields && errors.primaryFields[0] ? errors.primaryFields[0]: ''}</span>

                </div>
            </div>
            {type == 'dual' &&
                <div className="primary-fields">
                    <div id='secondPrimary' className="text-center wallet-item" onClick={event => setPanel(event,'Field', 'secondPrimary')}>
                        <input type='hidden' name='primaryFields[1][key]'  className='key'/>
                        <input type='hidden' name='primaryFields[1][changeMessage]'  className='push'/>
                        <input className='label field-elem text-center' name='primaryFields[1][label]'/>
                        <input className='value field-elem text-center' name='primaryFields[1][value]'/>
                        <span className='text-danger '>{ errors.primaryFields && errors.primaryFields[1] ? errors.primaryFields[1]: ''}</span>

                    </div>
                </div>
            }
            {type == 'thumbnail'  &&
                <Thumbnail/>
            }
        </div>
    );
}
export default Primary;
