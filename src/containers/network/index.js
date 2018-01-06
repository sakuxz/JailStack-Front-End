
import React from 'react';
// import PropTypes from 'prop-types';
// import { push } from 'react-router-redux';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import { Table, Breadcrumb, Layout, Button } from 'antd';
// import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const { Content } = Layout;

const data = [{
  key: '1',
  name: 'VPN',
  ip: '172.17.17.1',
  owner: 'tutu',
}, {
  key: '2',
  name: 'OpenShift',
  ip: '172.17.17.2',
  owner: 'tutu',
}];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      title: 'Network Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'IP Address',
      dataIndex: 'ip',
      key: 'ip',
    }, {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
    }, {
      title: 'Action',
      key: 'action',
      render: () => (
        <span>
          <Button type="danger" shape="circle" icon="delete" />
        </span>
      ),
    }];
    return (
      <div>
        <header className="breadcrumb-header">
          <Breadcrumb>
            <Breadcrumb.Item>Network</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
          </Breadcrumb>
          <h1>Network List</h1>
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
              if (window.$('[href="#/app/network/create"]').length > 0) window.$('[href="#/app/network/create"]')[0].click();
              else this.props.changePage('/app/network/create');
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

