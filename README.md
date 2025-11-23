# Telegraph Action

A GitHub Action for publishing articles to Telegraph (telegra.ph) directly from your repository.

## Parameters
- `token`: The access token for the Telegraph account. 
- `title`: The title of the article.
- `md-file`:  The path to the Markdown file to be published.
- `author-name`: (Optional) The name of the author.
- `author-url`: (Optional) The URL of the author.

## Outputs
- `url`: The URL of the published article on Telegraph.
- `path`: The path of the published article on Telegraph.
- `title`: The title of the published article.
- `description`: A brief description or excerpt from the article.

## Example Usage
```yaml
name: Publish to Telegraph

on:
  workflow_dispatch:
  push:
    branches:
      - main
jobs:
  publish:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - uses: actions/checkout@v5
      - name: Publish Article
        uses: jiacai2050/telegraph-action@v1
        id: telegraph
        with:
          token: ${{ secrets.TELEGRAPH_TOKEN }}
          title: "My First Telegraph Article"
          md-file: "Readme.md"
          author-name: "John Doe"
          author-url: "https://johndoe.com"
      - name: Output Result
        run: |
          echo "Telegraph Post URL: ${{ steps.telegraph.outputs.url }}"
          echo "Title: ${{ steps.telegraph.outputs.title }}"
          echo "Description: ${{ steps.telegraph.outputs.description }}"
          echo "Path: ${{ steps.telegraph.outputs.path }}"
```
