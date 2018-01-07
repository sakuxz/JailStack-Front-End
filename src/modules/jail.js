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
      dispatch(push('/app/jail'));
    });
  }
);

export const updateJails = () => (
  (dispatch) => {
    axios.get('/api/jail').then((res) => {
      const mes = res.data;
      console.log(mes);
      const jails = mes.data.map(e => ({
        id: e.id,
        hostname: e.hostname,
        ip: e.ip ? e.ip.ip : '1.1.1.1',
        owner: e.owner.name,
        quota: e.quota,
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

