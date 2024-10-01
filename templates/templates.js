const { capitalizeFirstLetter } = require("../utils/utilFunctions");

const constructTSXFileTemplate = (componentName) => {
return `import type { FunctionComponent, ReactElement } from 'react';

import styles from './${componentName}.module.css';

interface ${componentName}Props {}

const ${componentName}: FunctionComponent<${componentName}Props> = (): ReactElement => {
    return <div className={styles.container}>{/* Your Code */}</div>;
};

export default ${componentName};
`
}

const constructCSSFileTemplate = () => {
return `.container {}`
}

const constructOpertorCSSTemplate = () => {
return `:root {}

html body {
  visibility: visible;
}
`
}

const constructSliceTempale = (sliceName) => {
  const captalizedWord = capitalizeFirstLetter(sliceName);
  return `import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ${captalizedWord}Type } from './types';

const initialState: ${captalizedWord}Type = {
  testVariable: false,
};
export const ${sliceName}Slice = createSlice({
  name: '${sliceName}',
  initialState: initialState,
  reducers: {
    setTestVariable: (state, action: PayloadAction<boolean>) => {
      state.testVariable = action.payload;
    },
  },
});

export const ${sliceName}Actions = ${sliceName}Slice.actions;
`
}

const constructTypeTemplate = (sliceName) => {
  const captalizedWord = capitalizeFirstLetter(sliceName);
  return `export interface ${captalizedWord}Type {
  testVariable: boolean;
}
`
}

const constructSelectorsTemplate = (sliceName) => {
  const captalizedWord = capitalizeFirstLetter(sliceName);
  return `export const use${captalizedWord}Slice = {};
`;
}
const constructIndexTemplate = () => {
  return `export * from './selectors';
export * from './slice';
export * from './types';
`;
}
module.exports = {
  constructCSSFileTemplate,
  constructTSXFileTemplate,
  constructOpertorCSSTemplate,
  constructSliceTempale,
  constructTypeTemplate,
  constructSelectorsTemplate,
  constructIndexTemplate
}