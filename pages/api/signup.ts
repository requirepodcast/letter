import { NowRequest, NowResponse } from "@vercel/node";
import axios from "axios";
import Joi from "joi";
import remark from "remark";
import html from "remark-html";

const mailTemplate = require("../../templates/mailTemplate.pug");

const welcomeEmail = `
# Siema, dzięki że jesteś!

Cieszymy się, że postanowiłeś/postanowiłaś zostać subskrybentem \`require('letter')\`!

W naszych listach, planujemy rozwijać tematykę odcinków podcastu, umieszczać różne ciekawostki, czy informować was o nowych rzeczach w świecie JavaScriptu i webdevelopmentu.

Jedno jest pewne - gdy nie będzie odcinka podcastu, pojawi się newsletter, a gdy odcinek się pojawi, to po kilku dniach wyślemy list "uzupełniający" (chociaż kto wie, może będzie on zahaczać o inną tematykę - nic nie wiadomo, warto śledzić).

Jak już obiecaliśmy, w ramach niespodzianki za zapisanie się do newslettera, przekazujemy Tobie [link]({{{ link }}}) do Odcinka Specjalnego \`Require Podcast\`, w którym opowiadamy o tym, jak wygląda proces produkcji naszego podcastu - między innymi jak powstaje nasza strona, jak renderujemy odcinki na YouTube, gdzie hostujemy pliki audio, jak działa newsletter, itp. Będzie wiele JavaScriptu, trochę obróbki dźwięku i dużo wiedzy :D

Jeszcze raz dziękujemy, <br />
~ Adam i Artur
`;

const requestSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

const sendWelcomeEmail = email => {
  return new Promise((resolve, reject) => {
    remark()
      .use(html)
      .process(
        welcomeEmail.replace(`{{{ link }}}`, process.env.WELCOME_LETTER_LINK),
        (err, file) => {
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
            .then(res => resolve(res))
            .catch(err => reject(err));
        },
      );
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
      return axios
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
          return sendWelcomeEmail(req.body.email)
            .then(() => {
              return res.status(201).json({
                message: "Successfully added to the subscribers list",
              });
            })
            .catch(() => {
              return res.status(500).json({ error: `Can't add user to the list` });
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
