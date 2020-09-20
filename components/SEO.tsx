import React from "react";
import Head from "next/head";

const SEO: React.FC<{ title?: string }> = ({ title }) => {
  if (!title) title = "require('letter');";
  else title = title + " · require('letter');";

  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/require_mark_transparent.svg" />
    </Head>
  );
};

export default SEO;
