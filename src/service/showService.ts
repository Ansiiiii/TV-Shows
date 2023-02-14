import type { Show, ShowSearch } from '../model/show'
import axios from 'axios'


export const getShow = async(id: number): Promise<Show> => {
  let url = `https://api.tvmaze.com/shows/${id}`
  const response = await axios.get(url, {
    headers: {
      Accept: 'application/json'
    }
  }).catch((error) => {
    throw new Error(error.message)
  })
  return response.data as Show
}

export const getShows = async(page: number): Promise<Show[]> => {
    const query = new URLSearchParams({
      page: page as unknown as string,
    }).toString();
  
    const url = `https://api.tvmaze.com/shows?${query}`;
  
    const response = await axios.get(url, {
      headers: {
        Accept: 'application/json'
      }
    }).catch((error) => {
      throw new Error(error.message)
    })
  
    return response.data as Show[];
  }

  export const getSearchShows = async(search: string): Promise<Show[]> => {
    const query = new URLSearchParams({
      q: search
    }).toString()
  
    const url = `https://api.tvmaze.com/search/shows?${query}`
  
    const response = await axios.get(url, {
      headers: {
        Accept: 'application/json'
      }
    })
    return response.data .map((item: ShowSearch): Show => item.show) as Show[]
  }
  