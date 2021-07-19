import Layout from '../../../components/Layout';
import BasicMeta from '../../../components/meta/BasicMeta';
import OpenGraphMeta from '../../../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../../../components/meta/TwitterCardMeta';
import TagPostList from '../../../components/TagPostList';
import config from '../../../lib/config';
import { countPosts, listPostContent } from '../../../lib/posts';
import { getTag, listTags } from '../../../lib/tags';
export default function Index({ posts, tag, pagination, page }) {
  const url = `/posts/tags/${tag.name}` + (page ? `/${page}` : '');
  const title = tag.name;
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <TagPostList posts={posts} tag={tag} pagination={pagination} />
    </Layout>
  );
}
export const getStaticProps = async ({ params }) => {
  const queries = params.slug;
  const [slug, page] = [queries[0], queries[1]];
  const posts = listPostContent(
    page ? parseInt(page) : 1,
    config.posts_per_page,
    slug
  );
  const tag = getTag(slug);
  const pagination = {
    current: page ? parseInt(page) : 1,
    pages: Math.ceil(countPosts(slug) / config.posts_per_page),
  };
  const props = { posts, tag, pagination };
  if (page) {
    props.page = page;
  }
  return {
    props,
  };
};
export const getStaticPaths = async () => {
  const paths = listTags().flatMap((tag) => {
    const pages = Math.ceil(countPosts(tag.slug) / config.posts_per_page);
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
