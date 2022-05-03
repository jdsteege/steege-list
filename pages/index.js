import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Steege List</title>
        <meta name="description" content="A list app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Welcome to SteegeList!
        </h1>

        <input name="username" ></input><button>Login-ish</button>
      </main>

    </div>
  )
}
