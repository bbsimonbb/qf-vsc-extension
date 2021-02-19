// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { QueryFirstTaskProvider } from './queryFirstTaskProvider';

// sby
let queryFirstTaskProvider: vscode.Disposable | undefined;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// sby!
	queryFirstTaskProvider = vscode.tasks.registerTaskProvider(QueryFirstTaskProvider.queryFirstType, new QueryFirstTaskProvider());

}
export function deactivate(): void {
	if (queryFirstTaskProvider) {
		queryFirstTaskProvider.dispose();
	}
}