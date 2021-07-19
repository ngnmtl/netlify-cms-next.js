import tags from '../../meta/tags.yml';
import projectTags from '../../meta/project-tags.yml';

const tagMap = generateTagMap();
const ProjectstagMap = generateProjectsTagMap();

function generateTagMap() {
  let result = {};
  for (const tag of tags.tags) {
    result[tag.slug] = tag;
  }
  return result;
}

function generateProjectsTagMap() {
  let result = {};
  for (const tag of projectTags.ptags) {
    result[tag.slug] = tag;
  }
  return result;
}
export function getTag(slug) {
  return tagMap[slug];
}

export function getProjectsTag(slug) {
  return ProjectstagMap[slug];
}

export function listTags() {
  return tags.tags;
}
export function listProjectsTags() {
  return projectTags.ptags;
}
