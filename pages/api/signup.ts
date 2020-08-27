import { NowRequest, NowResponse } from "@vercel/node";

export default (req: NowRequest, res: NowResponse) => {
  res.json({ message: "Successfully signed up for the letter!" });
};
