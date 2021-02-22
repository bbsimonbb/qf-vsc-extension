# QueryFirst - Typed Raw SQL for everybody

The QueryFirst extension for VS Code generates a C# wrapper for your .sql files. This is the VS Code version of the nearly-famous [Visual Studio extension](https://marketplace.visualstudio.com/items?itemName=bbsimonbb.QueryFirst&ssr=false#overview)

## Author your SQL in a real environment

 Syntax checking- Intellisense for tables and columns - Get familiar with your data

## A generated C# wrapper

- Repo, POCO, Interface.
- Repository pattern - Parameter discovery - Type safety - POCOs generated from your result schema

- Supports Sql Server, Postgres and MySql
- Supports all C# project types including .net core.

## To use QueryFirst

- Install the extension!
- In your workspace, you will need a qfconfig.json and QfRuntimeConnection class. To scaffold these, run tasks `queryfirst: Create a new config file`
 and `queryfirst: Create new QfRuntimeConnection`. In the config file, you need to at least to specify a development datasource. QueryFirst will test run your queries against this DB when you tell it, see below. In the QfRuntimeConnection class, you must provide the GetConnection()  method that will be called by the generated code at runtime.

- Now you're set to write queries. You can scaffold a QueryFirst query at the root of your workspace with the task `queryfirst: New query`. You can also just create a .sql file, remembering to put "QueryFirst" in a comment on the first line. (.sql files without this tag will be ignored)

- With all this in place, you have 4 options for triggering the generation. The handiest (why would you use anything else?) is `queryfirst: Watch workspace`. It will whir away in the background, regenerating any query in your workspace whenever it is saved. Keep your eye on the terminal output for errors :-)

- The generated code can include a self-test, to test the query in the compiled binary against a production data source. To use this feature:
  - put `"MakeSelfTest":true` in your qfconfig.json.
  - add the following nuget packages to your project: QueryFirst.CoreLib, xunit, Microsoft.NET.Test.Sdk

## TL;dr

Query-first is a visual studio extension for working intelligently with SQL in C# projects. Put your queries in .sql files with "QueryFirst" in a comment on the first line. When you build your query (with the tasks provided), Query-first runs it (in a sandbox. No DB changes are persisted), retrieves the schema and generates two classes and an interface: a wrapper (repository) class with methods Execute(), ExecuteScalar(), ExecuteNonQuery() etc, its corresponding interface, and a POCO encapsulating a line of results.

**As such, your query stays intact** in its own .sql file. It can be edited, validated and test-run "in-situ" with design-time mock inputs and intellisense for your tables and columns. In your application code, running your query takes one line of code, and returns a POCO (or an IEnumerable of POCOs, or a List of POCOs) with meaningful parameter and property names, so _enabling intellisense for your input parameters and results_. The interface and POCO are directly usable for unit testing.

The generated code stands alone. There is no runtime dll and no reflection. The only dependencies are System libraries. You can quietly forget about ADO : Command, Connection, Reader and parameter creation are all handled for you, with best practices baked in. At no point do you have to remember the name of a column, or its type, or its index in the reader. And you've absolutely nothing new  to learn, provided you still remember how to write SQL :-)

QueryFirst provides a task that will run all queries in your application and regenerate all wrapper classes. As such, you can integration-test all your queries at any time, and changes in your database schema will directly produce compilation errors in your application. If the query is broken, the wrapper classes will not compile. If the query runs but your code tries to access columns that are no longer present in the result, the error will point at _the line in your code_ that tries to access the missing property.

QueryFirst, first published in 2016, pionneered the 'typed raw sql' approach to the database problem (sql validated in situ, db types used in application code). This approach is gaining traction, and if your fancy is typescript and postgres, [you will love pgtyped](https://github.com/adelsz/pgtyped). The author, Adel, has a great presentation on strong typing [here](https://www.slideshare.net/OdessaJSConf/strongly-typed-web-applications-by-adel-salakh). If Go is your thing, see [sqlc](https://github.com/kyleconroy/sqlc). For Scala, see [Scala-slick](http://scala-slick.org/doc/3.0.0/sql.html#type-checked-sql-statements) (look for the section on type-checked sql statements.)

## Gotchas

There are two that we know of:

- QueryFirst can't detect the type of a parameter when it's used more than once. To workaround, get your query in a runnable state and save it with 1 usage of the parameter before you introduce others.
- QueryFirst can't detect changes in the length of underlying columns after a parameter has been detected and declared in the designTime section. QueryFirst will infer the parameter length from the local variable declaration. If you're changing column lengths in the schema, you will need to manually hunt down corresponding parameters (variables) and modify their lengths.

## Ambitious?

We expect that QueryFirst will quickly become your favourite data access method. Please urgently let us know if this is not the case.

|                                                       |Dapper|EF|Stored procs|QueryFirst|
|:-------------------------------------|:-------:|:-:|:--------------:|:---------:|
| Lightweight, low ceremony |x|||x|
| Does whatever SQL can do |x||x|x|
| Interact with your data as you develop projections |||x|x|
| Type safety/compile-time checking of your projection ||x|meh|x|
| No POCOs to maintain ||x|x*|x|
| Provides an interface to facilitate testing the calling code ||x|x*|x|
| Prevents SQL injection ||x|x|x|
| Queries distributed and versioned with application code |x|x||x|
| Bundles an integration test to verify your production schema ||||x|

\* only with the help of EF reverse POCO generator (not actually part of EF), but you'll need to open your solution _as administrator_, find the .tt and right-click on 'run custom tool'. Not kidding.







**[As seen on youtube !](http://geniusorfantasist.blogspot.fr/2017/02/the-tool-in-action.html)**

[The documentation is on the project's github wiki.](https://github.com/bbsimonbb/query-first/wiki)
