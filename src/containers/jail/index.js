
import React from 'react';
// import PropTypes from 'prop-types';
// import { push } from 'react-router-redux';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import { Table, Breadcrumb, Layout, Button, Divider, Badge } from 'antd';
// import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const { Content } = Layout;

const data = [{
  key: '1',
  hostname: 'Brown',
  ip: '32.12.17.159',
  quota: 50,
  status: 'running',
  owner: 'tutu',
}, {
  key: '2',
  hostname: 'Green',
  ip: '42.12.17.159',
  quota: 1024,
  status: 'running',
  owner: 'tutu',
}, {
  key: '3',
  hostname: 'Black',
  ip: '32.12.17.159',
  quota: 2048,
  status: 'running',
  owner: 'tutu',
}, {
  key: '4',
  hostname: 'Red',
  ip: '32.12.17.159',
  quota: 10,
  status: 'running',
  owner: 'tutu',
}];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // sortedInfo: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(pagination, filters, sorter) {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
    });
  }
  render() {
    const columns = [{
      title: 'Hostname',
      dataIndex: 'hostname',
      key: 'hostname',
    }, {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
    }, {
      title: 'IP Address',
      dataIndex: 'ip',
      key: 'ip',
    }, {
      title: 'Quota',
      dataIndex: 'quota',
      key: 'quota',
    }, {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        let status;
        if (text === 'running') {
          status = <Badge status="success" text="running" />;
        } else if (text === 'stoped') {
          status = <Badge status="warning" text="stoped" />;
        } else {
          status = <Badge status="error" text="error" />;
        }
        return (
          <span>
            { status }
          </span>
        );
      },
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" shape="circle" icon="caret-right" disabled={record.status === 'running'} />
          <Divider type="vertical" />
          <Button type="warning" shape="circle" icon="pause" disabled={record.status === 'stoped'} />
          <Divider type="vertical" />
          <Button type="danger" shape="circle" icon="delete" />
        </span>
      ),
    }];
    return (
      <div>
        <header className="breadcrumb-header">
          <Breadcrumb>
            <Breadcrumb.Item>Jail</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
          </Breadcrumb>
          <h1>Jail List</h1>
        </header>
        <Content style={{
          margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
        }}
        >
          {/* <div className="table-operations">
            <Button onClick={this.setAgeSort}>Sort age</Button>
            <Button onClick={this.clearFilters}>Clear filters</Button>
            <Button onClick={this.clearAll}>Clear filters and sorters</Button>
          </div> */}
          <Button
            icon="plus"
            type="primary"
            ghost
            style={{
              margin: '0 0 16px',
              borderStyle: 'dashed',
            }}
            onClick={() => {
              if (window.$('[href="#/app/jail/create"]').length > 0) window.$('[href="#/app/jail/create"]')[0].click();
              else this.props.changePage('/app/jail/create');
            }}
          >
            Create
          </Button>
          <Table columns={columns} dataSource={data} onChange={this.handleChange} />
        </Content>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
}, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(App);

