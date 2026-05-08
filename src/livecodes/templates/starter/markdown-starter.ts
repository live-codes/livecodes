import type { Template } from '../../models';

export const markdownStarter: Template = {
  name: 'markdown',
  aliases: ['md'],
  title: window.deps.translateString('templates.starter.markdown', 'Markdown Starter'),
  thumbnail: 'assets/templates/markdown.svg',
  activeEditor: 'markup',
  markup: {
    language: 'markdown',
    content: `
# Project Title

One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installation

Make sure you have \`python 3.10+\` and \`pip\` installed. Then run:

\`\`\`bash
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
\`\`\`

Start the development server on \`localhost:8000\`:

\`\`\`bash
python manage.py runserver
\`\`\`

### Usage

Give an example of getting some data out of the system or using it for a little demo

\`\`\`python
from project_name import Client

client = Client(api_key="your-api-key")
resources = client.resources.list(limit=10)

for resource in resources:
    print(f"{resource.id}: {resource.name}")
\`\`\`

You can also use the \`--verbose\` flag for detailed output:

\`\`\`bash
python main.py --verbose
\`\`\`

### Frontend Integration

The API returns \`JSON\` responses that can be consumed by any frontend:

\`\`\`js
const res = await fetch('http://localhost:8000/api/resources');
const data = await res.json();
console.log(data);
\`\`\`

## Overview

A high-level look at how the system fits together. The \`Core API\` handles all business logic.

\`\`\`mermaid
graph TD
    A[Client] -->|Request| B[API Gateway]
    B --> C[Auth Service]
    B --> D[Core API]
    D --> E[(Database)]
    D --> F[(Cache)]
\`\`\`

## Running the tests

Run the full test suite with \`pytest\`:

\`\`\`bash
pytest --cov=project_name tests/
\`\`\`

### End to end tests

These tests verify the full request lifecycle from \`Client\` to \`Database\` and back.

\`\`\`python
def test_create_resource(client):
    response = client.post("/api/resources", json={"name": "Test"})
    assert response.status_code == 201
    assert response.json()["name"] == "Test"
\`\`\`

### Coding style tests

We use \`flake8\` and \`black\` to enforce consistent code style:

\`\`\`bash
flake8 project_name/
black --check project_name/
\`\`\`

## Deployment

Make sure \`Docker\` is installed, then build and run:

\`\`\`bash
docker build -t project-name .
docker run -p 8000:8000 --env-file .env project-name
\`\`\`

## Built With

* [Django](https://www.djangoproject.com/) - The web framework used
* [pip](https://pip.pypa.io/) - Dependency Management

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Your Name** - *Initial work* - [YourGitHub](https://github.com/your-username)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Give credit to anyone whose code was used
* Inspiration
* etc
`.trimStart(),
  },
  style: {
    language: 'css',
    content: `
@import "github-markdown-css";

body {
  border: 1px solid #e1e4e8;
  border-radius: 4px;
  padding: 20px;
  margin: 20px !important;
}
`.trimStart(),
  },
  script: {
    language: 'javascript',
    content: `document.body.classList.add('markdown-body');\n`,
  },
  stylesheets: [],
  scripts: [],
  cssPreset: '',
  imports: {},
  types: {},
};
