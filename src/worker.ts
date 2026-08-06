const VIDEO_MEDIA_PATH = /^\/videos\/(?:hero|actual)\/.+\.(?:mp4|webm|webp)$/;
const VIDEO_FILE_PATH = /^\/videos\/(?:hero|actual)\/.+\.(?:mp4|webm)$/;
const VIDEO_CACHE_CONTROL = 'public, max-age=31536000, immutable, no-transform';

type WorkerEnv = {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
};

type ByteRange = {
  end: number;
  start: number;
};

export const parseByteRange = (value: string, size: number): ByteRange | null => {
  if (size <= 0 || value.includes(',')) return null;

  const match = /^bytes=(\d*)-(\d*)$/.exec(value.trim());
  if (!match) return null;

  const [, startValue, endValue] = match;
  if (!startValue && !endValue) return null;

  if (!startValue) {
    const suffixLength = Number(endValue);
    if (!Number.isSafeInteger(suffixLength) || suffixLength <= 0) return null;
    return { start: Math.max(size - suffixLength, 0), end: size - 1 };
  }

  const start = Number(startValue);
  if (!Number.isSafeInteger(start) || start < 0 || start >= size) return null;

  if (!endValue) return { start, end: size - 1 };

  const requestedEnd = Number(endValue);
  if (!Number.isSafeInteger(requestedEnd) || requestedEnd < start) return null;
  return { start, end: Math.min(requestedEnd, size - 1) };
};

const withVideoCacheHeaders = (response: Response, supportsRanges: boolean) => {
  const headers = new Headers(response.headers);
  headers.set('Cache-Control', VIDEO_CACHE_CONTROL);
  if (supportsRanges) headers.set('Accept-Ranges', 'bytes');
  else headers.delete('Accept-Ranges');
  return headers;
};

const serveVideoMedia = async (request: Request, env: WorkerEnv, supportsRanges: boolean) => {
  const rangeHeader = request.headers.get('Range');
  const shouldHandleRange = request.method === 'GET' && supportsRanges && rangeHeader;
  const assetHeaders = new Headers(request.headers);
  if (shouldHandleRange) assetHeaders.delete('Range');

  const assetResponse = await env.ASSETS.fetch(new Request(request, { headers: assetHeaders }));
  if (assetResponse.status === 404) return assetResponse;

  const headers = withVideoCacheHeaders(assetResponse, supportsRanges);
  if (!shouldHandleRange || assetResponse.status !== 200) {
    return new Response(assetResponse.body, {
      headers,
      status: assetResponse.status,
      statusText: assetResponse.statusText,
    });
  }

  const bytes = await assetResponse.arrayBuffer();
  const ifRange = request.headers.get('If-Range');
  const validatorMatches =
    !ifRange || ifRange === headers.get('ETag') || ifRange === headers.get('Last-Modified');

  if (!validatorMatches) {
    headers.set('Content-Length', String(bytes.byteLength));
    return new Response(bytes, { headers, status: 200 });
  }

  const range = parseByteRange(rangeHeader, bytes.byteLength);
  if (!range) {
    headers.set('Content-Length', '0');
    headers.set('Content-Range', `bytes */${bytes.byteLength}`);
    return new Response(null, { headers, status: 416 });
  }

  const body = bytes.slice(range.start, range.end + 1);
  headers.set('Content-Length', String(body.byteLength));
  headers.set('Content-Range', `bytes ${range.start}-${range.end}/${bytes.byteLength}`);
  return new Response(body, { headers, status: 206 });
};

export default {
  async fetch(request: Request, env: WorkerEnv) {
    const pathname = new URL(request.url).pathname;
    if (!VIDEO_MEDIA_PATH.test(pathname)) return env.ASSETS.fetch(request);
    return serveVideoMedia(request, env, VIDEO_FILE_PATH.test(pathname));
  },
};
