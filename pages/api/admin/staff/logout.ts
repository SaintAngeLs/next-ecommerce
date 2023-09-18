import { destroyCookie } from '@utils/cookies';
import type { NextApiRequest, NextApiResponse } from 'next';
import PostgresClient from '@lib/database';

class LogoutHandler extends PostgresClient {
  constructor() {
    super();
  }

  execute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    try {
      switch (method) {
        case this.POST: {
          // Destroy or clear the JWT cookie
          destroyCookie(res, this.CookieNames.STAFF_TOKEN_NAME);

          return res.status(200).json({ success: true });
        }
        default:
          res.setHeader('Allow', ['POST']);
          res.status(405).end(`Method Not Allowed`);
      }
    } catch (error) {
      console.log('ERROR:>', error);
      return res.status(500).json({
        error: {
          type: this.ErrorNames.SERVER_ERROR,
          message: error?.message
        }
      });
    }
  };
}

export default new LogoutHandler().execute;
