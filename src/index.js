import * as core from "@actions/core";
import fs from "fs";
import { createTelegraphPage } from "./api.js";

try {
  const token = core.getInput("token");
  const mdFile = core.getInput("md-file");
  const mdBody = core.getInput("md-body");
  const title = core.getInput("title");

  let mdContent = "";
  if (mdBody) {
    mdContent = mdBody;
  } else if (mdFile) {
    mdContent = fs.readFileSync(mdFile, { encoding: "utf8" });
  } else {
    throw new Error("Either md-file or md-body must be provided.");
  }

  const resp = await createTelegraphPage(token, title, mdContent, {
    authorUrl: core.getInput("author-url"),
    authorName: core.getInput("author-name"),
  });
  core.info(`Create page result: ${JSON.stringify(resp)}`);
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
} catch (error) {
  core.setFailed(error.message);
}
