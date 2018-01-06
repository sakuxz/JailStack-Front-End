import React from 'react';
import { Form, Input, Button, Breadcrumb, Layout, Slider, Select } from 'antd';
import './index.scss';

const FormItem = Form.Item;
const { Content } = Layout;
const { Option } = Select;

class CreateJailForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkIP = this.checkIP.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) return;

      console.log('Received values of form: ', values);
    });
  }
  checkIP(rule, value, callback) { // eslint-disable-line class-methods-use-this
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    if (value && !ipRegex.test(value)) {
      callback('Please input correct IP addess!');
    } else {
      callback();
    }
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

    const marks = {
      0: '0 GB',
      16: '16 GB',
      24: '24 GB',
      32: '32 GB',
      40: '40 GB',
      50: {
        style: {
          color: '#f50',
        },
        label: <strong>50 GB</strong>,
      },
    };

    return (
      <div>
        <header className="breadcrumb-header">
          <Breadcrumb>
            <Breadcrumb.Item>Jail</Breadcrumb.Item>
            <Breadcrumb.Item>Create</Breadcrumb.Item>
          </Breadcrumb>
          <h1>Create New Jail</h1>
        </header>
        <Content style={{
          margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
        }}
        >
          <Form onSubmit={this.handleSubmit} style={{ maxWidth: 800 }}>
            <FormItem
              {...formItemLayout}
              label="Hostname"
            >
              {getFieldDecorator('hostname', {
                rules: [{
                  required: true, message: 'Please input your hostname!',
                }],
              })(<Input />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="IP Addess"
            >
              {getFieldDecorator('ip', {
                rules: [{
                  required: true, message: 'Please input a IP addess!',
                }, {
                  validator: this.checkIP,
                }],
              })(<Input />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="IP Addess"
            >
              {getFieldDecorator('ipp', {
                rules: [
                  { required: true, message: 'Please select a IP addess!' },
                  { validator: this.checkIP },
                ],
              })(
                <Select placeholder="Please select a IP address">
                  <Option value="172.17.17.1">VPN</Option>
                  <Option value="17.17.17.1">OpenShift</Option>
                </Select>,
                )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Disk Quota"
            >
              {getFieldDecorator('quota', {
                rules: [{
                  required: true, message: 'Please input your SSH key!',
                }],
                initialValue: 10,
              })(<Slider marks={marks} defaultValue={10} max={50} />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="SSH key"
            >
              {getFieldDecorator('sshkey', {
                rules: [{
                  required: true, message: 'Please input your SSH key!',
                }],
              })(
                <Input />,
                )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">Create the Jail</Button>
            </FormItem>
          </Form>
        </Content>
      </div>
    );
  }
}

export default Form.create()(CreateJailForm);
