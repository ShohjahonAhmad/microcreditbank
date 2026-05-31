# Micro Credit Bank Website - Project Specification

## Overview

Build a modern, professional, responsive website for a private microcredit bank in Uzbekistan.

The website is informational only. No authentication, user accounts, loan applications, payments, or banking transactions are required.

The design language should be inspired by Kapitalbank's public website, but not copied. Use a similar professional banking aesthetic, modern layout, strong trust indicators, clean typography, and a premium feel.

---

## Technology Stack

- Next.js (latest version)
- App Router
- TypeScript
- Tailwind CSS
- Responsive Design
- SEO Friendly
- Accessibility Best Practices

Before implementing features, review the latest Next.js documentation because APIs may differ from older versions.

<!-- BEGIN:nextjs-agent-rules -->

**# This is NOT the Next.js you know**

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->\

---

## Design Requirements

### General Style

- Modern banking website
- Professional and trustworthy
- Premium appearance
- Clean layouts
- Large spacing
- Mobile-first design
- Fast loading

### Color Palette

Inspired by Kapitalbank:

Primary Color:

- yellow  _rgb(255, 195, 45)_

Secondary Colors:

- White (#FFFFFF)

- black ()

Accent Color:

- Gold or warm highlight color for important actions

### UI Elements

- Sticky header
- Modern navigation bar
- Hero section
- Feature cards
- Statistics section
- Trust indicators
- FAQ accordion
- Modern footer

Animations should be subtle and professional.

---

## Languages

Support three languages:

1. Uzbek
2. English
3. Russian

Requirements:

- Language switcher in header
- Language selection persists
- Use structured translation files
- Do not hardcode translations inside components

Recommended structure:

messages/
en.json
uz.json
ru.json

All visible text must be translatable.

---

## Pages

### Home Page

Sections:

1. Hero Banner

   - Bank slogan
   - Call to action
   - Professional banking image

2. Why Choose Us

   - Trust
   - Fast processing
   - Flexible loans
   - Customer support

3. Loan Products Preview

4. Currency Rates Widget

5. Loan Calculator Preview

6. Statistics Section

7. FAQ Preview

8. Contact CTA

---

### About Us

Sections:

- Company Overview
- Mission
- Vision
- Values
- History Timeline
- Leadership Section

Use placeholder content.

---

### Loan Products

Display multiple sample loan products:

- Individual Loan
- Business Loan
- Agricultural Loan
- Microfinance Loan

Each card should contain:

- Description
- Amount range
- Duration
- Interest placeholder

All values should be configurable.

---

### Loan Calculator

Create a standard loan calculator.

Inputs:

- Loan amount
- Loan term in months
- Interest rate

Outputs:

- Monthly payment
- Total payment
- Total interest

Interest formula can be a simple placeholder implementation.

Make calculator component reusable because business rules will change later.

---

### Currency Converter

Create a simple currency conversion page.

Currencies:

- UZS
- USD
- RUB

Requirements:

- Convert between currencies
- Create service abstraction for rates
- Use mock exchange rates for now
- Rates should be easily replaceable with API later

---

### FAQ

Accordion layout.

Sample questions and answers.

Fully translatable.

---

### Contact Page

Include:

- Address
- Phone
- Email
- Working hours

Contact form fields:

- Full Name
- Phone Number
- Message

Form can be frontend-only for now.

---

## Navigation

Header Menu:

- Home
- About Us
- Loan Products
- Loan Calculator
- Currency Converter
- FAQ
- Contact

Language Switcher:

- UZ
- EN
- RU

---

## Footer

Include:

- Logo
- Navigation links
- Contact details
- Social media placeholders
- Copyright

---

## SEO

Each page must include:

- Metadata
- Title
- Description
- Open Graph placeholders

Generate SEO-friendly structure.

---

## Code Quality

Requirements:

- Reusable components
- Clean folder structure
- TypeScript types
- No duplicated code
- Responsive layouts
- Maintainable architecture

Create reusable components for:

- Header
- Footer
- Hero
- Cards
- Loan Calculator
- Currency Converter
- FAQ Accordion
- Language Switcher

---

## Future Features

Design architecture so these can be added later:

- Real exchange rate API
- CMS integration
- News section
- Branch locator
- Online loan application
- Authentication
- Admin dashboard

Do not implement these features now, only prepare clean architecture.
