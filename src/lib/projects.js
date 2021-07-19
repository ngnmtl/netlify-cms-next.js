import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import yaml from 'js-yaml';

const projectsDirectory = path.join(process.cwd(), 'content/projects');
let projectCache;
export function fetchProjectsContent() {
  if (projectCache) {
    return projectCache;
  }
  // Get file names under /projects
  const fileNames = fs.readdirSync(projectsDirectory);
  const allprojectsData = fileNames
    .filter((it) => it.endsWith('.mdx'))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
        },
      });
      const matterData = matterResult.data;
      matterData.fullPath = fullPath;
      const slug = fileName.replace(/\.mdx$/, '');
      // Validate slug string
      if (matterData.slug !== slug) {
        throw new Error(
          'slug field not match with the path of its content source'
        );
      }
      return matterData;
    });
  // Sort projects by date
  projectCache = allprojectsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
  return projectCache;
}
export function countProjects(tag) {
  return fetchProjectsContent().filter(
    (it) => !tag || (it.ptags && it.ptags.includes(tag))
  ).length;
}
export function listProjectsContent(page, limit, tag) {
  return fetchProjectsContent()
    .filter((it) => !tag || (it.ptags && it.ptags.includes(tag)))
    .slice((page - 1) * limit, page * limit);
}
