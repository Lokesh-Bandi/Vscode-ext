const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const { constructOpertorCSSTemplate } = require('../templates/templates');

const newOperatorCreation = async (desiredFolderPath) => {
  //Check for the right directory path
  const stat = await fs.promises.stat(desiredFolderPath);
  if(!stat.isDirectory()){
    vscode.window.showWarningMessage('Please select the desired folder.');
    return;
  }

  // Get the desired folder name from the user
  const operatorName = await vscode.window.showInputBox({
    prompt: "Enter the target component name:"
  });
  if (!operatorName) {
    vscode.window.showErrorMessage('No directory name provided.');
    return;
  }

  // Construct the full path for the new component directory
  const newDirPath = path.join(desiredFolderPath, operatorName);
  // Check if the directory already exists
  if (fs.existsSync(newDirPath)) {
    vscode.window.showErrorMessage(`Directory '${operatorName}' already exists in ${desiredFolderPath}.`);
    return;
  }

  fs.mkdirSync(newDirPath, { recursive: true });

  const curatinFolderPath = path.join(newDirPath, 'curtain');
  const generalFolderPath = path.join(newDirPath, 'general');
  const operatorCSSFolder = path.join(newDirPath, 'style.css');

  const operatorCSSContent = constructOpertorCSSTemplate()

  fs.mkdirSync(curatinFolderPath, { recursive: true });
  fs.mkdirSync(generalFolderPath, { recursive: true });

  fs.writeFile(operatorCSSFolder, operatorCSSContent, (err) => {
    if (err) {
        console.error('Error creating file:', err);
        vscode.window.showErrorMessage(`Error Creating ${operatorName}.tsx file at ${desiredFolderPath}.`);
    } else {
      console.log(` ${operatorName}.css file has been created successfully at ${newDirPath}`);
    }
  });
}

module.exports = {
  newOperatorCreation
}