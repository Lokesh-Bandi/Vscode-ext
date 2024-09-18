const vscode = require('vscode');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

function activate(context) {
  let disposable = vscode.commands.registerCommand('extension.getActiveFolder', async (uri) => {
  console.log(`Active Folder:`);

  if (uri) {
    const clickedFolderPath = uri.fsPath;
    console.log('Clicked folder:', clickedFolderPath);

    // Get the desired folder name from the user
    const folderName = await vscode.window.showInputBox({
      prompt: "Enter the target folder name:"
    });
    if (!folderName) {
      vscode.window.showErrorMessage('No directory name provided.');
      return;
    }

    // Construct the full path for the new directory
    const newDirPath = path.join(clickedFolderPath, folderName);

    // Check if the directory already exists
    if (fs.existsSync(newDirPath)) {
      vscode.window.showErrorMessage(`Directory '${folderName}' already exists in ${clickedFolderPath}.`);
      return;
    }


    // Get the path to the shell script
    const scriptPath = path.join(__dirname, 'dirCreation.sh');

    // Execute the shell script
    exec(`bash "${scriptPath}" "${folderName}" ${clickedFolderPath}`, (error, stdout, stderr) => {
      if (error) {
        vscode.window.showErrorMessage(`Error: ${stderr}`);
        return;
      }

      // Show success message
      vscode.window.showInformationMessage(stdout);
    });
     }
  })

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};