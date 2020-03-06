require('dotenv').config();

const getMetrolinkData = require('./src/helpers/getMetrolinkData');

exports.handler = async (event, context, callback) => {
  try {
    const data = await getMetrolinkData();
    console.log(data);
  } catch (error) {
    console.log(error);
  }

  return 'Hello';
};
