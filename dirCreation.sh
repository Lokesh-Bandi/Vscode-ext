#!/bin/bash

DIRECTORY="${1:-Component}"

# Check if the directory name is provided
if [ -z "$DIRECTORY" ]; then
  echo "Error: No directory name provided."
  echo "Usage: $0 <directory_name>"
  exit 1
fi

DIRECTORY_PATH="${2}/$DIRECTORY"
echo $DIRECTORY_PATH
  mkdir $DIRECTORY_PATH
# # Create the directory
# if [ ! -d `$DIRECTORY_PATH` ]; then
#   printf "Directory '$DIRECTORY' created successfully$\n"
# else
#   printf "Directory '$DIRECTORY' already exists$\n"
# fi

FILE_PATH="$DIRECTORY_PATH/$DIRECTORY.tsx"
CSS_FILE_PATH="$DIRECTORY_PATH/$DIRECTORY.module.css"

# Define the content of the .tsx file
CONTENT=$(cat <<-EOF
import type { FunctionComponent, ReactElement } from 'react';

import styles from './${DIRECTORY}.module.css';

interface ${DIRECTORY}Props {}

const ${DIRECTORY}: FunctionComponent<${DIRECTORY}Props> = (): ReactElement => {
  return (
    <div className={styles.container}>
      {/* Your Code */}
    </div>
  );
};

export default $DIRECTORY;
EOF
)

# Define the content of the .module.css file
CSS_CONTENT=$(cat <<-EOF
  .container {}
EOF
)

# Create the .tsx file with the content
echo "$CONTENT" > "$FILE_PATH"
echo "$CSS_CONTENT" > "$CSS_FILE_PATH"

printf "Files has been created with content$\n"
