import React, {useContext, useState} from 'react';
import {WalletContext} from '../store/WalletContext';

function Thumbnail(props) {
    const {Panel, errors} = useContext(
        WalletContext
    );
    return(
        <div>
            <input type="file" id="thumbnail" name="thumbnailImage" accept="image/png" onChange={e => Panel.changeImg(e, 'thumbnail')}
                   className='hidden'/>
            <div className="thumbnail-image" onClick={e => document.getElementById('thumbnail').click()}>
                <img src={Panel.thumbnailImage} alt=""/>
            </div>
            <span className='text-danger '>{ errors.thumbnailImage && errors.thumbnailImage ? errors.thumbnailImage: ''}</span>thumbnailImage

        </div>
    )
}

export default Thumbnail;
