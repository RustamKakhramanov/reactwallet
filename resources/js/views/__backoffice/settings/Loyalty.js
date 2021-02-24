import React, { useState, useEffect, useContext } from 'react';
import * as NavigationUtils from '../../../helpers/Navigation';
import {} from '@material-ui/icons';
import {Master as MasterLayout} from '../layouts';
import PropTypes from 'prop-types';
import SelfRegister from './loyalty/SelfRegister'
import {
    withStyles,
    AppBar,
    Tabs,
    Tab,
    Typography,
    Box,
} from '@material-ui/core';

import {
    Help as HelpIcon,
    Phone as PhoneIcon, 
    PersonPin as PersonPinIcon, 
    ShoppingBasket as ShoppingBasket, 
    ThumbDown as ThumbDown, 
    ThumbUp as ThumbUp, 
    Favorite as FavoriteIcon

} from '@material-ui/icons';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
  }

export default  function Loyalty(props) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({});
    const { ...childProps } = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const {
        classes,
        history,
    } = props;


    const primaryAction = {
        text: Lang.get('navigation.wallet.layout_create'),
        clicked: () =>
            history.push(
                NavigationUtils.route('backoffice.wallet.layout.create'),
            ),
    };

    return (
        <MasterLayout
            {...childProps}
            loading={loading}
            pageTitle={Lang.get('navigation.loyalty_system')}
            primaryAction={primaryAction}
            message={message}
        >
                    <AppBar position="static" color="default">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="on"
                            indicatorColor="primary"
                            textColor="primary"
                            aria-label="scrollable force tabs example"
                        >
                            <Tab label={Lang.get('navigation.setting.selfClient')} icon={<PersonPinIcon />} {...a11yProps(0)} />
                            <Tab label="Item Two" icon={<FavoriteIcon />} {...a11yProps(1)} />
                            <Tab label="Item Three" icon={<PersonPinIcon />} {...a11yProps(2)} />
                            <Tab label="Item Four" icon={<HelpIcon />} {...a11yProps(3)} />
                            <Tab label="Item Five" icon={<ShoppingBasket />} {...a11yProps(4)} />
                            <Tab label="Item Six" icon={<ThumbDown />} {...a11yProps(5)} />
                            <Tab label="Item Seven" icon={<ThumbUp />} {...a11yProps(6)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <SelfRegister setMessage={value => setMessage(value)}/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                    <SelfRegister/>

                    </TabPanel>
                    <TabPanel value={value} index={2}>

                    </TabPanel>
                    <TabPanel value={value} index={3}>

                    </TabPanel>
                    <TabPanel value={value} index={4}>

                    </TabPanel>
                    <TabPanel value={value} index={5}>

                    </TabPanel>
                    <TabPanel value={value} index={6}>

                    </TabPanel>
        </MasterLayout>
    )
}



