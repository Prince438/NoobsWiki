"use client";

import { ExternalLink, Play, AlertTriangle, CheckCircle2, Terminal, MessageCircle, Send } from "lucide-react";

// ── video data ─────────────────────────────────────────────────────────────
const VIDEOS = [
  {
    id: "j5QE59nZ1kY",
    title: "Hermes Agent + Ollama + Telegram — Local Easy Setup Guide",
  },
  {
    id: "S8kiLQbEL-0",
    title: "Connect Hermes Agent to Telegram in 3 Minutes",
  },
  {
    id: "Twt80_MFE0U",
    title: "I Let Hermes Agent Make Its Own Tutorial (Telegram Setup in 5 Minutes)",
  },
  {
    id: "QyU3KWmkB2o",
    title: "How to Add a Telegram Bot to a Telegram Group",
  },
  {
    id: "F2-RuyIroFw",
    title: "How to Make a Telegram Bot Without Coding",
  },
];

// ── reusable sub-components ────────────────────────────────────────────────

function CommandBlock({ lines }: { lines: string[] }) {
  return (
    <div className="rounded border border-panel-border overflow-hidden text-[11px] font-mono">
      <div className="flex items-center gap-2 px-3 py-2 bg-panel border-b border-panel-border/60">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-charcoal/10 inline-block" />
          <span className="w-2 h-2 rounded-full bg-charcoal/10 inline-block" />
          <span className="w-2 h-2 rounded-full bg-charcoal/10 inline-block" />
        </div>
        <span className="text-[8px] text-charcoal/22 uppercase tracking-widest ml-1">bash</span>
      </div>
      <div className="bg-cream px-4 py-3.5 space-y-1">
        {lines.map((line, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-forest/70 select-none mt-px">$</span>
            <code className="text-gold/90 break-all leading-relaxed">{line}</code>
          </div>
        ))}
      </div>
    </div>
  );
}

function TerminalMock({
  title,
  lines,
}: {
  title: string;
  lines: { type: "prompt" | "output" | "success" | "dim"; text: string }[];
}) {
  return (
    <div className="rounded border border-panel-border overflow-hidden font-mono text-[11px]">
      <div className="flex items-center gap-2 px-3 py-2 bg-panel border-b border-panel-border/60">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-charcoal/10 inline-block" />
          <span className="w-2 h-2 rounded-full bg-charcoal/10 inline-block" />
          <span className="w-2 h-2 rounded-full bg-charcoal/10 inline-block" />
        </div>
        <span className="text-[8px] text-charcoal/22 uppercase tracking-widest ml-1">{title}</span>
      </div>
      <div className="bg-cream px-4 py-4 space-y-1.5 leading-relaxed">
        {lines.map((l, i) => {
          if (l.type === "prompt")
            return (
              <div key={i} className="flex items-start gap-2">
                <span className="text-forest/70 select-none">$</span>
                <span className="text-charcoal/80">{l.text}</span>
              </div>
            );
          if (l.type === "success")
            return (
              <div key={i} className="text-forest/80 pl-4">
                {l.text}
              </div>
            );
          if (l.type === "output")
            return (
              <div key={i} className="text-charcoal/40 pl-4">
                {l.text}
              </div>
            );
          return (
            <div key={i} className="text-charcoal/22 pl-4 italic">
              {l.text}
            </div>
          );
        })}
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

function StepLabel({ num }: { num: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-[0.3em] text-gold/45">
      <span className="w-px h-3 bg-gold/25 rounded" />
      STEP {num}
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

// Telegram-style chat bubble used in visual callouts
function TgBubble({
  sender,
  text,
  align = "left",
}: {
  sender: string;
  text: string;
  align?: "left" | "right";
}) {
  const isRight = align === "right";
  return (
    <div className={`flex flex-col gap-0.5 ${isRight ? "items-end" : "items-start"}`}>
      <span className={`font-mono text-[9px] ${isRight ? "text-gold/45" : "text-charcoal/35"}`}>
        {sender}
      </span>
      <div
        className={`rounded px-3 py-2 font-sans text-[11px] leading-relaxed max-w-[85%] ${
          isRight
            ? "bg-forest/8 border border-forest/20 text-forest/75"
            : "bg-cream border border-panel-border/40 text-charcoal/60"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

// ── main component ─────────────────────────────────────────────────────────
export default function TelegramWalkthrough() {
  return (
    <div className="mx-auto max-w-4xl px-5 md:px-8 py-10 space-y-12 animate-fade-in">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section>
        <div className="mb-3 font-mono text-[9px] tracking-[0.25em] text-gold/60 uppercase">
          [ TECH TUTORIALS // HERMES AGENT // TELEGRAM SETUP ]
        </div>
        <h1 className="font-display text-[30px] md:text-[38px] font-bold uppercase tracking-[0.06em] text-charcoal leading-none mb-4">
          How to Connect Hermes<br className="hidden md:block" /> to Telegram
        </h1>
        <p className="font-sans text-[13px] leading-relaxed text-charcoal/55 max-w-2xl mb-8">
          This walkthrough is for beginners who have Hermes installed and want to chat with it directly inside Telegram — either in a private conversation or inside a group. No coding experience is required.
        </p>

        {/* What you need */}
        <div className="rounded border border-panel-border bg-panel p-5 max-w-xl">
          <div className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-charcoal/30 mb-4">
            // What you need before starting
          </div>
          <ul className="space-y-2.5">
            {[
              ["Hermes installed", "Already running on your machine or VPS. Follow the VPS Setup walkthrough first if you have not done this."],
              ["A Telegram account", "Download Telegram and create an account if you do not have one already."],
              ["Access to BotFather", "BotFather is the official Telegram bot that creates new bots. Search for @BotFather inside Telegram."],
              ["A Telegram chat or group to test in", "Either your own private chat or a group where you are the admin."],
              ["A terminal app open", "Command Prompt, PowerShell, or Windows Terminal on Windows. Terminal on Mac or Linux."],
            ].map(([item, note]) => (
              <li key={item as string} className="flex items-start gap-3">
                <CheckCircle2 className="h-3.5 w-3.5 text-forest/70 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-sans text-[12.5px] font-semibold text-charcoal/75">{item}</span>
                  <span className="font-sans text-[11px] text-charcoal/38 ml-1.5">{note}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SectionDivider label="Tutorial Steps" />

      {/* ── Step 1: Before you start ─────────────────────────────────────── */}
      <section className="space-y-5">
        <div className="space-y-1.5">
          <StepLabel num="01" />
          <h2 className="font-display text-[24px] font-bold uppercase tracking-[0.05em] text-charcoal">
            Before You Start
          </h2>
          <p className="font-sans text-[12.5px] leading-relaxed text-charcoal/55 max-w-2xl">
            Make sure Hermes is already installed and working before you begin. Open Telegram on your phone or desktop and confirm you are signed in. Also decide now whether you want Hermes to reply in a <strong className="text-charcoal/75">private chat</strong> (just you and the bot) or inside a <strong className="text-charcoal/75">Telegram group</strong> — the steps are nearly the same, but the bot needs to be added to the group separately.
          </p>
        </div>

        {/* Visual: pre-flight checklist */}
        <div className="rounded border border-panel-border bg-panel overflow-hidden max-w-lg">
          <div className="border-b border-panel-border/50 px-4 py-2.5 flex items-center justify-between">
            <span className="font-mono text-[8px] uppercase tracking-widest text-charcoal/25">Pre-flight Check</span>
            <MessageCircle className="h-3 w-3 text-charcoal/20" />
          </div>
          <div className="p-5 space-y-2.5 font-mono text-[11px]">
            {[
              ["Hermes is installed and tested", true],
              ["Logged into Telegram", true],
              ["You know which chat or group to use", true],
              ["Bot token will be kept private", true],
            ].map(([label, done]) => (
              <div
                key={label as string}
                className="flex items-center gap-3 border border-panel-border/40 rounded px-3 py-2 bg-cream"
              >
                <CheckCircle2
                  className={`h-3 w-3 flex-shrink-0 ${done ? "text-forest/70" : "text-charcoal/20"}`}
                />
                <span className="text-charcoal/55 text-[10px] uppercase tracking-wide">{label as string}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-panel-border/30 px-4 py-2">
            <span className="font-mono text-[8px] text-charcoal/22 italic">Tick these off before moving to Step 2.</span>
          </div>
        </div>

        <MistakesBox
          items={[
            [
              "Starting without a Telegram account",
              "You need a Telegram account before BotFather can create a bot for you. Sign up at telegram.org if you do not have one.",
            ],
            [
              "Forgetting to copy the bot token",
              "BotFather gives you the token only once after creation. Copy it immediately and keep it somewhere safe.",
            ],
            [
              "Using the wrong chat or group",
              "Decide now whether to test in a private chat or a group. Testing in the wrong place is a common source of confusion later.",
            ],
          ]}
        />
      </section>

      {/* ── Step 2: Create the Telegram bot ──────────────────────────────── */}
      <section className="space-y-5">
        <div className="space-y-1.5">
          <StepLabel num="02" />
          <h2 className="font-display text-[24px] font-bold uppercase tracking-[0.05em] text-charcoal">
            Create the Telegram Bot with BotFather
          </h2>
          <p className="font-sans text-[12.5px] leading-relaxed text-charcoal/55 max-w-2xl">
            Open Telegram and search for <strong className="text-charcoal/75">@BotFather</strong> — it has a blue checkmark. Start a chat with it and send the command <code className="font-mono text-[11px] text-gold/75 bg-panel px-1 py-0.5 rounded border border-panel-border/40">/newbot</code>. BotFather will ask you for a name and a username for the bot. The username must end in <em className="text-charcoal/60">bot</em> (e.g. <em className="text-charcoal/60">HermesAssistantBot</em>). After that, BotFather will send you the bot token — copy it immediately.
          </p>
        </div>

        {/* Visual: BotFather chat mock */}
        <div className="rounded border border-panel-border bg-panel overflow-hidden max-w-lg">
          <div className="border-b border-panel-border/50 px-4 py-2.5 flex items-center justify-between">
            <span className="font-mono text-[8px] uppercase tracking-widest text-charcoal/25">Telegram — @BotFather</span>
            <span className="font-mono text-[8px] text-gold/30">✓ Official</span>
          </div>
          <div className="p-5 space-y-3">
            <TgBubble sender="You" text="/newbot" align="right" />
            <TgBubble
              sender="BotFather"
              text="Alright, a new bot. How are we going to call it? Please choose a name for your bot."
            />
            <TgBubble sender="You" text="Hermes Assistant" align="right" />
            <TgBubble
              sender="BotFather"
              text="Good. Now let's choose a username for your bot. It must end in 'bot'."
            />
            <TgBubble sender="You" text="HermesAssistantBot" align="right" />
            <TgBubble
              sender="BotFather"
              text="Done! Your bot token: 7123456789:AAF••••••••••••••••••••••  — keep it private."
            />
          </div>
          <div className="border-t border-panel-border/30 px-4 py-2">
            <span className="font-mono text-[8px] text-charcoal/22 italic">Create your Telegram bot with BotFather and copy the token.</span>
          </div>
        </div>

        <MistakesBox
          items={[
            [
              "Typing the bot username without 'bot' at the end",
              "Telegram requires all bot usernames to end in 'bot'. If you forget this, BotFather will ask you to try again.",
            ],
            [
              "Skipping the BotFather step",
              "Every Telegram bot must be created through BotFather first. There is no other way to get a valid bot token.",
            ],
            [
              "Losing the token after creation",
              "BotFather shows you the token once in chat. Copy it right away. If you lose it, you can regenerate it later in BotFather but the old one will stop working.",
            ],
          ]}
        />
      </section>

      {/* ── Step 3: Decide where the bot will live ────────────────────────── */}
      <section className="space-y-5">
        <div className="space-y-1.5">
          <StepLabel num="03" />
          <h2 className="font-display text-[24px] font-bold uppercase tracking-[0.05em] text-charcoal">
            Decide Where the Bot Will Reply
          </h2>
          <p className="font-sans text-[12.5px] leading-relaxed text-charcoal/55 max-w-2xl">
            You have two options. A <strong className="text-charcoal/75">private chat</strong> is simpler — just open Telegram, search for your bot by username, and start chatting. A <strong className="text-charcoal/75">group chat</strong> lets multiple people use Hermes together, but you must add the bot to the group first and make sure it has permission to read messages.
          </p>
        </div>

        {/* Visual: chat type comparison */}
        <div className="rounded border border-panel-border bg-panel overflow-hidden max-w-lg">
          <div className="border-b border-panel-border/50 px-4 py-2.5">
            <span className="font-mono text-[8px] uppercase tracking-widest text-charcoal/25">Choose Where Hermes Replies</span>
          </div>
          <div className="p-5 grid grid-cols-2 gap-3 font-mono text-[10px]">
            <div className="rounded border border-forest/25 bg-forest/5 p-3.5 space-y-2">
              <div className="flex items-center gap-2">
                <Send className="h-3 w-3 text-forest/60" />
                <span className="text-forest/70 font-bold uppercase tracking-wide text-[9px]">Private Chat</span>
              </div>
              <ul className="space-y-1 text-charcoal/45 text-[9.5px]">
                <li>— Simpler to set up</li>
                <li>— Just you and the bot</li>
                <li>— Search bot by username</li>
                <li>— No group needed</li>
              </ul>
            </div>
            <div className="rounded border border-panel-border/60 bg-cream p-3.5 space-y-2">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-3 w-3 text-charcoal/35" />
                <span className="text-charcoal/50 font-bold uppercase tracking-wide text-[9px]">Group Chat</span>
              </div>
              <ul className="space-y-1 text-charcoal/40 text-[9.5px]">
                <li>— Multiple people</li>
                <li>— Add bot to group first</li>
                <li>— Bot needs read access</li>
                <li>— Enable admin rights if needed</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-panel-border/30 px-4 py-2">
            <span className="font-mono text-[8px] text-charcoal/22 italic">Choose where Hermes will reply before running gateway setup.</span>
          </div>
        </div>

        <p className="font-sans text-[12px] text-charcoal/45 leading-relaxed max-w-2xl">
          If you choose a group, open the group in Telegram, tap the group name at the top, go to <strong className="text-charcoal/65">Add Members</strong>, and search for your bot by username to add it. Give it at least the ability to read and send messages.
        </p>

        <MistakesBox
          items={[
            [
              "Testing in a group without adding the bot first",
              "The bot cannot see or reply in a group unless you explicitly add it as a member. Add the bot before running any tests.",
            ],
            [
              "Forgetting to allow the bot to read messages in the group",
              "In groups with privacy mode on, bots can only see messages that mention them. Disable privacy mode for the bot in BotFather with /setprivacy → Disable, or mention the bot by name when you message it.",
            ],
            [
              "Picking the wrong chat type",
              "Decide before Step 4 whether you are using a private chat or a group. Switching later means re-running the gateway config.",
            ],
          ]}
        />
      </section>

      {/* ── Step 4: Connect Hermes to Telegram ───────────────────────────── */}
      <section className="space-y-5">
        <div className="space-y-1.5">
          <StepLabel num="04" />
          <h2 className="font-display text-[24px] font-bold uppercase tracking-[0.05em] text-charcoal">
            Connect Hermes to Telegram
          </h2>
          <p className="font-sans text-[12.5px] leading-relaxed text-charcoal/55 max-w-2xl">
            Open your terminal where Hermes is running. Run the gateway setup command. When the wizard asks for your Telegram bot token, paste the one you copied from BotFather. After saving, check the gateway status, then start it.
          </p>
        </div>

        <CommandBlock
          lines={[
            "hermes gateway setup",
            "hermes gateway status",
            "hermes gateway run",
          ]}
        />

        <TerminalMock
          title="hermes gateway"
          lines={[
            { type: "prompt",  text: "hermes gateway setup" },
            { type: "output",  text: "  ┌─────────────────────────────────┐" },
            { type: "output",  text: "  │  Hermes Telegram Gateway Setup  │" },
            { type: "output",  text: "  ├─────────────────────────────────┤" },
            { type: "output",  text: "  │  Select gateway:                 │" },
            { type: "output",  text: "  │  > Telegram                      │" },
            { type: "output",  text: "  ├─────────────────────────────────┤" },
            { type: "output",  text: "  │  Enter your Telegram bot token:  │" },
            { type: "dim",     text: "  │  > ••••••••••••••••••••••••••••  │" },
            { type: "output",  text: "  └─────────────────────────────────┘" },
            { type: "success", text: "  ✓ Token saved to config" },
            { type: "prompt",  text: "hermes gateway status" },
            { type: "success", text: "  Gateway: configured" },
            { type: "success", text: "  Telegram connection: ready" },
            { type: "prompt",  text: "hermes gateway run" },
            { type: "success", text: "  ✓ Hermes Telegram gateway is now running" },
          ]}
        />

        <MistakesBox
          items={[
            [
              "Pasting the token with extra spaces",
              "If you triple-click to select the token in BotFather and accidentally copy a trailing space, the connection will fail. Paste carefully or trim any spaces.",
            ],
            [
              "Typing the token by hand",
              "The token is long and case-sensitive. Always copy and paste — never type it manually.",
            ],
            [
              "Not saving the gateway config",
              "Follow the setup wizard all the way through and confirm each prompt. Exiting early means Hermes has no token to use.",
            ],
          ]}
        />
      </section>

      {/* ── Step 5: Test the bot ──────────────────────────────────────────── */}
      <section className="space-y-5">
        <div className="space-y-1.5">
          <StepLabel num="05" />
          <h2 className="font-display text-[24px] font-bold uppercase tracking-[0.05em] text-charcoal">
            Test the Bot in Telegram
          </h2>
          <p className="font-sans text-[12.5px] leading-relaxed text-charcoal/55 max-w-2xl">
            Open Telegram and find your bot (search by username). Send it a message. It should reply within a few seconds. You can also run a quick test from the terminal to confirm the connection is active.
          </p>
        </div>

        <CommandBlock lines={['hermes chat -q "Test Telegram connection"']} />

        <TerminalMock
          title="hermes test"
          lines={[
            { type: "prompt",  text: 'hermes chat -q "Test Telegram connection"' },
            { type: "dim",     text: "  Connecting via Telegram gateway..." },
            { type: "success", text: "  Hermes: Connected. Telegram gateway is live." },
            { type: "success", text: "  Your bot is ready to receive messages." },
          ]}
        />

        {/* Visual: Telegram test message mock */}
        <div className="rounded border border-panel-border bg-panel overflow-hidden max-w-lg">
          <div className="border-b border-panel-border/50 px-4 py-2.5 flex items-center justify-between">
            <span className="font-mono text-[8px] uppercase tracking-widest text-charcoal/25">Telegram — HermesAssistantBot</span>
            <span className="font-mono text-[8px] text-forest/40 uppercase tracking-widest">online</span>
          </div>
          <div className="p-5 space-y-3">
            <TgBubble sender="You" text="Hello Hermes" align="right" />
            <TgBubble
              sender="HermesAssistantBot"
              text="Hello! I'm Hermes, your AI assistant. How can I help you today?"
            />
            <TgBubble sender="You" text="Are you connected?" align="right" />
            <TgBubble
              sender="HermesAssistantBot"
              text="Yes — Telegram gateway is active and working."
            />
          </div>
          <div className="border-t border-panel-border/30 px-4 py-2">
            <span className="font-mono text-[8px] text-charcoal/22 italic">Send a test message and confirm the bot replies.</span>
          </div>
        </div>

        <MistakesBox
          items={[
            [
              "Testing before the gateway is running",
              "The bot only responds while hermes gateway run is active. Make sure Step 4 completed without errors before sending a test message.",
            ],
            [
              "Messaging in a chat the bot cannot read",
              "If you are testing in a group and privacy mode is on, the bot can only see messages that mention it by name. Either disable privacy mode or mention the bot with @HermesAssistantBot.",
            ],
            [
              "Assuming it failed before checking the gateway",
              "If there is no reply, first check that hermes gateway run is still active in your terminal. It may have stopped without showing an error.",
            ],
          ]}
        />
      </section>

      {/* ── Step 6: Keep it running ───────────────────────────────────────── */}
      <section className="space-y-5">
        <div className="space-y-1.5">
          <StepLabel num="06" />
          <h2 className="font-display text-[24px] font-bold uppercase tracking-[0.05em] text-charcoal">
            Keep Hermes Running After You Log Out
          </h2>
          <p className="font-sans text-[12.5px] leading-relaxed text-charcoal/55 max-w-2xl">
            If you close the terminal, the Telegram gateway stops and the bot goes offline. Use <strong className="text-charcoal/70">tmux</strong> to keep the process alive in a persistent session so Hermes stays online even after you disconnect.
          </p>
        </div>

        <CommandBlock
          lines={[
            "tmux new -s hermes-telegram",
            "hermes gateway run",
          ]}
        />

        <div className="rounded border border-panel-border bg-panel p-4 max-w-lg">
          <div className="font-mono text-[8px] uppercase tracking-widest text-charcoal/25 mb-3">
            // Key shortcuts inside tmux
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <kbd className="font-mono text-[10px] text-charcoal/60 border border-panel-border/60 bg-cream rounded px-2 py-1">
                Ctrl + B
              </kbd>
              <span className="text-charcoal/30 font-mono text-[9px]">then</span>
              <kbd className="font-mono text-[10px] text-charcoal/60 border border-panel-border/60 bg-cream rounded px-2 py-1">
                D
              </kbd>
              <span className="font-sans text-[11px] text-charcoal/45 ml-1">— detach without stopping</span>
            </div>
            <div className="flex items-center gap-3">
              <code className="font-mono text-[10px] text-gold/70 bg-cream border border-panel-border/40 rounded px-2 py-1">
                tmux attach -t hermes-telegram
              </code>
              <span className="font-sans text-[11px] text-charcoal/45">— come back later</span>
            </div>
          </div>
        </div>

        <MistakesBox
          items={[
            [
              "Closing the terminal without detaching from tmux",
              "Always press Ctrl+B then D to detach before closing. Closing the window without detaching will kill the gateway and the bot goes offline.",
            ],
            [
              "Running the gateway in a plain SSH session",
              "If you SSH in, run hermes gateway run, and then close the terminal, the session ends and the bot stops. Always wrap it in a tmux session.",
            ],
            [
              "Forgetting to restart after a config change",
              "If you update the Telegram token or any Hermes settings, stop the gateway, save the config, and run hermes gateway run again for changes to take effect.",
            ],
          ]}
        />
      </section>

      {/* ── Troubleshooting ──────────────────────────────────────────────── */}
      <section className="space-y-5">
        <SectionDivider label="Troubleshooting" />
        <div className="space-y-1.5">
          <div className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-gold/50">
            // Common Problems & Fixes
          </div>
          <h2 className="font-display text-[24px] font-bold uppercase tracking-[0.05em] text-charcoal">
            Something not working?
          </h2>
          <p className="font-sans text-[12.5px] text-charcoal/50 max-w-2xl leading-relaxed">
            Here are the most common things that go wrong and how to fix them in plain English.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              problem: "Bot not replying in Telegram",
              fix: "Check that hermes gateway run is still active in your terminal. If it stopped, restart it inside a tmux session. Also confirm the bot was added to the chat or group.",
            },
            {
              problem: "Wrong or invalid bot token",
              fix: "Open BotFather in Telegram, find your bot with /mybots, and use the token option to regenerate a fresh token. Then re-run hermes gateway setup with the new token.",
            },
            {
              problem: "Bot not added to the group",
              fix: "Go to your Telegram group, tap the group name, choose Add Members, and search for your bot by username. The bot must be a member before it can reply.",
            },
            {
              problem: "Gateway not starting",
              fix: "Run hermes gateway status first. Most startup failures come from a missing or incorrectly pasted token. Re-run hermes gateway setup and paste the token carefully with no extra spaces.",
            },
            {
              problem: "Hermes config not updating",
              fix: "Stop the running gateway, run hermes gateway setup again with the corrected values, then restart with hermes gateway run. Config changes do not apply to a running gateway without a restart.",
            },
          ].map(({ problem, fix }) => (
            <div
              key={problem}
              className="rounded border border-panel-border bg-panel p-4 flex flex-col gap-2"
            >
              <div className="flex items-start gap-2">
                <Terminal className="h-3.5 w-3.5 text-gold/40 flex-shrink-0 mt-0.5" />
                <span className="font-sans text-[12.5px] font-bold text-charcoal/80 leading-snug">
                  {problem}
                </span>
              </div>
              <p className="font-sans text-[11.5px] text-charcoal/45 leading-relaxed pl-5">{fix}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Watch section ─────────────────────────────────────────────────── */}
      <section className="space-y-5">
        <SectionDivider label="Watch It Instead" />
        <div className="space-y-1.5">
          <div className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-gold/50">// Video Guides</div>
          <h2 className="font-display text-[24px] font-bold uppercase tracking-[0.05em] text-charcoal">
            Watch Someone Do It
          </h2>
          <p className="font-sans text-[12.5px] text-charcoal/50 max-w-2xl leading-relaxed">
            If you prefer to follow along with a video, these cover the same steps from a different angle.
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
              <div className="flex flex-col flex-1 gap-2 p-3.5">
                <p className="font-sans text-[12px] font-bold leading-snug text-charcoal line-clamp-2 group-hover:text-gold/90 transition-colors">
                  {v.title}
                </p>
                <div className="mt-auto flex items-center gap-1 font-mono text-[8px] font-bold uppercase tracking-wider text-gold/40 group-hover:text-gold/70 transition-colors">
                  <ExternalLink className="h-2.5 w-2.5" />
                  <span>Watch on YouTube</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* bottom breathing room */}
      <div className="h-8" />
    </div>
  );
}
