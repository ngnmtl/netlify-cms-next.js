import Link from 'next/link';
export default function Tag({ tag }) {
  return (
    <Link href={'/posts/tags/[[...slug]]'} as={`/posts/tags/${tag.slug}`}>
      <a>{'#' + tag.name}</a>
    </Link>
  );
}
