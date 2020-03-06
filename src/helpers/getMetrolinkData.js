const axios = require('axios');
const { metrolinkAPIKey, metrolinkUrl } = require('../config');

module.exports = async () => {
  const response = await axios.get(metrolinkUrl, {
    headers: {
      'Ocp-Apim-Subscription-Key': metrolinkAPIKey
    }
  });
  
  return response.data; 
};
