module.exports = {
  pathPrefix: "/react-native-modren-datepicker",
  siteMetadata: {
    title: `React Native Modern Datepicker`,
    description: `A customizable calendar, time & month picker for React Native
    (including Persian Jalaali calendar & locale)`,
    author: `Hossein Shabani`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}
