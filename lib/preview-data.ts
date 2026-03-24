import { SiteData } from "./types";

export const PREVIEW_SITE: SiteData = {
  slug: "preview",
  businessName: "Acme Studio",
  logo: "",
  email: "hello@acmestudio.com",
  phone: "+1 (555) 100-2000",
  address: "123 Design Avenue, San Francisco, CA 94102",
  description:
    "Award-winning creative studio specializing in brand identity, web design, and digital experiences that elevate businesses.",
  industry: "Creative Agency",
  template: "starter",
  status: "live",
  createdAt: new Date().toISOString(),
  generatedAt: new Date().toISOString(),
  pages: {
    home: {
      hero: {
        headline: "Where Bold Ideas Become Beautiful Brands",
        subheadline:
          "We craft digital experiences that captivate audiences, drive growth, and transform businesses through the power of strategic design.",
        ctaText: "Start Your Project",
        ctaSecondaryText: "View Our Work",
      },
      miniAbout: {
        tagline: "Who We Are",
        shortDescription:
          "Acme Studio is a full-service creative agency with over a decade of experience helping brands tell their story. We combine strategy, design, and technology to deliver results that matter.",
        highlights: [
          "10+ Years Experience",
          "200+ Projects Delivered",
          "Award-Winning Team",
        ],
      },
      features: [
        {
          title: "Brand Strategy",
          description:
            "We develop comprehensive brand strategies that align with your business goals and resonate with your target audience.",
          icon: "target",
        },
        {
          title: "Web Design",
          description:
            "Beautiful, responsive websites built with modern technologies that convert visitors into customers.",
          icon: "globe",
        },
        {
          title: "Digital Marketing",
          description:
            "Data-driven marketing campaigns that increase visibility, engagement, and return on investment.",
          icon: "rocket",
        },
        {
          title: "UI/UX Design",
          description:
            "User-centered design solutions that create intuitive and delightful digital experiences.",
          icon: "heart",
        },
        {
          title: "Content Creation",
          description:
            "Compelling content that tells your story, builds authority, and drives organic growth.",
          icon: "star",
        },
        {
          title: "Analytics & Insights",
          description:
            "In-depth analytics and reporting to measure success and optimize performance continuously.",
          icon: "award",
        },
      ],
      stats: [
        { value: "10+", label: "Years in Business" },
        { value: "200+", label: "Projects Delivered" },
        { value: "98%", label: "Client Satisfaction" },
        { value: "12", label: "Industry Awards" },
      ],
      testimonials: [
        {
          quote:
            "Acme Studio transformed our brand completely. Their strategic approach and creative execution exceeded our expectations at every step.",
          author: "Sarah Mitchell",
          role: "CEO at TechFlow",
        },
        {
          quote:
            "Working with Acme was a game-changer. They truly understood our vision and delivered a website that drives real business results.",
          author: "James Rodriguez",
          role: "Founder of GreenLeaf Co.",
        },
        {
          quote:
            "The team's attention to detail and commitment to quality is unmatched. They're not just designers — they're strategic partners.",
          author: "Emily Chen",
          role: "Marketing Director at Nexus",
        },
      ],
      cta: {
        headline: "Ready to Transform Your Brand?",
        description:
          "Let's collaborate on something extraordinary. Reach out today and let's start building your next great project together.",
        buttonText: "Get Started Today",
      },
    },
    about: {
      story:
        "Founded in 2015, Acme Studio began with a simple belief: great design has the power to transform businesses. What started as a small team of passionate designers has grown into a full-service creative agency serving clients across the globe.\n\nOver the years, we've had the privilege of working with startups, Fortune 500 companies, and everything in between. Each project has reinforced our commitment to pushing creative boundaries while delivering measurable results.\n\nToday, our team of designers, strategists, and developers continues to craft digital experiences that not only look stunning but also drive real business growth. We believe in the intersection of creativity and strategy — and that's where magic happens.",
      mission:
        "To empower businesses with design-driven solutions that inspire, engage, and deliver measurable impact.",
      values: [
        {
          title: "Creative Excellence",
          description:
            "We pursue the highest standards of design and innovation in every project we undertake.",
        },
        {
          title: "Client Partnership",
          description:
            "We build lasting relationships by treating every client's success as our own.",
        },
        {
          title: "Continuous Growth",
          description:
            "We stay curious, embrace new technologies, and constantly evolve our craft.",
        },
      ],
      team: [
        {
          name: "Alex Rivera",
          role: "Creative Director",
          bio: "With 15+ years in design, Alex leads our creative vision and ensures every project meets the highest standards of excellence.",
        },
        {
          name: "Maya Patel",
          role: "Head of Strategy",
          bio: "Maya brings a data-driven approach to brand strategy, helping clients achieve measurable business outcomes through design.",
        },
      ],
      quote: {
        text: "Design is not just what it looks like and feels like. Design is how it works — and how it makes people feel.",
        author: "Alex Rivera, Creative Director",
      },
    },
    contact: {
      headline: "Let's Work Together",
      description:
        "Have a project in mind? We'd love to hear about it. Reach out and let's start a conversation about how we can help bring your vision to life.",
      formEnabled: true,
    },
    privacy: {
      content: `<h2>Introduction</h2>
<p>At Acme Studio, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

<h2>Information We Collect</h2>
<p>We may collect personal information that you voluntarily provide to us when you:</p>
<ul>
<li>Fill out a contact form on our website</li>
<li>Subscribe to our newsletter</li>
<li>Request a quote or consultation</li>
</ul>

<h2>How We Use Your Information</h2>
<p>We use the information we collect to:</p>
<ul>
<li>Respond to your inquiries and fulfill your requests</li>
<li>Send you relevant communications about our services</li>
<li>Improve our website and services</li>
<li>Comply with legal obligations</li>
</ul>

<h2>Cookies</h2>
<p>Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can set your browser to refuse cookies, but some features may not function properly.</p>

<h2>Third-Party Sharing</h2>
<p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law or to protect our rights.</p>

<h2>Your Rights</h2>
<p>You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at hello@acmestudio.com.</p>

<h2>Contact Us</h2>
<p>If you have questions about this Privacy Policy, please contact us at hello@acmestudio.com.</p>`,
      lastUpdated: "2026-01-01",
    },
    terms: {
      content: `<h2>Acceptance of Terms</h2>
<p>By accessing and using the Acme Studio website, you accept and agree to be bound by these Terms and Conditions.</p>

<h2>Services</h2>
<p>Acme Studio provides creative design, branding, web development, and digital marketing services. The scope of each project is defined through individual agreements with clients.</p>

<h2>Intellectual Property</h2>
<p>All content, designs, and materials on this website are the intellectual property of Acme Studio unless otherwise stated. You may not reproduce, distribute, or use any content without our written permission.</p>

<h2>User Obligations</h2>
<p>When using our website, you agree to:</p>
<ul>
<li>Provide accurate information when filling out forms</li>
<li>Not use the website for any unlawful purpose</li>
<li>Not attempt to gain unauthorized access to any part of the website</li>
</ul>

<h2>Limitation of Liability</h2>
<p>Acme Studio shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or services.</p>

<h2>Governing Law</h2>
<p>These terms shall be governed by and construed in accordance with the laws of the State of California.</p>

<h2>Contact Us</h2>
<p>If you have questions about these Terms, please contact us at hello@acmestudio.com.</p>`,
      lastUpdated: "2026-01-01",
    },
  },
};
