// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Function to handle errors
	let handleError = (error: unknown) => { 
		if (error instanceof Error){ 
			vscode.window.showInformationMessage(`Test error: ${error.name} -> ${error.message}`);
		}
		else { 
			vscode.window.showInformationMessage(`Test error: Unknown error`); 
		}
	};

	// Tests 
	let commandCreateController = vscode.commands.registerCommand('test-api-functional-test.runAllTest', () => {
		let ctrl: vscode.TestController; 
		const rqst = new vscode.TestRunRequest();

		try {
			ctrl = vscode.tests.createTestController('controllerId', 'myTestController');
			vscode.window.showInformationMessage(`SUCCESS TestController created: ${ctrl.label}`);
		} catch (error) {
			vscode.window.showInformationMessage(`FAIL Could not create TestController`);
			handleError(error);
			throw new Error("Tests failed")
		}

		try { 
			const token = new vscode.CancellationTokenSource().token;
			const kind = vscode.TestRunProfileKind.Run;
			const profile = ctrl.createRunProfile("myRunProfile", kind, (rqst, token)=>void{})
			vscode.window.showInformationMessage(`SUCCESS created TestRunProfile: ${ctrl.label}`);
		}catch (error) { 
			vscode.window.showInformationMessage(`FAIL Could not create TestRunProfile`)
			handleError(error);
			throw new Error("Tests failed")
		}

		try { 
			const testItem = ctrl.createTestItem("testItemId", "testItemLabel");
			vscode.window.showInformationMessage(`SUCCESS created TestItem: ${testItem.id}`);
		}catch (error) { 
			vscode.window.showInformationMessage(`FAIL Could not create TestItem`)
			handleError(error);
			throw new Error("Tests failed")
		}

		try { 
			const testRun = ctrl.createTestRun(rqst, "testRunName");
			vscode.window.showInformationMessage(`SUCCESS created TestRun: ${testRun.name}`);
		}catch (error) { 
			vscode.window.showInformationMessage(`FAIL Could not create TestRun`)
			handleError(error);
			throw new Error("Tests failed")
		}
	});
	context.subscriptions.push(commandCreateController);
}

// This method is called when your extension is deactivated
export function deactivate() {}
