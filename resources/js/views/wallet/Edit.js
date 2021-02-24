import React, {useEffect,useLayoutEffect , useState} from 'react';
import {WalletContext} from './store/WalletContext';
import { Master as MasterLayout } from '../__backoffice/layouts';
import { Body as CardBody, BackSide as BackSide, Navbar } from '../wallet/layouts/index';
import {Header as HeaderFields, Barcode  } from '../wallet/fields/index';
import {FieldEditor as FEditor, BarCodeEditor as BEditor } from '../wallet/panel/items/index';
import {Cards, initialColor} from '../../helpers/WalletWorker';
import CardPanel from './panel/index';
import StoreCard from './cards/storecard';
import {Wallet} from '../../models/Wallet';
import * as NavigationUtils from '../../helpers/Navigation';
import {
    Grid,
} from '@material-ui/core';
/* TODO Рефакторинг кода, Нужно переместить основные методы  в Body.js, что бы в Create и Edit не дублировались функции
 И в боди уже если передан айди пользователя поулчать данные и раскидывать их по инпутам*/

export default function Edit(props) {
    const [message, setMessage] = useState({});
    const [card, setCard] = useState();
    const { classes, ...other } = props;
    const [type, setType] = useState(true);
    const [panelItem, setPanelItem] = useState();
    const [activeItem, changeActiveItem] = useState(0);
    const [advancedAltText, changeAdvancedAltText] = useState('');
    const [barCodeFormat, setBarCodeFormat] = useState('');
    const [logo, setLogo] = useState('');
    const [stripImage, setStripImage] = useState('');
    const [thumbnailImage, setThumbnailImage] = useState('');
    const [backSide, changeBackSide] = useState(false);
    const [color, setColor] = useState(initialColor);
    const [layout, setLayout] = useState({});
    const [backSideField, setBackSideField] = useState(false);
    const [cardId, setCardId] = useState(false);
    const [errors, setErrors] = useState({});
    const [showMaps, setshowMaps] = useState(false);
    const [placemarks, setPlacemarks] = useState([]);//TODO НАЗВАНИЕ places не правильное надо изменить 
    
    let bkPanel = {
        setText: e => changeAdvancedAltText(e),
        setBarCodeFormat: e => setBarCodeFormat(e),
        barCodeFormat,
        advancedAltText,
    };

    useLayoutEffect(() => {
        const timer = setTimeout(() => {
            const { params } = props.match;
            fetchLayout(params.id);
            setCardId(params.id);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const fetchLayout = async id => {
        const layout = await Wallet.show(id);
        setLayout(layout);
        setLogo(layout.path + 'logo.png');
        setStripImage(layout.path + 'strip.png');
        if(layout.type === 'generic')
            setThumbnailImage(layout.path + 'thumbnail.png');
        fetchColors(layout.body.card.foregroundColor, layout.body.card.backgroundColor);
        parseFields(layout.body, layout.type);
        
    };

    const parseFields = (body, type) => {
        changeCard(type)
        document.querySelector(`input[name='card[title]']`).value = body.card.title;
        barcodeFill(body.barcode);
        if(body.backFields)
            setBackSideField(body.backFields);
        if(body.locations) {
            setPlacemarks(body.locations);
        }
        for (let prop in body) {
            if(prop !== 'card' && prop !== 'barcode' && prop !== 'backFields' && prop !== 'locations')
                body[prop].forEach(function(element, i ) {
                    document.querySelector(`input[name='${prop}[${i}][key]']`).value = body[prop][i].key;
                    document.querySelector(`input[name='${prop}[${i}][label]']`).value = body[prop][i].label;
                    document.querySelector(`input[name='${prop}[${i}][value]']`).value = body[prop][i].value;
                    document.querySelector(`input[name='${prop}[${i}][changeMessage]']`).value = body[prop][i].changeMessage;
                });
        }
    };

    const fetchColors = (text, background) => {
        setColor({
            text: text,
            background: background
        });
    };

    const barcodeFill = barcode => {
        setBarCodeFormat(barcode.format);
        changeAdvancedAltText(barcode.altText);

    };

    const clearError = () => {
        if(errors)
            setErrors({});
    };

    const setPanel = (type, id) => {
        clearError();
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

    const changeCard = (value) =>{
        clearError();
        changeActiveItem(value)
        setCard(Cards[value])
    };

    const changeImg = (e, type) =>{
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

    const primaryAction = {
        text: Lang.get('navigation.wallet.layout_create'),
        clicked: () =>
            props.history.push(
                NavigationUtils.route('backoffice.wallet.layout.create'),
            ),
    };

    return (
        <MasterLayout
            {...other}
            pageTitle={Lang.get('navigation.wallet.layout_create')}
            tabs={[]}
            message={message}
            primaryAction={primaryAction}
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
                    wrap="wrap"
                >
                    <WalletContext.Provider
                        value={{ Panel, Color, styleCard, cardId, setCardId, errors, setErrors, layout}}
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
                                <BackSide backSideField = {backSideField}/>
                            </div>
                        </CardBody>
                        <CardPanel history = {props.history}/>
                    </WalletContext.Provider>
                </Grid>
            </Grid>
        </MasterLayout>
    );
}

