import axios, { AxiosRequestConfig } from "axios";

const PATH = 'https://slack.com/';

export const get = async <T> (slackToken: string, endpoint: string, params?: any): Promise<T> => {
    const headers = {
        "Authorization": `Bearer ${slackToken}`
    };

    const request: AxiosRequestConfig = {
        method: 'get',
        url: `${PATH}/${endpoint}`,
        headers,
        params
      }
    
      const response = await axios(request);
      const result = response.data;
      console.log(result);
      return result;
}

export const post = async <T> (slackToken: string, endpoint: string, data: any): Promise<T> => {
    const headers = {
        "Authorization": `Bearer ${slackToken}`
    };

    const request: AxiosRequestConfig = {
        method: 'post',
        url: `${PATH}/${endpoint}`,
        headers,
        data
      }
    
      const response = await axios(request);
      const result = response.data;
      console.log(result);
      return result;
}