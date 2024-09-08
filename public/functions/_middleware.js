import React from "react";
import vercelOGPagesPlugin from "@cloudflare/pages-plugin-vercel-og";

export const onRequest = vercelOGPagesPlugin({
  imagePathSuffix: "/opengraph-image.png",
  component: ({ ogTitle, pathname }) => {
    return <div style={{ display: "flex" }}><p>Transitstat.us</p><br />{JSON.stringify(pathname)}</div>;
  },
  extractors: {
    on: {
      'meta[property="og:title"]': (props) => ({
        element(element) {
          props.ogTitle = element.getAttribute("content");
        },
      }),
    },
  },
  options: {},
  autoInject: {
    openGraph: true,
  },
});