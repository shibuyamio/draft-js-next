import dynamic from "next/dynamic";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Editor = dynamic(import("../components/Editor/index"), { ssr: false });

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Draft.js with Next</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Draft.js with Next
        </h1>
        <Editor />
      </main>
    </div>
  );
}
