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

## Example Usage
```yaml
name: Publish to Telegraph
on:
  push:
    branches:
      - main
  steps:
    - name: Publish Article
      use: jiacai2050/telegraph-action@v1
      with:
        token: ${{ secrets.TELEGRAPH_TOKEN }}
        title: "My First Telegraph Article"
        md-file: "articles/my-article.md"
        author-name: "John Doe"
        author-url: "https://johndoe.com"
```
