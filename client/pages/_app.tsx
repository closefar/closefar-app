import "../styles/globals.css";
import DefaultLayout from "../layouts/DefaultLayout";

// Import FCL config
import "../config/fcl";
import { AlertProvider } from "context/AlertContext";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <div className="text-[#212925] font-ysabeau">
      <Head>
        <link rel="icon" type="image/png" href="/closefar-watch-icon.png" />
      </Head>
      <AlertProvider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </AlertProvider>
    </div>
  );
}

export default MyApp;
