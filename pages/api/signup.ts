import { NowRequest, NowResponse } from "@vercel/node";
import axios from "axios";
import Joi from "joi";

const requestSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

export default (req: NowRequest, res: NowResponse) => {
  const result = requestSchema.validate(req.body, { abortEarly: false });

  if (result.error) {
    return res.status(400).json({ errors: result.error.details.map(err => err.message) });
  }

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
          return res.status(201).json({
            message: "Successfully added to the subscribers list",
          });
        })
        .catch(err => {
          console.log(err.response.data);
          return res.status(500).json({ error: `Can't add user to the list` });
        });
    })
    .catch(err => {
      return res.status(500).json({ error: `Can't add user to the list` });
    });
};
