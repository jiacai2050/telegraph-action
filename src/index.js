import * as core from "@actions/core";
import fs from "fs";
import { createTelegraphPage, sendTelegramMessage } from "./api.js";

try {
  await main();
} catch (error) {
  core.setFailed(error.message);
}

async function main() {
  const token = core.getInput("token");
  const mdFile = core.getInput("body-file");
  const mdBody = core.getInput("body");
  const title = core.getInput("title");
  const chatId = core.getInput("chat-id");
  const telegramToken = core.getInput("telegram-token");

  if (chatId && !telegramToken) {
    throw new Error("telegram-token is required when chat-id is provided.");
  }

  let content;
  if (mdBody) {
    content = mdBody;
  } else if (mdFile) {
    content = fs.readFileSync(mdFile, { encoding: "utf8" });
  } else {
    throw new Error("Either body or body-file must be provided.");
  }

  const resp = await createTelegraphPage(token, title, content, {
    authorUrl: core.getInput("author-url"),
    authorName: core.getInput("author-name"),
  });

  core.debug(`Create page result: ${JSON.stringify(resp)}`);

  for (const key of [
    "title",
    "url",
    "path",
    "description",
    "views",
    "can_edit",
  ]) {
    core.setOutput(key, resp[key]);
  }

  if (!chatId) {
    core.info("chat-id not provided, skip sending telegram message.");
    return;
  }

  core.debug(`Sending telegram message to ${chatId}...`);
  const msgRet = await sendTelegramMessage(telegramToken, chatId, resp.url);
  core.debug(`Send telegram message result: ${JSON.stringify(msgRet)}`);
}
