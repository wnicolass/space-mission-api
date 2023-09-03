import { join } from 'path';
import { readdir, stat } from 'fs/promises';
import { Express } from 'express';
import { mergeFiles } from 'merge-yaml-ts';
import swaggerUi from 'swagger-ui-express';

async function findYamlDocs(): Promise<string[]> {
  const yamlDocs: string[] = [];
  const specPath = join('docs', 'spec');
  const yamlDocsPath = await readdir(specPath);

  for (const doc of yamlDocsPath) {
    const docPath = join(specPath, doc);
    const docStats = await stat(docPath);
    if (docStats.isDirectory()) {
      const childFolderDocs = await readdir(docPath);
      childFolderDocs.forEach((doc) => yamlDocs.push(join(docPath, doc)));
      continue;
    }
    yamlDocs.push(docPath);
  }

  return yamlDocs;
}

export async function setupSwagger(app: Express) {
  const allYAMLFiles: string[] = await findYamlDocs();
  const mainYAMLFile = mergeFiles(allYAMLFiles);

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(mainYAMLFile));
}
