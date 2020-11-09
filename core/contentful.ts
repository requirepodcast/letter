import { createClient, Entry } from "contentful";

export interface Letter {
  title: string;
  slug: string;
  sendAt: string;
  content: string;
  contentHtml?: string;
}

export class ContentfulService {
  private client = createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_TOKEN,
  });

  async getAllLetters(): Promise<Letter[]> {
    const entries = await this.client.getEntries<Letter>({ content_type: "letter" });

    return entries.items.map(item => item.fields).reverse();
  }

  async getLetterBySlug(slug: string): Promise<{ letter: Letter; next: Letter; prev: Letter }> {
    const entries = await this.client.getEntries<Letter>({
      content_type: "letter",
    });

    const next = entries.items[entries.items.findIndex(letter => letter.fields.slug === slug) + 1];
    const prev = entries.items[entries.items.findIndex(letter => letter.fields.slug === slug) - 1];

    return {
      letter: entries.items.find(letter => letter.fields.slug === slug).fields,
      next: next && next.fields,
      prev: prev && prev.fields,
    };
  }
}
