import { PaginationMeta } from '@/types/paginationMeta';
import { type Response } from 'express';

/**
 * Utility function to send JSON responses.
 */
function sendResponse<T>(
  res: Response,
  status: number,
  success: boolean,
  data?: T,
  error?: string | any,
  meta?: PaginationMeta
) {
  const responseBody = {
    status,
    success,
    ...(data !== undefined && { data }),
    ...(meta !== undefined && { meta }),
    ...(error && { error }),
  };

  return res.status(status).json(responseBody);
}

/**
 * The request succeeded. The result meaning of "success" depends on the HTTP method.
 */
export function successResponse<T>(res: Response, data?: T) {
  return sendResponse(res, 200, true, data);
}

/**
 * The request succeeded with paginated data.
 */
export function successPaginatedResponse<T>(
  res: Response,
  data: T,
  meta?: PaginationMeta
) {
  return sendResponse(res, 200, true, data, undefined, meta);
}

/**
 * The request succeeded, and a new resource was created as a result.
 */
export function createdResponse<T>(res: Response, data?: T) {
  return sendResponse(res, 201, true, data);
}

/**
 * There is no content to send for this request, but the headers may be useful.
 */
export function noContentResponse(res: Response) {
  return res.status(204).send(); // 204 No Content should not send a JSON response body
}

/**
 * The server cannot or will not process the request due to a client error.
 */
export function badRequestResponse(res: Response, error: any = 'Bad request') {
  return sendResponse(res, 400, false, undefined, error);
}

/**
 * The client must authenticate itself to get the requested response.
 */
export function unauthorizedResponse(res: Response, error = 'Unauthorized') {
  return sendResponse(res, 401, false, undefined, error);
}

/**
 * The client does not have access rights to the content.
 */
export function forbiddenResponse(res: Response, error = 'Forbidden') {
  return sendResponse(res, 403, false, undefined, error);
}

/**
 * The server cannot find the requested resource.
 */
export function notFoundResponse(res: Response, error: any = 'Data not found') {
  return sendResponse(res, 404, false, undefined, error);
}

/**
 * The request method is known by the server but is not supported by the target resource.
 */
export function methodNotAllowedResponse(
  res: Response,
  error = 'Method not allowed'
) {
  return sendResponse(res, 405, false, undefined, error);
}

/**
 * The server has encountered a situation it does not know how to handle.
 */
export function internalServerErrorResponse(
  res: Response,
  error = 'Internal server error'
) {
  return sendResponse(res, 500, false, undefined, error);
}
