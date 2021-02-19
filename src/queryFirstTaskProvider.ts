import * as vscode from "vscode";

var binPath: string = "";
let myExt = vscode.extensions.getExtension("SimonBoddy.QueryFirst");
if (myExt) {
    binPath = myExt.extensionPath + "\\bin\\queryfirst";
}

export class QueryFirstTaskProvider implements vscode.TaskProvider {
    static queryFirstType = "queryfirst";

    provideTasks(): vscode.ProviderResult<vscode.Task[]> {
        return [
            this.watchWorkspace(),
            this.watchFile(),
            this.buildWorkspace(),
            this.buildFile(),
            this.newQuery(),
            this.newConfig(),
            this.newRuntimeConnection()
        ];
    }
    private watchFile(): vscode.Task {
        let watch = new vscode.Task(
            {type: "queryfirst", task: ""},
             "Watch this query",
            "queryfirst",
            new vscode.ShellExecution(binPath + " -w ${file}",{cwd:'${workspaceFolder}'}),
            []
        );
        //build.group = vscode.TaskGroup.Build;
        return watch;
    }
    private watchWorkspace(): vscode.Task {
        let watch = new vscode.Task(
            {type: "queryfirst", task: ""},
             "Watch workspace",
            "queryfirst",
            new vscode.ShellExecution(binPath + " -w",{cwd:'${workspaceFolder}'}),
            []
        );
        //build.group = vscode.TaskGroup.Build;
        return watch;
    }
    private buildFile(): vscode.Task {
        let watch = new vscode.Task(
            {type: "queryfirst", task: ""},
             "(Re)build this query",
            "queryfirst",
            new vscode.ShellExecution(binPath + " ${file}",{cwd:'${workspaceFolder}'}),
            []
        );
        //build.group = vscode.TaskGroup.Build;
        return watch;
    }
    private buildWorkspace(): vscode.Task {
        let watch = new vscode.Task(
            {type: "queryfirst", task: ""},
             "Rebuild all queries in this workspace",
            "queryfirst",
            new vscode.ShellExecution(binPath ,{cwd:'${workspaceFolder}'}),
            []
        );
        //build.group = vscode.TaskGroup.Build;
        return watch;
    }
    private newQuery(): vscode.Task {
        let newQuery = new vscode.Task(
            {type: "queryfirst", task: "new"},
             "New query",
            "queryfirst",
            new vscode.ShellExecution(binPath + " --new=newQuery"),
            []
        );
        //newQuery.group = vscode.TaskGroup.Build;
        //newQuery.isBackground = true;
        return newQuery;
    }

    private newConfig(): vscode.Task {
        let newConfig = new vscode.Task(
            {type: "queryfirst", task: "new qfconfig.json"},
            "Create a new config file",
            "queryfirst",
            new vscode.ShellExecution(binPath + " --newConfig"),
            []
        );
        // serve.group = vscode.TaskGroup.Build;
        // serve.isBackground = true;
        return newConfig;
    }
    private newRuntimeConnection(): vscode.Task {
        let newConfig = new vscode.Task(
            {type: "queryfirst", task: "new QfRuntimeConnection.cs"},
            "Create a new QfRuntimeConnection class",
            "queryfirst",
            new vscode.ShellExecution(binPath + " --newRuntimeConnection"),
            []
        );
        // serve.group = vscode.TaskGroup.Build;
        // serve.isBackground = true;
        return newConfig;
    }
    resolveTask(): vscode.ProviderResult<vscode.Task> {
        return undefined;
    }
}