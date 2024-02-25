import React from 'react';

type TReplacementsMap = { target: string; replace: React.ReactNode | string };

export const dictionaryReplacer = (text: string, replacements: TReplacementsMap[]) => {
  const regex = /(\$\[\w+\])/g;
  const tokens = text.split(regex).map((token, index) => {
    const isTarget = token.startsWith('$[') && token.endsWith(']');
    if (!isTarget) return token;

    const replaceOp = replacements.find(({ target }) => `$[${target}]` === token);
    if (!replaceOp) return token;

    const { target, replace } = replaceOp;
    if (React.isValidElement(replace)) return React.cloneElement(replace, { key: `${token}-${index}` });
    else return replace;
  });

  return <>{tokens}</>;
};
