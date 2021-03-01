import * as React from 'react';
import ContextCreator from './ContextCreator';

interface MultiProviderProps {
  providers: any[];
}
type Provider = ({ children }: { children: React.ReactNode }) => JSX.Element;

const createProvidersStack = (providers: Provider[], children, props, index: number = 0, childIsElement?: boolean) => {
  const isFinalNode = index === providers.length - 1;
  const component = providers[index];
  if (!isFinalNode) {
    return React.createElement(
      component,
      null,
      createProvidersStack(providers, children, props, ++index, childIsElement)
    );
  } else {
    if (!childIsElement) {
      return React.createElement(component, {
        ...(props || {}),
        children,
      });
    } else {
      return children(props);
    }
  }
};

export const MultiProvider: React.FC<MultiProviderProps> = ({ providers, children }) => {
  return createProvidersStack(providers, children, {});
};

export const ProvideContext = (ProvideContext: Provider | Provider[]) => (Component: React.ReactNode) => (props) => {
  const providers = ProvideContext instanceof Array ? ProvideContext : [ProvideContext];
  return createProvidersStack(providers, Component, props, 0, true);
};

export default ContextCreator;
