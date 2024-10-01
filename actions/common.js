const { capitalizeFirstLetter } = require('../utils/utilFunctions');

const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

const initialCheckUp = async (desiredFolderPath, {
  captalizeLetter
} = {
  captalizeLetter: false
}) => {
   //Check for the right directory path
   const stat = await fs.promises.stat(desiredFolderPath);
   if(!stat.isDirectory()){
     vscode.window.showWarningMessage('Please select the desired folder.');
     return;
   }
 
   // Get the desired folder name from the user
   const inputValue = await vscode.window.showInputBox({
     prompt: "Enter the target component name:"
   });
   if (!inputValue) {
     vscode.window.showErrorMessage('No directory name provided.');
     return;
   }
 
   const modifiedInputValue = captalizeLetter ? capitalizeFirstLetter(inputValue) : inputValue;
   // Construct the full path for the new component directory
   const newDirPath = path.join(desiredFolderPath, modifiedInputValue);
   // Check if the directory already exists
   if (fs.existsSync(newDirPath)) {
     vscode.window.showErrorMessage(`Directory '${modifiedInputValue}' already exists in ${desiredFolderPath}.`);
     return;
   }

   return { inputValue: modifiedInputValue, newDirPath };
}

module.exports = {
  initialCheckUp
}