import axios from 'axios';
import { push } from 'react-router-redux';

export const UPDATE_NETWORKS = 'network/UPDATE_NETWORKS';

const initialState = {
  networks: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NETWORKS:
      return {
        ...state,
        networks: action.networks,
      };

    default:
      return state;
  }
};

export const createNetwork = network => (
  (dispatch) => {
    axios.post('/api/ip', {
      ...network,
    }).then(() => {
      // const mes = res.data;
      // console.log(mes);
      // dispatch(push('/app/network'));
      if (window.$('[href="#/app/network"]').length > 0) window.$('[href="#/app/network"]')[0].click();
      else dispatch(push('/app/network'));
    });
  }
);

export const updateNetworks = () => (
  (dispatch) => {
    axios.get('/api/ip').then((res) => {
      const mes = res.data;
      const networks = mes.data.map(e => ({
        id: e.id,
        name: e.name,
        ip: e.ip,
        owner: e.owner.name,
        isUsed: !!e.jail,
      }));
      dispatch({
        type: UPDATE_NETWORKS,
        networks,
      });
    });
  }
);

export const deleteNetwork = id => (
  (dispatch) => {
    if (window.confirm('Are you sure to delete this network')) {
      axios.delete(`/api/ip/${id}`).then(() => {
        // const mes = res.data;
        // console.log(mes);
        alert('delete success');
        updateNetworks()(dispatch);
      });
    }
  }
);

