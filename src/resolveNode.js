function hasApollo(attributes) {
  return Object.keys(attributes).indexOf("apollo") > -1;
}

function beginApolloActions(attributes, actions) {
  if (!actions.apollo) {
    throw new Error("No apollo actions are set.");
  }

  // TODO: handle other apollo stuff
  return actions.apollo.queryWithApollo(attributes.apollo.query);
}

function removeApolloListeners() {}

function mergedLifeCyclesWithApollo(attributes, actions) {
  const mergedAttributes = {};

  // NOTE: https://zaceno.github.io/hypercraft/post/decorator-components/

  mergedAttributes.oncreate =
    typeof attributes.oncreate == "function"
      ? (...args) => {
          beginApolloActions(attributes, actions);
          attributes.oncreate(...args);
        }
      : () => beginApolloActions(attributes, actions);

  mergedAttributes.ondestroy =
    typeof attributes.ondestroy == "function"
      ? (...args) => {
          removeApolloListeners();
          attributes.ondestroy(...args);
        }
      : () => removeApolloListeners;

  return Object.assign({}, attributes, mergedAttributes);
}

function resolveNode(node, actions = {}) {
  if (node == null) return node;

  if (Array.isArray(node)) {
    node = node.map(function(n) {
      return resolveNode(n, actions);
    });
    node = Array.prototype.concat.apply([], node);
    node = node.filter(function(n) {
      return n != null;
    });
    return node;
  }

  if (!node.attributes) return node;

  if (hasApollo(node.attributes)) {
    node.attributes = mergedLifeCyclesWithApollo(node.attributes, actions);
  }

  return {
    nodeName: node.nodeName,
    attributes: node.attributes,
    children: resolveNode(node.children, actions)
  };
}

export default resolveNode;
