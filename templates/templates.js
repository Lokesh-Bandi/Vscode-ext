const constructTSXFileTemplate = ({componentName}) => {
return `
import type { FunctionComponent, ReactElement } from 'react';

import styles from './${componentName}.module.css';

interface ${componentName}Props {}

const ${componentName}: FunctionComponent<${componentName}Props> = (): ReactElement => {
  return (
    <div className={styles.container}>
      {/* Your Code */}
    </div>
  );
};

export default $DIRECTORY;
`
}

const constructCSSFileTemplate = () => {
return `
.container {}
`
}

module.exports = {
  constructCSSFileTemplate,
  constructTSXFileTemplate
}