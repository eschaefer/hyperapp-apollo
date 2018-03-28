function actions(client) {
  return {
    apollo: {
      setApolloData: value => state => {
        return Object.assign({}, value);
      },
      queryWithApollo: value => async (state, actions) => {
        const currentResult = client
          .watchQuery({ query: value })
          .currentResult();
        const { loading, networkStatus, errors } = currentResult;

        actions.setApolloData({ loading }); // test

        console.log("query info", value); // maybe save the component name somehow?

        client.watchQuery({ query: value }).subscribe({
          next: result => actions.setApolloData(result),
          error: error => {}
        });
        // const thing = client.watchQuery({ query: value }).currentResult();
        // console.log("thihng", thing);

        try {
          // const result = await client.query({ query: value });
          await client.query({ query: value });

          // actions.setApolloData(result);
        } catch (e) {
          console.log(e);
        }
      }
    }
  };
}

export default actions;
