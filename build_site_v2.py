#!/usr/bin/env python3
"""Build the public v2 pages. Shared layout and prices have one source here."""
from html import escape
import json
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parent
SITE = ROOT / 'site-v2'
DOMAIN = 'https://wellandgoodwebsites.ca'
EMAIL = 'matt@wellandgoodwebsites.ca'
FORM = 'https://formsubmit.co/835081ce825a6a057837907299436066'
PAGES = {}


def link(text, href, style='text-link'):
    return f'<a class="{style}" href="{escape(href, quote=True)}">{text}</a>'


def action(text='Talk through your workflow', need='Agentic OS'):
    return link(text, '/contact/?need=' + quote(need), 'btn btn-primary')


def section(eyebrow, heading, body, intro='', theme='', ident=''):
    label = f'<p class="eyebrow">{eyebrow}</p>' if eyebrow else ''
    return f'''<section class="section {theme}"{f' id="{ident}"' if ident else ''}><div class="container">
<div class="section-heading">{label}<h2>{heading}</h2>{f'<p class="section-intro">{intro}</p>' if intro else ''}</div>{body}</div></section>'''


def cards(items):
    return '<div class="bento">' + ''.join(f'<div class="bento-card half"><h3>{h}</h3><p>{p}</p>{link(t, u) if t else ""}</div>' for h, p, t, u in items) + '</div>'


def steps(items, numbered=True):
    rows = ''
    for i, (heading, text) in enumerate(items, 1):
        number = f'<span class="step-number">{i:02}</span>' if numbered else ''
        rows += f'<div class="step">{number}<h3>{heading}</h3><p>{text}</p></div>'
    return f'<div class="steps{" examples" if not numbered else ""}">{rows}</div>'


def cta(heading='What keeps landing back on your desk?', text='Tell me about one recurring task, the tools involved, and where it gets stuck. We can work out whether there is a useful first step.', need='Agentic OS', label='Talk through your workflow'):
    return section('', heading, action(label, need), text, 'section-sage')


def hero(eyebrow, heading, intro, buttons='', theme=''):
    actions = f'<div class="hero-actions">{buttons}</div>' if buttons else ''
    return f'<section class="page-hero {theme}"><div class="container page-hero-inner"><p class="eyebrow">{eyebrow}</p><h1>{heading}</h1><p>{intro}</p>{actions}</div></section>'


def faq(items):
    return section('', 'Before you get started', '<div class="faq-list">' + ''.join(f'<details><summary>{q}</summary><p>{a}</p></details>' for q,a in items) + '</div>')


def page(path, title, description, body, service=None, noindex=False):
    PAGES[path] = dict(title=title, description=description, body=body, service=service, noindex=noindex)


NAV = [('/services/automation/', 'Agentic OS'), ('/services/websites/', 'Websites'), ('/services/', 'All services'), ('/work/', 'Work'), ('/about/', 'About')]
HEADER = '''<a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="container nav-shell">
<a class="brand" href="/"><span class="brand-mark"><img src="/assets/wgw-submark.webp" alt="" width="44" height="44"></span><span><span class="brand-name">Well <em>and</em> Good</span><span class="brand-descriptor">AI operations. Websites. Search.</span></span></a>
<button type="button" class="menu-toggle" data-menu-toggle aria-expanded="false" aria-controls="primary-nav" aria-label="Toggle menu">Menu</button>
<nav class="primary-nav" id="primary-nav" data-primary-nav aria-label="Primary">''' + ''.join(f'<a class="nav-link" href="{u}" data-nav-path="{u}">{t}</a>' for u,t in NAV) + link('Let’s talk', '/contact/', 'btn btn-primary nav-cta') + '</nav></div></header>'
FOOTER = '''<footer class="site-footer"><div class="container"><div class="footer-top footer-4"><div class="footer-brand"><div><strong>Well and Good</strong><p>AI operations, websites, and search. Built around the way your business works.</p><p class="footer-contact"><a href="mailto:matt@wellandgoodwebsites.ca">matt@wellandgoodwebsites.ca</a></p></div></div><nav class="footer-nav" aria-label="Services"><h2>Services</h2><ul>''' + ''.join(f'<li>{link(t,u, "")}</li>' for u,t in [('/services/automation/','Agentic OS'),('/services/websites/','Websites'),('/services/seo/','SEO'),('/services/aeo/','AI visibility')]) + '''</ul></nav><nav class="footer-nav" aria-label="Company"><h2>Company</h2><ul>''' + ''.join(f'<li>{link(t,u, "")}</li>' for u,t in [('/work/','Work'),('/about/','About'),('/engagements/','How it works'),('/contact/','Contact')]) + '''</ul></nav><nav class="footer-nav" aria-label="Website options"><h2>Website options</h2><ul>''' + ''.join(f'<li>{link(t,u, "")}</li>' for u,t in [('/one-page-websites/','One-page websites'),('/affordable-website-design/','Affordable websites'),('/web-design-niagara/','Web design Niagara')]) + '''</ul></nav></div><div class="footer-bottom"><p>Matthew Baggetta · Welland, Ontario · Serving Niagara and the GTA</p><a href="/privacy/">Privacy</a></div></div></footer>'''

WORKFLOW = '''<figure class="workflow-preview"><figcaption>How an enquiry could move through Agentic OS</figcaption><ol><li><span class="workflow-label">INCOMING</span><strong>A new enquiry arrives</strong><p>Name, request, and contact details in your inbox.</p></li><li><span class="workflow-label">PREPARED FOR YOU</span><strong>The context and draft are together</strong><p>The agent gathers relevant records, drafts a reply, and proposes the next task.</p></li><li class="approval-step"><span class="workflow-label">YOUR DECISION</span><strong>Review. Edit. Approve.</strong><p>You decide what reaches the customer.</p></li></ol><p class="workflow-caption">Illustrative workflow. The steps and permissions are agreed for your business.</p></figure>'''

HOME = '''<section class="hero"><div class="container hero-grid"><div><p class="eyebrow">Agentic OS for owner-led businesses</p><h1 class="display">AI workflows for the work <span class="accent">you keep doing by hand.</span></h1><p class="hero-intro">I build AI workflows that gather context, prepare replies, and track next steps, with you in charge.</p><div class="hero-actions">''' + action() + link('Explore Agentic OS', '/services/automation/', 'btn btn-outline light') + '''</div><p class="hero-note">Built by Matthew Baggetta in Welland. Start with one workflow.</p></div>''' + WORKFLOW + '</div></section>'
HOME += section('', 'The context, ready when you need it.', steps([
    ('An inbox becomes a briefing', 'Bring relevant messages, decisions, and follow-ups together so you can see what needs your attention.'),
    ('An enquiry becomes a prepared next step', 'Gather the details, check them against your criteria, and prepare a reply for your review.'),
    ('A meeting becomes follow-through', 'Turn the transcript into a summary and proposed tasks, with owners and decisions you can check.'),
], numbered=False), 'Agentic OS connects AI agents with your existing tools and information. Each workflow has a defined job, access limits, and a place for your approval.', 'section-paper')
HOME += section('', 'A useful first workflow beats a grand AI overhaul.', '<div class="prose"><p>We look at one recurring task, what it costs you in time, and the judgment it needs. Then I build and test a bounded workflow around it. You see what it does, where it pauses, and what happens when something goes wrong.</p><p>Some steps need AI. Others need a simple rule or a better process. The choice follows the job.</p>' + link('See how an Agentic OS engagement works', '/services/automation/#process') + '</div>', theme='section-sage')
HOME += section('Websites and search', 'The front of your business deserves the same attention.', cards([
    ('A website that helps people choose you', 'Clear services, credible work, and a direct way to call, book, or ask for a quote. Request a free website preview before deciding.', 'Explore website options', '/services/websites/'),
    ('Search built around real customer questions', 'Technical SEO, useful content, and consistent business facts for Google and AI answers from ChatGPT and Claude.', 'Explore search services', '/services/seo/'),
]), 'You can hire me for a website, a search program, or an operations workflow. Start with the part your business needs.')
HOME += section('', 'You work directly with me.', '<div class="proof-row"><div class="prose"><p>I’m Matthew Baggetta. Through Jetta Grove Consulting, I’ve worked on content and growth marketing for technology businesses. Well and Good brings that experience into websites, search, and AI operations for businesses in Niagara and the GTA.</p><p>You can see the website I built for Toronto musician Frank Baggetta, or explore how an Agentic OS workflow could handle a new enquiry.</p>' + link('Meet Matthew', '/about/') + ' · ' + link('See the work', '/work/') + '</div><img class="founder-photo" src="/assets/matt-headshot.jpg" alt="Matthew Baggetta, founder of Well and Good" width="600" height="600" loading="lazy"></div>', theme='section-paper')
HOME += cta()
page('/', 'Agentic OS, Websites and Search | Well and Good', 'Custom AI workflows that prepare routine business work for your review. Agentic OS, websites, and search with Matthew Baggetta in Niagara and the GTA.', HOME)

OPS = hero('Agentic OS', 'Routine work, ready for your judgment.', 'Connect AI agents with your business knowledge and tools to prepare routine work for your review.', action())
OPS += section('', 'Choose a job that keeps coming back.', cards([
    ('Inbox and lead intake', 'Collect enquiry details, bring relevant records together, and draft a reply against your criteria. Customer messages wait for your approval.', '', ''),
    ('Meeting follow-up', 'Prepare a summary, decisions, and proposed action items from an approved transcript. Check owners and commitments before updating the tools your team uses.', '', ''),
    ('Research and reporting', 'Gather information from agreed sources and prepare a recurring report. Keep source links with the findings so you can check them.', '', ''),
    ('Documents and business knowledge', 'Draft from your templates and approved information. Organize the context needed for recurring work so each task does not begin from scratch.', '', ''),
]), 'These are workflow examples. We agree the tools, permissions, outputs, and approval steps for your engagement.', 'section-paper')
OPS += section('', 'The agent prepares. You decide.', WORKFLOW, 'For customer communication, the system brings the draft and supporting context to you. Nothing in this example sends itself.', 'section-dark')
OPS += section('', 'Start with one workflow.', steps([
    ('Map the job', 'We walk through the task, its inputs, the tools involved, and where delays or mistakes happen. We agree what would make the work worthwhile.'),
    ('Build and test', 'I connect the agreed parts and test the normal path, missing information, and failures. Access stays limited to what the workflow needs.'),
    ('Review before rollout', 'You see the outputs and approval points before the workflow enters daily use. We agree how to stop it, check errors, and handle maintenance.'),
]), ident='process')
OPS += faq([
    ('Do I need to replace my existing tools?', 'We start with the tools you already use. Discovery checks what can connect reliably and what access is available. A specific integration is confirmed before it becomes part of the scope.'),
    ('Will an agent send messages or spend money for me?', 'Customer communication, spending, permissions, and other consequential actions require your explicit approval. Preparing the work and authorizing the action are separate steps.'),
    ('What does Agentic OS cost?', 'The cost depends on the workflow, integrations, testing, and ongoing support. The initial conversation is free. Any paid discovery or implementation is scoped and agreed before work starts.'),
    ('How do we know whether it is worth doing?', 'We agree a baseline and a useful result, then compare the tested workflow with the current process. If the task is rare, constantly changing, or mostly judgment, another approach may be a better fit.'),
    ('Is this an off-the-shelf app?', 'It is a service for designing and building workflows around your business. The scope includes the tools, responsibilities, and support arrangements you agree to.'),
]) + cta()
page('/services/automation/', 'Agentic OS and AI Workflow Automation | Well and Good', 'Custom AI workflows for intake, inboxes, research, documents, and meeting follow-up. Start with one process, with human approval at the decisions that matter.', OPS, 'Agentic OS and business workflow automation')

SERVICES = hero('Services', 'Help with the work your business depends on.', 'Agentic OS, websites, SEO, and AI visibility. Start with the service your business needs.', action())
SERVICES += section('', 'What needs to work better?', cards([
    ('Agentic OS', 'Prepare recurring work across inboxes, documents, meetings, and business tools, with the context and approval steps in place.', 'Explore Agentic OS', '/services/automation/'),
    ('Websites', 'Give customers a clear account of what you do, reasons to trust you, and a direct next step. Free previews and published website plans.', 'Explore websites', '/services/websites/'),
    ('SEO and local search', 'Improve the technical foundation, business information, and useful content behind your visibility in Google.', 'Explore SEO', '/services/seo/'),
    ('AI visibility', 'Make your services and business facts clear and consistent, then check how your business appears in answers from ChatGPT and Claude.', 'Explore AI visibility', '/services/aeo/'),
])) + cta()
page('/services/', 'Services: Agentic OS, Websites and Search | Well and Good', 'Choose a starting point for business workflow automation, a custom website, SEO, or AI visibility. Work directly with Matthew Baggetta.', SERVICES)

PLANS = [
    ('Launch', '199', '750', 'setup', '1,990', ['One-page website with mobile layout and tap-to-call', 'Google Business Profile management', 'Local SEO, AI search foundations, and citations', 'Hosting, SSL, backups, and monitoring', '4 social posts per month on 1 platform']),
    ('Grow', '699', '1,500', 'onboarding', '6,990', ['Everything in Launch', 'Standard website with a booking or quote flow', 'Active local SEO and 2 content pages per month', 'Managed social on 2 platforms, around 12 posts per month', 'Review management and a monthly report']),
    ('Dominate', '1,299', '2,500', 'onboarding', '12,990', ['Everything in Grow', 'Premium website with positioning and messaging', 'SEO and AI search work, 4 content pieces per month', 'Social on 3 to 4 platforms and weekly video', 'Monthly strategy call and a reporting dashboard']),
]

def pricing():
    body = '<div class="price-grid">'
    for name, price, setup, fee, annual, features in PLANS:
        body += f'<article class="price-card"><h3>{name}</h3><p class="price">${price}<small>/month</small></p><p class="plan-terms">Plus ${setup} {fee}. Annual plan: ${annual}.</p><ul class="check-list">' + ''.join(f'<li>{f}</li>' for f in features) + '</ul>' + action('Ask about ' + name, name) + '</article>'
    body += '</div><p class="pricing-note">Prices in CAD. Ad budget billed separately. Monthly plans can be cancelled anytime. Agentic OS is scoped separately.</p>'
    return section('', 'A website, with ongoing support for growth.', body, 'Choose the level of website, search, and content support you need. We confirm the scope and terms before you commit.', ident='plans')


def form(preview=False):
    need_options = ['Not sure yet', 'Agentic OS', 'Website preview', 'SEO and search', 'AI visibility', 'Launch', 'Grow', 'Dominate']
    fields = [('name', 'Your name', 'text', True), ('business', 'Business or organization', 'text', True), ('email', 'Email address', 'email', True), ('website', 'Website or social link (optional)', 'text', False)]
    out = f'<form class="form-grid" action="{FORM}" method="POST"><input type="hidden" name="_subject" value="Well and Good: {"website preview" if preview else "service enquiry"}"><input type="hidden" name="_template" value="table"><input type="hidden" name="_captcha" value="false"><input type="hidden" name="_next" value="{DOMAIN}/thank-you/"><input type="text" name="_honey" class="honeypot" tabindex="-1" autocomplete="off" aria-hidden="true">'
    for ident, label, kind, required in fields:
        autocomplete = {'name':'name', 'business':'organization', 'email':'email'}.get(ident,'url')
        out += f'<div class="field"><label for="{ident}">{label}</label><input id="{ident}" name="{ident}" type="{kind}" autocomplete="{autocomplete}" {"required" if required else ""}></div>'
    if preview: out += '<input type="hidden" name="need" value="Website preview">'
    else: out += '<div class="field"><label for="need">What do you need help with?</label><select id="need" name="need">' + ''.join(f'<option value="{n}">{n}</option>' for n in need_options) + '</select></div>'
    out += '<div class="field"><label for="message">' + ('What should customers be able to do on your site?' if preview else 'What keeps taking more time than it should?') + '</label><textarea id="message" name="message" rows="5"></textarea></div><button class="btn btn-primary" type="submit">' + ('Request my free website preview' if preview else 'Request a conversation') + '</button><p class="form-note">Your details are sent through FormSubmit for email delivery and used to respond to your enquiry. Read the <a href="/privacy/">privacy notice</a>.</p></form>'
    return out

WEBSITES = hero('Websites for local businesses', 'Give your next customer a clear reason to call.', 'Custom websites for Niagara and GTA businesses, with clear services, real work, and a direct way to get in touch.', link('Get a free website preview', '#preview', 'btn btn-primary') + link('See website plans', '#plans', 'btn btn-outline light'))
WEBSITES += section('', 'The useful details come first.', cards([
    ('Explain the offer', 'Plain service descriptions and useful answers help visitors decide whether you can help.', '', ''),
    ('Show real work', 'Your photos, projects, and approved customer feedback give people evidence to work with.', '', ''),
    ('Make the next step easy', 'Tap-to-call, a booking link, or a focused enquiry form, chosen for the way customers buy from you.', '', ''),
    ('Build a search foundation', 'Clear headings, relevant pages, and consistent business details help search engines understand the site.', '', ''),
]), theme='section-paper')
WEBSITES += pricing()
WEBSITES += section('', 'Need a build without a monthly plan?', '<div class="prose"><p>Published one-time options: Express $297, Starter $497, Standard $997, and Premium $1,497. We confirm the pages, content, and functionality that fit the build before you buy.</p><p>A larger site or custom integration is scoped separately.</p></div>')
WEBSITES += faq([('How does the free preview work?', 'Send your business name and a current website or social link. I prepare a private preview so you can judge the direction before deciding whether to buy. We confirm the content and permissions before publication.'), ('Can I use my existing booking system?', 'Where your platform supports it, we can link to or embed your booking flow. The integration is checked during scoping.'), ('Can you guarantee rankings or AI recommendations?', 'No. A clear, accessible website and consistent business facts provide a foundation, but Google, ChatGPT, and Claude choose their own results.')])
WEBSITES += section('', 'See the direction before you decide.', '<span id="prototype"></span><div class="contact-layout"><div class="prose"><p>Send the business name, a link, and what customers should be able to do. I’ll review the details and prepare a private preview.</p><p>No obligation to buy. Publication follows your approval.</p></div><div class="contact-panel">' + form(True) + '</div></div>', theme='section-sage', ident='preview')
page('/services/websites/', 'Custom Websites and Published Plans | Well and Good', 'Custom websites for Niagara and GTA businesses. Website and growth plans from $199/month plus setup, in CAD. Request a free website preview.', WEBSITES, 'Website design and conversion')

for path, title, heading, intro, items in [
    ('/affordable-website-design/', 'Affordable Website Design | Well and Good', 'A useful website, with the price in view.', 'Choose a one-time build or a monthly website and growth plan. You can see a free preview before you buy, and confirm the scope before work begins.', [('One-time builds', 'Published options start at $297 for Express. The right build depends on the pages, content, and functions you need.'), ('Monthly support', 'Launch starts at $199 per month plus $750 setup. Grow and Dominate add website, search, and content work.'), ('Know what you are buying', 'The website plans page puts current prices and inclusions together, so you can compare the options before contacting me.')]),
    ('/one-page-websites/', 'One-Page Websites for Local Businesses | Well and Good', 'One page. A clear next step.', 'A focused website for a business with a straightforward offer. Give visitors your services, real work, contact details, and the booking or enquiry path they need.', [('When one page works', 'One main offer, a focused service area, and a clear customer action can fit well on one page.'), ('When you need more', 'Distinct services, multiple locations, or a large catalogue usually need more room. The structure should follow what your customers need to know.'), ('Keep the essentials', 'Service details, useful photos, business information, approved reviews, and a direct way to call or book.')]),
    ('/web-design-niagara/', 'Web Design Niagara | Well and Good', 'A website that feels like your Niagara business.', 'Work directly with Matthew Baggetta in Welland on a website built around your services, your customers, and the way people contact you.', [('Make local details useful', 'Show where you work, what you offer, your hours, and how customers reach you.'), ('Show the business behind the page', 'Use real photographs, work examples, and approved reviews rather than generic claims.'), ('Make it work on a phone', 'Readable service details, tap-to-call actions, and booking links where visitors can find them.')]),
]:
    body = hero('Website options', heading, intro, link('Get a free website preview', '/services/websites/#preview', 'btn btn-primary'))
    body += section('', 'Build around the customer’s decision.', steps(items), theme='section-paper')
    body += section('', 'Compare the current website plans.', '<div class="prose"><p>One-time builds and monthly website plans are listed together, with their setup costs and inclusions.</p>' + link('See website plans and pricing', '/services/websites/#plans') + '</div>')
    body += cta('See a preview for your business.', 'Send the business name and a link. I’ll review the details before preparing a private website preview.', 'Website preview', 'Request a website preview')
    page(path, title, intro, body, 'Website design')

SEO = hero('SEO and local search', 'Be easier to find when customers need what you do.', 'Improve the pages, technical foundations, and business information behind your search visibility. See what changes through regular reporting.', action('Talk about search', 'SEO and search'))
SEO += section('', 'Build a stronger search foundation.', steps([('Technical foundations', 'Check crawlability, indexing, site structure, mobile performance, and the issues that keep useful pages from being found.'), ('Useful pages', 'Write and improve service content around real customer questions. Use clear titles, headings, and internal links.'), ('Local presence', 'Connect your website with accurate Google Business Profile details, service information, and consistent local listings.'), ('Measurement', 'Track search visibility and customer actions where tracking is available. Explain what changed and what still needs work.')]), theme='section-paper')
SEO += section('', 'Search and content work through Jetta Grove.', '<div class="prose"><p>My prior consultancy work covers SEO, content, and growth marketing for technology businesses. I bring that experience to the service pages, customer questions, and local searches that matter to your business.</p>' + link('About Matthew', '/about/') + '</div>')
SEO += faq([('Can you guarantee a ranking?', 'No. Rankings depend on the site, competition, demand, and decisions made by search engines. We agree the work and how progress will be assessed.'), ('How is this different from AI visibility?', 'SEO focuses on search visibility. AI visibility work also checks how your business is described or cited in answers from ChatGPT and Claude. Both benefit from clear, accurate information about your business.')]) + cta('Which searches matter to your business?', 'Tell me what you sell, where you work, and what your current site is doing.', 'SEO and search', 'Talk about search')
page('/services/seo/', 'SEO and Local Search in Niagara | Well and Good', 'Technical SEO, service content, local business information, and search measurement for businesses in Niagara and the GTA.', SEO, 'SEO and local search')

AEO = hero('AI visibility and AEO', 'Make your business easier to understand in AI answers.', 'Make your business facts clear and consistent, then check how you appear in answers from ChatGPT and Claude.', action('Talk about AI visibility', 'AI visibility'))
AEO += section('', 'Clear answers. Consistent facts. Observable results.', steps([('Answer useful questions', 'Explain your services, who they suit, and what a customer needs to know. Give each answer enough context to stand on its own.'), ('Connect the facts', 'Keep business details consistent across the site and relevant public profiles. Use structured data that reflects the visible content.'), ('Check what appears', 'Review agreed questions in the relevant answer engines and record citations, mentions, and descriptions separately.')]), theme='section-paper')
AEO += section('', 'A clearer source, with no citation guarantee.', '<div class="prose"><p>AI systems decide which sources to use. Content and technical improvements do not guarantee a recommendation, a ranking, or a citation.</p><p>We record what appears for the agreed questions, check whether the facts are right, and use those findings to decide what needs attention.</p></div>')
AEO += faq([('Do I need this as well as SEO?', 'That depends on how your customers look for help. We can review the relevant questions and decide whether separate AI visibility work deserves attention.'), ('What counts as progress?', 'We agree the questions and what to measure, such as whether the business is mentioned accurately, cited, or recommended. A mention alone is not a lead or a sale.')]) + cta('Find out how your business is being described.', 'Start with your services and the questions customers ask before buying.', 'AI visibility', 'Talk about AI visibility')
page('/services/aeo/', 'AEO and AI Visibility for ChatGPT and Claude | Well and Good', 'Clear service content, consistent business facts, and measurement of AI answers. AEO for Niagara and GTA businesses, with no promise of recommendations.', AEO, 'AEO and AI visibility')

ENGAGEMENTS = hero('How it works', 'Agree the job before building the system.', 'Work directly with me to identify the problem, agree the scope, and choose a useful first step.', action())
ENGAGEMENTS += section('', 'The process follows the work.', steps([('Agentic OS', 'Map one recurring workflow, define the access and approval points, and agree the implementation and testing scope. Ongoing monitoring and support are agreed separately.'), ('Website', 'Request a free preview, then choose the build and confirm the content. Monthly website plans and one-time options have published prices.'), ('Search and AI visibility', 'Review the current site and business goals. Agree the technical, content, and measurement work based on the market and available evidence.')]), theme='section-paper')
ENGAGEMENTS += faq([('What is free?', 'The initial conversation is free. Website previews are also offered without an obligation to buy. Any paid discovery, implementation, or ongoing work is agreed before it starts.'), ('Can I start with one workflow?', 'Yes. A specific recurring task gives us a manageable place to test usefulness before expanding.'), ('What determines the price?', 'Scope, integrations, content, testing, and ongoing responsibilities. Website plan prices are published; Agentic OS and standalone search work are scoped to the engagement.')]) + cta()
page('/engagements/', 'How Engagements Work | Well and Good', 'How we scope Agentic OS, website, and search work. A free initial conversation, clear responsibilities, and agreement before paid work starts.', ENGAGEMENTS)

ABOUT = hero('About Matthew Baggetta', 'Work with the person doing the work.', 'I’m Matthew Baggetta in Welland. I build websites and AI workflows, and improve search visibility for Niagara and GTA businesses.', action('Let’s talk', 'Not sure yet'))
ABOUT += section('', 'From content and growth to the systems behind the work.', '<div class="proof-row"><div class="prose"><p>Through Jetta Grove Consulting, I worked on content and growth marketing for technology businesses across the US and beyond. That work taught me to connect the words on a page to the customer’s next decision.</p><p>Today, that same attention goes into the operations behind a business: how an enquiry is understood, how a reply gets prepared, and how a decision becomes a next step.</p><p>I build the website or workflow around the job it needs to do. You have one person to discuss the work with, make decisions with, and hold accountable.</p>' + link('See the work', '/work/') + '</div><img class="founder-photo" src="/assets/matt-headshot.jpg" alt="Matthew Baggetta" width="600" height="600" loading="lazy"></div>', theme='section-paper')
ABOUT += section('', 'Make the work useful and understandable.', steps([('Start with the job', 'Understand the task and the people involved before choosing a tool.'), ('Make the boundaries clear', 'Agree what the system can access and where it needs a person to decide.'), ('Show what changed', 'Review the actual page, workflow, or output together. Be clear about what the evidence does and does not show.')])) + cta()
page('/about/', 'About Matthew Baggetta | Well and Good', 'Meet Matthew Baggetta in Welland. Website, search, and AI workflow work informed by his prior content and growth consultancy experience.', ABOUT)

WORK = hero('Selected work', 'See what I’ve built.', 'A live client website, examples of website design, and the consultancy experience behind the work.', link('Discuss your project', '/contact/', 'btn btn-primary'))
WORK += section('Live website client', 'Frank Baggetta', '<div class="proof-row"><div class="prose"><p>A website for a Toronto musician, bringing performance videos, photographs, services, and a clear enquiry path together.</p>' + link('View Frank’s live site', 'https://frankbaggetta.ca/') + ' · ' + link('Read about the website', '/frank-baggetta/') + '</div><img src="/assets/frankbaggetta-preview.webp" alt="Frank Baggetta website design" width="1200" height="800" loading="lazy"></div>', theme='section-paper')
WORK += section('', 'Design examples for local businesses.', '<div class="bento"><article class="bento-card half"><img src="/assets/jk-motors-preview.png" alt="JK Motors auto-repair website concept" width="1200" height="800" loading="lazy"><p class="concept-label">Concept build</p><h3>JK Motors</h3><p>Repair services, business details, and a clear call-first layout. A design concept, not a client engagement.</p>' + link('View the concept', 'https://immeasurablematt.github.io/jk-motors/') + '</article><article class="bento-card half"><img src="/assets/evelyns-sandwich-factory-preview.png" alt="Evelyn’s Sandwich Factory website concept" width="1200" height="800" loading="lazy"><p class="concept-label">Concept build</p><h3>Evelyn’s Sandwich Factory</h3><p>A phone-friendly menu, hours, location, and ordering path. A design concept, not a client engagement.</p>' + link('View the concept', 'https://immeasurablematt.github.io/evelyns-sandwich-factory/') + '</article></div>')
WORK += section('', 'Jetta Grove Consulting', '<div class="prose"><p>My earlier work through Jetta Grove covered SEO, content, and growth marketing for technology businesses. This is prior consultancy experience, separate from Well and Good client work.</p>' + link('Visit Jetta Grove', 'https://www.jettagrove.com/') + '</div>', theme='section-sage')
WORK += section('', 'See how an enquiry could become a prepared reply.', '<div class="prose"><p>Explore an illustrative workflow from the first enquiry to a draft reply, with the supporting context and a place for you to review the next step.</p>' + link('Explore the workflow', '/services/automation/') + '</div>') + cta()
page('/work/', 'Client Website and Design Concepts | Well and Good', 'Frank Baggetta’s live website, clearly labelled local-business design concepts, and Matthew Baggetta’s prior Jetta Grove consultancy experience.', WORK)
page('/frank-baggetta/', 'Frank Baggetta Website | Well and Good', 'A live website for Toronto musician Frank Baggetta, bringing his performances, services, and contact path together.', hero('Live website client', 'A website for the performance, and the enquiry.', 'Frank Baggetta’s site brings his music, photographs, and service details together so people can understand his work and get in touch.', link('Visit frankbaggetta.ca', 'https://frankbaggetta.ca/', 'btn btn-primary')) + section('', 'Help visitors decide, then enquire.', '<div class="proof-row"><div class="prose"><p>The site presents performance videos, information about events, and a direct contact path.</p><p>Visitors can hear Frank perform, explore his services, and get in touch about their event.</p>' + link('See more work', '/work/') + '</div><img src="/assets/frankbaggetta-preview.webp" alt="Frank Baggetta website" width="1200" height="800" loading="lazy"></div>', theme='section-paper') + cta('Have a website in mind?', 'See a private preview before deciding whether to buy.', 'Website preview', 'Request a website preview'))

CONTACT = hero('Contact', 'Let’s talk about the work.', 'Share a recurring task, website idea, or search problem. I’ll reply personally to discuss a useful next step.', theme='contact-hero')
CONTACT += '<section class="section section-paper contact-section" id="book"><div class="container contact-layout enquiry-layout"><div class="contact-panel">' + form() + '</div><div class="prose contact-guidance"><h2>What to include</h2><p>For Agentic OS, describe one task, the tools it touches, and where you get stuck. For a website, send a link and what customers should be able to do.</p><p>The initial conversation is free. This form sends an enquiry; I’ll reply to arrange a time or ask for the details needed to help.</p><p>Prefer email? <a href="mailto:' + EMAIL + '">' + EMAIL + '</a></p></div></div></section>'
page('/contact/', 'Contact Matthew Baggetta | Well and Good', 'Discuss an Agentic OS workflow, request a website preview, or ask about search. A free initial conversation with Matthew Baggetta.', CONTACT)
page('/thank-you/', 'Thank You | Well and Good', 'Thank you for contacting Well and Good. Matthew will review your enquiry and reply personally.', hero('Thank you', 'Thanks for getting in touch.', 'I’ll review the details and reply personally. If you requested a website preview, I’ll check the business information first. For Agentic OS, we’ll start with the workflow you described.', link('Explore the services', '/services/', 'btn btn-primary')) + section('', 'See the work and the approach.', link('See the work', '/work/') + ' · ' + link('How engagements work', '/engagements/')), noindex=True)
page('/404.html', 'Page Not Found | Well and Good', 'Find Well and Good’s services, work, and contact details.', hero('Page not found', 'That page is not here.', 'The link may have changed. Explore the services or contact me if you need a hand finding something.', link('Go to the homepage', '/', 'btn btn-primary') + link('Contact Matthew', '/contact/', 'btn btn-outline light')), noindex=True)

# Preserve the existing privacy wording. The public contact address is aligned.
privacy_path = ROOT / 'content/privacy.html'
privacy_source = privacy_path.read_text()
privacy_main = privacy_source
privacy_main = privacy_main.replace('baggetta@gmail.com', EMAIL)
page('/privacy/', 'Privacy Notice | Well and Good', 'How Well and Good handles the information you submit through this website.', privacy_main)


def render(path, data):
    business = {'@type':'ProfessionalService', '@id':DOMAIN+'/#business', 'name':'Well and Good', 'url':DOMAIN+'/', 'email':EMAIL, 'founder':{'@type':'Person','name':'Matthew Baggetta'}, 'areaServed':['Niagara Region, Ontario','Greater Toronto Area, Ontario']}
    graph = [business, {'@type':'WebPage','@id':DOMAIN+path+'#page','url':DOMAIN+path,'name':data['title']}]
    if data['service']: graph.append({'@type':'Service','name':data['service'],'provider':{'@id':DOMAIN+'/#business'},'url':DOMAIN+path})
    meta = escape(data['description'],quote=True);title = escape(data['title'],quote=True)
    return f'''<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>{title}</title>
<meta name="description" content="{meta}"><meta name="robots" content="{'noindex,nofollow' if data['noindex'] else 'index,follow'}"><link rel="canonical" href="{DOMAIN}{path}">
<meta property="og:type" content="website"><meta property="og:site_name" content="Well and Good"><meta property="og:title" content="{title}"><meta property="og:description" content="{meta}"><meta property="og:url" content="{DOMAIN}{path}"><meta property="og:image" content="{DOMAIN}/assets/wgw-logo-primary.png">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{title}"><meta name="twitter:description" content="{meta}"><meta name="twitter:image" content="{DOMAIN}/assets/wgw-logo-primary.png">
<link rel="icon" type="image/png" href="/icons/favicon-32x32.png"><link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,650;9..144,760;9..144,850&family=Inter:wght@500;600;700;800;900&display=swap" rel="stylesheet"><link rel="stylesheet" href="/styles.css?v=20260906c">
<script type="application/ld+json">{json.dumps({'@context':'https://schema.org','@graph':graph}, ensure_ascii=False)}</script><script>window.va=window.va||function(){{(window.vaq=window.vaq||[]).push(arguments)}};</script><script defer src="/_vercel/insights/script.js"></script><script defer src="/site.js?v=20260906b"></script></head>
<body>{HEADER}<main id="main">{data['body']}</main>{FOOTER}</body></html>
'''


if __name__ == '__main__':
    for path, data in PAGES.items():
        dest = SITE / (path.lstrip('/') + ('index.html' if path.endswith('/') else ''))
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(render(path, data))
    locations = ''.join(f'<url><loc>{DOMAIN}{path}</loc></url>' for path,data in PAGES.items() if not data['noindex'])
    (SITE/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+locations+'</urlset>\n')
    (SITE/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: '+DOMAIN+'/sitemap.xml\n')
    (SITE/'llms.txt').write_text('# Well and Good\n\nWell and Good is run by Matthew Baggetta in Welland, serving Niagara and the GTA. Services include Agentic OS, custom websites, SEO, and AI visibility. Agentic OS is a custom workflow service with agreed access limits and human approval. Workflow examples are illustrative, not measured client results. Frank Baggetta is a live website client. JK Motors and Evelyn\'s Sandwich Factory are concept builds. Jetta Grove is prior consultancy experience.\n\n'+ '\n'.join(f'- [{data["title"]}]({DOMAIN}{path})' for path,data in PAGES.items() if not data['noindex'])+'\n')
    print(f'Built {len(PAGES)} pages in {SITE}')
