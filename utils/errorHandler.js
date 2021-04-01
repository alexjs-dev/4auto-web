import _ from 'lodash';
import { feathersClient } from '../services/ApiClient'
import { toast } from 'react-toastify'


const handleError = async (error) => {


  if (!process.browser || !store) {
    return error;
  }

  const { code, message } = error;
  const getErrorMessage = () => {
    const data = _.get(error, 'data');
    const errors = _.get(error, 'errors');
    if (_.isArray(data) && !_.isEmpty(data)) {
      const first = _.head(data);
      const m = _.get(first, 'message');
      if (m) return m;
    }
    if (_.isArray(errors) && !_.isEmpty(errors)) {
      const first = _.head(errors);
      const m = _.get(first, 'message');
      if (m) return m;
    }
    if (!_.isEmpty(data)) {
      return _.get(data, 'error');
    }
    const msg = _.get(error, 'message');
    if (msg) return msg;
    return null;
  };
  switch (code) {
    case 401: // 401 - unauthorized/invalid token/jwt expired
      if (_.includes(message, 'Invalid login') || _.includes(message, 'jwt expired')) {
        toast.error('errors.invalidLogin')
        localStorage.removeItem('feathers-jwt')
        await feathersClient.logout();
        break;
      }
      if (_.includes(message, 'No auth token')) {
        toast.error('errors.sessionExpired')
        await feathersClient.logout();
        break;
      }
      toast.error('errors.unauthorized')
      break;
    case 404:
        console.error(message)
      break;
    case 429:
      toast.error('errors.tooManyRequests');
      break;
    case 500:
      toast.error(getErrorMessage())
      break;
    default:
        toast.error(getErrorMessage())
      break;
  }
  return error;
};

export default handleError;
