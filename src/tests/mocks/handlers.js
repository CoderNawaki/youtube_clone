import { rest } from 'msw';

import { codingCategoryVideos, newCategoryVideos } from '../fixtures/youtube';

const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

export const handlers = [
  rest.get(`${BASE_URL}/search`, (req, res, ctx) => {
    const query = req.url.searchParams.get('q');

    if (query === 'Coding') {
      return res(ctx.status(200), ctx.json({ items: codingCategoryVideos }));
    }

    return res(ctx.status(200), ctx.json({ items: newCategoryVideos }));
  }),
];
