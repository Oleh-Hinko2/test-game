import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

import { getWinners } from '../../redux/winners'

const texts = {
    pageTitle: "Leader Board"
}

const columns = [
    {
      dataIndex: 'winner',
      key: 'winner',
    },
    {
      dataIndex: 'date',
      key: 'date',
    },
  ];

class BoardWinners extends Component {

    componentDidMount = () => this.props.getWinners();
    
    render() {
        const { dataSource, loading} = this.props;
        return (
            <>
                <h2>{texts.pageTitle}</h2>
                <Table dataSource={dataSource} loading={loading} rowKey={row => row.id} columns={columns} />
            </>
        ) 
    }
   
}

const mapStatetToProps = state => ({
    dataSource: state.winners.data,
    loading: state.winners.loading
})

const mapDispatchToProps = {
    getWinners
}

export default connect(mapStatetToProps, mapDispatchToProps)(BoardWinners);