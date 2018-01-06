import React from 'react';
import { connect } from 'react-redux';
import {
  Redirect,
} from 'react-router-dom';

const NoMatch = ({ user: { token } }) => (
  token ?
    <Redirect to={{
      pathname: '/app',
    }}
    /> :
    <Redirect to={{
      pathname: '/app/jail',
    }}
    />
);

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(NoMatch);

