import type { Request, Response } from 'express';
import { slackModel } from '@/integrations/slack/slack.model';

const modelName = 'Github';

export const slackController = {
  createSignupUrl: async (req: Request, res: Response) => {
    const redirectUri = slackModel.createSignupUrlCallback();

    res.json({
      redirectUri,
    });
  },
  authorizationCallback: async (req: Request, res: Response) => {
    const { code } = req.query;

    if (!code) {
      return res.status(400).send('Missing code parameter');
    }

    const authSlack = await slackModel.getAccessToken(code as string);

    res.json({
      authSlack,
    });
  },
};
