import "normalize.css";
// NOTE: Do not move the styles dir to the src.
// They are used by the Netlify CMS preview feature.
import dynamic from 'next/dynamic'
import "../../public/styles/global.css";
import "nprogress/nprogress.css";

const TopProgressBar = dynamic(
  () => {
    return import("../components/TopProgressBar");
  },
  { ssr: false },
);
export default function App({ Component, pageProps }) {
    return <>
        <TopProgressBar />
    <Component {...pageProps}/>
</>
;
}
