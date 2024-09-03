import { type Request, type Response } from 'express';
import { successResponse } from '@/utils/httpResponses';

// import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
// import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
// import { ServiceResponse } from "@/common/models/serviceResponse";
// import { handleServiceResponse } from "@/common/utils/httpHandlers";

// export const healthCheckRegistry = new OpenAPIRegistry();

// healthCheckRegistry.registerPath({
//   method: "get",
//   path: "/health-check",
//   tags: ["Health Check"],
//   responses: createApiResponse(z.null(), "Success"),
// });

export const GET = (_req: Request, res: Response) => {
  return successResponse(res, 'Healthy 👍🏻');
};
