import axios from 'axios';
import logger from '@/logger';
import * as githubConnector from '@/integrations/github/github.connector';
import env from '@/config/env';

enum Role {
  Admin = 'admin',
  DirectMember = 'direct_member',
  BillingManager = 'billing_manager',
  Reinstate = 'reinstate',
}

export const githubModel = {
  createSignupUrlCallback: () => {
    return `https://github.com/login/oauth/authorize?redirect_uri=${env.GITHUB_ACCESS_TOKEN_CALLBACK_URL}&client_id=${env.GITHUB_CLIENT_ID}&scope=${env.GITHUB_ACCESS_SCOPE}`;
  },
  getAccessToken: async (code: string) => {
    const requestBody = {
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code: code,
      redirect_uri: env.GITHUB_ACCESS_TOKEN_CALLBACK_URL,
    };

    try {
      const response = await axios.post(
        'https://github.com/login/oauth/access_token',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
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
  getOrganizationList: async (githubToken: string) => {
    return githubConnector.get(githubToken, 'user/orgs');
  },
  getMemberList: async (githubToken: string, organizationCode: string) => {
    const endpoint = `orgs/${organizationCode}/members`;

    return githubConnector.get(githubToken, endpoint);
  },
  getListPendingInvitations: async (
    githubToken: string,
    organizationCode: string,
  ) => {
    const endpoint = `orgs/${organizationCode}/invitations`;

    return githubConnector.get(githubToken, endpoint);
  },
  sendOrgInvitation: async (
    githubToken: string,
    organizationCode: string,
    email: string,
    role?: Role,
  ) => {
    const endpoint = `orgs/${organizationCode}/invitations`;

    const params = new URLSearchParams();
    params.append('email', email);
    if (role) {
      params.append('role', role);
    }

    return githubConnector.postUrlEncoded(githubToken, endpoint, params);
  },
  cancelOrgInvitation: async (
    githubToken: string,
    organizationCode: string,
    invitationId: string,
  ) => {
    const endpoint = `orgs/${organizationCode}/invitations/${invitationId}`;

    return githubConnector.del(githubToken, endpoint);
  },
};
