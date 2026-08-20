'use client'

import { FormEvent, useState } from 'react'
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Handshake,
  Menu,
  MessageCircle,
  Send,
  Sparkles,
  Target,
  Users,
  X,
} from 'lucide-react'

const services = [
  { title: 'Business Consulting', text: 'Startup strategy, operational structure, and systems built to scale.', icon: BriefcaseBusiness },
  { title: 'Strategic Growth', text: 'Clear planning, revenue strategy, and focused execution.', icon: Target },
  { title: 'Procurement', text: 'Vendor registration, contracting readiness, and opportunity support.', icon: Check },
  { title: 'Branding & Visibility', text: 'Marketing direction, media strategy, and memorable positioning.', icon: Sparkles },
  { title: 'Leadership Development', text: 'Coaching, team development, workshops, and practical training.', icon: Users },
  { title: 'Event Production', text: 'Purpose-driven planning, management, and event strategy.', icon: Target },
  { title: 'Community Engagement', text: 'Outreach programs and partnerships that create lasting impact.', icon: Handshake },
  { title: 'Sponsorship Development', text: 'Sponsorship packages, partner outreach, and activation support.', icon: BriefcaseBusiness },
]

const quickQuestions = ['Which service fits me?', 'Do you help startups?', 'How do I get started?']

function getReply(question: string) {
  const value = question.toLowerCase()
  if (value.includes('startup') || value.includes('business')) return 'Yes. Business Consulting is designed for founders who need help with strategy, structure, operations, or launch readiness. Use the contact form to tell us where you are in your journey.'
  if (value.includes('service') || value.includes('fit')) return 'If your challenge is internal structure, choose Business Consulting. For revenue and expansion, choose Strategic Growth. For public presence, choose Branding & Visibility. We can also help you choose during a discovery conversation.'
  if (value.includes('start') || value.includes('contact') || value.includes('book')) return 'Start with the contact form below. Share your goal and the support you need, and Black 2 Black Consulting can follow up about the best next step.'
  if (value.includes('event')) return 'Event Production includes planning, management, and strategy for experiences that support your business or community goals.'
  if (value.includes('price') || value.includes('cost')) return 'Services are tailored to each project. Send a short description of your goals through the contact form to request a personalized quote.'
  return 'I can help with questions about services, startups, events, pricing, or how to get started. For a personalized answer, send your details through the contact form.'
}

function ChatBox() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { from: 'assistant', text: 'Welcome to Black 2 Black Consulting. What can I help you build today?' },
  ])

  function ask(question: string) {
    const clean = question.trim()
    if (!clean) return
    setMessages((current) => [...current, { from: 'user', text: clean }, { from: 'assistant', text: getReply(clean) }])
    setInput('')
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <section aria-label="Consulting assistant" className="flex h-[min(26rem,calc(100vh-7rem))] w-[min(20rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl">
          <header className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-accent text-accent-foreground"><MessageCircle size={18} /></span>
              <div><p className="font-bold">B2B Assistant</p><p className="text-sm opacity-75">Instant service guide</p></div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-full p-2 transition hover:bg-primary-foreground/10"><X size={18} /></button>
          </header>
          <div aria-live="polite" className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={`${message.from}-${index}`} className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.from === 'user' ? 'self-end bg-accent text-accent-foreground' : 'self-start bg-muted text-foreground'}`}>
                {message.text}
              </div>
            ))}
          </div>
          {messages.length < 3 && <div className="flex flex-wrap gap-2 px-4 pb-3">{quickQuestions.map((question) => <button key={question} onClick={() => ask(question)} className="rounded-full border border-border px-3 py-2 text-xs font-semibold text-muted-foreground transition hover:border-accent hover:text-foreground">{question}</button>)}</div>}
          <form onSubmit={(event) => { event.preventDefault(); ask(input) }} className="flex gap-2 border-t border-border p-3">
            <label htmlFor="chat-message" className="sr-only">Ask a question</label>
            <input id="chat-message" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && (event.nativeEvent.isComposing || event.keyCode === 229)) event.preventDefault() }} placeholder="Ask about our services..." className="min-w-0 flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
            <button type="submit" aria-label="Send message" className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground transition hover:brightness-95"><Send size={17} /></button>
          </form>
        </section>
      )}
      <button onClick={() => setOpen((value) => !value)} aria-expanded={open} className="flex items-center gap-3 rounded-full bg-accent px-5 py-3 font-bold text-accent-foreground shadow-xl transition hover:-translate-y-0.5">
        {open ? <X size={20} /> : <MessageCircle size={20} />}<span>{open ? 'Close' : 'Let’s talk'}</span>
      </button>
    </div>
  )
}

function ContactForm() {
  const [sent, setSent] = useState(false)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Consulting inquiry from ${data.get('name')}`)
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}\n\n${data.get('message')}`)
    setSent(true)
    window.location.href = `mailto:black2blackconsulting@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5 rounded-3xl bg-card p-6 text-card-foreground shadow-xl md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-bold">Your name<input name="name" required autoComplete="name" placeholder="Jane Smith" className="rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-ring" /></label>
        <label className="flex flex-col gap-2 text-sm font-bold">Email address<input name="email" type="email" required autoComplete="email" placeholder="jane@company.com" className="rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-ring" /></label>
      </div>
      <label className="flex flex-col gap-2 text-sm font-bold">How can we help?<select name="service" defaultValue="" required className="rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-ring"><option value="" disabled>Select a service</option>{services.map((service) => <option key={service.title}>{service.title}</option>)}</select></label>
      <label className="flex flex-col gap-2 text-sm font-bold">Tell us about your goals<textarea name="message" required rows={5} placeholder="What are you building, improving, or preparing for?" className="resize-none rounded-xl border border-input bg-background px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-ring" /></label>
      <button type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-4 font-extrabold text-accent-foreground transition hover:brightness-95">Send inquiry <ArrowRight size={18} /></button>
      {sent && <p role="status" className="text-center text-sm text-muted-foreground">Your email app has been opened with your inquiry ready to send.</p>}
    </form>
  )
}

export function ConsultingLanding() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-20">
        <nav aria-label="Main navigation" className="mx-auto mt-3 flex max-w-7xl items-center justify-between rounded-2xl bg-card/95 px-5 py-3 text-card-foreground shadow-sm backdrop-blur lg:px-6">
          <a href="#top" className="flex items-center gap-3 font-extrabold tracking-tight"><span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">B2B</span><span>Black 2 Black<br /><span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Consulting</span></span></a>
          <div className="hidden items-center gap-8 md:flex"><a href="#services" className="text-sm font-semibold hover:text-accent">Services</a><a href="#about" className="text-sm font-semibold hover:text-accent">About</a><a href="#contact" className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">Start a conversation</a></div>
          <button onClick={() => setMenuOpen((value) => !value)} className="rounded-lg border border-border p-2 md:hidden" aria-label="Toggle navigation"><Menu size={22} /></button>
        </nav>
        {menuOpen && <div className="mx-5 flex flex-col gap-4 rounded-2xl border border-border bg-popover p-5 shadow-xl md:hidden"><a href="#services" onClick={() => setMenuOpen(false)}>Services</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></div>}
      </header>

      <section id="top" className="relative flex min-h-[760px] items-center pt-28">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-primary" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.15fr_.85fr] lg:px-8">
          <div className="flex flex-col items-start gap-7">
            <p className="font-mono text-sm font-bold uppercase tracking-[0.22em] text-accent">Business • Leadership • Community</p>
            <h1 className="max-w-3xl text-balance text-5xl font-black leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">Strategy that moves your vision <span className="text-accent">forward.</span></h1>
            <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">We help founders, leaders, and organizations turn ambitious ideas into clear plans, stronger systems, and meaningful impact.</p>
            <div className="flex flex-wrap gap-3"><a href="#contact" className="flex items-center gap-2 rounded-full bg-accent px-6 py-4 font-extrabold text-accent-foreground">Build with us <ArrowRight size={18} /></a><a href="#services" className="rounded-full border border-border px-6 py-4 font-bold">Explore services</a></div>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border-8 border-card bg-card shadow-2xl"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Black_2_Black_Consulting_Services_Flyer-pW48YaGs183BXAlYsb0xl0r2bb4L8m.png" alt="Black 2 Black Consulting services overview" className="aspect-square w-full object-cover object-top" /></div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-primary py-24 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 lg:px-8">
          <div className="flex max-w-3xl flex-col gap-4"><p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-accent">What we do</p><h2 className="text-balance text-4xl font-black tracking-tight sm:text-5xl">The right strategy for your next move.</h2><p className="text-lg leading-relaxed text-primary-foreground/65">Focused support for every stage—from an early idea to a growing organization.</p></div>
          <div className="grid gap-px overflow-hidden rounded-3xl bg-primary-foreground/15 md:grid-cols-2">{services.map(({ title, text, icon: Icon }) => <article key={title} className="group flex min-h-52 flex-col justify-between gap-8 bg-primary p-7 transition hover:bg-primary-foreground/5 md:p-9"><div className="flex items-start justify-between"><span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground"><Icon size={20} /></span><ChevronRight className="text-primary-foreground/30 transition group-hover:translate-x-1 group-hover:text-accent" /></div><div className="flex flex-col gap-2"><h3 className="text-2xl font-extrabold">{title}</h3><p className="leading-relaxed text-primary-foreground/60">{text}</p></div></article>)}</div>
        </div>
      </section>

      <section id="about" className="py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <div className="flex flex-col gap-6"><p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-accent">Purpose meets action</p><h2 className="text-balance text-4xl font-black tracking-tight sm:text-5xl">Your vision deserves more than a template.</h2></div>
          <div className="flex flex-col gap-6 text-lg leading-relaxed text-muted-foreground"><p>Black 2 Black Consulting provides practical, tailored guidance grounded in your goals. We listen first, identify what matters most, and create a path you can act on.</p><p>Whether you are launching, restructuring, expanding your reach, or strengthening your community impact, we help you move with clarity and purpose.</p><a href="#contact" className="flex items-center gap-2 font-extrabold text-foreground">Tell us what you&apos;re building <ArrowRight size={18} /></a></div>
        </div>
      </section>

      <section id="contact" className="bg-secondary py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 lg:grid-cols-[.75fr_1.25fr] lg:px-8">
          <div className="flex flex-col gap-6 lg:sticky lg:top-8"><p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-accent">Let&apos;s connect</p><h2 className="text-balance text-4xl font-black tracking-tight sm:text-5xl">Ready to move forward?</h2><p className="text-lg leading-relaxed text-muted-foreground">Share a little about your vision. Your email app will open with your message ready to send—no account or subscription required.</p><p className="font-bold">@Black 2 Black Consulting</p></div>
          <ContactForm />
        </div>
      </section>

      <footer className="bg-primary py-10 text-primary-foreground"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between lg:px-8"><p className="font-extrabold">Black 2 Black Consulting</p><p className="text-sm text-primary-foreground/60">Strategy with purpose. Growth with impact.</p></div></footer>
      <ChatBox />
    </main>
  )
}
