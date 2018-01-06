import React from 'react';
import { Form, Input, Button, Breadcrumb, Layout } from 'antd';

const FormItem = Form.Item;
const { Content } = Layout;

class CreateNetworkForm extends React.Component {
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

    return (
      <div>
        <header className="breadcrumb-header">
          <Breadcrumb>
            <Breadcrumb.Item>Network</Breadcrumb.Item>
            <Breadcrumb.Item>Create</Breadcrumb.Item>
          </Breadcrumb>
          <h1>Create New Network</h1>
        </header>
        <Content style={{
          margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
        }}
        >
          <Form onSubmit={this.handleSubmit} style={{ maxWidth: 800 }}>
            <FormItem
              {...formItemLayout}
              label="Netwokr Name"
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: 'Please input your netwokr name!',
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
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">Create the Jail</Button>
            </FormItem>
          </Form>
        </Content>
      </div>
    );
  }
}

export default Form.create()(CreateNetworkForm);
