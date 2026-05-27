"use client";

import { ExternalLink, Play, AlertTriangle, CheckCircle2, Terminal, Wifi, Bot } from "lucide-react";

// ── video data ─────────────────────────────────────────────────────────────
const VIDEOS = [
  {
    id: "mVHXwlSMQlQ",
    title: "Hermes Agent Setup with Discord (Complete Guide)",
  },
  {
    id: "Oy5HGvrxM4o",
    title: "How to Build a Discord Bot",
  },
  {
    id: "eiK34_asMRk",
    title: "How To Add A Bot To Your Discord Server — Full Guide",
  },
  {
    id: "4XswiJ1iUaw",
    title: "How to Invite Your Discord Bot to Your Server",
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

// ── Toggle row used in the bot settings callout ────────────────────────────
function IntentToggle({ label, on }: { label: string; on: boolean }) {
  return (
    <div className="flex items-center justify-between px-3 py-2.5 border border-panel-border/40 rounded bg-cream">
      <span className="font-mono text-[9px] text-charcoal/55 uppercase tracking-wide">{label}</span>
      <span
        className={`font-mono text-[8px] font-bold uppercase tracking-widest ${
          on ? "text-forest/80" : "text-charcoal/28"
        }`}
      >
        {on ? "ON" : "OFF"}
      </span>
    </div>
  );
}

// ── main component ─────────────────────────────────────────────────────────
export default function DiscordWalkthrough() {
  return (
    <div className="mx-auto max-w-4xl px-5 md:px-8 py-10 space-y-12 animate-fade-in">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section>
        <div className="mb-3 font-mono text-[9px] tracking-[0.25em] text-gold/60 uppercase">
          [ TECH TUTORIALS // HERMES AGENT // DISCORD SETUP ]
        </div>
        <h1 className="font-display text-[30px] md:text-[38px] font-bold uppercase tracking-[0.06em] text-charcoal leading-none mb-4">
          How to Connect Hermes<br className="hidden md:block" /> to Discord
        </h1>
        <p className="font-sans text-[13px] leading-relaxed text-charcoal/55 max-w-2xl mb-8">
          This walkthrough is for beginners who have Hermes installed and want to make it respond inside a Discord server. You do not need to have built a bot before — every step is explained from scratch.
        </p>

        {/* What you need */}
        <div className="rounded border border-panel-border bg-panel p-5 max-w-xl">
          <div className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-charcoal/30 mb-4">
            // What you need before starting
          </div>
          <ul className="space-y-2.5">
            {[
              ["Hermes installed", "Already running on your machine or VPS. If not, follow the VPS Setup walkthrough first."],
              ["A Discord account", "The account you want the bot to appear under."],
              ["A Discord server you manage", "You need admin rights so you can invite bots and change server settings."],
              ["Access to the Discord Developer Portal", "Free, at discord.com/developers/applications. Log in with your Discord account."],
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
            Before opening anything, make sure you are logged into the correct Discord account — the one you want the bot to belong to. Confirm you have admin access on the Discord server where you plan to test the bot, and keep your bot token private. Sharing it gives other people full control of your bot.
          </p>
        </div>

        {/* Visual: pre-flight checklist card */}
        <div className="rounded border border-panel-border bg-panel overflow-hidden max-w-lg">
          <div className="border-b border-panel-border/50 px-4 py-2.5 flex items-center justify-between">
            <span className="font-mono text-[8px] uppercase tracking-widest text-charcoal/25">Pre-flight Check</span>
            <span className="font-mono text-[8px] text-gold/30">discord.com/developers</span>
          </div>
          <div className="p-5 space-y-2.5 font-mono text-[11px]">
            {[
              ["Hermes is installed and working", true],
              ["Logged into the right Discord account", true],
              ["You manage (or own) a Discord server", true],
              ["Bot token kept private — not shared", true],
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
              "Starting without server admin access",
              "If you are not the admin, you cannot invite the bot. Make sure you own or manage the server before going further.",
            ],
            [
              "Forgetting to keep the bot token private",
              "The bot token is like a password. Never paste it in a Discord message, share it on GitHub, or put it anywhere public.",
            ],
            [
              "Using the wrong Discord account",
              "Log into the Developer Portal with the same Discord account that owns or manages your target server.",
            ],
          ]}
        />
      </section>

      {/* ── Step 2: Create the Discord bot ───────────────────────────────── */}
      <section className="space-y-5">
        <div className="space-y-1.5">
          <StepLabel num="02" />
          <h2 className="font-display text-[24px] font-bold uppercase tracking-[0.05em] text-charcoal">
            Create the Discord Bot
          </h2>
          <p className="font-sans text-[12.5px] leading-relaxed text-charcoal/55 max-w-2xl">
            Go to the{" "}
            <a
              href="https://discord.com/developers/applications"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/75 underline underline-offset-2 hover:text-gold transition-colors"
            >
              Discord Developer Portal
            </a>{" "}
            and click <strong className="text-charcoal/75">New Application</strong>. Give it a name — something like <em className="text-charcoal/60">HermesBot</em>. Once the application is created, go to the <strong className="text-charcoal/75">Bot</strong> tab in the left sidebar and click <strong className="text-charcoal/75">Add Bot</strong>. This is what turns your application into a real Discord bot.
          </p>
        </div>

        {/* Visual: Developer Portal mock */}
        <div className="rounded border border-panel-border bg-panel overflow-hidden max-w-lg">
          <div className="border-b border-panel-border/50 px-4 py-2.5 flex items-center justify-between">
            <span className="font-mono text-[8px] uppercase tracking-widest text-charcoal/25">Discord Developer Portal</span>
            <Bot className="h-3 w-3 text-charcoal/20" />
          </div>
          <div className="p-5 space-y-3 font-mono text-[11px]">
            <div className="flex items-center justify-between border border-panel-border/40 rounded px-3 py-2.5 bg-cream">
              <span className="text-charcoal/40 uppercase tracking-wider text-[9px]">Applications</span>
              <span className="font-mono text-[9px] text-gold/60 border border-gold/20 rounded px-2 py-0.5">+ New Application</span>
            </div>
            <div className="flex items-center justify-between border border-forest/25 rounded px-3 py-2.5 bg-cream">
              <span className="text-charcoal/60 uppercase tracking-wider text-[9px]">HermesBot</span>
              <span className="font-mono text-[8px] text-forest/60 uppercase tracking-widest">selected</span>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 border border-panel-border/40 rounded px-3 py-2 bg-cream text-center">
                <span className="text-[9px] text-charcoal/35 uppercase tracking-wide">General Info</span>
              </div>
              <div className="flex-1 border border-gold/30 rounded px-3 py-2 bg-cream text-center">
                <span className="text-[9px] text-gold/70 uppercase tracking-wide font-bold">Bot ←</span>
              </div>
              <div className="flex-1 border border-panel-border/40 rounded px-3 py-2 bg-cream text-center">
                <span className="text-[9px] text-charcoal/35 uppercase tracking-wide">OAuth2</span>
              </div>
            </div>
          </div>
          <div className="border-t border-panel-border/30 px-4 py-2">
            <span className="font-mono text-[8px] text-charcoal/22 italic">Create a new application, then go to the Bot tab and click Add Bot.</span>
          </div>
        </div>

        <MistakesBox
          items={[
            [
              "Creating an application but not adding the bot",
              "An application alone is not a bot. You must go to the Bot tab and click Add Bot. Without this step the bot will never appear online in Discord.",
            ],
            [
              "Losing track of the application name",
              "Name it something obvious like HermesBot so you can find it easily in the application list later.",
            ],
            [
              "Thinking the application and the bot are the same thing",
              "The application is the container. The bot is what Discord users actually see and interact with. You need both.",
            ],
          ]}
        />
      </section>

      {/* ── Step 3: Turn on the right bot settings ────────────────────────── */}
      <section className="space-y-5">
        <div className="space-y-1.5">
          <StepLabel num="03" />
          <h2 className="font-display text-[24px] font-bold uppercase tracking-[0.05em] text-charcoal">
            Turn On the Right Bot Settings
          </h2>
          <p className="font-sans text-[12.5px] leading-relaxed text-charcoal/55 max-w-2xl">
            Still on the Bot tab, scroll down to the <strong className="text-charcoal/75">Privileged Gateway Intents</strong> section. You need to turn on three toggles so Hermes can read and respond to messages. Without these, the bot will connect but will not see any chat messages.
          </p>
        </div>

        {/* Visual: Intent toggles mock */}
        <div className="rounded border border-panel-border bg-panel overflow-hidden max-w-lg">
          <div className="border-b border-panel-border/50 px-4 py-2.5 flex items-center justify-between">
            <span className="font-mono text-[8px] uppercase tracking-widest text-charcoal/25">Privileged Gateway Intents</span>
            <Wifi className="h-3 w-3 text-charcoal/20" />
          </div>
          <div className="p-5 space-y-2.5">
            <IntentToggle label="Presence Intent" on={false} />
            <IntentToggle label="Server Members Intent" on={true} />
            <IntentToggle label="Message Content Intent  ← required" on={true} />
          </div>
          <div className="border-t border-panel-border/30 px-4 py-2">
            <span className="font-mono text-[8px] text-charcoal/22 italic">Turn on the settings Hermes needs. Message Content Intent is required.</span>
          </div>
        </div>

        <p className="font-sans text-[12px] text-charcoal/45 leading-relaxed max-w-2xl">
          After turning on the intents, scroll down and click <strong className="text-charcoal/70">Save Changes</strong>. Do not skip this or the changes will not apply.
        </p>

        <MistakesBox
          items={[
            [
              "Leaving Message Content Intent off",
              "This is the most common mistake. Without it, the bot connects but cannot read any messages. Always turn this on.",
            ],
            [
              "Giving too many permissions later",
              "Only enable what Hermes needs. Start with the minimum and add more only if something does not work.",
            ],
            [
              "Forgetting to save changes",
              "After toggling the intents, scroll down and hit Save Changes. If you leave the page without saving, nothing is applied.",
            ],
          ]}
        />
      </section>

      {/* ── Step 4: Copy the token and invite ─────────────────────────────── */}
      <section className="space-y-5">
        <div className="space-y-1.5">
          <StepLabel num="04" />
          <h2 className="font-display text-[24px] font-bold uppercase tracking-[0.05em] text-charcoal">
            Copy the Bot Token and Invite It to Your Server
          </h2>
          <p className="font-sans text-[12.5px] leading-relaxed text-charcoal/55 max-w-2xl">
            On the Bot tab, click <strong className="text-charcoal/75">Reset Token</strong> and then copy the token that appears. Paste it somewhere safe immediately — you will only see it once. Next, go to the <strong className="text-charcoal/75">OAuth2 &rarr; URL Generator</strong> tab, select <em className="text-charcoal/60">bot</em> as the scope, tick <em className="text-charcoal/60">Send Messages</em> and <em className="text-charcoal/60">Read Message History</em>, then copy the generated invite link and open it in your browser to add the bot to your server.
          </p>
        </div>

        {/* Visual: OAuth2 URL Generator mock */}
        <div className="rounded border border-panel-border bg-panel overflow-hidden max-w-lg">
          <div className="border-b border-panel-border/50 px-4 py-2.5 flex items-center justify-between">
            <span className="font-mono text-[8px] uppercase tracking-widest text-charcoal/25">OAuth2 → URL Generator</span>
            <span className="font-mono text-[8px] text-gold/30">Invite Link</span>
          </div>
          <div className="p-5 space-y-3 font-mono text-[11px]">
            <div className="space-y-1.5">
              <span className="text-[9px] text-charcoal/30 uppercase tracking-widest">Scopes</span>
              <div className="flex gap-2 flex-wrap">
                <span className="border border-forest/30 bg-forest/8 text-forest/70 rounded px-2 py-0.5 text-[9px] uppercase tracking-wide">bot ✓</span>
                <span className="border border-panel-border/40 text-charcoal/30 rounded px-2 py-0.5 text-[9px] uppercase tracking-wide">applications.commands</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <span className="text-[9px] text-charcoal/30 uppercase tracking-widest">Bot Permissions</span>
              <div className="flex gap-2 flex-wrap">
                <span className="border border-forest/30 bg-forest/8 text-forest/70 rounded px-2 py-0.5 text-[9px]">Send Messages ✓</span>
                <span className="border border-forest/30 bg-forest/8 text-forest/70 rounded px-2 py-0.5 text-[9px]">Read Message History ✓</span>
              </div>
            </div>
            <div className="border border-panel-border/40 rounded px-3 py-2.5 bg-cream">
              <span className="text-charcoal/30 text-[9px] uppercase tracking-widest">Generated URL</span>
              <p className="text-gold/60 text-[9px] mt-1 break-all">https://discord.com/api/oauth2/authorize?client_id=…</p>
            </div>
          </div>
          <div className="border-t border-panel-border/30 px-4 py-2">
            <span className="font-mono text-[8px] text-charcoal/22 italic">Copy the generated URL and open it to invite the bot to your server.</span>
          </div>
        </div>

        <MistakesBox
          items={[
            [
              "Pasting the token in the wrong place",
              "The token goes into the Hermes config in Step 5, not anywhere in Discord. Do not paste it in a Discord channel or message.",
            ],
            [
              "Sharing the bot token",
              "If someone else gets your bot token they can control your bot completely. Keep it in a private notes app or password manager.",
            ],
            [
              "Inviting the bot to the wrong server",
              "When the invite link opens, a dropdown lets you pick which server to add the bot to. Double-check before confirming.",
            ],
          ]}
        />
      </section>

      {/* ── Step 5: Connect Hermes to Discord ─────────────────────────────── */}
      <section className="space-y-5">
        <div className="space-y-1.5">
          <StepLabel num="05" />
          <h2 className="font-display text-[24px] font-bold uppercase tracking-[0.05em] text-charcoal">
            Connect Hermes to Discord
          </h2>
          <p className="font-sans text-[12.5px] leading-relaxed text-charcoal/55 max-w-2xl">
            Open your terminal where Hermes is running. Use the gateway setup command to tell Hermes your Discord bot token. The setup wizard will ask for the token — paste the one you copied in Step 4. After that, check the gateway status and then start it running.
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
            { type: "prompt", text: "hermes gateway setup" },
            { type: "output", text: "  ┌─────────────────────────────────┐" },
            { type: "output", text: "  │  Hermes Discord Gateway Setup   │" },
            { type: "output", text: "  ├─────────────────────────────────┤" },
            { type: "output", text: "  │  Enter your Discord bot token:   │" },
            { type: "dim",    text: "  │  > ••••••••••••••••••••••••••••  │" },
            { type: "output", text: "  └─────────────────────────────────┘" },
            { type: "success", text: "  ✓ Token saved to config" },
            { type: "prompt", text: "hermes gateway status" },
            { type: "success", text: "  Gateway: configured" },
            { type: "success", text: "  Discord connection: ready" },
            { type: "prompt", text: "hermes gateway run" },
            { type: "success", text: "  ✓ Hermes Discord gateway is now running" },
          ]}
        />

        <MistakesBox
          items={[
            [
              "Typing the token wrong",
              "Always paste the token — do not type it by hand. Even one wrong character will cause an authentication error.",
            ],
            [
              "Forgetting to save the config",
              "Follow the setup wizard all the way to the end. If it asks you to confirm, press Enter or type yes to confirm.",
            ],
            [
              "Running the wrong gateway command",
              "Run hermes gateway setup first, then hermes gateway status to check it, then hermes gateway run to start it. Do them in order.",
            ],
          ]}
        />
      </section>

      {/* ── Step 6: Test the bot ──────────────────────────────────────────── */}
      <section className="space-y-5">
        <div className="space-y-1.5">
          <StepLabel num="06" />
          <h2 className="font-display text-[24px] font-bold uppercase tracking-[0.05em] text-charcoal">
            Test the Bot in Discord
          </h2>
          <p className="font-sans text-[12.5px] leading-relaxed text-charcoal/55 max-w-2xl">
            Go to your Discord server and find a channel the bot can see. Send a test message. The bot should reply within a few seconds. You can also send a quick test directly from the terminal to confirm Hermes can reach Discord.
          </p>
        </div>

        <CommandBlock lines={['hermes chat -q "Test Discord connection"']} />

        <TerminalMock
          title="hermes test"
          lines={[
            { type: "prompt", text: 'hermes chat -q "Test Discord connection"' },
            { type: "dim",    text: "  Connecting via Discord gateway..." },
            { type: "success", text: "  Hermes: Connected. Discord gateway is live." },
            { type: "success", text: "  Your bot is ready to receive messages." },
          ]}
        />

        {/* Visual: Discord test message mock */}
        <div className="rounded border border-panel-border bg-panel overflow-hidden max-w-lg">
          <div className="border-b border-panel-border/50 px-4 py-2.5 flex items-center justify-between">
            <span className="font-mono text-[8px] uppercase tracking-widest text-charcoal/25"># general — Discord</span>
            <span className="font-mono text-[8px] text-forest/40 uppercase tracking-widest">online</span>
          </div>
          <div className="p-5 space-y-3 font-mono text-[10px]">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] text-charcoal/40">You</span>
              <div className="bg-cream border border-panel-border/40 rounded px-3 py-2 text-charcoal/60">
                @HermesBot hello
              </div>
            </div>
            <div className="flex flex-col gap-0.5 items-end">
              <span className="text-[9px] text-gold/45">HermesBot</span>
              <div className="bg-forest/8 border border-forest/20 rounded px-3 py-2 text-forest/75 text-right">
                Hello! I'm Hermes. How can I help you today?
              </div>
            </div>
          </div>
          <div className="border-t border-panel-border/30 px-4 py-2">
            <span className="font-mono text-[8px] text-charcoal/22 italic">Send a test message and confirm the bot replies.</span>
          </div>
        </div>

        <MistakesBox
          items={[
            [
              "Testing before the bot is online",
              "The bot only responds once hermes gateway run is active. Check that Step 5 completed without errors before testing here.",
            ],
            [
              "Using a channel the bot cannot see",
              "If the bot was invited without Read Message History or Send Messages permissions, it will not respond. Check the channel permissions.",
            ],
            [
              "Assuming it is broken before checking permissions",
              "Most failed tests are a permission issue, not a Hermes issue. Go to Discord → Server Settings → Integrations and verify the bot's permissions.",
            ],
          ]}
        />
      </section>

      {/* ── Step 7: Keep it running ───────────────────────────────────────── */}
      <section className="space-y-5">
        <div className="space-y-1.5">
          <StepLabel num="07" />
          <h2 className="font-display text-[24px] font-bold uppercase tracking-[0.05em] text-charcoal">
            Keep Hermes Running After You Log Out
          </h2>
          <p className="font-sans text-[12.5px] leading-relaxed text-charcoal/55 max-w-2xl">
            If you close the terminal, the gateway stops and the bot goes offline in Discord. Use <strong className="text-charcoal/70">tmux</strong> to keep Hermes alive in a persistent session. Start a named session, run the gateway inside it, then detach and close the terminal safely.
          </p>
        </div>

        <CommandBlock
          lines={[
            "tmux new -s hermes-discord",
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
                tmux attach -t hermes-discord
              </code>
              <span className="font-sans text-[11px] text-charcoal/45">— come back later</span>
            </div>
          </div>
        </div>

        <MistakesBox
          items={[
            [
              "Closing the terminal without detaching from tmux",
              "Always detach with Ctrl+B then D before closing. If you just close the window, the session and the gateway process will stop.",
            ],
            [
              "Running the gateway in a plain SSH session",
              "If you SSH in, run hermes gateway run, and then close the terminal, the bot goes offline. Always use tmux so the session survives.",
            ],
            [
              "Forgetting to restart after a config change",
              "If you update the Discord token or any Hermes config, stop the gateway, save the new config, and then run hermes gateway run again.",
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
              problem: "Bot not replying in Discord",
              fix: "Check that hermes gateway run is still active in your terminal. If you closed the terminal, the gateway stopped. Restart it inside a tmux session.",
            },
            {
              problem: "Bot token is wrong or invalid",
              fix: "Go back to the Discord Developer Portal, reset the token, copy it again, and re-run hermes gateway setup with the new token.",
            },
            {
              problem: "Missing permissions error",
              fix: "Go to your Discord server → Server Settings → Integrations → Bots and Apps. Find your bot and verify it has Send Messages and Read Message History enabled.",
            },
            {
              problem: "Gateway not starting",
              fix: "Run hermes gateway status first to see what is wrong. Most gateway failures are caused by a missing or invalid token. Re-run the gateway setup and paste the token again carefully.",
            },
            {
              problem: "Message Content Intent not enabled",
              fix: "Go to the Discord Developer Portal → your application → Bot tab → scroll to Privileged Gateway Intents → turn on Message Content Intent → save. Then restart the gateway.",
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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {VIDEOS.map((v) => (
            <a
              key={v.id + v.title}
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
