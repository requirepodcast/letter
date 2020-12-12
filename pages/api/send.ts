import { NowRequest, NowResponse } from "@vercel/node";
import remark from "remark";
import html from "remark-html";
import Joi from "joi";
import Mustache from "mustache";
import { AUDIENCE_ID, client, TEMPLATE_ID } from "../../integrations/mailchimp";

const template = require("../../templates/template.html").default;

const requestSchema = Joi.object({
  content: Joi.string().required(),
  title: Joi.string().required(),
});

export default (req: NowRequest, res: NowResponse) => {
  if (req.headers["x-api-key"] !== process.env.API_KEY) {
    return res.status(401).json({ errors: [{ error: "Not authenticated" }] });
  }

  const result = requestSchema.validate(req.body, { abortEarly: false });

  if (result.error) {
    return res.status(400).json({ errors: result.error.details.map(err => err.message) });
  }

  return new Promise(resolve => {
    const { title, content } = req.body;

    remark()
      .use(html)
      .process(content, async (err, result) => {
        if (err) {
          return resolve(
            res.status(400).json({ errors: [{ error: `Can't process provided markdown` }] }),
          );
        }

        const { id } = await client.campaigns.create({
          type: "regular",
          recipients: { list_id: AUDIENCE_ID },
          settings: {
            subject_line: title,
            title,
            from_name: "Require Podcast",
            reply_to: "require@podcast.gq",
          },
        });

        if (!id) {
          return resolve(res.status(500).json({ errors: [{ error: `Can't create campaign` }] }));
        }

        const mail = Mustache.render(template, { content: result });

        client.campaigns
          .setContent(id, {
            html: mail,
          })
          .then(() => {
            resolve(res.json({ message: "Success" }));
          })
          .catch(err => {
            console.log(err.response.body);
            resolve(res.status(500).json({ errors: [{ error: `Can't create campaign` }] }));
          });
      });
  });
};
