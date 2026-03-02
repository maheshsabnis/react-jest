import axios from 'axios';

jest.mock('axios');

export const mockedAxios = axios as jest.Mocked<typeof axios>;

export const setupAxiosMocks = () => {
  mockedAxios.get.mockReset();
  mockedAxios.post.mockReset();
  mockedAxios.put.mockReset();
  mockedAxios.delete.mockReset();
};
