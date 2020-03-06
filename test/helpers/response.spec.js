const response = require('../../src/helpers/response');

describe('Response', () => {

  let callback = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should send correct headers', () => {
    // Move this into config file
    const expectedHeaders = {
      'X-Content-Type-Options': 'nosniff',
      'access-control-allow-headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
      'access-control-allow-methods': 'GET,OPTIONS,PATCH,POST,PUT',
      'access-control-allow-origin': '*',
    };

    response.success(callback, {});
    const headers = callback.mock.calls[0][1].headers;

    expect(headers).toEqual(expectedHeaders);
  });

  describe('success', () => {
    it('should call callback with first parameter as null', () => {
      const data = { hello: 'world' };
  
      response.success(callback, data);
      const firstParameter = callback.mock.calls[0][0];
  
      expect(firstParameter).toBe(null);
    });

    it('should send statusCode 200', () => {
      const expectedCode = 200;

      response.success(callback, {});
      const sentResponse = callback.mock.calls[0][1];

      expect(sentResponse.statusCode).toBe(expectedCode);
    });

    it('should send success = true', () => {
      const expectedSuccess = true;

      response.success(callback, {});
      const sentResponse = JSON.parse(callback.mock.calls[0][1].body);

      expect(sentResponse.success).toBe(expectedSuccess);
    });
  });

  describe('error', () => {
    it('should call callback with first parameter as null', () => {
      const data = { hello: 'world' };
  
      response.error(callback, data);
      const firstParameter = callback.mock.calls[0][0];
  
      expect(firstParameter).toBe(null);
    });

    it('should default to statusCode 500 when not provided', () => {
      const expectedCode = 500;

      response.error(callback, {});
      const sentResponse = callback.mock.calls[0][1];

      expect(sentResponse.statusCode).toBe(expectedCode);
    });

    it('should send custom statusCode when provided', () => {
      const expectedCode = 404;

      response.error(callback, {}, expectedCode);
      const sentResponse = callback.mock.calls[0][1];

      expect(sentResponse.statusCode).toBe(expectedCode);
    });

    it('should send success = false', () => {
      const expectedSuccess = false;

      response.error(callback, {});
      const sentResponse = JSON.parse(callback.mock.calls[0][1].body);

      expect(sentResponse.success).toBe(expectedSuccess);
    });

    it('should send default error when error is null', () => {
      const expectedError = 'Unexpected error occurred.';

      response.error(callback, null);
      const sentResponse = JSON.parse(callback.mock.calls[0][1].body);

      expect(sentResponse.error).toBe(expectedError);
    });

    it('should send default error when error is empty object', () => {
      const expectedError = 'Unexpected error occurred.';

      response.error(callback, {});
      const sentResponse = JSON.parse(callback.mock.calls[0][1].body);

      expect(sentResponse.error).toBe(expectedError);
    });
  });
});
