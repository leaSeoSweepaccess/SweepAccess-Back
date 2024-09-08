import type { Request, Response } from 'express';
import { githubModel } from '@/integrations/github/github.model';

const modelName = 'Github';

export const githubController = {
  authorizationCallback: (req: Request, res: Response) => {
    const { code } = req.query;

    if (!code) {
      return res.status(400).send('Missing code parameter');
    }

    const accessToken = githubModel.getAccessToken(code as string);

    //ACA DEBERIAMOS GUARDAR El ACCESS TOKEN RELACIONANDOLO CON EL TENANT
    // Y CON LA APPLICATION

    res.json({
      accessToken,
    });
  },

  createSignupUrl: async (req: Request, res: Response) => {
    const redirectUri = await githubModel.createSignupUrlCallback();

    res.json({
      redirectUri,
    });
  },
};
