import React from 'react';
import { Form, Icon, Input, Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  login,
} from '../../modules/user';
import './index.scss';

const FormItem = Form.Item;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) return;

      console.log('Received values of form: ', values);
      this.props.login(values);
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card className="login-card" style={{ width: 300 }}>
        <h1 className="title">
          <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} /> Log in
        </h1>
        <Form onSubmit={this.handleSubmit} className="login-form">
          {/* <FormItem>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username" />)}
          </FormItem> */}
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(<Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <Link to="/register">register now!</Link>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  push,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(LoginForm));

