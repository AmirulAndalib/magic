
# Where the Machine Creates the Code!

Magic Cloud is a software development automation platform created and maintained by [AINIRO.IO](https://ainiro.io) based upon AI, Low-Code, and No-Code. It's based upon [Hyperlambda](https://docs.ainiro.io/hyperlambda/), allowing you to dynamically create and orchestrate code, using meta programming and generative AI.

![Editing code in HyperIDE](https://raw.githubusercontent.com/polterguy/polterguy.github.io/master/images/hyper-ide-actions.jpg)

## CRUD generator

In addition to its generative AI capabilities, Magic also comes with a CRUD generator, allowing you to point it at your database, click a button, and wrap all your tables into CRUD endpoints. Combined with its AI capabilities, this can sometimes save you 90% of your time when delivering backend APIs. Magic is built on top of .Net 9 and Angular.

![CRUD generator](https://raw.githubusercontent.com/polterguy/polterguy.github.io/master/images/backend-crud.jpg)

## No-Code AI

Magic contains its own LLM that allows for generating Hyperlambda (backend) code using natural language. Combined with meta programming, this almost entirely eliminates the need to understand code and software development, yet still making it possible to create fairly complex systems using _"vibe coding"_, such as for instance [AI agents](https://ainiro.io/ai-agents) with function calling, and custom ChatGPT _"clones"_ using the [AI Expert System](https://ainiro.io/ai-expert-system).

The concept is you provide a comment and description for what your Hyperlambda file should do. Then you click generate, and the LLM will automatically create code encapsulating your use case. Afterwards you can modify the code as you need. To pull this through, we actually fine tuned and created our own LLM model based upon OpenAI's gpt-4.1-mini, which makes it extremely cost effective and fast.

![AI code generator](https://raw.githubusercontent.com/polterguy/polterguy.github.io/master/images/ai-generated-code.png)

## Hyperlambda

Hyperlambda is a _"5th generation programming language"_, that is on average 10 to 50 times less verbose than traditional languages such as C#, Java, Python, GoLang, and PHP. On average it can solve most problems with 5% of the codebase compared to any traditional programming language. This makes it an extremely high level programming language, allowing you to work declaratively instead of having to implement everything imperatively. Below is a simple HTTP CRUD Read endpoint implemented in C# and Hyperlambda to illustrate what effects this might have on your codebase.

![Hyperlambda versus C#](https://raw.githubusercontent.com/polterguy/polterguy.github.io/master/images/csharp-versus-hyperlambda.png)

## Documentation

Magic was created to make it easy to create small and medium sized backend APIs, and contains components for all problems related to backend development. For more information about Magic, please refer to its documentation below.

* [Magic Cloud Documentation](https://docs.ainiro.io)

## License

This project, and all of its satellite project, is licensed under the terms of the MIT license, as published by the Open Source Initiative. See LICENSE file for details. For licensing inquiries you can contact Thomas Hansen thomas@ainiro.io

## Copyright and maintenance

The projects is copyright of Thomas Hansen 2019 - 2025, and professionally maintained by [AINIRO.IO](https://ainiro.io).
