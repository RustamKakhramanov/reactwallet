 import { Home } from '../views/__backoffice';
import * as Settings from '../views/__backoffice/settings';
import * as Users from '../views/__backoffice/users';
import * as Clients from '../views/__backoffice/clients';
import * as  Wallet from '../views/wallet';

const resources = [
    // {
    //     name: 'users.index',
    //     path: '/users',
    //     component: Users.List,
    // },

    // {
    //     name: 'users.create',
    //     path: '/users/create',
    //     component: Users.Create,
    // },

    // {
    //     name: 'users.edit',
    //     path: '/users/:id/edit',
    //     component: Users.Edit,
    // },
].map(route => {
    route.name = `resources.${route.name}`;
    route.path = `/resources${route.path}`;

    return route;
});

const wallet = [
    {
        name: 'layouts',
        path: '/layouts',
        component: Wallet.List,
    },

    {
        name: 'layout.create',
        path: '/layout/create',
        component: Wallet.Create
    },
    {
        name: 'layout.edit',
        path: '/layout/:id/edit',
        component: Wallet.Edit
    },
].map(route => {
    route.name = `wallet.${route.name}`;
    route.path = `/wallet${route.path}`;

    return route;
});

const clients = [
    {
        name: 'list',
        path: '/',
        component: Clients.List,
    },
    {
        name: 'create',
        path: '/create',
        component: Clients.Create
    },
    {
        name: 'show',
        path: '/:id/show',
        component: Clients.Show
    },
    // {
    //     name: 'edit',
    //     path: '/:id/edit',
    //     component: Clients.Edit
    // },
].map(route => {
    route.name = `clients.${route.name}`;
    route.path = `/clients${route.path}`;

    return route;
});

export default [
    {
        name: 'home',
        path: '/',
        component: Home,
    },

    {
        name: 'settings.profile',
        path: '/settings/profile',
        component: Settings.Profile,
    },

    {
        name: 'settings.account',
        path: '/settings/account',
        component: Settings.Account,
    },
    {
        name: 'settings.loyalty',
        path: '/settings/loyalty',
        component: Settings.Loyalty,
    },

    ...resources,
    ...wallet,
    ...clients
].map(route => {
    route.name = `backoffice.${route.name}`;
    route.auth = true;

    return route;
});
