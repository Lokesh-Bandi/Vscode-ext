const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const { initialCheckUp } = require('./common');
const { constructOpertorCSSTemplate } = require('../templates/templates');

const newOperatorCreation = async (desiredFolderPath) => {
 
  const { newDirPath, inputValue } = await initialCheckUp(desiredFolderPath);
  if(!newDirPath || !inputValue){ 
    return;
  }

  fs.mkdirSync(newDirPath, { recursive: true });

  const curatinFolderPath = path.join(newDirPath, 'curtain');
  const generalFolderPath = path.join(newDirPath, 'general');
  const operatorCSSFile = path.join(newDirPath, 'style.css');

  const operatorCSSContent = constructOpertorCSSTemplate()

  fs.mkdirSync(curatinFolderPath, { recursive: true });
  fs.mkdirSync(generalFolderPath, { recursive: true });

  fs.writeFile(operatorCSSFile, operatorCSSContent, (err) => {
    if (err) {
        console.error('Error creating file:', err);
        vscode.window.showErrorMessage(`Error Creating ${inputValue}.tsx file at ${desiredFolderPath}.`);
    } else {
      console.log(` ${inputValue}.css file has been created successfully at ${newDirPath}`);
    }
  });
}

module.exports = {
  newOperatorCreation
}