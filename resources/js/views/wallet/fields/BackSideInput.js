import React from 'react';

export default function BackSideInput(props) {
    const { item, field } = props;
    return (
        <div className='backside-item'>
            <input type="hidden" name={'backFields['+ item + '][key]'} value={field ? field.key: 'backItem'+ item}/>
            <input  type="text" name={'backFields['+ item + '][label]'}  defaultValue={field ? field.label : ''}/>
            <input  type="text" name={'backFields['+ item + '][value]'} defaultValue={field ?  field.value : ''}/>
        </div>
    );
}
