"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle2,
  Play,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";

// ── types ──────────────────────────────────────────────────────────────────
type Level = "Beginner" | "Intermediate" | "Advanced";
type Platform = "Discord" | "Telegram" | "Both";

interface UseCase {
  id: string;
  num: string;
  level: Level;
  platform: Platform;
  title: string;
  bestFor: string;
  what: string;
  steps: string[];
  prompt: string;
  mistakes: [string, string][];
}

// ── use case data ──────────────────────────────────────────────────────────
const USE_CASES: UseCase[] = [
  {
    id: "uc-01",
    num: "01",
    level: "Beginner",
    platform: "Both",
    title: "Top 10 News in Your Niche Every Morning",
    bestFor: "People who want a morning briefing without opening ten apps",
    what: "Hermes collects the latest news on a topic you choose and posts a short summary every morning to Discord or Telegram.",
    steps: [
      "Pick a specific niche (e.g. AI tools, fintech, gaming)",
      "Choose two or three news sources or RSS feeds to watch",
      "Set a morning delivery time (e.g. 8 AM daily)",
      "Tell Hermes which channel or chat to post the digest",
    ],
    prompt: "Every morning at 8 AM, collect the top 10 news items about AI agents and summarize them in 1 sentence each for Discord.",
    mistakes: [
      ["Using too many news sources", "More sources means more noise. Start with two or three well-known sources and add more only when the digest feels thin."],
      ["Not narrowing the niche enough", "Broad topics like 'tech news' produce too many irrelevant results. Be specific: 'AI startup funding' or 'open source AI tools' works better."],
      ["Writing a vague prompt", "A vague prompt produces a vague digest. Tell Hermes exactly what you want — topic, format, length, and destination channel."],
    ],
  },
  {
    id: "uc-02",
    num: "02",
    level: "Beginner",
    platform: "Both",
    title: "Weather Briefing with Outfit Suggestion",
    bestFor: "Daily personal reminders and anyone who hates checking multiple apps",
    what: "Hermes sends the day's weather and a simple outfit suggestion every morning so you leave the house prepared.",
    steps: [
      "Set your city or location in Hermes",
      "Pick a daily send time before you usually leave home",
      "Ask for a plain-English weather summary and outfit tip",
      "Send it to a private Telegram chat or a personal Discord channel",
    ],
    prompt: "Every morning at 7 AM send today's weather, rain chance, high and low temperature, and a simple outfit suggestion to my Telegram.",
    mistakes: [
      ["Forgetting to set the city name", "Hermes needs a specific location. Include the city name in your prompt or store it in the config — otherwise it will guess or fail."],
      ["Asking for too much weather data", "Sunrise time, UV index, and pollen count are useful but overwhelming. Start with temperature, rain chance, and outfit tip. Add more later if you want."],
      ["Scheduling it too late in the day", "A weather briefing sent at noon is useless. Set it at least one hour before you normally leave home."],
    ],
  },
  {
    id: "uc-03",
    num: "03",
    level: "Beginner",
    platform: "Both",
    title: "Daily Calendar and Agenda Summary",
    bestFor: "Busy people and students who want to start the day focused",
    what: "Hermes posts the day's scheduled events in a short, clean summary so you never miss a meeting or appointment.",
    steps: [
      "Connect your calendar source to Hermes",
      "Set a weekday morning delivery time (e.g. 7:30 AM)",
      "Ask for a short list of events and the time of the first meeting",
      "Choose a private channel to keep calendar details off public channels",
    ],
    prompt: "Every weekday at 7:30 AM, send today's calendar events and my first meeting time to my private Discord channel. Keep it under five lines.",
    mistakes: [
      ["Posting calendar details in a public channel", "Meetings, client names, and personal appointments should go to a private channel only. Check the destination before saving the config."],
      ["Forgetting timezone settings", "If Hermes posts the wrong times, it is almost always a timezone mismatch. Set your timezone explicitly in the prompt or config."],
      ["Making the summary too long", "A ten-item event list at 7 AM is hard to read. Ask Hermes to limit it to the five most important events of the day."],
    ],
  },
  {
    id: "uc-04",
    num: "04",
    level: "Beginner",
    platform: "Discord",
    title: "GitHub PR and Issue Digest",
    bestFor: "Developers and small teams who want daily repo awareness without constant notifications",
    what: "Hermes summarizes open pull requests, new issues, and blocked reviews from your repository and posts them each morning.",
    steps: [
      "Decide which GitHub repository to watch",
      "Choose a Discord channel for the development team",
      "Ask for a compact summary of open PRs, new issues, and anything blocked",
      "Set a morning delivery time for the team to see before stand-up",
    ],
    prompt: "Each morning at 9 AM send open PRs, new issues, and blocked reviews from my main repo into the #dev-updates Discord channel. Keep each item to one line.",
    mistakes: [
      ["Watching too many repos at once", "One repo per digest is much easier to scan. If you have multiple repos, create one digest per repo and post to different channels."],
      ["Posting raw data instead of a summary", "Hermes should summarize, not dump. Ask it to write one sentence per PR or issue, not paste the full ticket body."],
      ["Missing repo access permissions", "If Hermes cannot see your repo, it will return an empty result or an error. Make sure the access token used has read access to the repository."],
    ],
  },
  {
    id: "uc-05",
    num: "05",
    level: "Beginner",
    platform: "Telegram",
    title: "Lead Follow-Up Reminders for Freelancers",
    bestFor: "Freelancers and solo agencies who forget to follow up with potential clients",
    what: "Hermes checks your lead list and reminds you which leads need a follow-up message this week.",
    steps: [
      "Keep a simple lead list with names, status, and last contact date",
      "Set follow-up intervals for each lead stage (e.g. 3 days, 1 week)",
      "Send reminders to a private Telegram chat — never a public one",
      "Update the list each time you reach out so Hermes tracks the right dates",
    ],
    prompt: "Every Monday morning remind me which leads need a follow-up this week. Include the lead name, last contact date, and next step. Send to my private Telegram.",
    mistakes: [
      ["Using a public channel for private lead info", "Client names and deal status are private. Always use a personal chat or private group — never a public server channel."],
      ["Not tagging lead status clearly", "If every lead is marked 'in progress' Hermes cannot tell which ones are cold. Use clear labels: new, replied, hot, closed."],
      ["Forgetting to update completed leads", "If you close a deal or remove a lead, update the list. Old leads that stay active in the list will keep appearing in reminders."],
    ],
  },
  {
    id: "uc-06",
    num: "06",
    level: "Beginner",
    platform: "Both",
    title: "Customer Support FAQ Helper",
    bestFor: "Small businesses and community managers who answer the same questions every day",
    what: "Hermes suggests pre-approved answers to common customer questions in Discord or Telegram, reducing the time you spend on repeated support.",
    steps: [
      "Collect the top ten questions your customers ask most often",
      "Write or approve short, clear answers for each one",
      "Tell Hermes to match incoming questions against the FAQ list",
      "Keep the responses polite, short, and consistent",
    ],
    prompt: "When a customer asks about pricing, reply with the approved FAQ answer and include a link to the pricing page. Keep the reply under three sentences.",
    mistakes: [
      ["Letting Hermes guess sensitive policy answers", "For questions about refunds, legal terms, or account access, always use only pre-approved answers. Never let Hermes improvise on policies."],
      ["Skipping an approved answer list", "Without a reference list, Hermes will give generic answers that may contradict your actual policies. Build the FAQ list first."],
      ["Making replies sound too robotic", "Review the approved answers before using them. A reply that reads like a legal document will frustrate customers. Keep the tone human and direct."],
    ],
  },
  {
    id: "uc-07",
    num: "07",
    level: "Intermediate",
    platform: "Discord",
    title: "Discord Welcome and Onboarding Bot",
    bestFor: "Community builders and creators who want new members to feel welcomed automatically",
    what: "Hermes posts a friendly welcome message when someone new joins and shows them the most important channels and rules — without you having to do it manually every time.",
    steps: [
      "Set up a dedicated welcome channel in your Discord server",
      "Write a short, warm welcome message with the server name and purpose",
      "Add a three-step checklist: introduce yourself, read the rules, join a channel",
      "Tell Hermes to trigger this when a new member joins",
    ],
    prompt: "When a new member joins the server, post a friendly welcome message in #welcome with the three most important server rules and links to #introductions and #rules.",
    mistakes: [
      ["Writing a welcome message that is too long", "A wall of text is the last thing a new member wants to read. Keep it to a name, one line about the server, and three action steps."],
      ["Not linking the important channels", "Tell new members exactly where to go. Include clickable channel links in the welcome message, not just channel names."],
      ["Using a cold or robotic tone", "New members decide in seconds whether they want to stay. Make the welcome message feel human and friendly, not like a legal disclaimer."],
    ],
  },
  {
    id: "uc-08",
    num: "08",
    level: "Intermediate",
    platform: "Telegram",
    title: "Telegram Community Assistant",
    bestFor: "Telegram group admins and hobby community owners who want light automation without full moderation bots",
    what: "Hermes posts weekly announcements, answers basic questions using the pinned FAQ, and sends event reminders to keep the group active.",
    steps: [
      "Add Hermes to your Telegram group as a member",
      "Pin the group FAQ so Hermes can reference it",
      "Decide what the bot is allowed to post (events, reminders, answers)",
      "Start simple — one scheduled announcement per week before adding more",
    ],
    prompt: "In my Telegram group, post a weekly reminder every Sunday at 6 PM about the upcoming Monday event. Also answer basic questions using the pinned FAQ.",
    mistakes: [
      ["Giving the bot too many permissions at once", "Start with just message permissions. Add admin features only when you are confident the automations work correctly."],
      ["Forgetting to pin the FAQ", "If the FAQ is not pinned, Hermes may not find or use it reliably. Pin the message and reference it explicitly in the bot config."],
      ["Posting too often and annoying the group", "An assistant that posts five times a day feels like spam. Start with one scheduled message per week and increase only if the group asks for more."],
    ],
  },
  {
    id: "uc-09",
    num: "09",
    level: "Intermediate",
    platform: "Both",
    title: "RSS and Blog Roundup",
    bestFor: "Readers and researchers who follow several blogs or newsletters",
    what: "Hermes watches a list of RSS feeds or blogs and posts a daily or weekly roundup of the most interesting new articles.",
    steps: [
      "Choose three to five RSS feeds or blogs to follow",
      "Pick a summary format: headline only, one-sentence summary, or short paragraph",
      "Set how often to check for new posts (daily or weekly works well)",
      "Tell Hermes to skip duplicate stories it already posted",
    ],
    prompt: "Every morning scan these three RSS feeds and post the five most important new articles in Telegram. Write one sentence summary for each and skip anything posted in the last 24 hours.",
    mistakes: [
      ["Watching feeds that are too noisy", "High-volume news sites can produce fifty items a day. Limit the feed list to focused sources and filter by keyword if needed."],
      ["Not summarizing enough", "Posting only headlines gives no context. Ask Hermes for a one-sentence summary so readers know whether to click."],
      ["Duplicating the same story every day", "Without deduplication, the same popular article can appear in the roundup for days. Tell Hermes to skip anything it already posted in the last 24 hours."],
    ],
  },
  {
    id: "uc-10",
    num: "10",
    level: "Intermediate",
    platform: "Both",
    title: "Reddit and Forum Digest",
    bestFor: "People who follow niche communities but do not want to scroll through entire forums",
    what: "Hermes summarizes the best threads from a subreddit or forum and posts a short digest so you catch the important discussions without opening the site.",
    steps: [
      "Choose one or two subreddits or forums to watch",
      "Define what a 'good post' looks like for you (score threshold, keyword filter)",
      "Ask for a short evening digest — one line per thread",
      "Set the delivery time to a low-activity period so it does not get buried",
    ],
    prompt: "Every evening at 8 PM, post the top 5 threads from r/productivity with a one-line summary each. Only include posts with more than 50 upvotes.",
    mistakes: [
      ["Choosing a subreddit with too much spam", "Low-quality or meme-heavy subreddits will flood the digest with noise. Pick focused communities with clear topic rules."],
      ["Posting the raw thread text", "Long forum posts are hard to read in a chat channel. Always ask Hermes to compress each thread to one sentence."],
      ["Not filtering by quality", "Without a minimum upvote or engagement filter, the digest will include brand-new posts with no community validation. Set a threshold."],
    ],
  },
  {
    id: "uc-11",
    num: "11",
    level: "Intermediate",
    platform: "Both",
    title: "Product Price Tracker and Deal Alerts",
    bestFor: "Shoppers and deal hunters who are waiting for a price drop on specific items",
    what: "Hermes watches a product or a short list of products and sends an alert the moment the price drops below your target.",
    steps: [
      "Pick the products you want to track (keep the list short to start)",
      "Set a price threshold for each item",
      "Choose a private chat for the alerts so deal messages stay organized",
      "Ask Hermes to include the product link and current price in every alert",
    ],
    prompt: "Alert me in Discord when this product drops below $100. Include the current price, the product link, and whether it is a sale or a regular price drop.",
    mistakes: [
      ["Watching too many products at once", "A list of fifty products is hard to maintain and produces noisy alerts. Track five to ten items and remove ones you are no longer interested in."],
      ["Setting the wrong price threshold", "If the threshold is too close to the current price, you will get constant alerts for small fluctuations. Set it at a price you would actually buy at."],
      ["Missing shipping or tax in the final price", "A great-looking deal can disappear when shipping is added. Ask Hermes to note whether the price includes delivery or is subject to tax."],
    ],
  },
  {
    id: "uc-12",
    num: "12",
    level: "Intermediate",
    platform: "Both",
    title: "Crypto or Stock Watch Brief",
    bestFor: "Market watchers and casual traders who want a morning overview without information overload",
    what: "Hermes posts a short daily briefing with price changes for the assets you follow plus a headline from market news.",
    steps: [
      "Pick three to five assets to track",
      "Set a weekday morning delivery time (before market open works well)",
      "Ask for percentage change, current price, and one headline",
      "Keep the format simple — one line per asset",
    ],
    prompt: "Every weekday at 8 AM send a short crypto watch brief with price changes for BTC, ETH, and SOL, plus the top market headline. One line per asset.",
    mistakes: [
      ["Treating the summary as financial advice", "Hermes gives information, not investment guidance. Never make buy or sell decisions based solely on an automated digest."],
      ["Watching too many assets at once", "A twenty-asset daily digest becomes hard to act on. Stick to the assets you actually care about and monitor a focused list."],
      ["Asking for too many technical indicators early on", "RSI, MACD, and Bollinger Bands can wait. Start with price, daily change, and one news headline. Add more when you know what you need."],
    ],
  },
  {
    id: "uc-13",
    num: "13",
    level: "Intermediate",
    platform: "Both",
    title: "Job Alert Digest",
    bestFor: "Job seekers who want new opportunities delivered without checking job boards every day",
    what: "Hermes filters job listings by your saved criteria and sends a daily or weekly digest of the newest matches.",
    steps: [
      "Define your filters: job title, location, remote or on-site, salary range",
      "Choose daily or weekly delivery (daily works best for active searches)",
      "Send to a private channel — not a shared team channel",
      "Ask Hermes to flag jobs that exactly match all criteria versus partial matches",
    ],
    prompt: "Every evening send me the newest remote product manager roles in Southeast Asia that match my experience level. Include the company, location, and link for each.",
    mistakes: [
      ["Leaving the filters too broad", "A filter for 'manager' will return hundreds of irrelevant roles. Be specific: job title, seniority level, industry, and whether remote is required."],
      ["Posting old listings again and again", "Job digests without deduplication will show the same listings every day. Ask Hermes to skip any listing it has already sent in the last seven days."],
      ["Forgetting to check location rules", "Remote-friendly postings often still have location restrictions for tax or legal reasons. Ask Hermes to include the hiring location in every result."],
    ],
  },
  {
    id: "uc-14",
    num: "14",
    level: "Intermediate",
    platform: "Both",
    title: "Meeting Notes Summary to Discord or Telegram",
    bestFor: "Teams and solo operators who want clean action items from messy meeting notes",
    what: "You paste your meeting notes into Hermes and it turns them into a short summary and a clear action item list, then posts them to the right channel.",
    steps: [
      "After a meeting, copy your raw notes into a message or file",
      "Ask Hermes to produce a five-bullet summary and extract all action items",
      "Tell it which channel to post the action items to",
      "Assign owners to each task before posting or ask Hermes to highlight unassigned items",
    ],
    prompt: "Turn these meeting notes into a 5-bullet summary and a numbered action item list. Post the action items to #team-updates in Discord and flag any tasks with no assigned owner.",
    mistakes: [
      ["Sharing confidential notes in a public channel", "Meeting notes often contain sensitive business information. Always post to a private or team-restricted channel."],
      ["Letting the summary get too long", "Ask Hermes to keep the summary to five bullets. If the notes are long, ask for the three most important decisions only."],
      ["Forgetting to assign task owners", "A list of actions with no names attached is difficult to follow up on. Either assign owners yourself or ask Hermes to flag any unassigned item."],
    ],
  },
  {
    id: "uc-15",
    num: "15",
    level: "Intermediate",
    platform: "Both",
    title: "Daily Content Ideas and Scheduling Prompt",
    bestFor: "Creators and marketers who need a fresh starting point every day without spending an hour brainstorming",
    what: "Hermes delivers one or two content ideas every morning, tailored to your topic and audience, so you always have something to create.",
    steps: [
      "Tell Hermes your content topic and target audience",
      "Set a daily morning delivery time",
      "Ask for one main idea plus one backup idea, each with a suggested hook",
      "Keep the format short — headline + one sentence is enough",
    ],
    prompt: "Every morning send me two content ideas for my tech channel. Include a suggested hook for each. Keep it to two lines per idea.",
    mistakes: [
      ["Asking for ten ideas when you only need one", "More ideas do not mean better output. Two focused ideas are more actionable than a ten-item brainstorm list you will ignore."],
      ["Making the prompt too broad", "A prompt that says 'give me content ideas' returns generic results. Include your niche, audience, and platform in the prompt for relevant suggestions."],
      ["Not tailoring ideas to the audience", "Content that works on Twitter may not work on YouTube. Tell Hermes which platform the content is for so the format and hook style match."],
    ],
  },
  {
    id: "uc-16",
    num: "16",
    level: "Intermediate",
    platform: "Telegram",
    title: "Habit Tracker and Accountability Check-In",
    bestFor: "Personal productivity and anyone building a new routine who wants a lightweight check-in without a full habit app",
    what: "Hermes checks in on your habits at a set time each day, records your answer, and keeps a simple running log you can review.",
    steps: [
      "Pick one or two habits to track (not five — start small)",
      "Set a daily check-in time after you would normally complete them",
      "Keep the reply format simple: yes, partial, or no",
      "Ask Hermes to log the answer and give a short weekly summary on Sundays",
    ],
    prompt: "Every night at 9 PM ask me whether I completed my workout and my reading goal. Log the answer and send me a weekly summary every Sunday morning in Telegram.",
    mistakes: [
      ["Trying to track too many habits at once", "More than two or three check-ins per day becomes a chore and you will start ignoring them. Start with one habit and add more after two weeks."],
      ["Making the check-in feel like homework", "A long-form check-in at 9 PM is hard to maintain. Keep the question short and the expected answer simple — yes or no is enough to start."],
      ["Forgetting to keep the answers consistent", "If you answer 'yes', 'done', 'completed' on different days, Hermes may have trouble tracking trends. Decide on a format and stick to it."],
    ],
  },
  {
    id: "uc-17",
    num: "17",
    level: "Advanced",
    platform: "Both",
    title: "Research Brief and Competitor Scan",
    bestFor: "Founders, analysts, and builders who need a regular summary of their competitive landscape",
    what: "Hermes scans sources on a schedule and generates a short, structured research brief covering topics, competitors, or market changes you define.",
    steps: [
      "Define the research topic or competitor set clearly",
      "Tell Hermes what comparison points matter most (pricing, product, positioning)",
      "Ask for a clean summary with key takeaways — not a dump of raw data",
      "Schedule it weekly or bi-weekly rather than daily to keep quality high",
    ],
    prompt: "Every Friday send a competitor brief on the top 3 companies in my niche. Include any pricing changes, new product launches, and major news in the last 7 days. Post to my private Discord channel.",
    mistakes: [
      ["Making the research question too big", "Asking Hermes to 'research the entire AI market' will produce a shallow result. Pick three to five companies or a narrow topic and go deep."],
      ["Not naming the comparison points", "Without specific dimensions to compare, Hermes will summarize randomly. Tell it exactly what matters: pricing, feature changes, team news, or launches."],
      ["Reusing stale sources forever", "Data sources go stale. Review and refresh your source list monthly so the brief stays relevant and accurate."],
    ],
  },
  {
    id: "uc-18",
    num: "18",
    level: "Advanced",
    platform: "Discord",
    title: "Incident and Status Page Watcher",
    bestFor: "Developers and ops teams who need fast alerts when a third-party service goes down",
    what: "Hermes watches a service status page and sends an immediate Discord alert when an outage, degradation, or incident is reported.",
    steps: [
      "Pick the service or services you depend on (e.g. your cloud host, payment provider)",
      "Set the alert condition: outage only, or also degraded performance",
      "Send alerts to a fast-moving ops channel — not a general channel",
      "Test the alert route by simulating a known status event before going live",
    ],
    prompt: "Watch the status page for this service and send me a Discord alert immediately if there is an outage or degraded performance. Include the incident title and the affected services.",
    mistakes: [
      ["Alerting too often for low-priority events", "If every minor maintenance window triggers an alert, the channel becomes noisy and people stop reading it. Filter to critical and major incidents only."],
      ["Forgetting to test the alert route", "Set up a test event before you rely on this in production. Many alert setups have correct config but fail silently when an actual event happens."],
      ["Sending alerts to the wrong channel", "Incident alerts in a general or public channel create panic. Use a dedicated #incidents or #ops channel and control who has access."],
    ],
  },
  {
    id: "uc-19",
    num: "19",
    level: "Advanced",
    platform: "Both",
    title: "Study Buddy and Learning Coach Workflow",
    bestFor: "Students and self-learners who want structured daily reminders and active recall practice",
    what: "Hermes sends study reminders, generates quiz questions based on recent material, and tracks your progress over time through a daily check-in.",
    steps: [
      "Define the subject and the current lesson or topic",
      "Set a study reminder time and a separate evening quiz time",
      "Ask Hermes to generate one quiz question per session and give feedback on the answer",
      "Ask for a weekly progress summary and areas to revisit",
    ],
    prompt: "Every evening at 8 PM quiz me on today's lesson topic. Give me one question, wait for my answer, then give feedback and one follow-up question. Keep the tone encouraging.",
    mistakes: [
      ["Making the quiz too hard at first", "Starting with advanced questions leads to frustration. Tell Hermes the difficulty level and the material covered so far — let it calibrate to where you are."],
      ["Setting an unrealistic study schedule", "A daily one-hour quiz at 10 PM is hard to maintain. Start with a short five-minute check-in and build the habit first."],
      ["Forgetting to keep the tone supportive", "A cold or overly critical tone makes learning feel like a test. Tell Hermes to be encouraging and frame mistakes as learning moments."],
    ],
  },
  {
    id: "uc-20",
    num: "20",
    level: "Advanced",
    platform: "Both",
    title: "Advanced Multi-Step Automation Pipeline",
    bestFor: "Power users and builders who want to chain multiple workflows into a single automated sequence",
    what: "You build a pipeline where Hermes completes several steps in order: collecting data, filtering or sorting it, summarizing the output, and posting only the final result to a channel.",
    steps: [
      "Break your goal into three to four discrete stages (collect, filter, summarize, post)",
      "Build and test each stage individually before connecting them",
      "Define clear success criteria for each stage so failures are easy to spot",
      "Start with a simple two-stage pipeline and add complexity only after the basics work",
    ],
    prompt: "Every morning: collect AI news from three sources, filter out anything published more than 24 hours ago, summarize the top 5 items in one sentence each, and post only the final digest to #ai-news in Discord. Skip duplicates.",
    mistakes: [
      ["Trying to automate everything at once", "Building a five-stage pipeline on day one almost always fails. Build stage one first, test it until it is reliable, then add stage two."],
      ["Skipping the test step", "Each stage of a pipeline needs to be tested in isolation before you chain them together. A broken middle stage will silently corrupt every output that follows."],
      ["Using a prompt that mixes too many goals", "A single prompt that collects, filters, summarizes, formats, and posts at the same time is hard to debug. Separate each goal into its own clear instruction."],
    ],
  },
];

// ── video data ─────────────────────────────────────────────────────────────
const VIDEOS = [
  { id: "AQHlyGA2cZM", title: "These Hermes Agent Use Cases Change Everything", desc: "A practical use-case showcase covering real automation workflows." },
  { id: "gpJNLgv3vdw", title: "15 Hermes Agent Use Cases I Wish I Tried Sooner", desc: "Practical workflows for new and experienced Hermes users." },
  { id: "ZKsMm3s6sME", title: "5 FREE Hermes Agent Use Cases That Will Blow Your Mind", desc: "Free workflows and quick ideas ready to try today." },
  { id: "2WZAcWtwoDI", title: "5 Ways I Make Money With Hermes Agent", desc: "Business and monetization use cases built around automation." },
  { id: "kgLvzCkZjLo", title: "FREE Hermes Agent is INSANE! (5 Use Cases)", desc: "A short high-energy overview of five practical workflows." },
  { id: "KS09k8k7KfE", title: "Hermes Agent: 237+ Use Cases!", desc: "A large roundup of everything Hermes Agent can do." },
];

// ── sub-components ─────────────────────────────────────────────────────────

function PromptBlock({ prompt }: { prompt: string }) {
  return (
    <div className="rounded border border-panel-border overflow-hidden font-mono text-[11px]">
      <div className="flex items-center gap-2 px-3 py-2 bg-panel border-b border-panel-border/60">
        <span className="text-[8px] text-gold/40 uppercase tracking-widest font-bold">Example prompt</span>
      </div>
      <div className="bg-cream px-4 py-3.5">
        <p className="text-charcoal/65 leading-relaxed italic">&ldquo;{prompt}&rdquo;</p>
      </div>
    </div>
  );
}

function MistakesBox({ items }: { items: [string, string][] }) {
  return (
    <div className="rounded border border-gold/20 bg-gold/5 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-3 w-3 text-gold/55 flex-shrink-0" />
        <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-gold/55 font-bold">
          Common Mistakes
        </span>
      </div>
      <ul className="space-y-2.5">
        {items.map(([mistake, fix], i) => (
          <li key={i} className="flex flex-col gap-0.5">
            <span className="font-sans text-[11.5px] font-semibold text-charcoal/70">{mistake}</span>
            <span className="font-sans text-[11px] text-charcoal/45 leading-relaxed">{fix}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LevelBadge({ level }: { level: Level }) {
  const styles: Record<Level, string> = {
    Beginner: "border-forest/30 text-forest/70 bg-forest/5",
    Intermediate: "border-gold/30 text-gold/70 bg-gold/5",
    Advanced: "border-charcoal/25 text-charcoal/55 bg-panel",
  };
  return (
    <span className={`inline-flex items-center rounded border px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-widest ${styles[level]}`}>
      {level}
    </span>
  );
}

function PlatformBadge({ platform }: { platform: Platform }) {
  const styles: Record<Platform, string> = {
    Discord: "border-panel-border/60 text-charcoal/40",
    Telegram: "border-panel-border/60 text-charcoal/40",
    Both: "border-panel-border/60 text-charcoal/40",
  };
  return (
    <span className={`inline-flex items-center rounded border px-2 py-0.5 font-mono text-[8px] uppercase tracking-widest ${styles[platform]}`}>
      {platform === "Both" ? "Discord + Telegram" : platform}
    </span>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="h-px flex-1 bg-panel-border/30" />
      <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-charcoal/22">{label}</span>
      <div className="h-px flex-1 bg-panel-border/30" />
    </div>
  );
}

// ── main component ─────────────────────────────────────────────────────────
export default function UseCasesView() {
  const [activeId, setActiveId] = useState(USE_CASES[0].id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scrollspy with IntersectionObserver
  useEffect(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the entry that is most visible and closest to the top
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-10% 0px -75% 0px", threshold: 0 }
    );
    USE_CASES.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen animate-fade-in">

      {/* ── Desktop use-case nav rail ──────────────────────────────────── */}
      <aside
        aria-label="Use case navigation"
        className="hidden lg:flex flex-col sticky top-0 h-screen w-[200px] flex-shrink-0 overflow-y-auto border-r border-panel-border/50 bg-panel/70 backdrop-blur-sm"
      >
        {/* Back link */}
        <div className="px-4 pt-4 pb-3 border-b border-panel-border/30">
          <Link
            href="/tech-tutorials/hermes"
            className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-widest text-charcoal/30 hover:text-gold/70 transition-colors"
          >
            <ArrowLeft className="h-2.5 w-2.5" />
            Hermes Tutorials
          </Link>
          <div className="mt-2.5 font-mono text-[8px] tracking-[0.22em] text-charcoal/22 uppercase">Use Cases</div>
        </div>

        <nav className="flex flex-col gap-0 py-1.5">
          {USE_CASES.map(({ id, num, title }) => {
            const isActive = activeId === id;
            return (
              <button
                key={id}
                onClick={() => scrollToId(id)}
                className={`flex items-center gap-2.5 px-4 py-2 text-left border-l-2 transition-all duration-150 focus-visible:outline-none ${
                  isActive
                    ? "border-gold/55 bg-forest/10 text-gold"
                    : "border-transparent text-charcoal/40 hover:bg-panel-raised hover:text-charcoal/65"
                }`}
              >
                <span className={`font-mono text-[8px] tabular-nums flex-shrink-0 ${isActive ? "text-gold/60" : "text-charcoal/22"}`}>
                  {num}
                </span>
                <span className="font-mono text-[8px] font-bold uppercase tracking-wide leading-snug line-clamp-2">
                  {title}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ── Main content ───────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 px-5 pr-8 py-8 md:px-8 md:pr-12">

        {/* Back link (mobile) */}
        <div className="lg:hidden mb-4">
          <Link
            href="/tech-tutorials/hermes"
            className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-widest text-charcoal/30 hover:text-gold/70 transition-colors"
          >
            <ArrowLeft className="h-2.5 w-2.5" />
            Back to Hermes Tutorials
          </Link>
        </div>

        {/* ── Page header ───────────────────────────────────────────── */}
        <div className="mb-6 space-y-1.5">
          <div className="font-mono text-[9px] tracking-[0.25em] text-gold/70 uppercase">
            [ TECH TUTORIALS // HERMES AGENT // USE CASES ]
          </div>
          <h1 className="font-display text-[28px] md:text-[34px] font-bold uppercase tracking-[0.05em] text-charcoal leading-none">
            Hermes Use Cases
          </h1>
          <p className="font-sans text-[12.5px] text-charcoal/50 max-w-2xl leading-relaxed">
            20 practical things to do with Hermes in Discord and Telegram — from simple morning briefings to advanced multi-step pipelines. Start with the first one and work your way forward.
          </p>
        </div>

        {/* ── What you need ─────────────────────────────────────────── */}
        <div className="mb-8 rounded border border-panel-border bg-panel p-5 max-w-xl">
          <div className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-charcoal/30 mb-4">
            // Before you start
          </div>
          <ul className="space-y-2.5">
            {[
              ["Hermes is already running", "Follow the VPS Setup walkthrough first if you have not installed it yet."],
              ["Discord or Telegram is connected", "At least one of the connection walkthroughs must be completed."],
              ["A test channel or group is ready", "Have somewhere to post outputs while you build and test."],
              ["A place to store your prompts", "A notes app or text file is enough. You will build a small prompt library over time."],
            ].map(([item, note]) => (
              <li key={item as string} className="flex items-start gap-3">
                <CheckCircle2 className="h-3.5 w-3.5 text-forest/70 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-sans text-[12px] font-semibold text-charcoal/75">{item}</span>
                  <span className="font-sans text-[11px] text-charcoal/38 ml-1.5">{note}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Mobile use-case menu ───────────────────────────────────── */}
        <div className="lg:hidden mb-7 rounded border border-panel-border bg-panel overflow-hidden">
          <button
            onClick={() => setMobileMenuOpen((p) => !p)}
            className="flex w-full items-center justify-between px-4 py-3 font-mono text-[9px] uppercase tracking-widest text-charcoal/45 hover:text-charcoal/70 transition-colors"
            aria-expanded={mobileMenuOpen}
          >
            <span>Jump to a use case</span>
            {mobileMenuOpen ? (
              <ChevronUp className="h-3.5 w-3.5 text-charcoal/30" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5 text-charcoal/30" />
            )}
          </button>
          {mobileMenuOpen && (
            <div className="border-t border-panel-border/40 grid grid-cols-2 gap-0">
              {USE_CASES.map(({ id, num, title }) => (
                <button
                  key={id}
                  onClick={() => scrollToId(id)}
                  className="flex items-start gap-2 px-3 py-2.5 text-left text-charcoal/45 hover:bg-panel-raised hover:text-charcoal/70 border-b border-r border-panel-border/25 transition-colors"
                >
                  <span className="font-mono text-[8px] text-charcoal/22 flex-shrink-0 mt-px">{num}</span>
                  <span className="font-mono text-[8px] font-bold uppercase tracking-wide leading-snug line-clamp-2">{title}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Beginner divider ──────────────────────────────────────── */}
        <SectionDivider label="Beginner — Use Cases 01–06" />

        {/* ── Use case sections ─────────────────────────────────────── */}
        <div className="space-y-14 mt-8">
          {USE_CASES.map((uc, idx) => {
            const isIntermediateStart = idx === 6;
            const isAdvancedStart = idx === 16;
            return (
              <div key={uc.id}>
                {isIntermediateStart && (
                  <div className="mb-14">
                    <SectionDivider label="Intermediate — Use Cases 07–16" />
                  </div>
                )}
                {isAdvancedStart && (
                  <div className="mb-14">
                    <SectionDivider label="Advanced — Use Cases 17–20" />
                  </div>
                )}
                <section
                  id={uc.id}
                  className="scroll-mt-6 space-y-5"
                >
                  {/* Header */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-gold/35">
                        {uc.num}
                      </span>
                      <LevelBadge level={uc.level} />
                      <PlatformBadge platform={uc.platform} />
                    </div>
                    <h2 className="font-display text-[22px] md:text-[26px] font-bold uppercase tracking-[0.05em] text-charcoal leading-tight">
                      {uc.title}
                    </h2>
                    <div className="flex items-start gap-1.5">
                      <span className="font-mono text-[8px] uppercase tracking-wider text-charcoal/28 flex-shrink-0 mt-0.5">
                        Best for:
                      </span>
                      <span className="font-sans text-[11.5px] text-charcoal/48 leading-snug">
                        {uc.bestFor}
                      </span>
                    </div>
                  </div>

                  {/* What it does */}
                  <p className="font-sans text-[12.5px] leading-relaxed text-charcoal/55 max-w-2xl">
                    {uc.what}
                  </p>

                  {/* Steps */}
                  <div className="rounded border border-panel-border bg-panel p-4 max-w-xl">
                    <div className="font-mono text-[8px] uppercase tracking-widest text-charcoal/25 mb-3">
                      // Setup steps
                    </div>
                    <ol className="space-y-2">
                      {uc.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="font-mono text-[9px] text-gold/35 flex-shrink-0 mt-0.5 tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="font-sans text-[12px] text-charcoal/60 leading-snug">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Example prompt */}
                  <div className="max-w-2xl">
                    <PromptBlock prompt={uc.prompt} />
                  </div>

                  {/* Mistakes */}
                  <div className="max-w-2xl">
                    <MistakesBox items={uc.mistakes} />
                  </div>
                </section>
              </div>
            );
          })}
        </div>

        {/* ── Choose your next workflow ──────────────────────────────── */}
        <div className="mt-20 space-y-7">
          <SectionDivider label="Where to go next" />
          <div className="space-y-1.5">
            <div className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-gold/50">
              // Recommended paths
            </div>
            <h2 className="font-display text-[24px] font-bold uppercase tracking-[0.05em] text-charcoal">
              Choose Your Next Workflow
            </h2>
            <p className="font-sans text-[12.5px] text-charcoal/50 max-w-2xl leading-relaxed">
              Not sure where to start or what to build next? Here are the best starting points by goal.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                label: "Beginner",
                subtitle: "Just connected Hermes and want quick wins",
                picks: ["01 — News briefing", "02 — Weather brief", "03 — Calendar summary"],
              },
              {
                label: "Creator",
                subtitle: "You make content and want daily ideas",
                picks: ["15 — Content ideas", "16 — Habit check-in", "09 — RSS roundup"],
              },
              {
                label: "Developer",
                subtitle: "You ship code and need team awareness",
                picks: ["04 — GitHub digest", "18 — Incident watcher", "14 — Meeting notes"],
              },
              {
                label: "Team Lead",
                subtitle: "You manage a team or community",
                picks: ["07 — Discord welcome", "08 — Telegram group", "06 — FAQ helper"],
              },
              {
                label: "Freelancer",
                subtitle: "You work independently and need reminders",
                picks: ["05 — Lead reminders", "13 — Job alerts", "15 — Content ideas"],
              },
              {
                label: "Power User",
                subtitle: "You want to automate complex multi-step tasks",
                picks: ["20 — Pipeline", "17 — Research brief", "18 — Incident watcher"],
              },
            ].map(({ label, subtitle, picks }) => (
              <div key={label} className="rounded border border-panel-border bg-panel p-4 space-y-3">
                <div>
                  <div className="font-display text-[16px] font-bold uppercase tracking-wide text-charcoal">{label}</div>
                  <div className="font-sans text-[11px] text-charcoal/38 mt-0.5">{subtitle}</div>
                </div>
                <ul className="space-y-1">
                  {picks.map((p) => (
                    <li key={p} className="font-mono text-[9px] text-charcoal/45 uppercase tracking-wide">
                      → {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Watch section ─────────────────────────────────────────── */}
        <div className="mt-16 space-y-6">
          <SectionDivider label="Watch It Instead" />
          <div className="space-y-1.5">
            <div className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-gold/50">// Video Guides</div>
            <h2 className="font-display text-[22px] font-bold uppercase tracking-[0.05em] text-charcoal">
              See Use Cases In Action
            </h2>
            <p className="font-sans text-[12.5px] text-charcoal/50 max-w-2xl leading-relaxed">
              These videos show real Hermes workflows and use cases across different setups.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VIDEOS.map((v) => (
              <a
                key={v.id}
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col rounded border border-panel-border bg-panel overflow-hidden transition-all duration-300 hover:border-forest/50"
              >
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-forest/0 transition-all duration-300 group-hover:bg-forest/55 pointer-events-none" />
                <div className="relative aspect-video bg-panel-raised overflow-hidden flex-shrink-0">
                  <img
                    src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity h-11 w-11 rounded-full bg-panel/90 border border-panel-border/60 flex items-center justify-center text-gold shadow-lg">
                      <Play className="h-4 w-4 fill-current translate-x-[1px]" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col flex-1 gap-1.5 p-3.5">
                  <p className="font-sans text-[12px] font-bold leading-snug text-charcoal line-clamp-2 group-hover:text-gold/90 transition-colors">
                    {v.title}
                  </p>
                  <p className="font-sans text-[10.5px] text-charcoal/35 leading-snug line-clamp-1">{v.desc}</p>
                  <div className="mt-auto flex items-center gap-1 font-mono text-[8px] font-bold uppercase tracking-wider text-gold/40 group-hover:text-gold/70 transition-colors">
                    <ExternalLink className="h-2.5 w-2.5" />
                    <span>Watch on YouTube</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="h-12" />
      </div>
    </div>
  );
}
