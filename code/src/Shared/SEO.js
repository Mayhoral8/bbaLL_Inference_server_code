import React from "react";
import Helmet from "react-helmet";

const SEO = ({ title, description, slug }) => {
  const siteUrl = "https://sportsinference.com";
  return (
    <Helmet>
      {/* title & description */}
      <title>
        {title ? `${title} | Sports Inference` : "Sports Inference"}
      </title>
      <meta name="title" content="Sports Inference" data-react-helmet="true" />
      <meta name="description" content={description} data-react-helmet="true" />
      {/* social media */}
      {/* <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${siteUrl}/${slug}`} />
      <meta property="og:site_name" content="Sports Inference" />
      <meta property="og:image" content={`${siteUrl}${logo}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content={`${siteUrl}${logo}`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={`${siteUrl}${logo}`} /> */}
    </Helmet>
  );
};

export default SEO;
