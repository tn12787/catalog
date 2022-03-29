import { join } from 'path';
import fs from 'fs';

export const getParsedFileContentBySlug = (slug: string, postsPath: string) => {
  const postFilePath = join(postsPath, `${slug}.md`);
  const fileContents = fs.readFileSync(postFilePath);

  return fileContents;
};
