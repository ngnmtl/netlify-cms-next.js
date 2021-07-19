import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import matter from "gray-matter";
import { fetchPostContent } from "../../lib/posts";
import fs from "fs";
import yaml from "js-yaml";
import { parseISO } from 'date-fns';
import PostLayout from "../../components/PostLayout";
import InstagramEmbed from "react-instagram-embed";
import YouTube from "react-youtube";
import { TwitterTweetEmbed } from "react-twitter-embed";
const components = { InstagramEmbed, YouTube, TwitterTweetEmbed };
const slugToPostContent = (postContents => {
    let hash = {};
    postContents.forEach(it => hash[it.slug] = it);
    return hash;
})(fetchPostContent());
export default function Post({ title, dateString, slug, tags, author, description = "", source, }) {
    const content = hydrate(source, { components });
    return (<PostLayout title={title} date={parseISO(dateString)} slug={slug} tags={tags} author={author} description={description}>
      {content}
    </PostLayout>);
}
export const getStaticPaths = async () => {
    const paths = fetchPostContent().map(it => "/posts/" + it.slug);
    return {
        paths,
        fallback: false,
    };
};
export const getStaticProps = async ({ params }) => {
    const slug = params.post;
    const source = fs.readFileSync(slugToPostContent[slug].fullPath, "utf8");
    const { content, data } = matter(source, {
        engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) }
    });
    const mdxSource = await renderToString(content, { components, scope: data });
    return {
        props: {
            title: data.title,
            dateString: data.date,
            slug: data.slug,
            description: "",
            tags: data.tags,
            author: data.author,
            source: mdxSource
        },
    };
};
