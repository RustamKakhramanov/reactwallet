import React, {useContext, useEffect} from 'react';
import {WalletContext} from '../store/WalletContext';

function PrimaryImage(props) {
    const {Panel, errors } = useContext(
        WalletContext
    );
    const {
        children,
    } = props;

    return(
        <div>
            <input type="file" id="stripImage" name="stripImage" accept="image/png" onChange={e => Panel.changeImg(e, 'strip')}
                                className='hidden'/>

            <div className="strip-image check wallet-item relative" onClick={e => document.getElementById('stripImage').click()}>
                <img id='stripImage' src={Panel.stripImage} alt=""/>
                    {children &&
                       <div className='primary-field-content wallet-row m-2'>
                           {children}
                       </div>
                    }
                <div className='text-danger text-center'>{ errors.stripImage && errors.stripImage ? errors.stripImage : ''}</div>
            </div>
        </div>
    )
}

export default PrimaryImage;
