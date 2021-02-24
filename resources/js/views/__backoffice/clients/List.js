import React, { useState, useEffect,forwardRef} from 'react';
import Client from '../../../models/Client';
import SendPush from './Form/SendPush';
import * as NavigationUtils from '../../../helpers/Navigation';
import {Master as MasterLayout} from '../layouts';
import MaterialTable from 'material-table';

import {
    Paper,
    Dialog,
    DialogContent,
    withStyles,
} from '@material-ui/core';

import {
    Delete as DeleteIcon, 
    Person as PersonIcon, 
    Send as SendIcon,
    AddBox,
    ArrowUpward,
    Check,
    ChevronLeft,
    ChevronRight,
    Clear,
    DeleteOutline,
    Edit,
    FilterList,
    FirstPage,
    LastPage,
    Remove,
    SaveAlt,
    Search,
    ViewColumn,
} from '@material-ui/icons';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Show: forwardRef((props, ref) => <PersonIcon {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <DeleteIcon {...props} ref={ref} />),
    Send: forwardRef((props, ref) => <SendIcon {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function List(props) {
    const [state, setState] = React.useState({
      columns: [
        { title: 'ID', field: 'id', searchable: false },
        { title: Lang.get('content.client.name'), field: 'name' },
        { title: Lang.get('content.client.phone'), field: 'phone' },
        { title:  Lang.get('content.wallet.labels.balance'), field: 'balance', render: rowData => rowData.balance ? Lang.get('content.сurrency') + " " + rowData.balance : Lang.get('resources.no_content') },
        { title: Lang.get('content.wallet.labels.discount'), field: 'discount', render: rowData =>  rowData.discount ? rowData.discount +'%' : Lang.get('resources.no_content')},
        { title: Lang.get('content.card.token'), field: 'card.token', render: rowData =>  rowData.card && rowData.card.authentication_token ? rowData.card.authentication_token : Lang.get('resources.no_content')},
        { title:  Lang.get('content.created_at'), field: 'created_at'},
        { title: Lang.get('content.updated_at'), field: 'updated_at'},
      ]
    });             
      const [list, setList] = useState(false);
      const [alert, setAlert] = useState({});
      const [loading, setLoading] = useState(false);
      const [modal, showModal] = useState(false);
      const [message, setMessage] = useState({});
      const [pushContent, setPushContent] = useState({});
      const { ...childProps } = props;
      const {
          classes,
          history,
      } = props;
      
   
  
      const sendPushForm = client => {
          setPushContent(<SendPush client={client} setMessage={setMessage} showModal = {showModal} />);
          showModal(true);
      }
      const sendAllPushForm = client => {
          setPushContent(<SendPush client={false} setMessage={setMessage} showModal = {showModal} />);
          showModal(true);
      }
    
      const deleteClient = async resourceId => {
          setLoading(true);
          Client.delete(resourceId).
          then(res => {
              setList(res.data.parse)
              setLoading(false);
              setAlert({});
              setMessage({
                  type: 'success',
                  body: Lang.get('resources.archived', {
                      name: Lang.get('content.titles.person'),
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
              title: Lang.get('resources.delete_confirmation_title_item', {
                  name: Lang.get('content.titles.client'),
              }),
              body: Lang.get('resources.delete_confirmation_body_item', {
                  name: Lang.get('content.titles.person'),
              }),
              confirmText: Lang.get('actions.continue'),
              confirmed: async () => await deleteClient(resourceId),
              cancelled: () => setAlert({}),
          });
      };
  
      useEffect(() => {
          if (list) {
              return;
          }
          let data = Client.paginated();
          data.then(res => {
              setList(res.data);
              console.log(res.data);
          });
      },[list]);
  
      const primaryAction = {
          text: Lang.get('navigation.register_client'),
          clicked: () =>
              history.push(
                  NavigationUtils.route('backoffice.clients.create'),
              ),
      };
  
      const tabs = [
          {
              name: Lang.get('content.list'),
              active: true,
          },
      ];
  
      let localization = {
              body: {
                  emptyDataSourceMessage: Lang.get('content.client.table.empty')
              },
              header: {
                  actions: Lang.get('content.actions')
              },
              toolbar: {
                  searchTooltip: Lang.get('actions.search'),
                  searchPlaceholder: Lang.get('actions.search')
              },
              pagination: {
                  labelRowsSelect: Lang.get('content.client.table.rows'),
                  labelDisplayedRows: `{count} ${Lang.get('content.tableRows')} {from}-{to} ${Lang.get('content.tableRow')}`,
                  firstTooltip: Lang.get('navigation.firstPage'),
                  previousTooltip: Lang.get('navigation.previous'),
                  nextTooltip: Lang.get('navigation.next'),
                  lastTooltip: Lang.get('navigation.lastPage')
              }
          };
  
      let actions = [
          {
              icon: tableIcons.Send,
              tooltip: Lang.get('content.card.send_all_push'),
              isFreeAction: true,
              onClick: () =>  sendAllPushForm()
            },
          {
            icon: tableIcons.Show,
            tooltip: Lang.get('resources.show', {name: Lang.get('content.titles.client')}),
            onClick: (event, rowData) => {
              history.push(
                  NavigationUtils.route(
                      'backoffice.clients.show',
                      {
                          id: rowData.id,
                      },
                  ),
              )
            }
          },
          {
            icon: tableIcons.Send,
            tooltip: Lang.get('content.card.send_push'),
            onClick: (event, rowData) => {
                  sendPushForm(rowData)
            }
          },
          {
              icon: tableIcons.Clear,
              tooltip: Lang.get('resources.delete', { name: Lang.get('content.titles.client')}),
              onClick: (event, rowData) => {
                  handleDeleteClick(rowData.id);
              }
          }
        ];
  
      
    return (
          <MasterLayout
              {...childProps}
              loading={loading}
              pageTitle={Lang.get('content.list_to',{name: Lang.get('content.titles.clients')})}
              primaryAction={primaryAction}
              tabs={tabs}
              message={message}
              alert={alert}
          >
        
              <Paper className={classes.paper} >
         
                  {list && <MaterialTable
                      title=''
                      columns={state.columns}
                      data={list}
                      icons={tableIcons}
                      localization={localization}
                      actions={actions}
                      options={{
                          actionsColumnIndex: -1,
                          exportButton: true,
                          paging: false
                          //grouping: true
                      }}
                  />}
              </Paper>
              <Dialog onClose={()=> showModal(false)} aria-labelledby="simple-dialog-title" open={modal} maxWidth={'sm'}  fullWidth={true}>
                  <DialogContent>
                          {pushContent} 
                  </DialogContent>
              </Dialog>
          </MasterLayout>
    );
  }
  const styles = theme => ({
      paper: {
          width: '100%',
          marginTop: theme.spacing.unit * 3,
        //  minHeight: '75vh',
      },
  
      // table: {
      //     minWidth: 500,
      //     height: '100%'
      // },
  
      // tableWrapper: {
      //     overflowX: 'auto',
      // },
  });
  
  export default withStyles(styles)(List);

