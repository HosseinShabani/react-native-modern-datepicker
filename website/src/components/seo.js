/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {useStaticQuery, graphql} from 'gatsby';

import logoFavIcon from '../assets/images/favicon.png';

function SEO({description, lang, meta, title}) {
  const {site} = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `,
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:image`,
          content: 'http://tehranreact.ir/public/react-native-modern-datepicker.jpg',
        },
        {
          property: `og:url`,
          content: '',
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image:src`,
          content: 'http://tehranreact.ir/public/react-native-modern-datepicker.jpg',
        },
        {
          name: 'keywords',
          content: `react, react-native, react-native-datepicker, datepicker, calendar, react-native-calendar, react-native-calendars, react-native-persian-calendar, react-native-jalaali-calendar, time-picker, react-native-time-picker, month-picker, react-native-month-picker, persian, jalaali, react-native-jalaali, persian-calendar, customizable-datepicker`,
        },
        {
          name: 'theme-color',
          content: '#05030e',
        },
      ].concat(meta)}>
      <link rel="shortcut icon" href={logoFavIcon} />
    </Helmet>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default SEO;
