import React from 'react';
import { reduxForm, Field } from 'redux-form';
import showResults from './showResults';
import './form.scss';

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid Email';
  }
  return errors;
};

const createRenderer = render => ({
  input, label, id, meta, ...rest
}) => (
  <div className={`demo-form ${[
    meta.error && meta.touched ? 'error' : '',
    meta.active ? 'active' : '',
  ].join(' ')}`}
  >
    <pre>
      { JSON.stringify(meta, 0, 2) }
    </pre>
    <label htmlFor={id}>
      { label }
    </label>
    { render(input, rest) }
    { meta.error && meta.touched &&
      <span>{ meta.error }</span> }
  </div>
);

const RenderInput = createRenderer(input => (
  <input {...input} />
));

const RenderSelect = createRenderer((input, { children }) => (
  <select {...input} >
    { children }
  </select>
));

const DemoForm = ({
  handleSubmit, submitting, reset, pristine,
}) => (
  <form onSubmit={handleSubmit(showResults)}>
    <Field id="firstName" name="firstName" label="First Name" component={RenderInput} />
    <Field id="lastName" name="lastName" label="Last Name" component={RenderInput} />
    <Field id="email" name="email" label="Email" component={RenderInput} />
    <Field id="sex" name="sex" label="Sex" component={RenderSelect} >
      <option value="male">male</option>
      <option value="female">female</option>
    </Field>
    <hr />
    <div>
      <label htmlFor="firstName">First Name</label>
      <Field id="firstName" name="firstName" component="input" />
    </div>
    <div>
      <label htmlFor="lastName">Last Name</label>
      <Field id="lastName" name="lastName" component="input" />
    </div>
    <div>
      <label htmlFor="email">Email</label>
      <Field id="email" name="email" component="input" />
    </div>
    <button type="submit" disabled={submitting}>Submit</button>
    <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
  </form>
);

export default reduxForm({
  form: 'demo',
  // destroyOnUnmount: false,
  validate,
})(DemoForm);
