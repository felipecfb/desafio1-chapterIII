import * as prismic from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';

export function getPrismicClient(req?: unknown): prismic.Client {
  const client = prismic.createClient(process.env.PRISMIC_API_ENDPOINT);

  enableAutoPreviews({
    client,
    req,
  })

  return client;
}
