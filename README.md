# hyperapp-apollo

**Still prototyping**

```javascript
import { h, app } from "hyperapp";

import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import gql from "graphql-tag";
import apolloProvider from "hyperapp-apollo";

const client = new ApolloClient({
	link: new HttpLink({
		uri: "<your graphql endpoint>"
	}),
	cache: new InMemoryCache()
});

const state = {
	count: 0
};

const actions = {
	down: () => state => ({ count: state.count - 1 }),
	up: () => state => ({ count: state.count + 1 })
};

const view = (state, actions) => (
	<main
		apollo={{
			query: gql`
				query RepoInfo {
					repository(owner: "hyperapp", name: "hyperapp") {
						name
						description
					}
				}
			`,
			options: {}
		}}
	>
		<h1>{state.count}</h1>
		<button onclick={actions.down} disabled={state.count <= 0}>
			ー
		</button>
		<button onclick={actions.up}>＋</button>
	</main>
);

apolloProvider(client, app)(state, actions, view, document.body);
```
