import React, { Component } from 'react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';

import './index.css'
import FilterDialog from './filterDialog/index'

const styles = theme => ({
  root: {
    padding: '0px 4px',
    display: 'flex',
    alignItems: 'center',
    border:'1px solid #ea0b4b',
    boxShadow:'none',
  },
  input: {
    flex: 1,
    fontFamily: 'Source Sans Pro',
    fontSize: '14px',
    color: '#808080',
    padding:'0px 8px'
  },
  iconButton: {
    padding: '8px 0px',
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    padding:'10px 10px 0px 10px'
  },
  tableCell: {
    padding: '4px 9px 4px 9px',
    fontSize: '14px',
    fontFamily: 'Source Sans Pro',
  },
  tableCell1:{
    padding: '4px 9px 4px 9px',
    fontSize: '14px',
    fontFamily: 'Source Sans Pro',
    color:'#ea0b4b',
  },
  row: {
    '&:nth-of-type(even)': {
        backgroundColor: '#ffffff',
    },
    '&:nth-of-type(even)': {
        backgroundColor: '#f4f4f4',
    },
  },
  mainRow:{
    height:35
  },
  chipPaid: {
    fontSize: '10px',
    fontFamily: 'Source Sans Pro',
    margin: theme.spacing.unit,
    color: '#ffffff',
    backgroundColor:'#0da176',
    height:22
  },
  chipCancel: {
    fontSize: '10px',
    fontFamily: 'Source Sans Pro',
    margin: theme.spacing.unit,
    color: '#ffffff',
    backgroundColor:'#940016',
    height:22
  },
  chipProcess: {
    fontSize: '10px',
    fontFamily: 'Source Sans Pro',
    margin: theme.spacing.unit,
    color: '#ffffff',
    backgroundColor:'#f5a623',
    height:22
  },
  searchIcon:{
    color:'#ea0b4b',
  },
});

const CustomTableCell = withStyles(theme => ({
  head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
  },
  body: {
      fontSize: 14,
  },
}))(TableCell);


let id = 0;
function createData(orderId, name, mobile,insurerName,premium,commission,purchaseDate,policyStatus,action) {
    id += 1;
    return { orderId, name, mobile, insurerName,premium,commission,purchaseDate,policyStatus,action};
}
const rows = [
    createData('OD12345', 'Timothy Richards','9876543210','AEGON Life Insu..','₹ 4,414','₹ 440 (10%)','22 Apr 2019','Paid','View'),
    createData('OD12345', 'Timothy Richards','9876543210','AEGON Life Insu..','₹ 4,414','₹ 440 (10%)','22 Apr 2019','Cancelled','View'),
    createData('OD12345', 'Timothy Richards','9876543210','AEGON Life Insu..','₹ 4,414','₹ 440 (10%)','22 Apr 2019','In Process','View'),
    createData('OD12345', 'Timothy Richards','9876543210','AEGON Life Insu..','₹ 4,414','₹ 440 (10%)','22 Apr 2019','Paid','View'),
    createData('OD12345', 'Timothy Richards','9876543210','AEGON Life Insu..','₹ 4,414','₹ 440 (10%)','22 Apr 2019','Cancelled','View'),
    createData('OD12345', 'Timothy Richards','9876543210','AEGON Life Insu..','₹ 4,414','₹ 440 (10%)','22 Apr 2019','In Process','View'),
    createData('OD12345', 'Timothy Richards','9876543210','AEGON Life Insu..','₹ 4,414','₹ 440 (10%)','22 Apr 2019','Paid','View'),
    createData('OD12345', 'Timothy Richards','9876543210','AEGON Life Insu..','₹ 4,414','₹ 440 (10%)','22 Apr 2019','Cancelled','View'),
    createData('OD12345', 'Timothy Richards','9876543210','AEGON Life Insu..','₹ 4,414','₹ 440 (10%)','22 Apr 2019','In Process','View'),
    createData('OD12345', 'Timothy Richards','9876543210','AEGON Life Insu..','₹ 4,414','₹ 440 (10%)','22 Apr 2019','Paid','View'),
    createData('OD12345', 'Timothy Richards','9876543210','AEGON Life Insu..','₹ 4,414','₹ 440 (10%)','22 Apr 2019','Cancelled','View'),
    createData('OD12345', 'Timothy Richards','9876543210','AEGON Life Insu..','₹ 4,414','₹ 440 (10%)','22 Apr 2019','In Process','View'),
    createData('OD12345', 'Timothy Richards','9876543210','AEGON Life Insu..','₹ 4,414','₹ 440 (10%)','22 Apr 2019','Paid','View'),
    createData('OD12345', 'Timothy Richards','9876543210','AEGON Life Insu..','₹ 4,414','₹ 440 (10%)','22 Apr 2019','Cancelled','View'),
    createData('OD12345', 'Timothy Richards','9876543210','AEGON Life Insu..','₹ 4,414','₹ 440 (10%)','22 Apr 2019','In Process','View'),   
];


class SalesTransactionList extends Component {
  state={
    insurer:false
  }

  onClickFilter = (name) =>{
    this.setState({
       [name]:true
    })
  } 

    render() {
      const { classes } = this.props;
        return (
            <div className='sell-transaction-list'>
                 <Container fluid={true} className='sell-transaction-list-container'>
                     <Row>
                         <Col md={8}>
                            <div className='gbui-h6 sell-transaction-heading'>Sell Transaction</div>
                         </Col>
                         <Col md={4}>
                              <div className='search-input'>
                                <Paper className={classes.root}>
                                  <InputBase className={classes.input} placeholder="Search Order id, Name, Ph. Number" />
                                  <IconButton className={classes.iconButton} aria-label="Search">
                                    <SearchIcon className={classes.searchIcon}/>
                                  </IconButton>
                                </Paper>
                              </div>
                         </Col>
                         <Col md={12}>
                            <Paper className={classes.paper} square={true}>
                                  <Table className={classes.table}>
                                      <TableHead>
                                          <TableRow className={classes.mainRow}>
                                              <CustomTableCell className={classes.tableCell}>Order Id </CustomTableCell>
                                              <CustomTableCell className={classes.tableCell} align="center">Customer Name</CustomTableCell>
                                              <CustomTableCell className={classes.tableCell} align="center">Mobile</CustomTableCell>
                                              <CustomTableCell className={classes.tableCell} align="center">Insurer Name
                                                <i class="material-icons" style={{verticalAlign:'middle'}}
                                                   onClick={() => this.onClickFilter('insurer')}>filter_list</i>
                                              </CustomTableCell>
                                              <CustomTableCell className={classes.tableCell} align="center">Premium Amount</CustomTableCell>
                                              <CustomTableCell className={classes.tableCell} align="center">Comission</CustomTableCell>
                                              <CustomTableCell className={classes.tableCell} align="center">Purchase Date
                                                <i class="material-icons" style={{verticalAlign:'middle'}}>filter_list</i>
                                              </CustomTableCell>
                                              <CustomTableCell className={classes.tableCell} align="center">Policy Status
                                                <i class="material-icons" style={{verticalAlign:'middle'}}>filter_list</i>
                                              </CustomTableCell>
                                              <CustomTableCell className={classes.tableCell} align="center">Action</CustomTableCell>
                                          </TableRow>
                                      </TableHead>
                                      <TableBody>
                                          {rows.map(row => (
                                              <TableRow className={classes.row} key={row.orderId}>
                                                  <CustomTableCell className={classes.tableCell1} component="th" scope="row">{row.orderId}</CustomTableCell>
                                                  <CustomTableCell className={classes.tableCell} align="center">{row.name}</CustomTableCell>
                                                  <CustomTableCell className={classes.tableCell} align="center">{row.mobile}</CustomTableCell>
                                                  <CustomTableCell className={classes.tableCell} align="center">{row.insurerName}</CustomTableCell>
                                                  <CustomTableCell className={classes.tableCell} align="center">{row.premium}</CustomTableCell>
                                                  <CustomTableCell className={classes.tableCell} align="center">{row.commission}</CustomTableCell>
                                                  <CustomTableCell className={classes.tableCell} align="center">{row.purchaseDate}</CustomTableCell>
                                                  <CustomTableCell className={classes.tableCell} align="center">
                                                     <Chip label={row.policyStatus} className={row.policyStatus === 'Paid' && classes.chipPaid || 
                                                       row.policyStatus === 'Cancelled' && classes.chipCancel ||  
                                                       row.policyStatus === 'In Process' && classes.chipProcess
                                                    } />
                                                  </CustomTableCell>
                                                  <CustomTableCell className={classes.tableCell1} align="center">{row.action}</CustomTableCell>
                                              </TableRow>
                                          ))}
                                      </TableBody>
                                  </Table>
                                  {this.state.insurer && <FilterDialog open={this.state.insurer}/>
                                  }
                              </Paper>
                              <div className='table-pagination gbui-body-1'>
                                 <span className='page'>1-10 of 100</span>
                                 <span className='page'><i class="material-icons" style={{verticalAlign:'middle'}}>keyboard_arrow_left</i></span>
                                 <span><i class="material-icons" style={{verticalAlign:'middle'}}>keyboard_arrow_right</i></span>
                              </div>
                         </Col>
                     </Row>
                 </Container>
            </div>
        );
    }
}

SalesTransactionList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(SalesTransactionList));