import axios from 'axios';
import {getShow}  from '../showService' 


describe('show service', () => {
  jest.mock('axios');

  it('getShow, success', async () => {
    const resp = { data: {name: 'Star Wars'} }
    jest.spyOn(axios, 'get').mockResolvedValue(resp)
    const showDetail = await getShow(20);
    expect(axios.get).toHaveBeenCalled();
    expect(showDetail.name).toBe('Star Wars')
  })
  
  
  
  it('getShow, error', async () => {
    const errorMessage: Error = {
      name: '',
      message: 'Something went wrong',
    }
    jest.spyOn(axios, 'get').mockRejectedValueOnce(errorMessage);
    await getShow(12).catch((error) => {
      expect(error).toBeTruthy();
      expect(error.message).toBe('Something went wrong');
      expect(error.message).not.toBe('Network Error');
    });
  })
})


