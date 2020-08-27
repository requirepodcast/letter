import { NowRequest, NowResponse } from "@vercel/node";

export default (req: NowRequest, res: NowResponse) => {
  res.statusCode = 200;
  res.json({ name: "John Doe" });
};
