// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { BlogProvider } from "../../../../lib/BlogProvider";

import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

export default async (req: NextApiRequest, res: NextApiResponse) => {
   // Run cors
  await cors(req, res);

  const provider = new BlogProvider();
  res.statusCode = 200
  res.json(provider.getLatestEntry());
}
