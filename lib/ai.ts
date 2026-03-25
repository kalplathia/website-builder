import OpenAI from "openai";
import { SiteData, SitePages } from "./types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function generateSiteContent(
  site: SiteData
): Promise<SitePages> {
  const today = new Date().toISOString().split("T")[0];

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
      "headline": "A compelling headline (8-12 words max)",
      "subheadline": "A supporting subheadline explaining the value proposition (15-25 words)",
      "ctaText": "Primary CTA button text (2-4 words like 'Get Started')",
      "ctaSecondaryText": "Secondary CTA text (2-3 words like 'Learn More')"
    },
    "miniAbout": {
      "tagline": "Short label like 'Who We Are' or 'About Us'",
      "shortDescription": "A 2-3 sentence blurb about the company for the home page",
      "highlights": ["Highlight 1 (3-5 words)", "Highlight 2 (3-5 words)", "Highlight 3 (3-5 words)"]
    },
    "features": [
      { "title": "Feature Title", "description": "Brief description (15-25 words)", "icon": "star" },
      { "title": "Feature Title", "description": "Brief description (15-25 words)", "icon": "shield" },
      { "title": "Feature Title", "description": "Brief description (15-25 words)", "icon": "zap" },
      { "title": "Feature Title", "description": "Brief description (15-25 words)", "icon": "users" },
      { "title": "Feature Title", "description": "Brief description (15-25 words)", "icon": "award" },
      { "title": "Feature Title", "description": "Brief description (15-25 words)", "icon": "target" }
    ],
    "stats": [
      { "value": "10+", "label": "Years Experience" },
      { "value": "500+", "label": "Happy Clients" },
      { "value": "98%", "label": "Satisfaction Rate" },
      { "value": "24/7", "label": "Customer Support" }
    ],
    "testimonials": [
      { "quote": "A realistic client testimonial (20-35 words)", "author": "Full Name", "role": "Role at Company" },
      { "quote": "A realistic client testimonial (20-35 words)", "author": "Full Name", "role": "Role at Company" },
      { "quote": "A realistic client testimonial (20-35 words)", "author": "Full Name", "role": "Role at Company" }
    ],
    "cta": {
      "headline": "A compelling call to action headline",
      "description": "A short motivating description (15-25 words)",
      "buttonText": "CTA button text (2-4 words)"
    },
    "seo": {
      "metaDescription": "Unique meta description for the home page (140-155 characters). Lead with the strongest value proposition."
    }
  },
  "about": {
    "story": "A 2-3 paragraph company story. Use proper paragraphs separated by newlines.",
    "mission": "A clear, inspiring mission statement (1-2 sentences).",
    "values": [
      { "title": "Value 1", "description": "Description of this core value (15-25 words)" },
      { "title": "Value 2", "description": "Description of this core value (15-25 words)" },
      { "title": "Value 3", "description": "Description of this core value (15-25 words)" }
    ],
    "team": [
      { "name": "Full Name", "role": "Job Title", "bio": "1-2 sentence professional bio" },
      { "name": "Full Name", "role": "Job Title", "bio": "1-2 sentence professional bio" }
    ],
    "quote": {
      "text": "An inspiring quote relevant to the business or industry (15-25 words)",
      "author": "Attribution name or 'Our Founder'"
    },
    "seo": {
      "metaDescription": "Unique meta description for the about page (140-155 characters). Highlight the company story and mission."
    }
  },
  "contact": {
    "headline": "A welcoming contact page headline",
    "description": "A friendly message encouraging visitors to reach out (15-25 words)",
    "formEnabled": true,
    "seo": {
      "metaDescription": "Unique meta description for the contact page (140-155 characters). Encourage visitors to reach out."
    }
  },
  "privacy": {
    "content": "A comprehensive privacy policy in HTML format with proper <h2>, <h3>, <p>, and <ul> tags. Cover: data collection, usage, cookies, third-party sharing, user rights, contact info. Use ${site.businessName} as the company name and ${site.email} as the contact email throughout.",
    "lastUpdated": "${today}",
    "seo": {
      "metaDescription": "Unique meta description for the privacy policy page (120-150 characters)."
    }
  },
  "terms": {
    "content": "Comprehensive terms and conditions in HTML format with proper <h2>, <h3>, <p>, and <ul> tags. Cover: acceptance of terms, services description, user obligations, limitations of liability, termination, governing law. Use ${site.businessName} as the company name and ${site.email} as the contact email throughout.",
    "lastUpdated": "${today}",
    "seo": {
      "metaDescription": "Unique meta description for the terms page (120-150 characters)."
    }
  }
}

IMPORTANT RULES:
- Use ONLY these icon values: "star", "shield", "zap", "heart", "check", "globe", "users", "award", "clock", "target", "rocket", "leaf"
- Make stats realistic and relevant to the ${site.industry} industry
- Make testimonials sound authentic with realistic names and roles
- Team members should have plausible names and roles for a ${site.industry} business
- All content must be professional, engaging, and specific to their industry
- Each page's seo.metaDescription must be unique and specific to that page's content
- Do NOT exceed 160 characters for any metaDescription
- Do NOT wrap in markdown code blocks. Return raw JSON only.`;

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
