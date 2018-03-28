import resolveNode from "./resolveNode";
import apolloActions from "./actions";

const hyperappApollo = (client, app) => {
  return function(initialState, actionsTemplate, originalView, container) {
    const enhancedView = function(state, actions) {
      const node = resolveNode(originalView(state, actions), actions);
      return node && (node.length ? node[0] : node);
    };

    const enhancedActions = Object.assign(
      {},
      actionsTemplate,
      apolloActions(client)
    );

    return app(initialState, enhancedActions, enhancedView, container);
  };
};

export default hyperappApollo;
