import React, { useState} from 'react';
import {Master as MasterLayout} from '../layouts';
import Form from './Form/index';
import ClientContext from './ClientContext'

import {
    withStyles,
    Paper,
    Typography,
    Grid,
} from '@material-ui/core';

function Edit(props) {
    const [message, setMessage] = useState({});
    const { classes, ...other} = props;
    const { history} = props;
    const [client, setClient] = useState({});
    let self = false
    return (
                <MasterLayout
            {...other}
            pageTitle = {Lang.get('content.titles.registerClient')}
            tabs={[]}
            message={message}
        >


        </MasterLayout>
);
}

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        minHeight: '75vh',
    },
    pageContentWrapper: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        minHeight: '75vh',
        overflowX: 'auto',
    },
    pageContent: {
        padding: theme.spacing.unit * 7,
    },
    pageContentContainer: {
        width:'100%',
    },
});

export default withStyles(styles)(Edit);
