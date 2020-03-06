
const axios = require('axios');

const getMetrolinkData = require('../../src/helpers/getMetrolinkData');
const { metrolinkAPIKey, metrolinkUrl } = require('../../src/config');

jest.mock('axios');

describe('getMetrolinkData', () => {

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();

    axios.get.mockResolvedValue({ data: 'hello' });
  });

  it('should make a get request to Metrolink API', async () => {
    await getMetrolinkData();

    expect(axios.get).toHaveBeenCalled();
  });

  it('should add correct header to call with api key', async () => {
    const expectedHeaders = {
      headers: {
        'Ocp-Apim-Subscription-Key': metrolinkAPIKey
      }
    };

    await getMetrolinkData();

    expect(axios.get).toHaveBeenCalledWith(metrolinkUrl, expectedHeaders);
  });

  it('should return data object of response', async () => {
    const data = { trams: true };
    axios.get.mockResolvedValue({ data });

    const result = await getMetrolinkData();

    expect(result).toBe(data);
  });
});
