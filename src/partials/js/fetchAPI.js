import axios from 'axios';

export async function fetchTripWeather(updatedUrl) {
  try {
    const response = await axios.get(`${updatedUrl}`);
    return processResponse(response);
  } catch (err) {
    processError(err);
  }
}

function processResponse(response) {
  try {
    if (response.status !== 200) throw response.data;
    return response.data;
  } catch (err) {
    processError(err);
  }
}

function processError(err) {
  const { response } = err;
  if (response?.data) throw { message: response.data };
  throw response || err;
}
