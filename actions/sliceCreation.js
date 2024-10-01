const { initialCheckUp } = require('./common');
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const { constructSliceTempale, constructTypeTemplate, constructIndexTemplate, constructSelectorsTemplate } = require('../templates/templates');


const sliceCreation = async (desiredFolderPath) => {
  const { newDirPath, inputValue } = await initialCheckUp(desiredFolderPath);
  if(!newDirPath || !inputValue){ 
    return;
  }
  fs.mkdirSync(newDirPath, { recursive: true });
  const slicePath = path.join(newDirPath, 'slice.ts');
  const selectorsPath = path.join(newDirPath, 'selectors.ts');
  const typesPath = path.join(newDirPath, 'types.ts');
  const indexPath = path.join(newDirPath, 'index.ts');

  const sliceContent = constructSliceTempale(inputValue);
  const typesContent = constructTypeTemplate(inputValue);
  const selectorsContent = constructSelectorsTemplate(inputValue);
  const indexContent = constructIndexTemplate(inputValue);

  fs.writeFile(slicePath, sliceContent, (err) => {
    if (err) {
        console.error('Error creating file:', err);
        vscode.window.showErrorMessage(`Error Creating slice.ts file at ${desiredFolderPath}.`);
    } else {
      console.log(` slice.ts File created successfully at ${slicePath}`);
    }
  });

  fs.writeFile(typesPath, typesContent, (err) => {
    if (err) {
        console.error('Error creating file:', err);
        vscode.window.showErrorMessage(`Error Creating types.ts file at ${desiredFolderPath}.`);
    } else {
      console.log(` types.ts File created successfully at ${slicePath}`);
    }
  });

  fs.writeFile(selectorsPath, selectorsContent, (err) => {
    if (err) {
        console.error('Error creating file:', err);
        vscode.window.showErrorMessage(`Error Creating selectors.ts file at ${desiredFolderPath}.`);
    } else {
      console.log(` selectors.ts File created successfully at ${slicePath}`);
    }
  });

  fs.writeFile(indexPath, indexContent, (err) => {
    if (err) {
        console.error('Error creating file:', err);
        vscode.window.showErrorMessage(`Error Creating index.ts file at ${desiredFolderPath}.`);
    } else {
      console.log(` index.ts File created successfully at ${slicePath}`);
    }
  });
}
module.exports = {
  sliceCreation
}