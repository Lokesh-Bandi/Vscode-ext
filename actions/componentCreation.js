const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const { constructCSSFileTemplate, constructTSXFileTemplate } = require('../templates/templates');
const { initialCheckUp } = require('./common');



const componentCreation = async (desiredFolderPath) => {
  
  const { newDirPath, inputValue } = await initialCheckUp(desiredFolderPath, {captalizeLetter: true});
  if(!newDirPath || !inputValue){ 
    return;
  }

  fs.mkdirSync(newDirPath, { recursive: true });

  const tsxFilePath = path.join(newDirPath, `${inputValue}.tsx`);
  const cssFilePath = path.join(newDirPath, `${inputValue}.module.css`);

  const tsxContent = constructTSXFileTemplate(inputValue);
  const cssContent = constructCSSFileTemplate();

  // Create Component .tsx file
  fs.writeFile(tsxFilePath, tsxContent, (err) => {
      if (err) {
          console.error('Error creating file:', err);
          vscode.window.showErrorMessage(`Error Creating ${inputValue}.tsx file at ${desiredFolderPath}.`);
      } else {
        console.log(` ${inputValue}.tsx File created successfully at ${tsxFilePath}`);
      }
  });

  // Create Component .module.css file
  fs.writeFile(cssFilePath, cssContent, (err) => {
    if (err) {
        console.error('Error creating file:', err);
        vscode.window.showErrorMessage(`Error Creating ${inputValue}.module.css file at ${desiredFolderPath}.`);
    } else {
        console.log(` ${inputValue}.module.css file created successfully at ${cssFilePath}`);
    }
  });

  vscode.window.showInformationMessage(`${inputValue} directory created successfully with following .tsx and .module.css files`);
}

module.exports = {
  componentCreation
}