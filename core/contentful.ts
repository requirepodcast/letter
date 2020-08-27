import { createClient, Entry } from "contentful";

export interface Letter {
  title: string;
  slug: string;
  send_at: string;
  content: string;
}

export class ContentfulService {
  private client = createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_TOKEN,
  });

  async getAllLetters(): Promise<Letter[]> {
    const entries = await this.client.getEntries<Letter>({ content_type: "letter" });
    return entries.items.map(item => item.fields);
  }
}
