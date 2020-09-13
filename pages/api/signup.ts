import { NowRequest, NowResponse } from "@vercel/node";
import axios from "axios";
import Joi from "joi";
import remark from "remark";
import html from "remark-html";

const mailTemplate = require("../../templates/mailTemplate.pug");
const { default: welcomeEmail } = require("raw-loader!../../templates/welcomeEmail.md");

const requestSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

const sendWelcomeEmail = email => {
  remark()
    .use(html)
    .process(welcomeEmail.replace(`{{{ link }}}`, "https://letter.podcast.gq"), (err, file) => {
      const letter = mailTemplate({ content: file, title: "require('letter')" });

      axios
        .post(
          "https://api.sendgrid.com/v3/mail/send",
          {
            personalizations: [
              {
                to: [{ email: email }],
              },
            ],
            from: {
              email: "require@podcast.gq",
              name: "Require Podcast",
            },
            subject: "Siema, dzięki że jesteś!",
            content: [
              {
                type: "text/html",
                value: letter,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
              "content-type": "application/json",
            },
          },
        )
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response.data));
    });
};

export default (req: NowRequest, res: NowResponse) => {
  const result = requestSchema.validate(req.body, { abortEarly: false });

  if (result.error) {
    return res.status(400).json({ errors: result.error.details.map(err => err.message) });
  }

  // Check if already registered
  return axios
    .post(
      "https://api.sendgrid.com/v3/marketing/contacts/search",
      {
        query: `email = '${req.body.email}'`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
          "content-type": "application/json",
        },
      },
    )
    .then(({ data: { result } }) => {
      if (result.length !== 0) {
        return res.json({ message: "User already registered" });
      }

      // If not, register new contact
      axios
        .put(
          "https://api.sendgrid.com/v3/marketing/contacts",
          { contacts: [{ email: req.body.email }] },
          {
            headers: {
              Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
              "content-type": "application/json",
            },
          },
        )
        .then(() => {
          // Send welcome email
          sendWelcomeEmail(req.body.email);

          return res.status(201).json({
            message: "Successfully added to the subscribers list",
          });
        })
        .catch(err => {
          return res.status(500).json({ error: `Can't add user to the list` });
        });
    })
    .catch(err => {
      return res.status(500).json({ error: `Can't add user to the list` });
    });
};
