import Layout from '../../../components/Layout';
import BasicMeta from '../../../components/meta/BasicMeta';
import OpenGraphMeta from '../../../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../../../components/meta/TwitterCardMeta';
import ProjectsTagsList from '../../../components/ProjectsTagsList';
import config from '../../../lib/config';
import { countProjects, listProjectsContent } from '../../../lib/projects';
import { getProjectsTag, listProjectsTags } from '../../../lib/tags';

export default function Page({ projects, tags, pagination, page }) {
  const url = `/projects/page/${page}`;
  const title = 'All projects';
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <ProjectsTagsList
        projects={projects}
        tag={tags}
        projectstags={listProjectsTags()}
        pagination={pagination}
      />
    </Layout>
  );
}
export const getStaticProps = async ({ params }) => {
  const page = parseInt(params.page);
  const projects = listProjectsContent(page, config.posts_per_page);
  const tags = listProjectsTags();
  const pagination = {
    current: page,
    pages: Math.ceil(countProjects() / config.posts_per_page),
  };
  return {
    props: {
      page,
      projects,
      tags,
      pagination,
    },
  };
};
export const getStaticPaths = async () => {
  const pages = Math.ceil(countProjects() / config.posts_per_page);
  const paths = Array.from(Array(pages - 1).keys()).map((it) => ({
    params: { page: (it + 2).toString() },
  }));
  return {
    paths: paths,
    fallback: false,
  };
};
