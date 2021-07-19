import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import { SocialList } from '../components/SocialList';

export default function Index() {
  return (
    <Layout>
      <BasicMeta url={'/'} />
      <OpenGraphMeta url={'/'} />
      <TwitterCardMeta url={'/'} />
      <div className="container">
        <div>
          <h1>
            Hey, I'm John <span className="wave-emoji">👋</span>
          </h1>
          <span className="handle">@johndoe</span>
          <h2>
            A passionate Full Stack Developer 🚀 <br />
            having an experience of building Web and Mobile applications with
            <br />
            JavaScript / Reactjs / Nodejs / React Native and some other cool
            libraries and frameworks.
          </h2>
          <SocialList />
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1 1 auto;
          padding: 0 2.5rem;
        }
        h1 {
          font-size: 2.5rem;
          margin: 0;
          font-weight: 500;
        }
        h2 {
          font-size: 1.25rem;
          font-weight: 400;
          line-height: 1.25;
        }
        .fancy {
          color: #15847d;
        }
        .handle {
          display: inline-block;
          margin-top: 0.275em;
          color: #9b9b9b;
          letter-spacing: 0.05em;
        }

        .change-theme {
          width: 34px;
          cursor: pointer;
        }
        @media (min-width: 769px) {
          h1 {
            font-size: 3rem;
          }
          h2 {
            font-size: 1.25rem;
          }
        }

        .wave-emoji {
          animation-duration: 1.8s;
          animation-iteration-count: infinite;
          animation-name: wave;
          display: inline-block;
          transform-origin: 70% 70%;
        }

        @keyframes wave {
          0% {
            transform: rotate(0deg);
          }
          10% {
            transform: rotate(-10deg);
          }
          20% {
            transform: rotate(12deg);
          }
          30% {
            transform: rotate(-10deg);
          }
          40% {
            transform: rotate(9deg);
          }
          50% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </Layout>
  );
}
