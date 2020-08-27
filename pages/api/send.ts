import { NowRequest, NowResponse } from "@vercel/node";
import remark from "remark";
import html from "remark-html";

const mailTemplate = require("../../templates/mailTemplate.pug");

export default (req: NowRequest, res: NowResponse) => {
  if (req.headers.api_token !== process.env.API_TOKEN) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const errors = [];
  if (!req.body.content) {
    errors.push({ error: "No content provided" });
  }
  if (!req.body.title) {
    errors.push({ error: "No title provided" });
  }
  if (errors.length !== 0) {
    return res.status(400).json({ errors });
  }

  remark()
    .use(html)
    .process(req.body.content, (err, file) => {
      if (err) {
        return res.status(400).json({ errors: [{ error: `Can't process provided markdown` }] });
      }

      const letterHtml = mailTemplate({ content: file });

      return res.json({ message: "Email successfully sent", html: letterHtml });
    });
};
