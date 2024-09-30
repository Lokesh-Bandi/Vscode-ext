const { componentCreation } = require('./actions/componentCreation');
const { newOperatorCreation } = require('./actions/newOperatorCreation');
const { AVAILABLE_OPTIONS } = require('./utils/config');

const vscode = require('vscode');

function activate(context) {
  let disposable = vscode.commands.registerCommand('extension.getActiveFolderForCreation', async (uri) => {

  if (!uri) {
    vscode.window.showWarningMessage('No URI provided.');
    return;
  }

  const desiredFolderPath = uri.fsPath;
  try {
    const options = [
      { label: AVAILABLE_OPTIONS.componentCreation.label, description: AVAILABLE_OPTIONS.componentCreation.desc },
      { label: AVAILABLE_OPTIONS.newOperatorCreation.label, description: AVAILABLE_OPTIONS.newOperatorCreation.desc },
  ];

  const selectedOption = await vscode.window.showQuickPick(options, {
      placeHolder: 'Choose an option'
  });

    if (selectedOption) {
      switch(selectedOption.label) {
        case AVAILABLE_OPTIONS.componentCreation.label: {
          vscode.window.showInformationMessage(`You selected: Component Creation`);
          componentCreation(desiredFolderPath);
          break;
        }
        case AVAILABLE_OPTIONS.newOperatorCreation.label: {
          vscode.window.showInformationMessage(`You selected: New Operator Creation`);
          newOperatorCreation(desiredFolderPath);
          break;
        }
      }
    }

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