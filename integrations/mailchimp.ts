// @ts-ignore
import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({ apiKey: process.env.MAILCHIMP_API_KEY, server: "us7" });

export { mailchimp as client };
export const AUDIENCE_ID = "f0b446ee77";
export const TEMPLATE_ID = 386456;
