import base from "./rollup.config.base";

const config = Object.assign({}, base, {
	output: {
		file: "dist/hyperapp-apollo.esm.js",
		format: "es",
		name: "hyperapp-apollo"
	}
});

export default config;
