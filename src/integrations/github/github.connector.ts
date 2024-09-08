import axios, { AxiosRequestConfig } from 'axios';

const PATH = 'https://api.github.com';
const setBaseHeader = () => {
  return {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
};

const BaseHeader = setBaseHeader();

const headersToObject = (headers: Headers): Record<string, string> => {
  const headerObj: Record<string, string> = {};
  headers.forEach((value, key) => {
    headerObj[key] = value;
  });
  return headerObj;
};

export const getUrlEncoded = async <T>(
  githubToken: string,
  endpoint: string,
  params?: any,
): Promise<T> => {
  const config = new Headers();
  config.append('Content-Type', 'application/x-www-form-urlencoded');
  return get<T>(githubToken, endpoint, params, config);
};

export const postUrlEncoded = async <T>(
  githubToken: string,
  endpoint: string,
  params?: any,
): Promise<T> => {
  const config = new Headers();
  config.append('Content-Type', 'application/x-www-form-urlencoded');
  return post<T>(githubToken, endpoint, params, config);
};

export const get = async <T>(
  githubToken: string,
  endpoint: string,
  params?: any,
  config?: Headers | Record<string, string>,
): Promise<T> => {
  let headers: Record<string, string> = {
    ...BaseHeader,
    Authorization: githubToken,
  };

  if (config instanceof Headers) {
    headers = {
      ...headers,
      ...headersToObject(config),
    };
  } else if (config) {
    headers = {
      ...headers,
      ...config,
    };
  }

  const request: AxiosRequestConfig = {
    method: 'get',
    url: `${PATH}/${endpoint}`,
    headers,
    params,
  };

  const response = await axios(request);
  const result = response.data;
  console.log(result);
  return result;
};

export const post = async <T>(
  githubToken: string,
  endpoint: string,
  data: any,
  config?: Headers | Record<string, string>,
): Promise<T> => {
  let headers: Record<string, string> = {
    ...BaseHeader,
    Authorization: githubToken,
  };

  if (config instanceof Headers) {
    headers = {
      ...headers,
      ...headersToObject(config),
    };
  } else if (config) {
    headers = {
      ...headers,
      ...config,
    };
  }

  const request: AxiosRequestConfig = {
    method: 'post',
    url: `${PATH}/${endpoint}`,
    headers,
    data, // Aquí se pasa el cuerpo de la solicitud
  };

  const response = await axios(request);
  const result = response.data;
  console.log(result);
  return result;
};

export const del = async <T>(
  githubToken: string,
  endpoint: string,
  data?: any,
  config?: Headers | Record<string, string>,
): Promise<T> => {
  let headers: Record<string, string> = {
    ...BaseHeader,
    Authorization: githubToken,
  };

  if (config instanceof Headers) {
    headers = {
      ...headers,
      ...headersToObject(config),
    };
  } else if (config) {
    headers = {
      ...headers,
      ...config,
    };
  }

  const request: AxiosRequestConfig = {
    method: 'post',
    url: `${PATH}/${endpoint}`,
    headers,
    data, // Aquí se pasa el cuerpo de la solicitud
  };

  const response = await axios(request);
  const result = response.data;
  console.log(result);
  return result;
};

// async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
//   try {
//     const result = await this.connection.get(path, config);
//     return result.data as T;
//   } catch (error) {
//     throw new Error(error as string);
//   }
// }

// async post<T>(
//   path: string,
//   data?: any,
//   config?: AxiosRequestConfig
// ): Promise<T> {
//   try {
//     const result = await this.connection.post(path, { ...data }, config);
//     return result.data as T;
//   } catch (error) {
//     throw new Error(error as string);
//   }
// }
