"use client";

import { ExternalLink, Play, ChevronRight, AlertTriangle, CheckCircle2, Terminal } from "lucide-react";

// ── video data ─────────────────────────────────────────────────────────────
const VIDEOS = [
  {
    id: "RoBD7Lc-0MI",
    title: "Hermes Agent is the greatest AI tool ever made. Here's how to set it up",
  },
  {
    id: "8jBX3RatIus",
    title: "Hermes Agent FULLY LOCAL AI Setup Guide",
  },
  {
    id: "oD92_CI_0UY",
    title: "How to SSH into your VPS from a Windows or Linux Computer",
  },
  {
    id: "YiwBkRukugw",
    title: "A Very Simple VPS Server Tutorial for Beginners",
  },
  {
    id: "v45p_kJV9i4",
    title: "Learn SSH In 6 Minutes — Beginners Guide to SSH Tutorial",
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

function TerminalMock({ title, lines }: { title: string; lines: { type: "prompt" | "output" | "success" | "dim"; text: string }[] }) {
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
            return <div key={i} className="text-forest/80 pl-4">{l.text}</div>;
          if (l.type === "output")
            return <div key={i} className="text-charcoal/40 pl-4">{l.text}</div>;
          return <div key={i} className="text-charcoal/22 pl-4 italic">{l.text}</div>;
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
        <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-gold/55 font-bold">Common Mistakes</span>
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

// ── main component ─────────────────────────────────────────────────────────
export default function VPSWalkthrough() {
  return (
    <div className="mx-auto max-w-4xl px-5 md:px-8 py-10 space-y-12 animate-fade-in">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section>
        <div className="mb-3 font-mono text-[9px] tracking-[0.25em] text-gold/60 uppercase">
          [ TECH TUTORIALS // HERMES AGENT // VPS SETUP ]
        </div>
        <h1 className="font-display text-[30px] md:text-[38px] font-bold uppercase tracking-[0.06em] text-charcoal leading-none mb-4">
          How to Set Up Hermes<br className="hidden md:block" /> on a Hostinger VPS
        </h1>
        <p className="font-sans text-[13px] leading-relaxed text-charcoal/55 max-w-2xl mb-8">
          This walkthrough is for beginners who have never used a VPS or the command line before. By the end you will have Hermes running on a live server you can access from anywhere.
        </p>

        {/* What you need */}
        <div className="rounded border border-panel-border bg-panel p-5 max-w-xl">
          <div className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-charcoal/30 mb-4">// What you need before starting</div>
          <ul className="space-y-2.5">
            {[
              ["A Hostinger VPS", "Any plan works. Ubuntu 22.04 is recommended."],
              ["SSH access details", "Your server's IP address and root password from the Hostinger panel."],
              ["A terminal app", "Command Prompt, PowerShell, or Windows Terminal on Windows. Terminal on Mac or Linux."],
              ["Your model/provider credentials", "An API key from OpenAI, Anthropic, or another provider."],
              ["10–15 minutes", "The install itself is fast. Most of the time goes into reading."],
            ].map(([item, note]) => (
              <li key={item} className="flex items-start gap-3">
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
            Find Your VPS Details
          </h2>
          <p className="font-sans text-[12.5px] leading-relaxed text-charcoal/55 max-w-2xl">
            Log into your Hostinger account and go to your VPS dashboard. Before you do anything else, find two things: your <strong className="text-charcoal/75">server IP address</strong> and your <strong className="text-charcoal/75">root password</strong>. Keep them somewhere you can copy from quickly.
          </p>
        </div>

        {/* Visual: Dashboard card */}
        <div className="rounded border border-panel-border bg-panel overflow-hidden max-w-lg">
          <div className="border-b border-panel-border/50 px-4 py-2.5 flex items-center justify-between">
            <span className="font-mono text-[8px] uppercase tracking-widest text-charcoal/25">Hostinger VPS Panel</span>
            <span className="font-mono text-[8px] text-gold/30">hpanel.hostinger.com</span>
          </div>
          <div className="p-5 space-y-3 font-mono text-[11px]">
            <div className="flex items-center justify-between border border-panel-border/40 rounded px-3 py-2.5 bg-cream">
              <span className="text-charcoal/40 uppercase tracking-wider text-[9px]">Server IP</span>
              <span className="text-gold/80">185.x.x.x  ← copy this</span>
            </div>
            <div className="flex items-center justify-between border border-panel-border/40 rounded px-3 py-2.5 bg-cream">
              <span className="text-charcoal/40 uppercase tracking-wider text-[9px]">Root Password</span>
              <span className="text-charcoal/35">••••••••••••  ← copy this</span>
            </div>
            <div className="flex items-center justify-between border border-panel-border/40 rounded px-3 py-2.5 bg-cream">
              <span className="text-charcoal/40 uppercase tracking-wider text-[9px]">OS</span>
              <span className="text-charcoal/50">Ubuntu 22.04 LTS</span>
            </div>
          </div>
          <div className="border-t border-panel-border/30 px-4 py-2">
            <span className="font-mono text-[8px] text-charcoal/22 italic">Find your VPS IP address before you connect.</span>
          </div>
        </div>

        <MistakesBox items={[
          ["Starting without your login details", "Go to the Hostinger panel first and copy the IP and password. You cannot SSH in without them."],
          ["Choosing the wrong server image", "Make sure your VPS is running Ubuntu 22.04 LTS. Other Linux versions work but this guide is written for Ubuntu."],
          ["Forgetting to save the IP address", "Write the IP down or paste it into a notes app before opening the terminal."],
        ]} />
      </section>

      {/* ── Step 2: Connect with SSH ─────────────────────────────────────── */}
      <section className="space-y-5">
        <div className="space-y-1.5">
          <StepLabel num="02" />
          <h2 className="font-display text-[24px] font-bold uppercase tracking-[0.05em] text-charcoal">
            Connect to the VPS with SSH
          </h2>
          <p className="font-sans text-[12.5px] leading-relaxed text-charcoal/55 max-w-2xl">
            SSH is the tool that lets you control a remote computer from your terminal as if you were sitting in front of it. Open a terminal on your computer and type the command below. Replace <code className="font-mono text-[11px] text-gold/75 bg-panel px-1 py-0.5 rounded border border-panel-border/40">YOUR_SERVER_IP</code> with the IP you copied from the Hostinger panel.
          </p>
        </div>

        <CommandBlock lines={["ssh root@YOUR_SERVER_IP"]} />

        <p className="font-sans text-[12px] text-charcoal/45 leading-relaxed max-w-2xl">
          The first time you connect you will see a message asking if you trust the server. Type <code className="font-mono text-[10px] text-gold/70 bg-panel px-1 py-0.5 rounded border border-panel-border/40">yes</code> and press Enter. Then type your root password when asked (the cursor will not move while you type — that is normal).
        </p>

        <TerminalMock title="ssh connection" lines={[
          { type: "prompt", text: "ssh root@185.x.x.x" },
          { type: "output", text: "The authenticity of host '185.x.x.x' can't be established." },
          { type: "output", text: "Are you sure you want to continue connecting (yes/no)? yes" },
          { type: "output", text: "root@185.x.x.x's password: ••••••••" },
          { type: "success", text: "Welcome to Ubuntu 22.04.3 LTS (GNU/Linux 5.15)" },
          { type: "prompt", text: "_ " },
        ]} />

        <MistakesBox items={[
          ["Typing the wrong IP address", "Copy and paste directly from the Hostinger panel. One wrong digit means SSH will not connect."],
          ["Copying extra spaces from the panel", "If you copy the IP with surrounding spaces it will fail. Check there are no spaces before or after the IP."],
          ["Closing the terminal too early", "Stay inside the terminal window for the whole tutorial. Closing it ends the SSH session."],
        ]} />
      </section>

      {/* ── Step 3: Update the server ─────────────────────────────────────── */}
      <section className="space-y-5">
        <div className="space-y-1.5">
          <StepLabel num="03" />
          <h2 className="font-display text-[24px] font-bold uppercase tracking-[0.05em] text-charcoal">
            Update the Server
          </h2>
          <p className="font-sans text-[12.5px] leading-relaxed text-charcoal/55 max-w-2xl">
            A fresh VPS needs its software updated before you install anything. Run both commands below one after the other. The first refreshes the package list. The second installs tools that Hermes depends on. This can take a few minutes — let it finish before moving on.
          </p>
        </div>

        <CommandBlock lines={[
          "sudo apt update && sudo apt upgrade -y",
          "sudo apt install -y curl git build-essential",
        ]} />

        <TerminalMock title="server update" lines={[
          { type: "prompt", text: "sudo apt update && sudo apt upgrade -y" },
          { type: "output", text: "Hit:1 http://archive.ubuntu.com/ubuntu jammy InRelease" },
          { type: "output", text: "Get:2 http://security.ubuntu.com/ubuntu jammy-security..." },
          { type: "output", text: "Reading package lists... Done" },
          { type: "success", text: "All packages up to date." },
          { type: "prompt", text: "sudo apt install -y curl git build-essential" },
          { type: "success", text: "Setting up build-essential (12.9ubuntu3) ..." },
          { type: "success", text: "Done." },
        ]} />

        <MistakesBox items={[
          ["Forgetting sudo", "Without sudo the commands will fail with a permission error. Always keep sudo at the start."],
          ["Running these on your laptop instead of the VPS", "Make sure your terminal is still connected to the VPS. You should see a root@vps prompt, not your computer name."],
          ["Using the wrong package manager", "This guide is for Ubuntu. If you are on a different Linux distro, the package manager may be different. Ubuntu uses apt."],
        ]} />
      </section>

      {/* ── Step 4: Install Hermes ────────────────────────────────────────── */}
      <section className="space-y-5">
        <div className="space-y-1.5">
          <StepLabel num="04" />
          <h2 className="font-display text-[24px] font-bold uppercase tracking-[0.05em] text-charcoal">
            Install Hermes
          </h2>
          <p className="font-sans text-[12.5px] leading-relaxed text-charcoal/55 max-w-2xl">
            Run the official Hermes install script. This one command downloads and installs everything you need. Copy the full command exactly as shown — do not shorten it.
          </p>
        </div>

        <CommandBlock lines={[
          `curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash`,
        ]} />

        <TerminalMock title="hermes install" lines={[
          { type: "prompt", text: "curl -fsSL https://raw.github...install.sh | bash" },
          { type: "output", text: "  Downloading Hermes Agent..." },
          { type: "output", text: "  Setting up binaries..." },
          { type: "output", text: "  Writing configuration..." },
          { type: "success", text: "  ✓ Hermes installed successfully" },
          { type: "success", text: "  Run: hermes setup" },
        ]} />

        <MistakesBox items={[
          ["Not using a bash-compatible shell", "The command ends with | bash — this tells the system to run the script with bash. Do not remove it."],
          ["Copying the command wrong", "Copy the entire command in one go. If you split it across lines it will not work."],
          ["Interrupting the install before it finishes", "Wait until you see a success message. Do not press Ctrl+C while the install is running."],
        ]} />
      </section>

      {/* ── Step 5: Run Hermes setup ─────────────────────────────────────── */}
      <section className="space-y-5">
        <div className="space-y-1.5">
          <StepLabel num="05" />
          <h2 className="font-display text-[24px] font-bold uppercase tracking-[0.05em] text-charcoal">
            Run the Hermes Setup Wizard
          </h2>
          <p className="font-sans text-[12.5px] leading-relaxed text-charcoal/55 max-w-2xl">
            Now that Hermes is installed, run the setup wizard. It will ask you to choose a model provider (like OpenAI or Anthropic) and enter your API key. After that, run <code className="font-mono text-[11px] text-gold/75 bg-panel px-1 py-0.5 rounded border border-panel-border/40">hermes doctor</code> to confirm everything is configured correctly.
          </p>
        </div>

        <CommandBlock lines={[
          "hermes setup",
          "hermes model",
          "hermes config",
          "hermes doctor",
        ]} />

        <TerminalMock title="hermes setup" lines={[
          { type: "prompt", text: "hermes setup" },
          { type: "output", text: "  ┌─────────────────────────────────┐" },
          { type: "output", text: "  │  Hermes Agent Setup             │" },
          { type: "output", text: "  ├─────────────────────────────────┤" },
          { type: "output", text: "  │  Select model provider:          │" },
          { type: "output", text: "  │  > OpenAI                        │" },
          { type: "output", text: "  │    Anthropic                     │" },
          { type: "output", text: "  │    Ollama (local)                │" },
          { type: "output", text: "  └─────────────────────────────────┘" },
          { type: "prompt", text: "hermes doctor" },
          { type: "success", text: "  ✓ Config valid" },
          { type: "success", text: "  ✓ Model reachable" },
          { type: "success", text: "  All checks passed." },
        ]} />

        <MistakesBox items={[
          ["Choosing a provider without credentials", "Pick a provider you already have an API key for. If you choose OpenAI, you need an OpenAI key ready to paste."],
          ["Not saving config changes", "Follow each prompt to the end. If you exit early the settings may not save."],
          ["Skipping the doctor check", "Always run hermes doctor after setup. It tells you if something is wrong before you try to use Hermes."],
        ]} />
      </section>

      {/* ── Step 6: Test Hermes ─────────────────────────────────────────── */}
      <section className="space-y-5">
        <div className="space-y-1.5">
          <StepLabel num="06" />
          <h2 className="font-display text-[24px] font-bold uppercase tracking-[0.05em] text-charcoal">
            Test Hermes with a Quick Command
          </h2>
          <p className="font-sans text-[12.5px] leading-relaxed text-charcoal/55 max-w-2xl">
            Send a simple message to confirm Hermes is working. If you get a reply, the install is done.
          </p>
        </div>

        <CommandBlock lines={['hermes chat -q "Hello Hermes"']} />

        <TerminalMock title="hermes test" lines={[
          { type: "prompt", text: 'hermes chat -q "Hello Hermes"' },
          { type: "dim", text: "  Connecting to model provider..." },
          { type: "success", text: "  Hermes: Hello! I'm Hermes, your AI assistant." },
          { type: "success", text: "  How can I help you today?" },
        ]} />

        <MistakesBox items={[
          ["Missing API keys", "If you get an authentication error, go back and run hermes config to re-enter your API key."],
          ["Using the wrong model name", "Make sure the model name you entered during setup matches exactly what your provider expects."],
          ["Not restarting after config changes", "If you changed any config, close the terminal and reconnect before testing again."],
        ]} />
      </section>

      {/* ── Step 7: Keep it running ─────────────────────────────────────── */}
      <section className="space-y-5">
        <div className="space-y-1.5">
          <StepLabel num="07" />
          <h2 className="font-display text-[24px] font-bold uppercase tracking-[0.05em] text-charcoal">
            Keep Hermes Running After You Log Out
          </h2>
          <p className="font-sans text-[12.5px] leading-relaxed text-charcoal/55 max-w-2xl">
            By default, any process you start on a VPS stops the moment you disconnect. Use <strong className="text-charcoal/70">tmux</strong> to keep Hermes alive in a persistent session. Start a named session, run Hermes inside it, then detach without stopping the process.
          </p>
        </div>

        <CommandBlock lines={[
          "tmux new -s hermes",
          "hermes chat",
        ]} />

        <div className="rounded border border-panel-border bg-panel p-4 max-w-lg">
          <div className="font-mono text-[8px] uppercase tracking-widest text-charcoal/25 mb-3">// Key shortcut inside tmux</div>
          <div className="flex items-center gap-3">
            <kbd className="font-mono text-[10px] text-charcoal/60 border border-panel-border/60 bg-cream rounded px-2 py-1">Ctrl + B</kbd>
            <span className="text-charcoal/30 font-mono text-[9px]">then</span>
            <kbd className="font-mono text-[10px] text-charcoal/60 border border-panel-border/60 bg-cream rounded px-2 py-1">D</kbd>
            <span className="font-sans text-[11px] text-charcoal/45 ml-1">— detach from session without stopping it</span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <code className="font-mono text-[10px] text-gold/70 bg-cream border border-panel-border/40 rounded px-2 py-1">tmux attach -t hermes</code>
            <span className="font-sans text-[11px] text-charcoal/45">— come back later</span>
          </div>
        </div>

        <MistakesBox items={[
          ["Leaving Hermes in a plain SSH session", "If you run hermes without tmux and then close the terminal, the process stops. Always use tmux for long-running sessions."],
          ["Logging out and losing the session", "If you already lost the session, reconnect via SSH and start a new tmux session."],
          ["Assuming the process survives a disconnect", "SSH sessions do not survive disconnects unless you use a session manager like tmux or screen."],
        ]} />
      </section>

      {/* ── Troubleshooting ──────────────────────────────────────────────── */}
      <section className="space-y-5">
        <SectionDivider label="Troubleshooting" />
        <div className="space-y-1.5">
          <div className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-gold/50">// Common Problems & Fixes</div>
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
              problem: "SSH is not connecting",
              fix: "Double-check the IP address. Make sure your VPS is running (check the Hostinger panel). Try again after a few seconds — the server may still be starting up.",
            },
            {
              problem: "The install script fails",
              fix: "Run the update commands again first (Step 3), then retry the install. A missing dependency is usually the cause.",
            },
            {
              problem: "Hermes cannot find a model",
              fix: "Run hermes config and check that the model name is spelled correctly and matches what your provider supports.",
            },
            {
              problem: "Provider authentication errors",
              fix: "Your API key is wrong or expired. Go to your provider's dashboard, generate a new key, and run hermes config to update it.",
            },
            {
              problem: "Config changes are not taking effect",
              fix: "Close your terminal completely, reconnect via SSH, and try again. Some config changes require a fresh session to apply.",
            },
          ].map(({ problem, fix }) => (
            <div key={problem} className="rounded border border-panel-border bg-panel p-4 flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <Terminal className="h-3.5 w-3.5 text-gold/40 flex-shrink-0 mt-0.5" />
                <span className="font-sans text-[12.5px] font-bold text-charcoal/80 leading-snug">{problem}</span>
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
            Sometimes seeing the full process in video form makes it click. These videos cover the same steps from a different angle.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((v) => (
            <a
              key={v.id}
              href={`https://www.youtube.com/watch?v=${v.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded border border-panel-border bg-panel overflow-hidden transition-all duration-300 hover:border-forest/50"
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
