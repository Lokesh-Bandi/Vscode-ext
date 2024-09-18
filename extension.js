const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const { capitalizeFirstLetter } = require('./utils/utilFunctions');
const { constructCSSFileTemplate, constructTSXFileTemplate } = require('./templates/templates');

function activate(context) {
  let disposable = vscode.commands.registerCommand('extension.getActiveFolder', async (uri) => {

  if (!uri) {
    vscode.window.showWarningMessage('No URI provided.');
    return;
  }

  const desiredFolderPath = uri.fsPath;
  try {

    //Check for the right directory path
    const stat = await fs.promises.stat(desiredFolderPath);
    if(!stat.isDirectory()){
      vscode.window.showWarningMessage('Please select the desired folder.');
      return;
    }

    // Get the desired folder name from the user
    const userComponentName = await vscode.window.showInputBox({
      prompt: "Enter the target component name:"
    });
    if (!userComponentName) {
      vscode.window.showErrorMessage('No directory name provided.');
      return;
    }

    const modifiedComponentName = capitalizeFirstLetter(userComponentName);

    // Construct the full path for the new component directory
    const newDirPath = path.join(desiredFolderPath, modifiedComponentName);
    // Check if the directory already exists
    if (fs.existsSync(newDirPath)) {
      vscode.window.showErrorMessage(`Directory '${modifiedComponentName}' already exists in ${desiredFolderPath}.`);
      return;
    }

    fs.mkdirSync(newDirPath, { recursive: true });

    const tsxFilePath = path.join(newDirPath, `${modifiedComponentName}.tsx`);
    const cssFilePath = path.join(newDirPath, `${modifiedComponentName}.module.css`);

    const tsxContent = constructTSXFileTemplate(modifiedComponentName);
    const cssContent = constructCSSFileTemplate();

    // Create Component .tsx file
    fs.writeFile(tsxFilePath, tsxContent, (err) => {
        if (err) {
            console.error('Error creating file:', err);
            vscode.window.showErrorMessage(`Error Creating ${modifiedComponentName}.tsx file at ${desiredFolderPath}.`);
        } else {
          console.log(` ${modifiedComponentName}.tsx File created successfully at ${tsxFilePath}`);
        }
    });

    // Create Component .module.css file
    fs.writeFile(cssFilePath, cssContent, (err) => {
      if (err) {
          console.error('Error creating file:', err);
          vscode.window.showErrorMessage(`Error Creating ${modifiedComponentName}.module.css file at ${desiredFolderPath}.`);
      } else {
          console.log(` ${modifiedComponentName}.module.css file created successfully at ${cssFilePath}`);
      }
    });

    vscode.window.showInformationMessage(`${modifiedComponentName} directory created successfully with following .tsx and .module.css files`);

    } catch(e) {
      console.log(e);
    }
  })

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};