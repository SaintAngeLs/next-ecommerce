import PostgresClient from '@lib/database';
import { categoryQueries } from '@lib/sql';
import { Category as CategoryType } from '@ts-types/generated';
import type { NextApiRequest, NextApiResponse } from 'next';

class Handler extends PostgresClient {
  constructor() {
    super();
  }

  execute = async (req: NextApiRequest, res: NextApiResponse) => {
    const limit = 999;
    const offset = 999;

    const { query, method } = req;
    const id = query.id as string;
    try {
      switch (method) {
        case this.GET: {
          await this.authorization(req, res);
          const { rows } = await this.query<CategoryType, string | number>(
            categoryQueries.getCategoriesParentsSelectForAdminWithId(),
            [id, limit, offset]
          );
          return res.status(200).json(rows);
        }
        default:
          res.setHeader('Allow', ['GET']);
          res.status(405).end(`There was some error!`);
      }
    } catch (error) {
      return res.status(500).json({
        error: {
          type: this.ErrorNames.SERVER_ERROR,
          error,
          message: error?.message,
          from: 'categoriesSelectForAdmin'
        }
      });
    }
  };
}

const { execute } = new Handler();
export default execute;
