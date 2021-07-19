import React from 'react';
import ProjectItem from './ProjectItem';
import TagLink from './ProjectsTagLink';
import Pagination from './Pagination';
import { getProjectsTag } from '../lib/tags';
export default function ProjectsTagsList({
  projects,
  tags,
  projectstags,
  pagination,
}) {
  return (
    <div className={'container'}>
      <div className={'posts'}>
        <ul className={'posts-list'}>
          {projects.map((it, i) => (
            <li key={i}>
              <ProjectItem project={it} />
            </li>
          ))}
        </ul>
        <Pagination
          current={pagination.current}
          pages={pagination.pages}
          link={{
            href: (page) =>
              page === 1 ? '/projects' : '/projects/page/[page]',
            as: (page) => (page === 1 ? null : '/projects/page/' + page),
          }}
        />
      </div>
      <ul className={'categories'}>
        {projectstags.map((it, i) => (
          <li key={i}>
            <TagLink tag={it} />
          </li>
        ))}
      </ul>
      <style jsx>{`
        .container {
          display: flex;
          margin: 0 auto;
          max-width: calc(1200px - 3rem);
          width: 100%;
          padding: 0 1.5rem;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        li {
          list-style: none;
        }
        .posts {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
        }
        .posts li {
          margin-bottom: 1.5rem;
        }
        .post-list {
          flex: 1 1 auto;
        }
        .categories {
          display: none;
        }
        .categories li {
          margin-bottom: 0.75em;
        }

        @media (min-width: 769px) {
          .categories {
            display: block;
            min-width: 120px;
          }
        }
      `}</style>
    </div>
  );
}
