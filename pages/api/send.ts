import { NowRequest, NowResponse } from "@vercel/node";
import remark from "remark";
import html from "remark-html";
import axios from "axios";
import Joi from "joi";

const mailTemplate = require("../../templates/mailTemplate.pug");

const requestSchema = Joi.object({
  content: Joi.string().required(),
  title: Joi.string().required(),
  send_at: Joi.date().iso(),
});

export default (req: NowRequest, res: NowResponse) => {
  if (req.headers.api_token !== process.env.API_TOKEN) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const result = requestSchema.validate(req.body, { abortEarly: false });

  if (result.error) {
    return res.status(400).json({ errors: result.error.details.map(err => err.message) });
  }

  remark()
    .use(html)
    .process(req.body.content, (err, file) => {
      if (err) {
        return res.status(400).json({ errors: [{ error: `Can't process provided markdown` }] });
      }

      const letter = mailTemplate({ content: file });
      let { title, send_at } = req.body;

      if (new Date(send_at).getTime() <= new Date().getTime()) {
        send_at = null;
      }

      return axios
        .post(
          "https://api.sendgrid.com/v3/marketing/singlesends",
          {
            name: title,
            send_to: { all: true },
            email_config: {
              subject: title,
              html_content: letter,
            },
          },
          { headers: { Authorization: `Bearer ${process.env.SENDGRID_API_KEY}` } },
        )
        .then(() => {
          return res.json({ message: "Email successfully sent", html: letter });
        })
        .catch(err => {
          console.log(err.response.data);
          return res.status(500).json({ error: `Can't send the email` });
        });
    });
};
