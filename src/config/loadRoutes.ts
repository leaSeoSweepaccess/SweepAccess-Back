import { Router, type Express } from 'express';

import authRoutes from '@/routes/auth.routes';
import applicationRoutes from '@/routes/application.routes';
import applicationTenantRoutes from '@/routes/applicationTenant.routes';
import applicationCollaboratorTenantRoutes from '@/routes/applicationCollaboratorTenant.routes';
import collaboratorTenantRoutes from '@/routes/collaboratorTenant.routes';
import collaboratorsRoutes from '@/routes/collaborator.routes';
import tenantRoutes from '@/routes/tenant.routes';
import githubRoutes from '@/routes/github.routes';
import slackRoutes from '@/routes/slack.routes';

const loadRoutes = (app: Express) => {
  const apiRouterV1 = Router();
  // Auth
  apiRouterV1.use('/auth', authRoutes);

  apiRouterV1.use('/applications', applicationRoutes);
  apiRouterV1.use('/collaborators', collaboratorsRoutes);

  apiRouterV1.use('/tenants', tenantRoutes);
  apiRouterV1.use('/tenants', applicationTenantRoutes);
  apiRouterV1.use('/tenants', collaboratorTenantRoutes);
  apiRouterV1.use('/tenants', applicationCollaboratorTenantRoutes);

  // Third-parties
  apiRouterV1.use('/github', githubRoutes);
  apiRouterV1.use('/slack', slackRoutes);

  app.use('/api/v1', apiRouterV1);
};

export default loadRoutes;

/**
 *
 * This function was a first attempt to mimic the router app functionality.
 * It works but I did not find how to handle middlewares in an effective way.
 */
// import fs from 'fs';
// import path from 'path';
// import { Express, RequestHandler } from 'express';
// import logger from '@/logger';

// Define the supported HTTP methods
// const httpMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const;
// type HttpMethod = (typeof httpMethods)[number];

// const loadRoutes = (app: Express, prefix: string = ''): void => {
//   const parentDir = path.resolve(__dirname, '..');
//   const routesPath = path.join(parentDir, 'app');

//   // Helper function to recursively load routes
//   const load = (dir: string): void => {
//     fs.readdirSync(dir).forEach((entry) => {
//       const fullPath = path.join(dir, entry);
//       const stat = fs.statSync(fullPath);

//       if (stat.isDirectory()) {
//         // Recursively load subdirectories
//         load(fullPath);
//       } else if (entry === 'route.ts') {
//         const routePath = dir
//           .replace(routesPath, '')
//           .replace(/\\/g, '/')
//           .replace(/\/\[([^\]]+)\]/g, '/:$1'); // Convert [param] to :param for dynamic routing

//         const prefixedRoutePath = path
//           .join(prefix, routePath)
//           .replace(/\\/g, '/'); // Add prefix to route pathF

//         const routeHandlerModule = require(fullPath);

//         // Register each HTTP method if it exists in the module
//         httpMethods.forEach((method) => {
//           if (typeof routeHandlerModule[method] === 'function') {
//             const handler: RequestHandler = routeHandlerModule[method];
//             const expressMethod: string = method?.toLowerCase();
//             (app as any)[expressMethod](prefixedRoutePath, handler);

//             logger.info(`registered route path: ${method}:${prefixedRoutePath}`);
//           }
//         });

//         // Default export handling for GET
//         if (typeof routeHandlerModule === 'function') {
//           app.get(routePath, routeHandlerModule);
//         }
//       }
//     });
//   };

//   load(routesPath); // Start loading from the routes directory
// };

// export default loadRoutes;
