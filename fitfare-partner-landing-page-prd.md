# FitFare Partner Landing Page — PRD & Website Content

**Status:** Proposed implementation brief  
**Version:** 1.0  
**Date:** 12 October 2026

## 1. Purpose

Create a concise partner landing page that introduces FitFare after a cold call and helps interested fitness centre owners understand the partnership and begin onboarding.

The page should answer four questions: What is FitFare? What does my centre get? How does it compare with other platforms? How do I get started?

### Approved content merge

| Page section | Source |
| --- | --- |
| 1. Hero | Concise PDF — hero |
| 2. Partner benefits | Detailed PDF — section 2 |
| 3. How FitFare is different | Detailed PDF — updated section 3 |
| 4. Onboarding | Detailed PDF — section 4 |

Use these four sections in this order. Preserve the selected copy below. Keep registration accessible through **Become a Partner** buttons linking to the existing `/partner-form` route; a separate fifth landing-page section is not included in this merge.

## 2. Audience & Desired Action

- **Cold leads:** Fitness centre owners or managers unfamiliar with FitFare. Explain the offering immediately and give them a page they can revisit after the call.
- **Warm leads:** Owners or managers evaluating the partnership. Make commercial terms, operational tools and onboarding easy to scan.
- **Primary action:** Open the partner form.
- **Conversion outcome:** Submit a partner enquiry. Opening the form or submitting an enquiry must not imply that the centre is already onboarded.

## 3. Visual Direction

Preserve the visual language of the existing [FitFare website](https://fitfare.in/): a near-black background, white headings, muted grey body text, blue brand accents, rounded cards and pill-shaped buttons.

- Use the existing FitFare logo and the site's DM Sans / Inter font stack.
- Use a single rounded fitness photo beside the hero, as in the concise PDF.
- Retain the detailed PDF's asymmetric benefits grid.
- Use a simple comparison table and three numbered onboarding cards.
- Keep generous whitespace, short paragraphs and restrained borders. Avoid extra illustrations, repeated benefit lists, additional sections or decorative dashboards.
- Website copy below is public-facing. PRD notes, source explanations and implementation guidance are not website copy.

### Page structure

```text
HEADER: FitFare logo + For Partners             Become a Partner

01 HERO
Headline + short introduction + CTA            One fitness photo

02 BENEFITS
One tall discovery card                        Wide partner-tools card
                                               Zero commission | Payouts

03 COMPARISON
What matters              Other platforms*     FitFare
Four comparison rows + qualification

04 ONBOARDING
01 Share details          02 Connect           03 Get set up
Once-onboarded summary
Become a Partner

FOOTER: Existing privacy, terms and support links
```

## 4. Exact Website Content

### Section 1 — Hero

**Source:** Concise PDF, hero.  
**Anchor:** `#overview`

**Header label**

> FOR PARTNERS

**Headline**

> Your centre.  
> More possibilities.

**Supporting line**

> Connect with people looking for a place to train.

**Body**

> FitFare helps people discover and book fitness experiences at participating centres.

**Primary CTA**

> Become a Partner

**Layout:** Text on the left; one rounded fitness image on the right. Use the fitness photo from the concise hero. Keep the headline and CTA visible early on mobile. The header also includes the same CTA.

### Section 2 — Partner Benefits

**Source:** Detailed PDF, section 2.  
**Anchor:** `#benefits`

**Heading**

> Built around your centre.

**Supporting line**

> Be discovered. Stay organised. Keep your team focused on fitness.

| Card | Exact heading | Exact body |
| --- | --- | --- |
| Discovery | Be discovered | Help people exploring fitness near you find your centre on FitFare. |
| Partner tools | Your partner app. Your dashboard. | View and manage FitFare bookings in one place with the partner app and dashboard. |
| Commission | Zero commission | FitFare does not charge commissions to fitness centres. |
| Payouts | 5th of every month | Monthly payouts on a clear schedule. |

**Layout:** One tall discovery card with a fitness image on the left. On the right, a wide partner-tools card above two compact cards for commission and payouts. Give “5th” visual emphasis. All copy must be visible without hovering.

### Section 3 — How FitFare Is Different

**Source:** Detailed PDF, updated section 3.  
**Anchor:** `#why-fitfare`

**Heading**

> How FitFare is different.

**Supporting line**

> Clear commercial terms. Practical tools for your centre.

**Comparison table**

| What matters | Other platforms* | FitFare |
| --- | --- | --- |
| Commercial terms | Platform-specific rates and payment terms. | No commission charged to fitness centres. |
| Payout schedule | Timing follows each platform's billing cycle. | Monthly payouts on the 5th. |
| Partner tools | Partner dashboards available on some platforms. | Partner app and dashboard. |
| Visitor check-in | QR check-in available on some platforms. | QR check-in for FitFare visitors. |

**Visible qualification**

> *Terms and features vary by provider and agreement. The comparison does not imply that other platforms lack these tools.

**Layout:** One clean table with three columns and four rows. Highlight the FitFare column with stronger type or a subtle blue accent. Keep other columns neutral; avoid crosses or icons suggesting that all other platforms lack a feature. Do not display competitor names in the landing-page copy.

**Editorial note:** This compares selected public partner models, not the entire market. Partner dashboards and QR check-in are shared capabilities, not exclusive advantages. Retain that distinction when editing copy. The comparison does not establish that every other platform charges commissions.

### Section 4 — Onboarding

**Source:** Detailed PDF, section 4.  
**Anchor:** `#how-it-works`

**Heading**

> From introduction to first check-in.

**Supporting line**

> Start with your centre details. Let's take the next step together.

| Step | Exact heading | Exact body |
| --- | --- | --- |
| 01 | Tell us about your centre | Share your contact details, centre name and location through the partner form. |
| 02 | Connect with the FitFare team | Review how the partnership works and the details needed to set up your centre. |
| 03 | Get set up. Welcome visitors. | Complete onboarding, get familiar with your partner tools and use QR check-in for FitFare arrivals. |

**Summary strip label**

> Once onboarded

**Summary strip content**

> Partner app / dashboard + QR check-in + Monthly payouts on the 5th

**Closing CTA**

> Become a Partner

**Layout:** Three numbered cards in a row, followed by a compact summary strip and CTA. The closing CTA is a functional addition to complete the four-section flow. The onboarding sequence remains proposed and should be checked against FitFare's actual operations before launch.

## 5. Functional Requirements

| Element | Required behaviour |
| --- | --- |
| Logo | Links to the main FitFare homepage. |
| Header CTA | Opens `/partner-form` in the same tab. |
| Hero CTA | Opens the same partner form. |
| Closing CTA | Opens the same partner form after the onboarding section. |
| Section anchors | Support direct links to benefits, comparison and onboarding for sales follow-ups. |
| Footer | Reuse existing Privacy Policy, Terms of Service and Support destinations. |
| Partner form | Reuse the existing registration flow; confirm its route and submission behaviour before release. |

No new backend, account creation flow, payment flow or automatic partner activation is required by this PRD.

## 6. Mobile & Accessibility

- Stack hero text and CTA before the image.
- Stack benefit cards in this order: discovery, partner tools, commission, payouts.
- Convert comparison rows into vertically stacked groups on narrow screens, repeating “Other platforms” and “FitFare” labels within each group. Preserve the qualification.
- Stack onboarding cards in numerical order.
- Keep buttons easy to tap, provide visible keyboard focus and maintain readable text contrast.
- Use one H1 for the hero and H2 headings for the remaining sections. Use semantic table headers on desktop.
- Avoid hover-only content, text embedded in images and horizontal page overflow.

## 7. Content Guardrails

- Use **FitFare** consistently.
- Do not frame the proposition as pay-per-day or on-demand access.
- Do not imply that existing gym members should move to FitFare.
- Do not promise revenue, bookings, member growth or onboarding timelines.
- State **no commission**, not “no fees” or “100% of all revenue.”
- Retain the supplied payout wording: **monthly payouts on the 5th**. Do not invent settlement cutoffs, bank-arrival guarantees or holiday rules.
- Keep competitor names out of public comparison copy and do not portray shared features as exclusive.

## 8. Measurement & Acceptance Criteria

Track CTA clicks by location (header, hero, onboarding), partner-form views and successful enquiry submissions. Count a conversion only after confirmed form submission; do not send form field values to analytics. Establish a baseline before setting numerical conversion targets.

The page is ready when:

- [ ] The concise hero and detailed sections 2, 3 and 4 appear in the specified order with the supplied copy.
- [ ] There are four main content sections; registration remains reachable through the partner-form CTA.
- [ ] All three CTAs reach the same working partner form.
- [ ] Zero commission, partner app/dashboard, QR check-in and monthly payouts on the 5th are present.
- [ ] The comparison includes its qualification and makes no unsupported exclusivity claims.
- [ ] FitFare has verified the proposed onboarding sequence and registration destination.
- [ ] Desktop and mobile layouts have no clipped copy, overlapping cards or horizontal page overflow.
- [ ] Keyboard navigation, focus states, labels and text contrast have been checked.
- [ ] No PDF annotations, internal editorial notes or source appendix appear in the public page.

## 9. Internal Sources

These references support the content handoff and are not additional landing-page sections.

- **Hero:** `fitfare-partner-landing-page-clean.pdf`, section 1.
- **Benefits, comparison and onboarding:** `fitfare-partner-landing-page.pdf`, sections 2–4, including the revised comparison.
- **Brand reference:** [FitFare homepage](https://fitfare.in/), inspected during the PDF preparation on 12 October 2026.
- **Selected public partner model reference 1:** [Partner terms](https://fitpass.co.in/partner-terms-and-conditions).
- **Selected public partner model reference 2:** [Partner payouts, pricing and policies](https://classpass.com/partners/blog/classpass-payouts-pricing-policies-rates).
- **FitFare business facts:** Supplied by the user: no commissions charged to fitness centres, partner app/dashboard, QR check-in and monthly payouts on the 5th.
