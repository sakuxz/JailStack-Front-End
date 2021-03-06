
import React from 'react';
// import PropTypes from 'prop-types';
// import { push } from 'react-router-redux';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import { Tooltip, Icon, Row, Col, Card, List, Tabs, Spin } from 'antd';
import { ChartCard, MiniProgress, WaterWave } from 'ant-design-pro/lib/Charts';
// import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  updateNetworks,
} from '../../modules/network';
import {
  updateJails,
} from '../../modules/jail';
import './index.scss';

const { TabPane } = Tabs;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // sortedInfo: null,
      hostStatus: null,
    };
    // this.handleChange = this.handleChange.bind(this);
    this.props.updateNetworks();
    this.props.updateJails();
    this.getHostStatus();
  }

  getHostStatus() {
    axios.get('/api/host/status').then((res) => {
      const mes = res.data;
      this.setState({
        hostStatus: mes.data,
      });
    });
  }

  renderHostStatus() {
    if (!this.state.hostStatus) {
      return (
        <div style={{
          textAlign: 'center',
          paddingTop: '3em',
        }}
        >
          <Spin />
        </div>
      );
    }
    return (
      <div>
        <Tabs
          defaultActiveKey={
            this.state.hostStatus.clusters[0] ? this.state.hostStatus.clusters[0].name : 1}
          className="dashboard-tabs"
        >
          {
            this.state.hostStatus.clusters.map(e => (
              <TabPane tab={e.name} key={e.name}>
                <Row type="flex" justify="start" style={{ marginRight: 32 }} >
                  <Col span={12}>
                    <ChartCard
                      style={{
                        margin: 16,
                      }}
                      title="CPU Usage"
                      action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                      total={`${e.cpu}%`}
                      contentHeight={46}
                    >
                      <MiniProgress percent={e.cpu} strokeWidth={8} target={80} />
                    </ChartCard>
                  </Col>
                  <Col span={12}>
                    <ChartCard
                      style={{
                        margin: 16,
                      }}
                      title="Memory Usage"
                      action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                      total={`${e.mem}%`}
                      contentHeight={46}
                    >
                      <MiniProgress
                        percent={e.mem}
                        strokeWidth={8}
                        target={80}
                        color="rgb(183, 194, 19)"
                      />
                    </ChartCard>
                  </Col>
                </Row>
              </TabPane>),
            )
          }
        </Tabs>,
        <ChartCard
          style={{
            margin: 16,
            marginRight: 48,
          }}
          title="Disk Usage"
          action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
          total={`${this.state.hostStatus.disk}%`}
          contentHeight={46}
        >
          <WaterWave
            height={110}
            percent={this.state.hostStatus.disk}
            style={{
              float: 'right',
              marginRight: 22,
            }}
          />
        </ChartCard>
      </div>
    );
  }

  render() {
    return (
      <div>

        <Row type="flex" justify="start">
          <Col span={8}>
            <Card style={{ margin: 24 }} >
              <div className="card-statistics">
                <Icon type="code-o" />
                <span className="card-digital">{this.props.jails.length}</span>
                <span className="card-entry">Jails</span>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ margin: 24 }} >
              <div className="card-statistics">
                <Icon type="global" />
                <span className="card-digital">{this.props.networks.length}</span>
                <span className="card-entry">Network</span>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ margin: 24 }} >
              <div className="card-statistics">
                <Icon type="switcher" />
                <span className="card-digital">12</span>
                <span className="card-entry">Snapshot</span>
              </div>
            </Card>
          </Col>
        </Row>

        <Card style={{ margin: '12px 24px' }}>
          <Row type="flex" justify="start">
            <Col span={16}>
              { this.renderHostStatus() }
            </Col>
            <Col span={8}>
              <h2>操作紀錄</h2>
              <List style={{
                maxHeight: 395,
                overflow: 'auto',
                paddingRight: 12,
              }}
              >
                <List.Item>
                  <List.Item.Meta
                    title={<a href="/">tutu</a>}
                    description="dsdsds@dss.ds"
                  />
                  <div>Start Jail tutu</div>
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={<a href="/">tutu</a>}
                    description="dsdsds@dss.ds"
                  />
                  <div>Create Jail tutu</div>
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={<a href="/">tutu</a>}
                    description="dsdsds@dss.ds"
                  />
                  <div>Create Network tutu</div>
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={<a href="/">HWLin</a>}
                    description="hwlin1414@cs.nctu.edu.tw"
                  />
                  <div>Shapshot Jail hwlin</div>
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={<a href="/">HWLin</a>}
                    description="hwlin1414@cs.nctu.edu.tw"
                  />
                  <div>Start Jail hwlin</div>
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={<a href="/">HWLin</a>}
                    description="hwlin1414@cs.nctu.edu.tw"
                  />
                  <div>Stop Jail hwlin</div>
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={<a href="/">HWLin</a>}
                    description="hwlin1414@cs.nctu.edu.tw"
                  />
                  <div>Content</div>
                </List.Item>
              </List>
            </Col>
          </Row>
        </Card>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  networks: state.network.networks,
  jails: state.jail.jails,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateJails,
  updateNetworks,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

