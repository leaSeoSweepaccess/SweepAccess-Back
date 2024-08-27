// import { PaginationMeta } from '@/types/paginationMeta';
import { type Response } from 'express';

/**
 * The request succeeded. The result meaning of "success" depends on the HTTP method.
 */
export function successResponse<T>(data: T, res: Response) {
  return res.status(200).json({ status: 200, success: true, data });
}

// /**
//  * The request succeeded. The result meaning of "success" depends on the HTTP method.
//  */
// export function successPaginatedResponse<T>(data: T, meta: PaginationMeta) {
//   return NextResponse.json(
//     { status: 200, success: true, data, meta },
//     { status: 200 },
//   );
// }

// /**
//  * The request succeeded, and a new resource was created as a result.
//  * This is typically the response sent after POST requests, or some PUT requests.
//  */
// export function createdResponse<T>(data: T) {
//   return NextResponse.json(
//     { status: 201, success: true, data },
//     { status: 201 },
//   );
// }

// /**
//  * There is no content to send for this request, but the headers may be useful.
//  * The user agent may update its cached headers for this resource with the new ones.
//  */
// export function noContentResponse() {
//   return NextResponse.json({ status: 204, success: true }, { status: 200 });
// }

// /**
//  * The server cannot or will not process the request due to something
//  * that is perceived to be a client error (e.g., malformed request syntax,
//  * invalid request message framing, or deceptive request routing).
//  */
// export function badRequestResponse(error: any = 'Bad request') {
//   return NextResponse.json(
//     { status: 400, success: false, error },
//     { status: 400 },
//   );
// }

// /**
//  * Although the HTTP standard specifies "unauthorized",
//  * semantically this response means "unauthenticated".
//  * That is, the client must authenticate itself to get the requested response.
//  */
// export function unauthorizedResponse(error = 'Unauthorized') {
//   return NextResponse.json(
//     { status: 401, success: false, error },
//     { status: 401 },
//   );
// }

// /**
//  * The client does not have access rights to the content;
//  * that is, it is unauthorized, so the server is refusing
//  * to give the requested resource.
//  * Unlike 401 Unauthorized, the client's identity is known to the server.
//  */
// export function forbiddenResponse(error = 'Forbidden') {
//   return NextResponse.json(
//     { status: 403, success: false, error },
//     { status: 403 },
//   );
// }

// /**
//  * The server cannot find the requested resource.
//  * In an API, this can also mean that the endpoint is valid but the resource itself does not exist.
//  * Servers may also send this response instead of 403 Forbidden
//  * to hide the existence of a resource from an unauthorized client.
//  * This response code is probably the most well known due to its frequent occurrence on the web.
//  */
// export function notFoundResponse(error: any = 'Data not found') {
//   return NextResponse.json(
//     { status: 404, success: false, error },
//     { status: 404 },
//   );
// }

// /**
//  * The request method is known by the server but is not supported
//  * by the target resource.
//  * For example, an API may not allow calling DELETE to remove a resource.
//  */
// export function methodNotAllowedResponse(error = '') {
//   return NextResponse.json(
//     { status: 405, success: false, error },
//     { status: 405 },
//   );
// }

// /**
//  * The server has encountered a situation it does not know how to handle.
//  */
// export function internalServerErrorResponse(error = 'Internal server error') {
//   return NextResponse.json(
//     { status: 500, success: false, error },
//     { status: 500 },
//   );
// }
