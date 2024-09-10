import axios from 'axios';
import logger from '@/logger';
import * as slackConnector from '@/integrations/slack/slack.connector';

import env from '@/config/env';

interface DelUser {
  team_id: string;
  user_id: string;
}

interface InviteUser {
  team_id: string;
  email: string;
  channel_ids?: string;
  custom_message?: string;
  real_name?: string; //Si bien este es opcional, estaria bueno que sea mandatorio
}

export const slackModel = {
  createSignupUrlCallback: () => {
    return `https://slack.com/oauth/v2/authorize?scope=${env.SLACK_SCOPES}&user_scope=${env.SLACK_USERS_SCOPES}&redirect_uri=${env.SLACK_ACCESS_TOKEN_CALLBACK_URL}&client_id=${env.SLACK_CLIENT_ID}`;
  },
  getAccessToken: async (code: string) => {
    const requestBody = {
      client_id: env.SLACK_CLIENT_ID,
      client_secret: env.SLACK_CLIENT_SECRET,
      code: code,
      redirect_uri: env.SLACK_ACCESS_TOKEN_CALLBACK_URL,
    };

    try {
      const response = await axios.post(
        'https://slack.com/api/oauth.v2.access',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
        },
      )

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
  getUserList: async (slackToken: string) => {
    return slackConnector.get(slackToken, 'api/users.list');
  },
  delUser: async (slackToken: string, userData: DelUser) => {
    return slackConnector.post(slackToken, 'api/admin.users.remove', userData);
  },
  inviteUser: async (slackToken: string, userData: InviteUser) => {
    return slackConnector.post(slackToken, 'api/admin.users.invite', userData);
  },
  getTeamList: async (slackToken: string) => {
    return slackConnector.get(slackToken, 'api/team.info');
  }
}