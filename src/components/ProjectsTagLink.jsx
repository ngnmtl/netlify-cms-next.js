import Link from 'next/link';
export default function Tag({ tag }) {
  return (
    <Link href={'/projects/tags/[[...slug]]'} as={`/projects/tags/${tag.slug}`}>
      <a>{'#' + tag.name}</a>
    </Link>
  );
}
