import axios from 'axios';
import logger from '@/logger';
import env from '@/config/env';

export const zoomModel = {
  createSignupUrlCallback: () => {
    return `https://zoom.us/oauth/authorize?response_type=code&client_id=${env.ZOOM_CLIENT_ID}&redirect_uri=${env.ZOOM_ACCESS_TOKEN_CALLBACK_URL}`;
  },
  getAccessToken: async (code: string) => {
    const requestBody = {
      grant_type: 'authorization_code',
      client_id: env.ZOOM_CLIENT_ID,
      client_secret: env.ZOOM_CLIENT_SECRET,
      code: code,
      redirect_uri: env.ZOOM_ACCESS_TOKEN_CALLBACK_URL,
    };

    try {
      const response = await axios.post(
        'https://zoom.us/oauth/token',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error('Error al hacer el POST:', error);
      //ACA Marian discutamos como registramos el error para que quede todo sync con la app
      logger.error(
        {
          code: 'GITHUB_AUTH_ACCESS_TOKEN',
        },
        'Github Get Access Token authentication Error',
      );
      return {
        error_message: 'Error en la autenticación',
      };
    }
  },
};
