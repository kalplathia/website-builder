import OpenAI from "openai";
import { SiteData, SitePages } from "./types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function generateSiteContent(
  site: SiteData
): Promise<SitePages> {
  const prompt = `You are a professional website copywriter. Generate website content for a business with the following details:

Business Name: ${site.businessName}
Industry: ${site.industry}
Description: ${site.description}
Email: ${site.email}
Phone: ${site.phone}
Address: ${site.address}

Generate content for all 5 pages of their website. Return ONLY valid JSON (no markdown, no code blocks) in this exact format:

{
  "home": {
    "hero": {
      "headline": "A compelling headline for the hero section",
      "subheadline": "A supporting subheadline that explains the value proposition",
      "ctaText": "Call to action button text"
    },
    "features": [
      {
        "title": "Feature 1 Title",
        "description": "Brief description of this feature or service",
        "icon": "star"
      },
      {
        "title": "Feature 2 Title",
        "description": "Brief description of this feature or service",
        "icon": "shield"
      },
      {
        "title": "Feature 3 Title",
        "description": "Brief description of this feature or service",
        "icon": "zap"
      }
    ],
    "cta": {
      "headline": "Ready to get started?",
      "description": "A compelling call to action description",
      "buttonText": "Contact Us"
    }
  },
  "about": {
    "story": "A 2-3 paragraph company story/background. Use proper paragraphs.",
    "mission": "A clear mission statement for the business.",
    "values": [
      { "title": "Value 1", "description": "Description of this core value" },
      { "title": "Value 2", "description": "Description of this core value" },
      { "title": "Value 3", "description": "Description of this core value" }
    ]
  },
  "contact": {
    "headline": "Get In Touch",
    "description": "A welcoming message encouraging visitors to reach out",
    "formEnabled": true
  },
  "privacy": {
    "content": "A comprehensive privacy policy in HTML format with proper <h2>, <h3>, <p>, and <ul> tags. Cover: data collection, usage, cookies, third-party sharing, user rights, contact info. Use ${site.businessName} as the company name and ${site.email} as the contact email throughout.",
    "lastUpdated": "${new Date().toISOString().split("T")[0]}"
  },
  "terms": {
    "content": "Comprehensive terms and conditions in HTML format with proper <h2>, <h3>, <p>, and <ul> tags. Cover: acceptance of terms, services description, user obligations, limitations of liability, termination, governing law. Use ${site.businessName} as the company name and ${site.email} as the contact email throughout.",
    "lastUpdated": "${new Date().toISOString().split("T")[0]}"
  }
}

Make the content professional, engaging, and specific to their ${site.industry} industry. Do NOT wrap in markdown code blocks. Return raw JSON only.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const text = response.choices[0].message.content || "";

  // Clean up the response - remove markdown code blocks if present
  const cleaned = text
    .replace(/```json\s*/g, "")
    .replace(/```\s*/g, "")
    .trim();

  const pages: SitePages = JSON.parse(cleaned);
  return pages;
}
