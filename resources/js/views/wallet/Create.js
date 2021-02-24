import React, {useState} from 'react';
import {WalletContext} from './store/WalletContext';
import { Master as MasterLayout } from '../__backoffice/layouts';
import { Body as CardBody, BackSide as BackSide, Navbar } from '../wallet/layouts/index';
import {Header as HeaderFields, Barcode  } from '../wallet/fields/index';
import {FieldEditor as FEditor, BarCodeEditor as BEditor } from '../wallet/panel/items';
import {Cards, initialColor} from '../../helpers/WalletWorker';
import CardPanel from './panel/index';
import StoreCard from './cards/storecard';

import {
    Grid,
} from '@material-ui/core';
/* TODO Рефакторинг кода, Нужно переместить основные методы  в Body.js, что бы в Create и Edit не дублировались функции
 И в боди уже если передан айди пользователя поулчать данные и раскидывать их по инпутам*/
function Create(props) {
    const [message, setMessage] = useState({});
    const [card, setCard] = useState();
    const { classes, ...other } = props;
    const { history } = props;
    const [type, setType] = useState(true);
    const [panelItem, setPanelItem] = useState();
    const [activeItem, changeActiveItem] = useState('storeCard');
    const [advancedAltText, changeAdvancedAltText] = useState('{Card ID}');
    const [barCodeFormat, setBarCodeFormat] = useState('PKBarcodeFormatCode128');
    const [logo, setLogo] = useState('uploads/pattern/nature/icon.png');
    const [stripImage, setStripImage] = useState('uploads/pattern/nature/strip.png');
    const [thumbnailImage, setThumbnailImage] = useState('uploads/pattern/generic/thumbnail.png');
    const [backSide, changeBackSide] = useState(false);
    const [color, setColor] = useState(initialColor);
    const [cardId, setCardId] = useState(false);
    const [errors, setErrors] = useState({});
    const [showMaps, setshowMaps] = useState(false);
    const [placemarks, setPlacemarks] = useState([]);
    
    let bkPanel = {
        setText: e => changeAdvancedAltText(e),
        setBarCodeFormat: e => setBarCodeFormat(e),
        barCodeFormat,
        advancedAltText,
    };

    const setPanel = (type, id) => {
        clearError();
        if(errors)
            setErrors({});
        switch (type){
            case 'Field':
                setPanelItem( <FEditor id = {id} />);
                break;
            case 'Barcode':
                setPanelItem( <BEditor panel = {bkPanel}/>);
                break;
            default:
                setPanelItem(type);
        }
    };

    const clearError = () => {
        if(errors)
            setErrors({});
    };

    const changeColor = (value) =>{
         clearError();
        if(type){
            setColor({
                text: color.text,
                background: value
            });
        }
        else {
            setColor({
                text: value,
                background: color.background
            });
        }
    };

    const changeCard = (value) => {
        clearError();
        changeActiveItem(value)
        setCard(Cards[value])
    };

    const changeImg = (e, type) => {
        clearError();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            if(type == 'logo')
                setLogo(reader.result)
            else if(type == 'strip')
                setStripImage(reader.result)
            else
                setThumbnailImage(reader.result)
        };
        if(file)
            reader.readAsDataURL(file);
    };

    let Panel = {
        set: (type, id) => setPanel(type, id),
        changeImg: (e, type) => changeImg(e, type),
        changeBackSide: e => changeBackSide(e),
        setMessage: e => setMessage(e),
        setshowMaps: e => setshowMaps(e),
        setPlacemarks: e => setPlacemarks(e),
        history,
        logo,
        panelItem,
        thumbnailImage,
        stripImage,
        backSide,
        showMaps,
        placemarks,
    };

    let Color = {
        changeColor: value => changeColor(value),
        setType: value =>  setType(value),
        text: color.text,
        background: color.background,
        type,
    };

    let styleCard = {
        background: `rgb(${color.background.r}, ${color.background.g}, ${color.background.b})`,
        color: `rgb(${color.text.r}, ${color.text.g}, ${color.text.b})`,
    };

    return (
        <MasterLayout
            {...other}
            pageTitle={Lang.get('navigation.wallet.layout_create')}
            tabs={[]}
            message={message}
        >
            <Grid
                container
                direction="column"
                wrap="nowrap"
            >
                <Navbar activeItem = {activeItem}  changeCard = {changeCard} />
                <Grid
                    container
                    direction="row"
                    alignItems='flex-start'
                    wrap="nowrap"
                >
                <WalletContext.Provider
                    value={{ Panel, Color, styleCard, cardId, setCardId, errors, setErrors}}
                >
                    <CardBody>
                        <div className={backSide ? 'hidden' : ''}>
                            <HeaderFields/>
                            {card ? card:
                                <StoreCard/>
                            }
                            <Barcode
                                barCodeFormat = {barCodeFormat}
                                advancedAltText = {advancedAltText}
                            />
                        </div>
                        <div className={!backSide ? 'hidden' : ''}>
                            <BackSide/>
                        </div>
                    </CardBody>
                    <CardPanel/>
                </WalletContext.Provider>
                </Grid>
            </Grid>
        </MasterLayout>
    );
}
export default Create;

