
import React from 'react';
// import PropTypes from 'prop-types';
// import { push } from 'react-router-redux';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import { Breadcrumb, Layout, Button, Card, Progress, Timeline, Tag, Spin } from 'antd';
// import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  updateJails,
  deleteJail,
  startJail,
  stopJail,
} from '../../modules/jail';

const { Content } = Layout;

// const data = [{
//   key: '1',
//   hostname: 'Brown',
//   ip: '32.12.17.159',
//   quota: 50,
//   status: 'running',
//   owner: 'tutu',
// }, {
//   key: '2',
//   hostname: 'Green',
//   ip: '42.12.17.159',
//   quota: 1024,
//   status: 'running',
//   owner: 'tutu',
// }, {
//   key: '3',
//   hostname: 'Black',
//   ip: '32.12.17.159',
//   quota: 2048,
//   status: 'running',
//   owner: 'tutu',
// }, {
//   key: '4',
//   hostname: 'Red',
//   ip: '32.12.17.159',
//   quota: 10,
//   status: 'running',
//   owner: 'tutu',
// }];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // sortedInfo: null,
      snapshots: [],
    };
    this.props.updateJails();
    this.getSnapshotStatus();
  }

  getSnapshotStatus() {
    axios.get('/api/snapshot').then((res) => {
      const mes = res.data;
      this.setState({
        snapshots: mes.data,
      });
    });
  }

  getDatasetPercentage(hostname) {
    const dataset = this.state.snapshots[hostname];
    if (dataset) {
      return ((dataset.used / dataset.available) * 100).toFixed(2);
    }
    return 0;
  }

  getDatasetSnapshots(hostname) {
    const dataset = this.state.snapshots[hostname];
    if (dataset) {
      return dataset.snapshots;
    }
    return [];
  }

  render() {
    return (
      <div>
        <header className="breadcrumb-header">
          <Breadcrumb>
            <Breadcrumb.Item>Snapshot</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
          </Breadcrumb>
          <h1>Snapshot List</h1>
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
              if (window.$('[href="#/app/snapshot/create"]').length > 0) window.$('[href="#/app/snapshot/create"]')[0].click();
              else this.props.push('/app/snapshot/create');
            }}
          >
            Take a Snapshot
          </Button>
          {
            this.props.jails.map(e => (
              <Card>
                { this.state.snapshots.length === 0 ?
                  <Spin style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: '5em',
                  }}
                  /> :
                  null
                }
                <Progress style={{ float: 'right' }} type="circle" percent={this.getDatasetPercentage(e.hostname)} />
                <h2>{e.hostname}</h2>
                <p>{e.ip}</p>
                <Timeline>
                  {
                    this.getDatasetSnapshots(e.hostname).map(snapshot =>
                      (<Timeline.Item>Take a snapshot <Tag>{snapshot.name}</Tag></Timeline.Item>))
                  }
                </Timeline>
              </Card>
            ))
          }
        </Content>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  jails: state.jail.jails,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  push,
  updateJails,
  deleteJail,
  startJail,
  stopJail,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

