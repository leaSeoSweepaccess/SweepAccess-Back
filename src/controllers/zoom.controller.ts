import type { Request, Response } from 'express';
import crypto from 'crypto';
import { zoomModel } from '@/integrations/zoom/zoom.model';
import env from '@/config/env';

const modelName = 'Zoom';

export const zoomController = {
  eventWebhook: (req: Request, res: Response) => {
    const { body } = req;

    if (body.event === 'endpoint.url_validation') {
      const hashForValidate = crypto.createHmac('sha256', env.ZOOM_SECRET_TOKEN as string).update(body.payload.plainToken).digest('hex')

      res.status(200)
      res.json({
        "plainToken": body.payload.plainToken,
        "encryptedToken": hashForValidate
      })
    }

    // si no es validacion, aca debemos operar agregando o sacando colaboradores
  },
  createSignupUrl: (req: Request, res: Response) => {
    const redirectUri = zoomModel.createSignupUrlCallback();

    res.json({
      redirectUri,
    });
  },
  authorizationCallback: async (req: Request, res: Response) => {
    const { code } = req.query;

    if (!code) {
      return res.status(400).send('Missing code parameter');
    }

    const accessToken = await zoomModel.getAccessToken(code as string);

    res.json({
      accessToken,
    });
  }

}