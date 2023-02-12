import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { request } from '../lib/files';

export async function getStaticProps() {
	const data = await request();
	return {
		props: { data }
	};
}

export default function Home({ data }) {
	return (
		<div id="photos" className={styles.container}>
			<Head>
				<title>Photos - Floris Jansen</title>
				<meta name="description" content="Photos by Floris Jansen." />
				<link rel="icon" href="/favicon.ico" />
			</Head>


			<button className={styles.navigation} onClick={() => document.getElementById('photos').scrollTo({top: document.getElementById('photos').scrollTop + window.innerHeight, behavior: 'smooth'})}>↓</button>

			<main className={styles.main}>
				{
					data.map((item, key) => {
						return (
							<>
								<p className={styles.location}>
									{item.location}
								</p>
								<article className={styles.photo} key={key}>
									<img src={`photos/${item.filename}`} className={styles.image} loading="lazy" />
								</article>
							</>
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
