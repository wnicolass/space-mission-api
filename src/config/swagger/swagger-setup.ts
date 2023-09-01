import { join } from 'path';
import { Express } from 'express';
import { readFile } from 'fs/promises';
import { parse as parseYAML } from 'yaml';
import swaggerUi from 'swagger-ui-express';

export async function setupSwagger(app: Express) {
  const docFilePath = join('src', 'config', 'swagger', 'api-doc.yaml');
  const docFile = await readFile(docFilePath, 'utf-8');
  const swaggerDoc = parseYAML(docFile);

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}
