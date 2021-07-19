import Layout from '../../components/Layout';
import BasicMeta from '../../components/meta/BasicMeta';
import OpenGraphMeta from '../../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../../components/meta/TwitterCardMeta';
import ProjectList from '../../components/ProjectsList';
import config from '../../lib/config';
import { countProjects, listProjectsContent } from '../../lib/projects';
import { listTags, listProjectsTags } from '../../lib/tags';
export default function Index({ projects, tags, projectstags, pagination }) {
  const url = '/projects';
  const title = 'All projects';
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <ProjectList
        projects={projects}
        tags={tags}
        projectstags={projectstags}
        pagination={pagination}
      />
    </Layout>
  );
}
export const getStaticProps = async () => {
  const projects = listProjectsContent(1, config.posts_per_page);
  const tags = listTags();
  const projectstags = listProjectsTags();

  const pagination = {
    current: 1,
    pages: Math.ceil(countProjects() / config.posts_per_page),
  };
  return {
    props: {
      projects,
      tags,
      projectstags,
      pagination,
    },
  };
};
