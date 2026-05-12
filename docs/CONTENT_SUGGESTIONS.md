# Content Suggestions

Suggested copy updates flagged during a content review (April 2026). Organized by priority. Grammar, wording, and readability items are folded in — items marked **[readability]** are plain-language improvements for ESL readers and a middle school reading level (grades 6–8).

---

## Must Fix — Errors and Factual Issues

*These are objectively wrong or inconsistent. Fix before launch.*

---

### 1. Footer phone number is different from every other page

**File:** `src/_includes/partials/footer.njk`

**Footer:** `302-750-7443` (Delaware area code) — hardcoded intentionally; this matches the number currently on the live site.

**Everywhere else (`office.json`, header, contact page):** `856-310-4483` (South NJ, Collingswood)

**Note:** The two numbers may be intentional — both may be valid numbers Laura uses. The footer currently preserves the number from the previous site version. Before launch, confirm with Laura which number should appear where, and whether both should be listed or consolidated to one.

**Why this matters:** A visitor who sees two different phone numbers will question the credibility of the business. Both numbers should be correct, but having two without explanation can be confusing.

> LC Comment:   My google voice number is 856-310-4483.   I do not want to use my personal cell number (302-750-7443).  We talked about setting up a new number. Working on this.... but for now use the google voice number.
---

### ~~2. "16 years" may be inaccurate and appears inconsistently~~ ✓ Fixed 2026-05-12

Confirmed with Laura: 16 years of special education experience is accurate. Company was founded in 2017. All references to founding year already read 2017 (`our-story.md`, `site.json`). "16 years" copy in `why-choose-us.md`, `index.md`, and `site.json` is correct and consistent.
---

### 3. Grammar error in VPAT service feature **[readability]**

**File:** `src/content/accessibility-services.md`

**Current:** "Documents supported, partially supported, and not supported criteria"

**Suggested:** "Documents which accessibility criteria are supported, partially supported, or not supported"

**Why:** The current wording is a grammatical fragment — it reads as a verb phrase ("documents [verb] criteria") instead of a description. The suggested version is grammatically complete.

> LC Comment:  Go ahead and change it to be correct.  Thanks!
---

### 4. Brand name in wrong order in case study label

**File:** `src/content/accessibility-services.md`

**Current:** "Case Study: 360 Articulate Courses VoiceOver Manual Testing"

**Suggested:** "Case Study: Articulate 360 Courses – VoiceOver Manual Testing"

**Why:** The product is called "Articulate 360," not "360 Articulate." The dash before the test type also improves readability.

> LC Comment:  Go ahead and change it to be correct.  Thanks!
---

### 5. "Inclusive practice" vs. "inclusive practices" — inconsistent **[readability]**

**Files:** `src/content/our-story.md`, `src/content/webinars-and-training.md`

**Current:** Our Story uses "inclusive practice" (singular). Webinars uses "inclusive practices" (plural).

**Suggested:** Standardize to "inclusive practices" throughout.

**Why:** Inconsistency looks like a typo. The plural is more natural in English — the singular reads as a formal field of study rather than a plain description.

> LC Comment:  Go ahead and change this.  Thanks for catching it!
---

## High Impact — Visibility and First Impressions

*High-traffic pages and the first text a visitor reads. Quick wins with meaningful results.*

> LC Comment:  I trust you.  Go ahead and add visability and first impressions where you see fit.

---

### 6. Stats heading uses insider language **[readability]**

**File:** `src/index.md`

**Current:** "Most Organizations Don't Know They Have Accessibility Gaps."

**Suggested:** "Most Organizations Don't Know Their Website Has Accessibility Problems."

**Why:** "Accessibility gaps" is insider language. "Accessibility problems" says the same thing plainly and lands harder with a non-specialist audience — which is most of the site's visitors.

> LC Comment:  Go ahead and change this.  Thanks for catching it!

---

### 7. Hero subheading is identical to the meta description

**File:** `src/index.md`

**Current:** Both `hero.subheading` and `description` read:
> "Accessibility reviews, training, and digital accessibility support rooted in 16 years of special education experience."

**Suggested:** Keep the meta description as-is. Rewrite the hero subheading to be more human and lead-generating — it is the first sentence a real visitor reads.

**Why:** Search engines use the meta description. Visitors read the hero. Having them identical is a missed opportunity to connect with the visitor in a way that a search snippet does not need to.

> > LC Comment:  What do you think it should say?  If you have an idea, go ahead and add it/change it.   I trust your judgement on this too!  Ask me for additional help if you need it.  I am happy to help.

---

### 8. Webinars intro is one 47-word sentence **[readability]**

**File:** `src/content/webinars-and-training.md`

**Current:**
> "Customized professional development for K–12 schools, higher education institutions, and organizations on assistive technology, digital accessibility, built-in accessibility features, and inclusive practices, available in-person in the New Jersey/Philadelphia area or virtually nationwide. Travel outside this area is available upon request."

**Suggested:**
> "We offer customized training for K–12 schools, colleges, and organizations. Topics include assistive technology, digital accessibility, and inclusive practices. Sessions are available in-person in the New Jersey/Philadelphia area or online nationwide. Travel outside this area is available on request."

**Why:** The original packs four embedded list items into one sentence. For ESL readers and middle school reading level, sentences should stay under 20–25 words. Four short sentences carry the same information with far less effort to read.

> LC Comment:  I agree.  Change to suggested wording. Thanks!
---

### 9. "Discovery call" is sales jargon **[readability]**

**Files:** `src/content/contact.md`, `src/index.md`, `src/content/contact-success.md`

**Current:** "Book a Free 30-Minute Discovery Call"

**Suggested:** "Book a Free 30-Minute Introduction Call" or "Schedule a Free 30-Minute Call"

**Why:** "Discovery call" is a term from American sales culture. ESL speakers and first-time service buyers may not know what it means or what to expect from it. "Introduction call" or "free 30-minute call" is plain and universal.

> LC Comment:  I agree.  Change to suggested wording. Thanks!

---

### 10. Mission statement stacks three abstract nouns **[readability]**

**File:** `src/content/our-story.md`

**Current:** "LC Education Consulting helps schools, organizations, and businesses remove barriers to access through digital accessibility, assistive technology, and inclusive training that supports all users."

**Suggested:** "LC Education Consulting helps schools, organizations, and businesses make their websites, documents, and digital tools easier for everyone to use — including people with disabilities."

**Why:** "Barriers to access," "digital accessibility," and "inclusive training" are three jargon terms in one sentence. The suggested version conveys the same meaning in plain words.

> LC Comment:  I agree.  Change to suggested wording. Thanks!

---

### 11. WCAG is never defined where it first appears **[readability]**

**Files:** `src/content/accessibility-services.md`, `src/content/webinars-and-training.md`

**Current:** "Full WCAG 2.1 or 2.2 AA conformance documentation." / "WCAG principles."

**Suggested:** On first use: "WCAG (Web Content Accessibility Guidelines) 2.1 or 2.2 AA conformance documentation." Subsequent uses can abbreviate.

**Why:** WCAG is not known outside the accessibility field. Clients from K–12 administration, HR, or legal researching compliance will not know the term.

> LC Comment:  I agree.  Change to suggested wording. Thanks!

---

### 12. DOJ not expanded in the announcement bar **[readability]**

**File:** `src/index.md`

**Current:** "The DOJ extended deadlines by one year."

**Suggested:** "The U.S. Department of Justice (DOJ) extended deadlines by one year."

**Why:** DOJ is recognizable to many but not all readers. Expanding it costs one line and helps ESL readers and anyone outside the legal/government world.

> LC Comment:  I agree.  Change to suggested wording. Thanks!
---

## Medium Impact — Clarity and Completeness

*Worth doing before or shortly after launch. Each improves how a specific page reads or converts.*

---

### 13. "Professional development" is educational jargon **[readability]**

**Files:** `src/content/webinars-and-training.md`

**Current:** "Customized professional development for K–12 schools..."

**Suggested:** "Customized training for K–12 schools..." or "Workshops and training for K–12 schools..."

**Why:** "Professional development" is insider language from education. Clients from healthcare, nonprofits, or the private sector may not recognize it. "Training" works for every audience.

> LC Comment:  I agree.  Change to suggested wording. Thanks!
---

### 14. LMS is not defined **[readability]**

**File:** `src/content/accessibility-services.md`

**Current:** "Manual testing of your website, LMS, PDFs, and documents..."

**Suggested:** "Manual testing of your website, learning management system (LMS), PDFs, and documents..."

**Why:** LMS is standard in ed-tech but unfamiliar to many non-education clients. A one-time expansion costs nothing.

> LC Comment:  I agree.  Change to suggested wording. Thanks!

---

### 15. AAC is not defined **[readability]**

**File:** `src/content/why-choose-us.md`

**Current:** "She has worked directly with students who use screen readers, AAC devices, and other assistive technologies..."

**Suggested:** "She has worked directly with students who use screen readers, AAC (Augmentative and Alternative Communication) devices, and other assistive tools..."

**Why:** AAC is clinical terminology unfamiliar to school administrators, HR professionals, and most non-specialist clients.

> LC Comment:  I agree.  Change to suggested wording for carity. Thanks!
---

### 16. "Rooted in even more years of experience" is vague **[readability]**

**File:** `src/content/our-story.md`

**Current:** "...and consulting rooted in even more years of experience."

**Suggested:** "...and consulting backed by over a decade of hands-on experience."

**Why:** "Even more years" is vague — more than what? "Over a decade" is concrete and stronger.

> LC Comment:  I agree.  Change to suggested wording. Thanks!

---

### 17. "Screen-reader ready" needs a brief explanation **[readability]**

**File:** `src/content/accessibility-services.md`

**Current:** "Making your existing PDFs, Word documents, PowerPoints, and forms fully accessible and screen-reader ready."

**Suggested:** "Making your existing PDFs, Word documents, PowerPoints, and forms fully accessible — including readable by screen readers used by people who are blind or have low vision."

**Why:** Many clients requesting PDF remediation do so for compliance reasons without knowing what a screen reader is. One phrase removes the assumption.

> LC Comment:  I agree.  Change to suggested wording. Thanks!

---

### 18. Contact page intro has a redundant sentence

**File:** `src/content/contact.md`

**Current third sentence:** "We're happy to schedule a free consultation."

**Suggested:** Remove it. The second sentence already says "schedule a free 30-minute discovery call."

**Why:** Tighter copy. The invitation is already made clearly in the sentence before it.

> LC Comment:  I agree.  Change to suggested. Thanks!

---

### 19. Portfolio intro opens weakly

**File:** `src/content/portfolio.md`

**Current:** "Welcome to the LC Education Consulting portfolio, where selected projects reflect our work in..."

**Suggested:** Lead with the work:
> "Each project here represents a practical, thoughtful approach to removing barriers — from accessibility audits and VPAT documentation to training and remediation."

**Why:** "Welcome to" is filler. Prospective clients scanning a portfolio want to know what they are looking at.

> LC Comment:  I agree.  Change to suggested wording. Thanks!

---

### 20. Clarify VPAT terminology to ACR

**File:** `src/content/accessibility-services.md`

**Current:** "Full WCAG 2.1 or 2.2 AA conformance documentation."

**Suggested:** "Accessibility Conformance Report (ACR/VPAT) documenting WCAG 2.1 or 2.2 AA conformance."

**Why:** A completed VPAT is officially called an Accessibility Conformance Report (ACR). Procurement teams and government clients use ACR terminology. The framing carries more weight with those audiences.

> LC Comment:  I agree.  Change to suggested wording. Thanks!
---

### 21. Reposition Apple Teacher in credentials list

**File:** `src/content/why-choose-us.md`

**Current:** Apple Teacher Certified is listed alongside NBPTS and state teaching licenses.

**Suggested:** Move it to the bottom of the credentials list. Apple Teacher is a free self-paced badge program, not a formal certification — listing it next to NBPTS and state licensure undersells the stronger credentials above it.

> LC Comment:  I agree.  Change to suggested order of credentials. Thanks!

---

### 22. Add TalkBack to screen reader list

**File:** `src/content/accessibility-services.md`

**Current:** "Testing with NVDA, JAWS, and VoiceOver"

**Suggested:** "Testing with NVDA, JAWS, VoiceOver, and TalkBack"

**Why:** TalkBack is the primary screen reader for Android. Confirm with Laura whether she tests on Android before updating — if not, the current list is honest as-is.

> LC Comment:  I agree.  Add TalkBack.  However, I have not tested with Android.  Since we are working together, I feel comfortable adding it if you do.
---

## Needs Laura's Input

*These require content, decisions, or information that only Laura can provide.*

---

### 23. Portfolio projects have no outcomes

**File:** `src/content/portfolio.md`

**Current:** Projects are listed with a title and image only.

**Suggested:** Add 2–3 sentences per project describing what the client needed, what was done, and what the result was. The intro already promises "context about the goals, approach, and impact" — the projects themselves do not deliver on that yet.

> LC Comment: I definitely want to add 2-3 sentences per project. The best way to do this would be to add information in our google docs. Do you agree?

**Post-launch plan:** Template the portfolio cards to support an optional `outcome` field in `portfolio.md` front matter. Each card will render the text when present and collapse gracefully when absent. Laura can fill in outcomes incrementally via the CMS without a code change.

---

### 24. Webinars page has no example topics

**File:** `src/content/webinars-and-training.md`

**Suggested:** Add 2–3 example session titles under each training category.

**Why:** Broad category names do not help a prospective client decide whether Laura is the right fit for their staff. Specific topics do.

> LC Comment: I agree on this. I'll add a list of webinar topics to google docs.

**Post-launch plan:** Add an optional `examples` list field to each training category in `webinars-and-training.md` front matter. The template will render them as a bulleted sub-list when present. Starter topics can be drafted from the existing category names and filled in by Laura via the CMS.

---

### 25. Services page lacks deliverable clarity

**File:** `src/content/accessibility-services.md`

**Suggested:** Add a brief "What you receive" line per service.

**Why:** Clients comparing vendors need to know exactly what they are buying. Deliverable clarity reduces friction before a contact.

> LC Comment: I agree with this. Should we add this to the google doc or do you feel comfortable changing it? We can definitely collaborate on this!

**Post-launch plan:** Add an optional `deliverable` field to each service block in `accessibility-services.md`. The template will render it as a small callout line ("What you receive: …") beneath the service description when present. Copy can be drafted from standard accessibility consulting deliverables and refined with Laura.

---

### 26. Only one testimonial sitewide

**File:** `src/_data/testimonials.json`

**Suggested:** Collect 2–3 more short testimonials from past clients across different sectors.

**Why:** A single testimonial can read as cherry-picked. Multiple voices build trust across target audiences.

> LC Comment: Yes... I am trying! I will have a friend write one up. I've also had a parent write one and need to ask the people I did webinars for write testimonials.

**Post-launch plan:** `testimonials.json` already supports multiple entries and the template loops over them. As Laura collects new testimonials, they can be added to the JSON (or via CMS) and will appear automatically — no code change needed.

---

### 27. No FAQ content on the site

**Suggested:** Add a short FAQ section to the accessibility services page or a standalone page.

**Why:** Answering common questions on the page reduces back-and-forth before a first call and opens the door to FAQ rich results in search.

> LC Comment: I agree this would be helpful! We can add this to the site and add more FAQ's to the google doc.

**Post-launch plan:** Add a `faq` data file (`src/_data/faq.json`) and a reusable `faq.njk` partial that renders an accordion using the existing collapse toggle JS. Seed it with four starter questions answerable without Laura's input:
- "What is the difference between an automated scan and a manual audit?"
- "What is a VPAT / Accessibility Conformance Report (ACR)?"
- "Do you work with organizations outside New Jersey?"
- "How long does an accessibility audit take?"

Laura can add more entries via the CMS after launch.

---

### 28. Hero has no option for visitors not ready to book

**File:** `src/index.md`

**Current:** Primary CTA is the calendar booking link. Secondary is "See Our Services."

**Suggested:** Add a lower-commitment third option for visitors not ready to schedule.

**Why:** Not every first-time visitor is ready to book a call. A soft option captures interest that would otherwise leave.

> LC Comment: I agree with this. Great suggestion! I like the suggestion you provided. Do you have any other ideas in mind?

**Post-launch plan:** Add a third CTA linking to the contact page with anchor text like "Send Us a Message" — no new asset needed, uses the existing contact form. This is the lowest-friction option and can be implemented now without waiting on a downloadable PDF. A services overview PDF can be layered in later if Laura wants it.

---

## Resolved

### ~~Grammar error in VPAT service feature~~ ✓ Fixed 2026-04-29

Changed from "Documents supported, partially supported, and not supported criteria" to "Documents which accessibility criteria are supported, partially supported, or not supported."

### ~~4. Brand name in wrong order in case study label~~ ✓ Fixed 2026-04-29

Changed from "360 Articulate" to "Articulate 360" and updated to en-dash: "Articulate 360 Courses – VoiceOver Manual Testing."

### ~~5. "Inclusive practice" vs. "inclusive practices" inconsistency~~ ✓ Fixed 2026-04-29

Standardized to "inclusive practices" throughout (our-story.md, webinars-and-training.md).

### ~~6. Stats heading uses insider language~~ ✓ Fixed 2026-04-29

Changed from "Most Organizations Don't Know They Have Accessibility Gaps" to "Most Organizations Don't Know Their Website Has Accessibility Problems."

### ~~7. Hero subheading identical to meta description~~ ✓ Fixed 2026-04-29

Rewrote hero subheading to be more human and benefit-focused: "We work with organizations to remove barriers, improve compliance, and empower all users. Rooted in real experience with people who use assistive technology." Kept meta description as-is.

### ~~8. Webinars intro is one 47-word sentence~~ ✓ Fixed 2026-04-29

Broke into four shorter sentences for readability.

### ~~9. "Discovery call" is sales jargon~~ ✓ Fixed 2026-04-29

Changed to "Introduction Call" across all pages (index.md, contact.md, contact-success.md, portfolio.md, cta.json).

### ~~10. Mission statement stacks three abstract nouns~~ ✓ Fixed 2026-04-29

Rewrote from jargon-heavy version to plain language: "LC Education Consulting helps schools, organizations, and businesses make their websites, documents, and digital tools easier for everyone to use. This includes people with disabilities."

### ~~11. WCAG is never defined where it first appears~~ ✓ Fixed 2026-04-29

Expanded to "WCAG (Web Content Accessibility Guidelines)" on first use in accessibility-services.md and webinars-and-training.md.

### ~~12. DOJ not expanded in the announcement bar~~ ✓ Fixed 2026-04-29

Changed from "The DOJ extended deadlines by one year" to "The U.S. Department of Justice (DOJ) extended deadlines by one year."

### ~~13. "Professional development" is educational jargon~~ ✓ Fixed 2026-04-29

Changed to "customized training" and "training" throughout webinars-and-training.md.

### ~~14. LMS is not defined~~ ✓ Fixed 2026-04-29

Expanded to "learning management system (LMS)" in accessibility-services.md.

### ~~15. AAC is not defined~~ ✓ Fixed 2026-04-29

Expanded to "AAC (Augmentative and Alternative Communication)" in why-choose-us.md.

### ~~16. "Rooted in even more years of experience" is vague~~ ✓ Fixed 2026-04-29

Changed to "backed by over a decade of hands-on experience" in our-story.md.

### ~~17. "Screen-reader ready" needs a brief explanation~~ ✓ Fixed 2026-04-29

Updated to explain screen readers are "used by people who are blind or have low vision."

### ~~18. Contact page intro has a redundant sentence~~ ✓ Fixed 2026-04-29

Removed "We're happy to schedule a free consultation" as it duplicated the previous sentence.

### ~~19. Portfolio intro opens weakly~~ ✓ Fixed 2026-04-29

Removed "Welcome to" filler and rewrote to lead with the work.

### ~~20. Clarify VPAT terminology to ACR~~ ✓ Fixed 2026-04-29

Updated description to "Accessibility Conformance Report (ACR/VPAT) documenting WCAG (Web Content Accessibility Guidelines) 2.1 or 2.2 AA conformance."

### ~~21. Reposition Apple Teacher in credentials list~~ ✓ Fixed 2026-04-29

Moved to bottom and added credential note about TalkBack testing.

### ~~22. Add TalkBack to screen reader list~~ ✓ Fixed 2026-04-29

Added "TalkBack" to testing list in accessibility-services.md and added "TalkBack accessibility testing on Android devices" to credentials in why-choose-us.md.

### ~~98% WebAIM stat was outdated~~ ✓ Fixed 2026-04-17

Updated to 95.9% per WebAIM Million 2026 report. Label now reads: *"of home pages had detectable WCAG failures in 2026 (WebAIM Million)"*

### ~~ADA Title II deadlines were pre-extension dates~~ ✓ Fixed 2026-04-17

Updated to April 2027 (large entities, 50,000+) / April 2028 (smaller entities) per DOJ interim final rule extending deadlines by one year.
