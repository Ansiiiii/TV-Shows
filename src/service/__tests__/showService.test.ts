import axios from 'axios';
import {getShow}  from '../showService' 
jest.mock('axios');

it('getShow, success', async () => {
  const resp = { data: {name: 'Star Wars'} }
  jest.spyOn(axios, 'get').mockResolvedValue(resp)
  const showDetail = await getShow(20);
  expect(axios.get).toHaveBeenCalled();
  expect(showDetail.name).toBe('Star Wars')
})

it('getShow, error', async () => {
  const errorMessage = 'Network Error';
  (axios as jest.Mocked<typeof axios>).get.mockRejectedValueOnce(new Error('some error'));
  const showDetail = await getShow(20);
  expect(showDetail).rejects.toThrow(errorMessage);;
})

