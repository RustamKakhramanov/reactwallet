import React, {useContext } from 'react';
import {WalletContext} from '../store/WalletContext';
import {submitForm} from '../../../helpers/WalletWorker';
import {Maps} from '../panel/items/index';
function Body(props) {
    const {styleCard, Panel, setErrors, cardId, setCardId } = useContext(WalletContext);
    const {
        children,
    } = props;

    const submitLayout = e =>{
        submitForm(e, cardId, Panel, setCardId, setErrors);
    };

    return (
            <div  className="col-md-4 col-sm-12 ml-md-5 mb-5 wallet" >
                <form  id='form'  method='POST' onSubmit={event => submitLayout(event)}>
                    <div id='wl' className='card-layout border rounded card'  style={styleCard}>
                        <input type="hidden" name='card[foregroundColor]' value={styleCard.color}/>
                        <input type="hidden" name='card[backgroundColor]' value={styleCard.background}/>
                        {children}
                    </div>
                    <Maps/>
                  </form>
            </div>

    );
}
export default Body;
