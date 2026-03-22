# SellerSync Pro

## Current State
The app is a full dashboard app with sidebar navigation, paywall, and multiple pages (Overview, Analytics, Orders, Inventory, Marketing, Integrations, Settings). There is no public-facing landing page -- the app loads directly into the dashboard.

## Requested Changes (Diff)

### Add
- A public landing page (`LandingPage` component) shown before the user enters the dashboard
- Hero section: headline, sub-headline, CTA buttons ("Start Free Trial" / "See Demo")
- Features section: highlight key benefits (multi-platform sync, AI automation, unified dashboard, UPI payments)
- Platform logos row: Amazon, Flipkart, Meesho, Alibaba, IndiaMart
- Pricing section: 3 plans (Weekly $9.99, Monthly $29.99, Yearly $249.99) with CTA
- Footer with branding
- Route logic in App.tsx: show LandingPage first, with a button to enter the dashboard

### Modify
- App.tsx: Add a `showLanding` state (default true). When user clicks CTA, set `showLanding` to false and show the dashboard.

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/pages/LandingPage.tsx` with hero, features, platforms, pricing, and footer sections
2. Update `App.tsx` to show LandingPage when `showLanding === true`, dashboard otherwise
