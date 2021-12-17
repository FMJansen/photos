import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { request } from '../lib/datocms';

const HOMEPAGE_QUERY = `query HomePage($limit: IntType ) {
  allPhotos(first: $limit) {
    location
    image {
      url
    }
  }
}`;

export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY,
    variables: {
      limit: 100
    }
  });
  return {
    props: { data }
  };
}

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Photos - Floris Jansen</title>
        <meta name="description" content="Photos by Floris Jansen." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={styles.navigation}>
        <menu className={styles.menu}>
          <li className={styles.menu_item}>
            Previous:
            <p><span className={styles.button}>Shift</span> + <span className={styles.button}>Space</span></p>
          </li>
          <li className={styles.menu_item}>
            Next:
            <p><span className={styles.button}>Space</span></p>
          </li>
        </menu>
      </nav>

      <main className={styles.main}>
        {
          data.allPhotos.map((item, key) => {
            return (
              <article className={styles.photo} key={key}>
                <img src={`${item.image.url}?max-h=1920&max-w=1080`} className={styles.image} />
                <p className={styles.location}>
                  {item.location}
                </p>
              </article>
            )
          })
        }
      </main>

      <footer className={styles.footer}>
        <a href="https://fmjansen.com" rel="noopener noreferrer">
          Floris Jansen
        </a>
      </footer>
    </div>
  )
}
