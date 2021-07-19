import Layout from "../../../components/Layout";
import BasicMeta from "../../../components/meta/BasicMeta";
import OpenGraphMeta from "../../../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../../../components/meta/TwitterCardMeta";
import PostList from "../../../components/PostList";
import config from "../../../lib/config";
import { countPosts, listPostContent } from "../../../lib/posts";
import { listTags } from "../../../lib/tags";
export default function Page({ posts, tags, pagination, page }) {
    const url = `/posts/page/${page}`;
    const title = "All posts";
    return (<Layout>
      <BasicMeta url={url} title={title}/>
      <OpenGraphMeta url={url} title={title}/>
      <TwitterCardMeta url={url} title={title}/>
      <PostList posts={posts} tags={tags} pagination={pagination}/>
    </Layout>);
}
export const getStaticProps = async ({ params }) => {
    const page = parseInt(params.page);
    const posts = listPostContent(page, config.posts_per_page);
    const tags = listTags();
    const pagination = {
        current: page,
        pages: Math.ceil(countPosts() / config.posts_per_page),
    };
    return {
        props: {
            page,
            posts,
            tags,
            pagination,
        },
    };
};
export const getStaticPaths = async () => {
    const pages = Math.ceil(countPosts() / config.posts_per_page);
    const paths = Array.from(Array(pages - 1).keys()).map((it) => ({
        params: { page: (it + 2).toString() },
    }));
    return {
        paths: paths,
        fallback: false,
    };
};
