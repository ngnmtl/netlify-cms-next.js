import Layout from '../../../components/Layout';
import BasicMeta from '../../../components/meta/BasicMeta';
import OpenGraphMeta from '../../../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../../../components/meta/TwitterCardMeta';
import ProjectsTagsList from '../../../components/ProjectsTagsList';
import config from '../../../lib/config';
import { countProjects, listProjectsContent } from '../../../lib/projects';
import { getProjectsTag, listProjectsTags } from '../../../lib/tags';

export default function Index({ projects, tag, pagination, page }) {
  const url = `/projects/tags/${tag.name}` + (page ? `/${page}` : '');
  const title = tag.name;
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <ProjectsTagsList
        projects={projects}
        tag={tag}
        projectstags={listProjectsTags()}
        pagination={pagination}
      />
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const queries = params.slug;
  const [slug, page] = [queries[0], queries[1]];
  const projects = listProjectsContent(
    page ? parseInt(page) : 1,
    config.posts_per_page,
    slug
  );
  const tag = getProjectsTag(slug);
  const pagination = {
    current: page ? parseInt(page) : 1,
    pages: Math.ceil(countProjects(slug) / config.posts_per_page),
  };
  const props = { projects, tag, pagination };
  if (page) {
    props.page = page;
  }
  return {
    props,
  };
};

export const getStaticPaths = async () => {
  const paths = listProjectsTags().flatMap((tag) => {
    const pages = Math.ceil(countProjects(tag.slug) / config.posts_per_page);
    return Array.from(Array(pages).keys()).map((page) =>
      page === 0
        ? {
            params: { slug: [tag.slug] },
          }
        : {
            params: { slug: [tag.slug, (page + 1).toString()] },
          }
    );
  });
  return {
    paths: paths,
    fallback: false,
  };
};
