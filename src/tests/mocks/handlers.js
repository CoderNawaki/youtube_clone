import { http, HttpResponse } from 'msw';

import { codingCategoryVideos, newCategoryVideos } from '../fixtures/youtube';

const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

export const handlers = [
  http.get(`${BASE_URL}/search`, ({ request }) => {
    const query = new URL(request.url).searchParams.get('q');

    if (query === 'Coding') {
      return HttpResponse.json(
        { items: codingCategoryVideos },
        { status: 200 }
      );
    }

    return HttpResponse.json({ items: newCategoryVideos }, { status: 200 });
  }),
];
