# Telegraph Action

A GitHub Action for publishing articles to [Telegraph](https://telegra.ph) directly from your repository.

## Parameters
- `token`: The access token for the Telegraph account. If you don't have one, you can create a new Telegraph account to obtain a token. See [Telegraph API Documentation](https://telegra.ph/api) for more details.
- `title`: The title of the article.
- `body`:  The content of the telegraph post in markdown format.
- `body-file`: The path to the markdown file containing the content of the telegraph post. Either `body` or `body-file` must be provided.
- `author-name`: (Optional) The name of the author.
- `author-url`: (Optional) The URL of the author.
- `chat-id`: (Optional) Chat ID to which the URL of the newly created Telegraph post will be sent.
- `telegram-token`: (Optional) Telegram bot token used to send the Telegraph post URL to the specified chat ID.

You can send the Telegraph post URL to a Telegram chat by providing both the `chat-id` and `telegram-token`. To customize the message sent to Telegram, consider using [telegram-action](https://github.com/jiacai2050/telegram-action).

## Outputs
- `url`: The URL of the published article on Telegraph.
- `path`: The path of the published article on Telegraph.
- `title`: The title of the published article.
- `description`: A brief description or excerpt from the article.

## Example Usage

### Publish using file
```yaml
- name: Publish Article from file
  uses: jiacai2050/telegraph-action@v1
  with:
    token: ${{ secrets.TELEGRAPH_TOKEN }}
    title: "My First Telegraph Article"
    body-file: "README.md"
```

### Publish using body
```yaml
- name: Publish Article from body
  uses: jiacai2050/telegraph-action@v1
  with:
    token: ${{ secrets.TELEGRAPH_TOKEN }}
    title: "My First Telegraph Article"
    body: |
      # Hello Telegraph
      This is a post from GitHub Actions!
```

### Print Outputs
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
          body-file: "README.md"
          author-name: "Telegraph Action"
          author-url: "https://github.com/jiacai2050/telegraph-action"
      - name: Output Result
        run: |
          echo "Telegraph Post URL: ${{ steps.telegraph.outputs.url }}"
          echo "Title: ${{ steps.telegraph.outputs.title }}"
          echo "Description: ${{ steps.telegraph.outputs.description }}"
          echo "Path: ${{ steps.telegraph.outputs.path }}"
```
