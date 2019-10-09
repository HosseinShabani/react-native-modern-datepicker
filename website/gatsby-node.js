/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`);

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions;
  const homeTemplate = path.resolve(`src/screens/home/Home.js`);
  return createPage({
    path: '/',
    component: homeTemplate,
  });
};
