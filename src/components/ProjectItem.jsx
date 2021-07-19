import React from 'react';
import Date from './Date';
import Link from 'next/link';
import { parseISO } from 'date-fns';
import Slider from '../components/Slider';
import LinkSvg from '../assets/link.svg';
import { getProjectsTag } from '../lib/tags';
export default function ProjectItem({ project }) {
  return (
    <>
      <Date date={parseISO(project.date)} />
      <h2>
        {project.title}
        {typeof project.url !== 'undefined' && (
          <Link href={project.url}>
            <a>
              &nbsp;
              <LinkSvg />
              &nbsp;
            </a>
          </Link>
        )}
      </h2>

      {project.application ? (
        <Slider project={project} />
      ) : (
        <div className="browser">
          <div className="title">
            <span />
          </div>
          <div
            className="content"
            style={{ backgroundImage: `url(${project.thumbnail})` }}
          ></div>
        </div>
      )}

      <ul className="project-tags">
        {project.ptags &&
          project.ptags.map((pt, i) => (
            <li key={i}>
              <Link
                href={`/projects/tags/${pt.toLowerCase()}`}
                as={`/projects/tags/${pt.toLowerCase()}`}
              >
                <a>{'#' + getProjectsTag(pt).name}</a>
              </Link>
            </li>
          ))}
      </ul>

      <style jsx>
        {`
          .project-tags {
            margin: 0;
            padding: 0;
          }
          .project-tags li {
            list-style: none;
            display: inline;
            margin-right: 5px;
          }
          a {
            color: #222;
            display: inline-block;
          }
          h2 {
            margin: 0;
            font-weight: 500;
          }
          .thumbnail {
            max-width: 600px;
            margin: 10px 0px;
            border: 1px solid #9b9b9b;
            border-radius: 4px;
          }

          .browser {
            width: 100%;
            min-width: 100%;
            border: 2px solid #222;
            border-radius: 4px;
            margin: 10px 0px;
          }

          @media (min-width: 769px) {
            .browser {
              width: 75%;
              min-width: 75%;
            }
          }
          .browser .title {
            height: 30px;
            background: rgba(255, 255, 255, 0.05);
            display: flex;
            align-items: center;
          }
          .browser .title span {
            width: 8px;
            height: 8px;
            background: #f69f19;
            border-radius: 50%;
            position: relative;
            margin-left: 30px;
          }
          .browser .title span::before {
            content: '';
            width: inherit;
            height: inherit;
            border-radius: inherit;
            background: #e9203a;
            position: absolute;
            top: 0;
            left: -15px;
          }
          .browser .title span::after {
            content: '';
            width: inherit;
            height: inherit;
            border-radius: inherit;
            background: #4eac2f;
            position: absolute;
            top: 0;
            right: -15px;
          }
          .browser .content {
            height: 300px;
            background-size: cover;
            transition: 5s all;
            border-top: 2px solid #9b9b9b;
          }
          .browser .content:hover {
            background-position: bottom;
          }
        `}
      </style>
    </>
  );
}
