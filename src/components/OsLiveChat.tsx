'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CheckCircle2, Headphones, MessageSquareText, Send, UserCheck, X } from 'lucide-react';
import { useLocaleCurrency } from '@/components/LocaleCurrencyContext';
import { SITE, waLink } from '@/data/site';
import { trackEvent } from '@/lib/analytics';

type ChatMessage = {
  id: string;
  sender: 'visitor' | 'desk';
  text: string;
  time: string;
  synced?: boolean;
};

const STORAGE_KEY = 'bw_os_live_chat_v1';

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Dedicated Betterway OS Live Chat Widget — anchored on the OPPOSITE side (`start-5 bottom-5`)
 * from the CoPilot widget (`end-5 bottom-5`), syncing live visitor threads directly to Betterway OS.
 */
export default function OsLiveChat() {
  const pathname = usePathname() || '/';
  const { locale, ext } = useLocaleCurrency();
  const reduce = useReducedMotion();
  const c = ext.liveChat;

  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [handoffSent, setHandoffSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [osConnected, setOsConnected] = useState(false);
  const [refCode, setRefCode] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { sessionId?: string; messages?: ChatMessage[]; refCode?: string };
        if (parsed.sessionId) setSessionId(parsed.sessionId);
        if (Array.isArray(parsed.messages) && parsed.messages.length > 0) setMessages(parsed.messages);
        if (parsed.refCode) setRefCode(parsed.refCode);
        return;
      }
    } catch {}
    const sid = `bw_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
    setSessionId(sid);
  }, []);

  useEffect(() => {
    if (!sessionId || messages.length === 0) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ sessionId, messages: messages.slice(-24), refCode }));
    } catch {}
  }, [sessionId, messages, refCode]);

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [open, messages]);

  async function sendLiveMessage(textToSend: string, includeContact = false) {
    const trimmed = textToSend.trim();
    if (!trimmed && !includeContact) return;

    const userMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      sender: 'visitor',
      text: trimmed || `${name || 'Client'} · ${phone}`,
      time: nowTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setSending(true);

    try {
      const res = await fetch('/api/os/live-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          locale,
          page: pathname,
          message: trimmed || 'Requested direct Betterway OS Live Chat callback',
          name: name.trim() || undefined,
          phone: phone.trim() || undefined,
        }),
      });
      const data = (await res.json().catch(() => null)) as {
        ok?: boolean;
        syncedToOs?: boolean;
        referenceCode?: string;
        reply?: string | null;
      } | null;

      if (data?.referenceCode) setRefCode(data.referenceCode);
      if (data?.syncedToOs) setOsConnected(true);
      if (includeContact) setHandoffSent(true);

      const deskReply: ChatMessage = {
        id: `r_${Date.now()}`,
        sender: 'desk',
        text: data?.reply || c.replyDefault,
        time: nowTime(),
        synced: Boolean(data?.ok),
      };
      setMessages((prev) => [...prev, deskReply]);
      trackEvent('os_live_chat_message', { locale, page: pathname, synced: Boolean(data?.syncedToOs) });
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: `e_${Date.now()}`, sender: 'desk', text: c.replyDefault, time: nowTime(), synced: false },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* Dedicated Betterway OS Live Chat Launcher — Opposite Side (bottom-start) */}
      {!open && (
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            trackEvent('os_live_chat_open', { locale, page: pathname });
          }}
          aria-label={c.title}
          className="fixed bottom-5 start-5 z-40 inline-flex items-center gap-2.5 rounded-full border border-[#d7b158]/50 bg-white px-4 py-2.5 text-sm font-bold text-[#080b0f] shadow-[0_18px_40px_-14px_rgba(8,15,28,0.34)] transition duration-200 hover:-translate-y-0.5 hover:border-[#080b0f] hover:shadow-[0_24px_50px_-14px_rgba(8,15,28,0.45)] cursor-pointer max-sm:px-3.5 max-sm:py-2 max-sm:text-xs"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10b981] opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#0e6954]" />
          </span>
          <MessageSquareText size={16} className="text-[#080b0f]" />
          <span>{c.launcher}</span>
        </button>
      )}

      {/* Betterway OS Live Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={reduce ? false : { opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.97 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            aria-label={c.title}
            className="fixed bottom-5 start-5 z-50 flex w-[min(392px,calc(100vw-24px))] flex-col overflow-hidden rounded-[24px] border border-[#dce3ec] bg-white shadow-[0_36px_90px_-24px_rgba(8,15,28,0.45)]"
          >
            {/* Corporate Obsidian Live Chat Header */}
            <div className="flex items-center justify-between gap-3 bg-[#0b0f17] px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#f1d57e]/40 bg-white/10">
                  <img src="/brand/icon.png" alt="" width={24} height={24} className="h-6 w-6 object-contain" />
                  <span className="absolute -bottom-0.5 -end-0.5 h-3 w-3 rounded-full border-2 border-[#0b0f17] bg-[#10b981]" />
                </span>
                <div>
                  <p className="font-display text-sm font-bold leading-tight text-white">{c.title}</p>
                  <p className="mt-0.5 text-[11px] font-medium text-[#f1d57e]">{c.status}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close Live Chat"
                className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Live OS Sync Telemetry Bar */}
            <div className="flex items-center justify-between gap-2 border-b border-[#edf1f5] bg-[#f8fafc] px-4 py-2 text-[11px] font-semibold text-[#475569]">
              <span className="inline-flex items-center gap-1.5">
                <Headphones size={12} className="text-[#0e6954]" />
                Al Nasr Plaza · Oud Metha Desk
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#eef7f4] px-2 py-0.5 text-[10px] font-bold text-[#0e6954]">
                <CheckCircle2 size={10} />
                {refCode || c.syncedBadge}
              </span>
            </div>

            {/* Messages Thread */}
            <div ref={listRef} className="max-h-[300px] min-h-[210px] space-y-3 overflow-y-auto p-4 text-[13px]">
              {/* Welcome Bubble */}
              <div className="max-w-[88%] rounded-[16px] rounded-ts-sm border border-[#e6ebf0] bg-[#f8fafc] px-3.5 py-2.5 leading-relaxed text-[#1e293b]">
                {c.greeting}
              </div>

              {/* Quick Prompts when empty */}
              {messages.length === 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {c.quickPrompts.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => sendLiveMessage(q)}
                      className="rounded-full border border-[#d6dfe8] bg-white px-3 py-1.5 text-[11.5px] font-semibold text-[#080b0f] transition hover:border-[#080b0f] hover:bg-[#080b0f] hover:text-white cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'visitor' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-[16px] px-3.5 py-2.5 leading-relaxed ${
                      m.sender === 'visitor'
                        ? 'rounded-te-sm bg-[#0b0f17] text-white'
                        : 'rounded-ts-sm border border-[#e6ebf0] bg-[#f8fafc] text-[#1e293b]'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="mt-1 px-1 text-[10px] font-medium text-[#94a3b8]">
                    {m.time}
                    {m.synced ? ` · ${osConnected ? 'Betterway OS Live' : c.syncedBadge}` : ''}
                  </span>
                </div>
              ))}

              {sending && (
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f5f9] px-3 py-1.5 text-[11px] font-semibold text-[#475569]">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#080b0f]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#080b0f] [animation-delay:120ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#080b0f] [animation-delay:240ms]" />
                </div>
              )}
            </div>

            {/* Optional Direct OS Advisor Handoff Strip */}
            {messages.length > 0 && !handoffSent && (
              <div className="border-t border-[#edf1f5] bg-[#fbfcfd] px-4 py-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={c.namePlaceholder}
                    className="h-8 rounded-lg border border-[#d6dfe8] bg-white px-2.5 text-[11.5px] text-[#080b0f] outline-none focus:border-[#080b0f]"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={c.phonePlaceholder}
                    className="h-8 rounded-lg border border-[#d6dfe8] bg-white px-2.5 text-[11.5px] text-[#080b0f] outline-none focus:border-[#080b0f]"
                  />
                </div>
                <button
                  type="button"
                  disabled={!phone.trim() || sending}
                  onClick={() => sendLiveMessage(`Advisor callback requested: ${name || 'Client'} (${phone})`, true)}
                  className="mt-2 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-lg bg-[#0e6954] px-3 text-[11.5px] font-bold text-white transition hover:bg-[#0a5241] disabled:opacity-45 cursor-pointer"
                >
                  <UserCheck size={13} />
                  {c.connectDesk}
                </button>
              </div>
            )}

            {/* Message Input Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendLiveMessage(input);
              }}
              className="flex items-center gap-2 border-t border-[#e6ebf0] bg-white p-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={c.placeholder}
                aria-label={c.placeholder}
                className="h-10 flex-1 rounded-full border border-[#d6dfe8] bg-[#f8fafc] px-4 text-xs font-medium text-[#080b0f] outline-none focus:border-[#080b0f] focus:bg-white"
              />
              <button
                type="submit"
                disabled={!input.trim() || sending}
                aria-label={c.send}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0b0f17] text-white transition hover:bg-[#1e293b] disabled:opacity-40 cursor-pointer"
              >
                <Send size={15} />
              </button>
            </form>

            {/* Betterway OS Direct Portal Link Footer */}
            <div className="flex items-center justify-between border-t border-[#f1f5f9] bg-[#f8fafc] px-4 py-1.5 text-[10.5px] font-medium text-[#64748b]">
              <a href={SITE.osPortalUrl} rel="noopener" className="hover:text-[#080b0f] hover:underline">
                Powered by Betterway OS ↗
              </a>
              <a href={waLink('Hi Betterway Mortgages, continuing from Website Live Chat.')} rel="noopener" className="font-semibold text-[#0e6954] hover:underline">
                WhatsApp ↗
              </a>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
