import axios from 'axios';
import { push } from 'react-router-redux';

export const UPDATE_JAILS = 'jail/UPDATE_JAILS';

const initialState = {
  jails: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_JAILS:
      return {
        ...state,
        jails: action.jails,
      };

    default:
      return state;
  }
};

export const createJail = jail => (
  (dispatch) => {
    axios.post('/api/jail', {
      ...jail,
    }).then(() => {
      // const mes = res.data;
      // console.log(mes);
      // dispatch(push('/app/jail'));
      if (window.$('[href="#/app/jail"]').length > 0) window.$('[href="#/app/jail"]')[0].click();
      else dispatch(push('/app/jail'));
    });
  }
);

export const updateJails = () => (
  (dispatch) => {
    axios.get('/api/jail').then((res) => {
      const mes = res.data;
      const jails = mes.data.map(e => ({
        id: e.id,
        hostname: e.hostname,
        ip: e.ip ? e.ip.ip : '1.1.1.1',
        owner: e.owner.name,
        quota: e.quota,
        status: e.status,
      }));
      dispatch({
        type: UPDATE_JAILS,
        jails,
      });
    });
  }
);

export const deleteJail = id => (
  (dispatch) => {
    if (window.confirm('Are you sure to delete this jail')) {
      axios.delete(`/api/jail/${id}`).then(() => {
        // const mes = res.data;
        // console.log(mes);
        alert('delete success');
        updateJails()(dispatch);
      });
    }
  }
);

export const startJail = id => (
  (dispatch) => {
    axios.post(`/api/control/jail/${id}`, {
      status: true,
    }).then(() => {
      alert('start success');
      updateJails()(dispatch);
    });
  }
);

export const stopJail = id => (
  (dispatch) => {
    axios.post(`/api/control/jail/${id}`, {
      status: false,
    }).then(() => {
      alert('stop success');
      updateJails()(dispatch);
    });
  }
);

