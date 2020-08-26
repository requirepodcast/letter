import Head from "next/head";

export default function SEO({ title }) {
	if (!title) title = "require('letter');";
	else title = title + " · require('letter');";

	return (
		<Head>
			<title>{title}</title>
			<link rel="icon" href="/favicon.png" />
		</Head>
	);
}
