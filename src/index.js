import * as core from "@actions/core";
import fs from "fs";
import { createTelegraphPage } from "./api.js";

try {
  const token = core.getInput("token");
  const mdFile = core.getInput("md-file");
  const title = core.getInput("title");
  const mdContent = fs.readFileSync(mdFile, { encoding: "utf8" });
  const resp = await createTelegraphPage(token, title, mdContent, {
    authorUrl: core.getInput("author-url"),
    authorName: core.getInput("author-name"),
  });
  core.info(`Create page result: ${resp}`);
  for (const key of ["title", "url"]) {
    core.setOutput(key, resp[key]);
  }
} catch (error) {
  core.setFailed(error.message);
}
