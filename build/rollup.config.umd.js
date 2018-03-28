import base from "./rollup.config.base";

const config = Object.assign({}, base, {
  output: {
    file: "dist/hyperapp-apollo.umd.js",
    format: "umd",
    name: "hyperapp-apollo"
  }
});

export default config;
