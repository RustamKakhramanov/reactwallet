import React, {useEffect, useState} from 'react';
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

export default function FieldEditor (props){
    const { id } = props;
    const [fieldType, setFieldType] = useState();
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [fieldEditorTypeField, setFieldEditorTypeField] = React.useState('');

    let container = document.getElementById(id);
    let fieldKey  = container.querySelector('.key');
    let fieldValue  = container.querySelector('.value');
    let fieldLabel = container.querySelector('.label');
    let fieldPush = container.querySelector('.push');

    useEffect(()=>{
        let value = fieldKey.value
        let staticKey = document.getElementById('staticKey')
        let staticLabel = document.getElementById('staticLabel')
        let staticValue = document.getElementById('staticValue')
        let staticPush = document.getElementById('staticPush')

        if(value === 'name' || value === 'date'|| value === 'discount' || value === 'balance' || value === 'none'|| value === 'coordinates'){
            setFieldType(value)
            setFieldEditorTypeField(value)
          //  fieldEditorTypeField.value = value

        }else if(!value){
            if(fieldEditorTypeField)
                setFieldEditorTypeField('')

            //  fieldEditorTypeField.value = ''
            setFieldType(false)
        }
        else{
            setFieldEditorTypeField('static')
            setFieldType('static')
            if(staticKey){
                staticKey.value = fieldKey.value
            }
            if(staticLabel)
                staticLabel.value = fieldLabel.value
            if(staticValue)
                staticValue.value = fieldValue.value
            if(staticPush)
                staticPush.value = fieldPush.value
        }
    });

    const changeInput = (value, type) => {
        if(type == 'date') {
            let date = new Date(value)
            setSelectedDate(value);
            value = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear()
        }
        setChanges(value, type)
    };

    const setChanges = (value, type) => {
        if(type == 'staticKey') {
            setFieldType('static')
            fieldKey.value = value.target.value
        }
        else if(type == 'staticLabel')
            fieldLabel.value  = value.target.value
        else if(type == 'staticPush'){
            fieldPush.value = value.target.value
        }
        else if(type == 'staticValue')
            fieldValue.value = value.target.value

        else if(type == ''){
            fieldKey.value  = ''
            fieldLabel.value  = ''
            fieldValue.value = ''
            fieldPush.value = ''
            fieldPush.value = ''
        }
        else{
            fieldKey.value  = type
            fieldLabel.value  = setFieldLayout(type)
            fieldValue.value = value
            fieldPush.value = value
        }
    };

    const setFieldLayout = (type) => {
        let labels = {
            'date': Lang.get('content.wallet.labels.date'),
            'name': Lang.get('content.wallet.labels.name'),
            'discount':  Lang.get('content.wallet.labels.discount'),
            'coordinates' :  Lang.get('content.wallet.labels.coordinates'),
            'static' : Lang.get('content.wallet.labels.define'),
            'balance' : Lang.get('content.wallet.labels.balance'),
        }
        return labels[type];
    };

    const englishPress = (e) => {
        let regex = new RegExp("^[a-zA-Z]+$");
        let str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            return true;
        }
        e.preventDefault();
        return false;
    };


    const changeTypeInput = (e, type = false) => {
        let val =  e.target.value;
        if(val == 'static' || val == 'date'){
            setFieldType(val);
        }
        else
            setFieldType(false);
        setChanges('', val)
    };

    return (
        <div>
            <h4 className='mb-4'>{Lang.get('actions.field_type')}</h4>
            <select className='form-control'  onChange={e => changeTypeInput(e)}  value={fieldEditorTypeField}>
                <option value="">{Lang.get('actions.changeType')}</option>
                <option value="discount">{Lang.get('content.wallet.labels.discount')}</option>
                <option value="balance">{Lang.get('content.wallet.labels.balance')}</option>
                <option value="name">{Lang.get('content.wallet.labels.name')}</option>
                <option value="static">{Lang.get('content.wallet.labels.static')}</option>
                {/*<option value="date">{Lang.get('content.wallet.labels.date')}</option>*/}
            </select>
            {fieldType === 'static' &&
            <div className='mt-4'>
                <div className="form-group flex flex-column">
                    <label htmlFor="staticKey">{Lang.get('content.wallet.key')}</label>
                    <input className='form-control' id='staticKey' type="text"  onChange={e => changeInput(e, 'staticKey' )} onKeyPress={e => englishPress(e)} placeholder={Lang.get('actions.changeText')} maxLength="15"/>
                    <small id="staticKeyHelp" className="form-text text-muted">{Lang.get('content.wallet.help.onlyEnglish')}</small>
                </div>
                <div className="form-group  flex flex-column">
                    <label htmlFor="staticLabel">{Lang.get('content.wallet.label')}</label>
                    <input className='form-control' id='staticLabel' type="text"  onChange={e => changeInput(e, 'staticLabel' )} placeholder={Lang.get('actions.changeText')} maxLength="20"/>
                </div>
                <div className="form-group  flex flex-column">
                    <label htmlFor="staticValue">{Lang.get('content.wallet.value')}</label>
                    <input className='form-control' type="text" id='staticValue' onChange={e => changeInput(e, 'staticValue')} placeholder={Lang.get('actions.changeValue')}/>
                </div>
                <div className="form-group  flex flex-column">
                    <label htmlFor="staticPush">{Lang.get('content.wallet.push')}</label>
                    <input className='form-control' type="text"  id='staticPush' onChange={e => changeInput(e, 'staticPush')}/>
                    <small id="staticPushyHelp" className="form-text text-muted">{Lang.get('content.wallet.help.push')}</small>
                </div>
            </div>
            }
            {fieldType == 'date' &&
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                    format="D-M-Y"
                    id=""
                    label=""
                    value={selectedDate}
                    onChange={date => changeInput(date, 'date')}
                    keyboard
                    clearable
                />
            </MuiPickersUtilsProvider>
            }
        </div>
    );
}

