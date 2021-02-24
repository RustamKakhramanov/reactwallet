import React, {useState, useContext, useEffect} from "react";
import { YMaps, Map, SearchControl, GeolocationControl, Placemark, Clusterer } from "react-yandex-maps";
import {WalletContext} from '../../store/WalletContext';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Place from '@material-ui/icons/Place';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    Grid,
    Button,
    Dialog,
    ListItemText,
    ListItem,
    List,
    ListItemAvatar,
    ListItemSecondaryAction,
    Avatar,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Slide,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  listInput:{
      background:false
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Maps() {
    const [searchControl, setSearchControl] = useState(null);
    const [showAlert, setshowAlert] = useState(false);
    const {Panel, layout} = useContext(WalletContext);
    const classes = useStyles();
    const [cluster, setCluster] = useState(null);
    const onResultShow = () => {
        if (searchControl) {
            let index = searchControl.getSelectedIndex();
            let array = searchControl.getResultsArray()[index];
            let coord = array.geometry._coordinates;
            let text = array.properties._data.text;
            let p = true;
            Panel.placemarks.forEach(function(item, i, arr) {
                if(item.latitude == coord[0] && item.longitude == coord[1]){
                    p = false ;
                }
            });
            if(p && Panel.placemarks.length < 10){
                Panel.setPlacemarks(Panel.placemarks.concat({"latitude" : coord[0], "longitude" : coord[1], "place": text}))
            }
        }
    };

    const handleClose = () => {
        Panel.setshowMaps(false);
        setshowAlert(false);
    };



    const deleteLocations = key => {
        Panel.setPlacemarks(Panel.placemarks.filter(item => item.place !== key))
    }
    
    useEffect(()=> {
        if(Panel.showMaps && !showAlert){
            setTimeout(() => {
                alert(Lang.get('actions.map.ready'));
            }, 800);
            if(Panel.showMaps)
                setshowAlert(true);
        }
    });
    const changeMapValue = (value, id, type) => {
        let elem = Panel.placemarks
        elem[id][type] = value;
        Panel.setPlacemarks(elem)
       // setPlacemarks(elem);
        console.log(Panel.placemarks);
    }

    let coord = [
            {"latitude" : 54.888071, "longitude" : 69.149202},
            {"latitude" : 54.889159, "longitude" : 69.148681,  "relevantText" : "Store nearby on 3rd and Main."},
        ];

    return (
        <div>
        <Dialog fullScreen open={Panel.showMaps} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
            <Toolbar>
                {/* <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                </IconButton> */}
                <Typography variant="h6" className={classes.title}>
                    {Lang.get('actions.map.show')}
                </Typography>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
                {/* <Button autoFocus color="inherit" onClick={handleClose}>
                    {Lang.get('actions.map.show')}
                </Button> */}
            </Toolbar>
            </AppBar>
            <Grid container justify='center' className='pt-1'>
                <YMaps
                    query={{
                        lang: Lang.get('content.languageKey') ,
                        apikey: '20aadff4-aa14-44a4-b2d8-70edd5f9d465',
                    }}
                >
                    <Map
                        state={{ center: [54.889159, 69.148681], zoom: 9 }}
                        // instanceRef={ref => {
                        //     if (ref) {
                        //       ref.events.add("click", e => {
                        //         ref.balloon.close();
                        //       });
                        //     }
                        //   }}
                        modules={["geolocation", "geocode"]}
                        width="90%"
                        height="400px"
                        // onLoad={ymaps => handleApiAvaliable(ymaps)}
                    >
                            {/* <GeolocationControl
                                //TODO Добавить Определение адреса и запись в переменную
                            /> */}
                        <Clusterer
                            modules={["clusterer.addon.balloon"]}
                            options={{}}
                            instanceRef={ref => {
                            if (ref) {
                                setCluster(ref);
                                console.log(11, ref)
                            }
                            }}
                        >
                            {Panel.placemarks && Panel.placemarks.map((item, index) =>  {
                                return  <Placemark 
                                            key={index}
                                            geometry={[item.latitude, item.longitude]}
                                            modules={["geoObject.addon.balloon"]}
                                            properties={{
                                                balloonContentHeader: item.shortPlace ? item.shortPlace : Lang.get('content.place'),
                                                balloonContent: item.place
                                            }}
                                        />
                                })
                            }
                        </Clusterer>
                    <SearchControl  
                        width='100%'
                        instanceRef={ref => setSearchControl(ref)}
                        onResultSelect={onResultShow}
                        options={{ fitMaxWidth: true, noPlacemark: true, maxWidth:100 }} 
                    />
                    </Map>
                </YMaps>
            </Grid>
            <Grid container justify='center'>
                {Panel.placemarks.length > 0 ? 
                    <List  className='w-75'>
                        {
                            Panel.placemarks.map((item, index) =>  {
                                return (
                                    <ListItem button key={index}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Place />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={<div className="form-group w-75">
                                                                    <input type="text" className="form-control" id={"changePush" + index} defaultValue={item.shortPlace ? item.shortPlace : ''} onChange={(e) => changeMapValue(e.target.value, index, 'shortPlace')} placeholder={Lang.get('actions.map.mapName')}/>
                                                                </div>} secondary={item.place}/>
                                        <ListItemText primary={<div className="form-group mr-2">
                                                                    <label for={"changePush" + index}>{Lang.get('actions.map.changePush')}</label>
                                                                    <input type="text" className="form-control" id={"changePush" + index} onChange={(e) => changeMapValue(e.target.value, index, 'relevantText')} defaultValue={item.relevantText ? item.relevantText : ''} placeholder={Lang.get('actions.map.changePlaceholder')}/>
                                                                </div>} />
                                        <ListItemSecondaryAction onClick={() => deleteLocations(item.place)}>
                                            <IconButton edge="end" aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ); 
                            })
                        }
                    </List>
                :   <div>
                        <h3 className='text-center mt-4'>{Lang.get('resources.add_map')}</h3>
                    </div>
                }
            </Grid>
        </Dialog>
        </div>
    );
}