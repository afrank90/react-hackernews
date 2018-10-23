import React from 'react';
import Throbber from '../components/Throbber';
import ThrobberConfig from '../components/Throbber/ThrobberConfig';

/**
 * Higher Order Component for those with loader needed.
 *
 * By doing { isLoading, ...restProps } we are extracting isLoading from original props,
 * as it will not be used in the passed component itself.
 *
 * @param {*} Component
 */
const withLoading = Component => ({
  isLoading,
  throbberSize,
  ...restProps
}) => {
  throbberSize = throbberSize ? throbberSize : ThrobberConfig.size_small;

  return isLoading ? (
    <Throbber className={`c-throbber__${throbberSize}`} />
  ) : (
    <Component {...restProps} />
  );
};

export default withLoading;
