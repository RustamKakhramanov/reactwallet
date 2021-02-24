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

function Create(props) {
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
         <Grid className={classes.pageContentContainer} container  justify='space-around'>
            <div className={classes.pageContentWrapper} >
                <Paper>
                    <div className={classes.pageContent}>
                        <Typography
                            component="h1"
                            variant="h4"
                            align="center"
                            gutterBottom
                        >
                            {Lang.get('content.titles.registerClient')}
                        </Typography>
                        <ClientContext.Provider
                            value={{setClient, client, setMessage, self, history}}
                        >
                            <Form/>
                        </ClientContext.Provider>
                    </div>
                </Paper>
            </div>
        </Grid>

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

export default withStyles(styles)(Create);
