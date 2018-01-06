
import React from 'react';
// import PropTypes from 'prop-types';
// import { push } from 'react-router-redux';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import { Tooltip, Icon, Row, Col, Card, List } from 'antd';
import { ChartCard, MiniProgress, WaterWave } from 'ant-design-pro/lib/Charts';
// import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './index.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // sortedInfo: null,
    };
    // this.handleChange = this.handleChange.bind(this);
  }
  render() {
    return (
      <div>

        <Row type="flex" justify="start">
          <Col span={8}>
            <Card style={{ margin: 24 }} >
              <div className="card-statistics">
                <Icon type="code-o" />
                <span className="card-digital">12</span>
                <span className="card-entry">Jails</span>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ margin: 24 }} >
              <div className="card-statistics">
                <Icon type="global" />
                <span className="card-digital">12</span>
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

              <Row type="flex" justify="start" style={{ marginRight: 32 }} >
                <Col span={12}>
                  <ChartCard
                    style={{
                      margin: 16,
                    }}
                    title="CPU Usage"
                    action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                    total="78%"
                    contentHeight={46}
                  >
                    <MiniProgress percent={78} strokeWidth={8} target={80} />
                  </ChartCard>
                </Col>
                <Col span={12}>
                  <ChartCard
                    style={{
                      margin: 16,
                    }}
                    title="Memory Usage"
                    action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                    total="28%"
                    contentHeight={46}
                  >
                    <MiniProgress
                      percent={28}
                      strokeWidth={8}
                      target={80}
                      color="rgb(183, 194, 19)"
                    />
                  </ChartCard>
                </Col>
              </Row>

              <ChartCard
                style={{
                  margin: 16,
                  marginRight: 48,
                }}
                title="Disk Usage"
                action={<Tooltip title="指标说明"><Icon type="info-circle-o" /></Tooltip>}
                total="12%"
                contentHeight={46}
              >
                <WaterWave
                  height={110}
                  percent={12}
                  style={{
                    float: 'right',
                    marginRight: 22,
                  }}
                />
              </ChartCard>
            </Col>
            <Col span={8}>
              <h2>操作紀錄</h2>
              <List style={{
                maxHeight: 326,
                overflow: 'auto',
                paddingRight: 12,
              }}
              >
                <List.Item>
                  <List.Item.Meta
                    title={<a href="https://ant.design">tutu</a>}
                    description="dsdsds@dss.ds"
                  />
                  <div>Content</div>
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={<a href="https://ant.design">tutu</a>}
                    description="dsdsds@dss.ds"
                  />
                  <div>Content</div>
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={<a href="https://ant.design">tutu</a>}
                    description="dsdsds@dss.ds"
                  />
                  <div>Content</div>
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={<a href="https://ant.design">tutu</a>}
                    description="dsdsds@dss.ds"
                  />
                  <div>Content</div>
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={<a href="https://ant.design">tutu</a>}
                    description="dsdsds@dss.ds"
                  />
                  <div>Content</div>
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={<a href="https://ant.design">tutu</a>}
                    description="dsdsds@dss.ds"
                  />
                  <div>Content</div>
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={<a href="https://ant.design">tutu</a>}
                    description="dsdsds@dss.ds"
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

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: path => push(path),
}, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(App);

