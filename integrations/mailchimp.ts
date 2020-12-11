// @ts-ignore
import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({ apiKey: process.env.MAILCHIMP_API_KEY, server: "us7" });

export { mailchimp as client };
