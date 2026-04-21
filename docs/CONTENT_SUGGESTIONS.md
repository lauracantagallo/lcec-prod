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

---

### 2. "16 years" may be inaccurate and appears inconsistently

**Files:** `src/index.md`, `src/content/why-choose-us.md`, `src/_includes/partials/head.njk`

**Current:** Multiple references to "16 years of special education experience."

**Suggested:** Confirm the accurate number with Laura. The company was founded in 2014 — 12 years ago. If "16 years" counts experience before founding, clarify: "rooted in 16+ years of experience in special education and assistive technology." Update all instances to match.

**Why:** A visible conflict between "founded 2014" and "16 years of experience" is the first thing a procurement officer fact-checking the vendor will notice.

---

### 3. Grammar error in VPAT service feature **[readability]**

**File:** `src/content/accessibility-services.md`

**Current:** "Documents supported, partially supported, and not supported criteria"

**Suggested:** "Documents which accessibility criteria are supported, partially supported, or not supported"

**Why:** The current wording is a grammatical fragment — it reads as a verb phrase ("documents [verb] criteria") instead of a description. The suggested version is grammatically complete.

---

### 4. Brand name in wrong order in case study label

**File:** `src/content/accessibility-services.md`

**Current:** "Case Study: 360 Articulate Courses VoiceOver Manual Testing"

**Suggested:** "Case Study: Articulate 360 Courses – VoiceOver Manual Testing"

**Why:** The product is called "Articulate 360," not "360 Articulate." The dash before the test type also improves readability.

---

### 5. "Inclusive practice" vs. "inclusive practices" — inconsistent **[readability]**

**Files:** `src/content/our-story.md`, `src/content/webinars-and-training.md`

**Current:** Our Story uses "inclusive practice" (singular). Webinars uses "inclusive practices" (plural).

**Suggested:** Standardize to "inclusive practices" throughout.

**Why:** Inconsistency looks like a typo. The plural is more natural in English — the singular reads as a formal field of study rather than a plain description.

---

## High Impact — Visibility and First Impressions

*High-traffic pages and the first text a visitor reads. Quick wins with meaningful results.*

---

### 6. Stats heading uses insider language **[readability]**

**File:** `src/index.md`

**Current:** "Most Organizations Don't Know They Have Accessibility Gaps."

**Suggested:** "Most Organizations Don't Know Their Website Has Accessibility Problems."

**Why:** "Accessibility gaps" is insider language. "Accessibility problems" says the same thing plainly and lands harder with a non-specialist audience — which is most of the site's visitors.

---

### 7. Hero subheading is identical to the meta description

**File:** `src/index.md`

**Current:** Both `hero.subheading` and `description` read:
> "Accessibility reviews, training, and digital accessibility support rooted in 16 years of special education experience."

**Suggested:** Keep the meta description as-is. Rewrite the hero subheading to be more human and lead-generating — it is the first sentence a real visitor reads.

**Why:** Search engines use the meta description. Visitors read the hero. Having them identical is a missed opportunity to connect with the visitor in a way that a search snippet does not need to.

---

### 8. Webinars intro is one 47-word sentence **[readability]**

**File:** `src/content/webinars-and-training.md`

**Current:**
> "Customized professional development for K–12 schools, higher education institutions, and organizations on assistive technology, digital accessibility, built-in accessibility features, and inclusive practices, available in-person in the New Jersey/Philadelphia area or virtually nationwide. Travel outside this area is available upon request."

**Suggested:**
> "We offer customized training for K–12 schools, colleges, and organizations. Topics include assistive technology, digital accessibility, and inclusive practices. Sessions are available in-person in the New Jersey/Philadelphia area or online nationwide. Travel outside this area is available on request."

**Why:** The original packs four embedded list items into one sentence. For ESL readers and middle school reading level, sentences should stay under 20–25 words. Four short sentences carry the same information with far less effort to read.

---

### 9. "Discovery call" is sales jargon **[readability]**

**Files:** `src/content/contact.md`, `src/index.md`, `src/content/contact-success.md`

**Current:** "Book a Free 30-Minute Discovery Call"

**Suggested:** "Book a Free 30-Minute Introduction Call" or "Schedule a Free 30-Minute Call"

**Why:** "Discovery call" is a term from American sales culture. ESL speakers and first-time service buyers may not know what it means or what to expect from it. "Introduction call" or "free 30-minute call" is plain and universal.

---

### 10. Mission statement stacks three abstract nouns **[readability]**

**File:** `src/content/our-story.md`

**Current:** "LC Education Consulting helps schools, organizations, and businesses remove barriers to access through digital accessibility, assistive technology, and inclusive training that supports all users."

**Suggested:** "LC Education Consulting helps schools, organizations, and businesses make their websites, documents, and digital tools easier for everyone to use — including people with disabilities."

**Why:** "Barriers to access," "digital accessibility," and "inclusive training" are three jargon terms in one sentence. The suggested version conveys the same meaning in plain words.

---

### 11. WCAG is never defined where it first appears **[readability]**

**Files:** `src/content/accessibility-services.md`, `src/content/webinars-and-training.md`

**Current:** "Full WCAG 2.1 or 2.2 AA conformance documentation." / "WCAG principles."

**Suggested:** On first use: "WCAG (Web Content Accessibility Guidelines) 2.1 or 2.2 AA conformance documentation." Subsequent uses can abbreviate.

**Why:** WCAG is not known outside the accessibility field. Clients from K–12 administration, HR, or legal researching compliance will not know the term.

---

### 12. DOJ not expanded in the announcement bar **[readability]**

**File:** `src/index.md`

**Current:** "The DOJ extended deadlines by one year."

**Suggested:** "The U.S. Department of Justice (DOJ) extended deadlines by one year."

**Why:** DOJ is recognizable to many but not all readers. Expanding it costs one line and helps ESL readers and anyone outside the legal/government world.

---

## Medium Impact — Clarity and Completeness

*Worth doing before or shortly after launch. Each improves how a specific page reads or converts.*

---

### 13. "Professional development" is educational jargon **[readability]**

**Files:** `src/content/webinars-and-training.md`

**Current:** "Customized professional development for K–12 schools..."

**Suggested:** "Customized training for K–12 schools..." or "Workshops and training for K–12 schools..."

**Why:** "Professional development" is insider language from education. Clients from healthcare, nonprofits, or the private sector may not recognize it. "Training" works for every audience.

---

### 14. LMS is not defined **[readability]**

**File:** `src/content/accessibility-services.md`

**Current:** "Manual testing of your website, LMS, PDFs, and documents..."

**Suggested:** "Manual testing of your website, learning management system (LMS), PDFs, and documents..."

**Why:** LMS is standard in ed-tech but unfamiliar to many non-education clients. A one-time expansion costs nothing.

---

### 15. AAC is not defined **[readability]**

**File:** `src/content/why-choose-us.md`

**Current:** "She has worked directly with students who use screen readers, AAC devices, and other assistive technologies..."

**Suggested:** "She has worked directly with students who use screen readers, AAC (Augmentative and Alternative Communication) devices, and other assistive tools..."

**Why:** AAC is clinical terminology unfamiliar to school administrators, HR professionals, and most non-specialist clients.

---

### 16. "Rooted in even more years of experience" is vague **[readability]**

**File:** `src/content/our-story.md`

**Current:** "...and consulting rooted in even more years of experience."

**Suggested:** "...and consulting backed by over a decade of hands-on experience."

**Why:** "Even more years" is vague — more than what? "Over a decade" is concrete and stronger.

---

### 17. "Screen-reader ready" needs a brief explanation **[readability]**

**File:** `src/content/accessibility-services.md`

**Current:** "Making your existing PDFs, Word documents, PowerPoints, and forms fully accessible and screen-reader ready."

**Suggested:** "Making your existing PDFs, Word documents, PowerPoints, and forms fully accessible — including readable by screen readers used by people who are blind or have low vision."

**Why:** Many clients requesting PDF remediation do so for compliance reasons without knowing what a screen reader is. One phrase removes the assumption.

---

### 18. Contact page intro has a redundant sentence

**File:** `src/content/contact.md`

**Current third sentence:** "We're happy to schedule a free consultation."

**Suggested:** Remove it. The second sentence already says "schedule a free 30-minute discovery call."

**Why:** Tighter copy. The invitation is already made clearly in the sentence before it.

---

### 19. Portfolio intro opens weakly

**File:** `src/content/portfolio.md`

**Current:** "Welcome to the LC Education Consulting portfolio, where selected projects reflect our work in..."

**Suggested:** Lead with the work:
> "Each project here represents a practical, thoughtful approach to removing barriers — from accessibility audits and VPAT documentation to training and remediation."

**Why:** "Welcome to" is filler. Prospective clients scanning a portfolio want to know what they are looking at.

---

### 20. Clarify VPAT terminology to ACR

**File:** `src/content/accessibility-services.md`

**Current:** "Full WCAG 2.1 or 2.2 AA conformance documentation."

**Suggested:** "Accessibility Conformance Report (ACR/VPAT) documenting WCAG 2.1 or 2.2 AA conformance."

**Why:** A completed VPAT is officially called an Accessibility Conformance Report (ACR). Procurement teams and government clients use ACR terminology. The framing carries more weight with those audiences.

---

### 21. Reposition Apple Teacher in credentials list

**File:** `src/content/why-choose-us.md`

**Current:** Apple Teacher Certified is listed alongside NBPTS and state teaching licenses.

**Suggested:** Move it to the bottom of the credentials list. Apple Teacher is a free self-paced badge program, not a formal certification — listing it next to NBPTS and state licensure undersells the stronger credentials above it.

---

### 22. Add TalkBack to screen reader list

**File:** `src/content/accessibility-services.md`

**Current:** "Testing with NVDA, JAWS, and VoiceOver"

**Suggested:** "Testing with NVDA, JAWS, VoiceOver, and TalkBack"

**Why:** TalkBack is the primary screen reader for Android. Confirm with Laura whether she tests on Android before updating — if not, the current list is honest as-is.

---

## Needs Laura's Input

*These require content, decisions, or information that only Laura can provide.*

---

### 23. Portfolio projects have no outcomes

**File:** `src/content/portfolio.md`

**Current:** Projects are listed with a title and image only.

**Suggested:** Add 2–3 sentences per project: what the client needed, what was done, and what the result was. The intro already promises "context about the goals, approach, and impact" — the projects themselves do not deliver on that yet.

---

### 24. Webinars page has no example topics

**File:** `src/content/webinars-and-training.md`

**Suggested:** Add 2–3 example session titles under each training category — for example, under Assistive Technology: "Introduction to AAC for Classroom Teams," "Screen Readers in K–12: What Teachers Need to Know."

**Why:** Broad category names do not help a prospective client decide whether Laura is the right fit for their staff. Specific topics do.

---

### 25. Services page lacks deliverable clarity

**File:** `src/content/accessibility-services.md`

**Suggested:** Add a brief "What you receive" line per service — for example: "You'll receive a prioritized findings report with screenshots, remediation guidance, and an executive summary."

**Why:** Clients comparing vendors need to know exactly what they are buying. Deliverable clarity reduces friction before a contact.

---

### 26. Only one testimonial sitewide

**File:** `src/_data/testimonials.json`

**Suggested:** Collect 2–3 more short testimonials (2–3 sentences each) from past clients — ideally from different sectors: K–12, higher ed, and nonprofit or corporate.

**Why:** A single testimonial can read as cherry-picked. Multiple voices from different client types builds trust across all of the site's target audiences.

---

### 27. No FAQ content on the site

**Suggested:** Add a short FAQ section to the accessibility services page or a standalone page. Starting questions:

- "What is the difference between an automated scan and a manual audit?"
- "What is a VPAT, and when do I need one?"
- "Do you work with organizations outside New Jersey?"
- "How long does an accessibility audit take?"

**Why:** These are the first questions a prospective client has. Answering them on the page reduces back-and-forth before a first call and opens the door to FAQ rich results in search.

---

### 28. Hero has no option for visitors not ready to book

**File:** `src/index.md`

**Current:** Primary CTA is the calendar booking link. Secondary is "See Our Services."

**Suggested:** Add a third lower-commitment CTA — for example, a one-page PDF services overview that visitors can download without scheduling anything.

**Why:** Not every first-time visitor is ready to book a call. A soft option captures interest that would otherwise leave.

---

## Resolved

### ~~98% WebAIM stat was outdated~~ ✓ Fixed 2026-04-17

Updated to 95.9% per WebAIM Million 2026 report. Label now reads: *"of home pages had detectable WCAG failures in 2026 (WebAIM Million)"*

### ~~ADA Title II deadlines were pre-extension dates~~ ✓ Fixed 2026-04-17

Updated to April 2027 (large entities, 50,000+) / April 2028 (smaller entities) per DOJ interim final rule extending deadlines by one year.
