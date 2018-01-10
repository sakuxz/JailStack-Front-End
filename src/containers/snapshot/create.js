import React from 'react';
import { Form, Input, Button, Breadcrumb, Layout, Select } from 'antd';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  updateJails,
} from '../../modules/jail';

const FormItem = Form.Item;
const { Content } = Layout;
const { Option } = Select;

class CreateJailForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.props.updateJails();
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) return;

      console.log('Received values of form: ', values);
      axios.post('/api/snapshot', values).then(() => {
        if (window.$('[href="#/app/snapshot"]').length > 0) window.$('[href="#/app/snapshot"]')[0].click();
        else this.props.push('/app/snapshot');
      });
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <div>
        <header className="breadcrumb-header">
          <Breadcrumb>
            <Breadcrumb.Item>Snapshot</Breadcrumb.Item>
            <Breadcrumb.Item>Create</Breadcrumb.Item>
          </Breadcrumb>
          <h1>Take New Snapshot</h1>
        </header>
        <Content style={{
          margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
        }}
        >
          <Form onSubmit={this.handleSubmit} style={{ maxWidth: 800 }}>
            <FormItem
              {...formItemLayout}
              label="Name"
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: 'Please input the snapshot name!',
                }, {
                  min: 3, message: 'Snapshot name too short!',
                }],
              })(<Input />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Hostname"
            >
              {getFieldDecorator('hostname', {
                rules: [
                  { required: true, message: 'Please select the hostname!' },
                ],
              })(
                <Select placeholder="Please select the hostname">
                  {
                    this.props.jails
                      .filter(e => !e.isUsed)
                      .map(e => <Option value={e.hostname}>{e.hostname}</Option>)
                  }
                </Select>,
                )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">Take a snapshot</Button>
            </FormItem>
          </Form>
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
  updateJails,
  push,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(CreateJailForm));
