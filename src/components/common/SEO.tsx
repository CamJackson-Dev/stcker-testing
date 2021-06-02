import { Helmet } from "react-helmet";
import React from "react";
import { COMPANY_NAME } from "../../utils/constants";

interface Props {
  description?: string;
  title?: string;
}

const SEO: React.FC<Props> = ({ description, title }) => {
  const url = window.location.href;
  return (
    <Helmet>
      <title>{title}</title>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta name="keywords" content={`${COMPANY_NAME}, Stickers, Shopping`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${url}/logo.jpg`} />
      <meta property="og:site_name" content={COMPANY_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content={"site"} />
      <meta property="og:url" content={url} />
    </Helmet>
  );
};

SEO.defaultProps = {
  description:
    "Free delivery on thousands of stickers. Low prices across earth's biggest selection of any sticker",
  title: `${COMPANY_NAME} - Online Shopping for Creative and Beautiful Stickers`,
};

export default SEO;
