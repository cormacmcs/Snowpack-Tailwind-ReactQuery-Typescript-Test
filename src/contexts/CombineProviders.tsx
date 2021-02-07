import React from 'react';

interface Props {
  providers: any[];
}

const createProvidersTree = (providers: React.ComponentType[], children, index: number = 0) => {
  const isLastNode = index === providers.length - 1;
  const component = providers[index];
  const props = null;
  if (isLastNode) {
    return React.createElement(component, {
      ...(props || {}),
      children: children,
    });
  } else {
    return React.createElement(component, props, createProvidersTree(providers, children, ++index));
  }
};

const CombineProviders: React.FC<Props> = ({ providers, children }) => {
  return createProvidersTree(providers, children);
};

export default CombineProviders;
