import ky from 'ky';
import type { Input, Options } from 'ky/distribution/types/options';

export async function fetcher<TResponse>(url: Input, options?: Options) {
  return await ky(url, options).json<TResponse>();
}
