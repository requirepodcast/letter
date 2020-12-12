import { NowRequest, NowResponse } from "@vercel/node";
import Joi from "joi";
import { AUDIENCE_ID, client } from "../../integrations/mailchimp";

const requestSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

export default (req: NowRequest, res: NowResponse) => {
  return new Promise((resolve, reject) => {
    const result = requestSchema.validate(req.body, { abortEarly: false });

    if (result.error) {
      resolve(res.status(400).json({ errors: result.error.details.map(err => err.message) }));
    }

    const { email } = req.body;

    client.lists
      .addListMember(AUDIENCE_ID, {
        email_address: email,
        status: "subscribed",
      })
      .then(() => {
        resolve(
          res.status(201).json({
            message: "Successfully added to the subscribers list",
          }),
        );
      })
      .catch(err => {
        if (err?.response.body.title === "Member Exists") {
          resolve(res.status(409).json({ message: "Email already on the list" }));
        } else {
          resolve(res.status(500).json({ message: "Can't add email to the list" }));
        }
      });
  });
};
