import React, { useState, useEffect, useContext } from 'react';
import { Wallet } from '../../models/Wallet';
import * as NavigationUtils from '../../helpers/Navigation';
import {Delete as DeleteIcon, Edit as EditIcon, Image as ImageIcon} from '@material-ui/icons';
import {Master as MasterLayout} from '../__backoffice/layouts';
import {AppContext} from '../../AppContext';

import {
    withStyles,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
} from '@material-ui/core';

function List(props) {

    const [list, setList] = useState(false);
    const [alert, setAlert] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({});
    const { ...childProps } = props;
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

    const tabs = [
        {
            name: Lang.get('content.list'),
            active: true,
        },
    ];

    const columns = [
        { name: 'id', property: 'id', sort: false },
        { name: Lang.get('content.title'), property: 'title', sort: false },
        { name: Lang.get('content.type'), property: 'type' },
        { name: Lang.get('content.created_at'), property: 'created_at', sort: false },
        { name: Lang.get('content.updated_at'), property: 'updated_at', sort: false },
        {
            name: Lang.get('content.actions'),
            property: 'actions',
            filter: false,
            sort: false,
        },
    ];

    const restoreLayout = async resourceId => {
        console.log(resourceId)
    };

    const deleteLayout = async resourceId => {
        setLoading(true);
        Wallet.delete(resourceId).
        then(res => {
            setList(res.data.parse)
            setLoading(false);
            setAlert({});
            setMessage({
                type: 'success',
                body: Lang.get('resources.deleted', {
                    name: Lang.get('navigation.layout'),
                }),
                closed: () => setMessage({}),
                actionText: Lang.get('actions.undo'),
            });
        }).catch(error => {
            setLoading(false);
            setAlert({});
            setMessage({
                type: 'error',
                body: Lang.get('resources.not_deleted', {
                    name: Lang.get('navigation.layout'),
                }),
                closed: () => setMessage({}),
                actionText: Lang.get('actions.retry'),
                action: () => deleteLayout(resourceId),
            });
        });
    };

    const handleDeleteClick = resourceId => {
        setAlert({
            type: 'confirmation',
            title: Lang.get('resources.delete_confirmation_title'),
            body: Lang.get('resources.delete_confirmation_body'),
            confirmText: Lang.get('actions.continue'),
            confirmed: async () => await deleteLayout(resourceId),
            cancelled: () => setAlert({}),
        });
    };

    const listData =
        list &&
        list.map(item => {
            return {
                id: item.id,
                title: item.title,
                type: Lang.get('content.wallet.'+ item.type) ,
                created_at: item.created_at,
                updated_at: item.updated_at,
                actions: (
                    <div style={{ width: 120, flex: 'no-wrap' }}>
                        <Tooltip
                            title={Lang.get('resources.edit', {
                                name: Lang.get('navigation.wallet.layout'),
                            })}
                        >
                            <IconButton
                                onClick={() =>
                                    history.push(
                                        NavigationUtils.route(
                                            'backoffice.wallet.layout.edit',
                                            {
                                                id: item.id,
                                            },
                                        ),
                                    )
                                }
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                            <Tooltip
                                title={Lang.get('resources.delete', {
                                    name: 'Wallet',
                                })}
                            >
                                <IconButton
                                    color="secondary"
                                    onClick={() => handleDeleteClick(item.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                    </div>
                ),
            };
        });

    useEffect(() => {
        if (list) {
            return;
        }
        let data = Wallet.paginated();
        data.then(res => {
            setList(res.data)
        });
    },[list]);

    return (
        <MasterLayout
            {...childProps}
            loading={loading}
            pageTitle={Lang.get('navigation.wallet.layouts')}
            primaryAction={primaryAction}
            tabs={tabs}
            message={message}
            alert={alert}
        >
            {!loading && listData && (
                <Paper className={classes.root} >
                    <div  className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column, key) => (
                                        <TableCell
                                            key={key}
                                        >
                                            {!column.sort ? (
                                                column.name
                                            ) : (
                                                <Tooltip
                                                    title={
                                                    Lang.get('table.sort_asc')
                                                    }
                                                    placement={
                                                        column.numeric
                                                            ? 'bottom-end'
                                                            : 'bottom-start'
                                                    }
                                                    enterDelay={300}
                                                >
                                                    <TableSortLabel

                                                    >
                                                        {column.name}
                                                    </TableSortLabel>
                                                </Tooltip>
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {listData.map((item, key) => (
                                    <TableRow key={key}>
                                        {Object.values(item).map((cell, cellKey) => {
                                            if (cellKey === 0) {
                                                return (
                                                    <TableCell
                                                        key={cellKey}
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {cell}
                                                    </TableCell>
                                                );
                                            }

                                            return (
                                                <TableCell key={cellKey}>
                                                    {cell}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}

                                {listData.length > 0 && (
                                    <TableRow
                                        style={{
                                            height: 32 * (listData.length),
                                        }}
                                    >
                                        <TableCell colSpan={columns.length} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    {/*<TablePagination*/}
                                    {/*    rowsPerPageOptions={['5', '10', '20']}*/}
                                    {/*    colSpan={columns.length}*/}
                                    {/*    count={4}*/}
                                    {/*    page={1 - 1}*/}
                                    {/*    rowsPerPage={1}*/}
                                    {/*    labelRowsPerPage={Lang.get('table.per_page')}*/}
                                    {/*    onChangePage={(event, page) => {*/}
                                    {/*        console.log(page)*/}
                                    {/*    }}*/}
                                    {/*    onChangeRowsPerPage={event =>*/}
                                    {/*        console.log(page)*/}
                                    {/*    }*/}
                                    {/*    ActionsComponent={TablePaginationActions}*/}
                                    {/*/>*/}
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </Paper>

            )}
        </MasterLayout>
    )
}

const styles = theme => ({
    root: {
        width: '100%',
      //  marginTop: theme.spacing.unit * 3,
        minHeight: '75vh',
    },

    table: {
        minWidth: 500,
    },

    tableWrapper: {
        overflowX: 'auto',
    },
});

export default withStyles(styles)(List);
