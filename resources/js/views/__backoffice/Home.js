import React from 'react';
import { Typography } from '@material-ui/core';

import { Master as MasterLayout } from './layouts';

function Home(props) {
    const primaryAction = {
        text: 'Export Stats',
        clicked: () => alert('Exporting your awesome stats...'),
    };

    const tabs = [
        {
            name: Lang.get('content.overview'),
            active: true,
        },

        {
            name: Lang.get('content.monthly'),
            active: false,
        },
    ];

    return (
        <MasterLayout
            {...props}
            pageTitle={Lang.get('navigation.dashboard')}
            primaryAction={primaryAction}
            tabs={tabs}
        >
            <Typography>{Lang.get('content.overview')}</Typography>
        </MasterLayout>
    );
}

export default Home;
