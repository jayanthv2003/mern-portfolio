import { Helmet } from 'react-helmet-async';

/**
 * Drop-in SEO component. Sets the document title + meta/OG tags per page.
 * Falls back to sensible portfolio-wide defaults if props are omitted.
 */
const SEO = ({
  title = 'Jayanth V | Full-Stack Developer & MCA Student',
  description = 'Full-Stack Developer and MCA student specializing in React, Node.js, Python, Flask, SQL, and modern web architecture. Explore projects, skills, and achievements.',
  image = '/og-image.png',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
