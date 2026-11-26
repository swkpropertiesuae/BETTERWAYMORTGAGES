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
 * Betterway OS Live Chat Engine — syncs visitor messages directly into Betterway OS v3
 * via POST /api/os/live-chat. Renders cleanly embedded inside ExecutiveConciergeDock
 * or standalone when embedded=false.
 */
export default function OsLiveChat({ embedded = false }: { embedded?: boolean }) {
  const pathname = usePathname() || '/';
  const { locale, ext } = useLocaleCurrency();
  const reduce = useReducedMotion();
  const c = ext.liveChat;

  const [open, setOpen] = useState(embedded);
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
    if ((embedded || open) && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [embedded, open, messages]);

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

  const chatBody = (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Live OS Sync Telemetry Bar */}
      <div className="flex items-center justify-between gap-2 border-b border-[#e3e7ee] bg-[#f7f8fa] px-4 py-2 text-[11px] font-medium text-[#4a5568]">
        <span className="inline-flex items-center gap-1.5">
          <Headphones size={12} className="text-[#0e6954]" />
          Al Nasr Plaza · Oud Metha Desk
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#edf7f4] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#0e6954]">
          <CheckCircle2 size={10} />
          {refCode || c.syncedBadge}
        </span>
      </div>

      {/* Messages Thread */}
      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-white p-4 text-[13px]">
        <div className="max-w-[88%] rounded-[14px] rounded-ts-sm border border-[#e3e7ee] bg-[#f7f8fa] px-3.5 py-2.5 leading-relaxed text-[#0b1320]">
          {c.greeting}
        </div>

        {messages.length === 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {c.quickPrompts.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => sendLiveMessage(q)}
                className="rounded-full border border-[#d6dce6] bg-white px-3 py-1.5 text-[11.5px] font-medium text-[#070e1a] transition hover:border-[#070e1a] hover:bg-[#070e1a] hover:text-white cursor-pointer"
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
              className={`max-w-[88%] rounded-[14px] px-3.5 py-2.5 leading-relaxed ${
                m.sender === 'visitor'
                  ? 'rounded-te-sm bg-[#070e1a] text-white'
                  : 'rounded-ts-sm border border-[#e3e7ee] bg-[#f7f8fa] text-[#0b1320]'
              }`}
            >
              {m.text}
            </div>
            <span className="mt-1 px-1 font-mono text-[10px] text-[#64748b]">
              {m.time}
              {m.synced ? ` · ${osConnected ? 'Betterway OS Live' : c.syncedBadge}` : ''}
            </span>
          </div>
        ))}

        {sending && (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f7f8fa] px-3 py-1.5 text-[11px] font-semibold text-[#4a5568]">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#070e1a]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#070e1a] [animation-delay:120ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#070e1a] [animation-delay:240ms]" />
          </div>
        )}
      </div>

      {/* Optional Direct OS Advisor Handoff Strip */}
      {messages.length > 0 && !handoffSent && (
        <div className="border-t border-[#e3e7ee] bg-[#f7f8fa] px-4 py-2.5">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={c.namePlaceholder}
              className="h-8 rounded-[8px] border border-[#d6dce6] bg-white px-2.5 text-[11.5px] text-[#070e1a] outline-none focus:border-[#070e1a]"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={c.phonePlaceholder}
              className="h-8 rounded-[8px] border border-[#d6dce6] bg-white px-2.5 text-[11.5px] text-[#070e1a] outline-none focus:border-[#070e1a]"
            />
          </div>
          <button
            type="button"
            disabled={!phone.trim() || sending}
            onClick={() => sendLiveMessage(`Advisor callback requested: ${name || 'Client'} (${phone})`, true)}
            className="mt-2 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-[8px] bg-[#0e6954] px-3 text-[11.5px] font-semibold text-white transition hover:bg-[#0a4a3e] disabled:opacity-45 cursor-pointer"
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
        className="flex items-center gap-2 border-t border-[#e3e7ee] bg-white p-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={c.placeholder}
          aria-label={c.placeholder}
          className="h-10 flex-1 rounded-[10px] border border-[#d6dce6] bg-[#f7f8fa] px-3.5 text-xs font-medium text-[#070e1a] outline-none focus:border-[#070e1a] focus:bg-white"
        />
        <button
          type="submit"
          disabled={!input.trim() || sending}
          aria-label={c.send}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-[#070e1a] text-white transition hover:bg-[#101c31] disabled:opacity-40 cursor-pointer"
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );

  if (embedded) return chatBody;

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            trackEvent('os_live_chat_open', { locale, page: pathname });
          }}
          aria-label={c.title}
          className="fixed bottom-5 start-5 z-40 inline-flex items-center gap-2.5 rounded-full border border-[#d7b158]/45 bg-[#070e1a] px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 cursor-pointer"
        >
          <span className="bw-live-dot" />
          <MessageSquareText size={15} />
          <span>{c.launcher}</span>
        </button>
      )}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={reduce ? false : { opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            aria-label={c.title}
            className="fixed bottom-5 start-5 z-50 flex h-[min(520px,78dvh)] w-[min(392px,calc(100vw-24px))] flex-col overflow-hidden rounded-[20px] border border-[#e3e7ee] bg-white shadow-[0_32px_80px_-24px_rgba(7,14,26,0.42)]"
          >
            <div className="flex items-center justify-between gap-3 bg-[#070e1a] px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <img src="/brand/icon.png" alt="" width={24} height={24} className="h-6 w-6 object-contain" />
                <div>
                  <p className="font-display text-sm font-semibold leading-tight text-white">{c.title}</p>
                  <p className="mt-0.5 text-[11px] text-[#fcf1b7]">{c.status}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close Live Chat"
                className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-white/80 hover:bg-white/20 hover:text-white cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>
            {chatBody}
            <div className="flex items-center justify-between border-t border-[#e3e7ee] bg-[#f7f8fa] px-4 py-1.5 text-[10.5px] font-medium text-[#4a5568]">
              <a href={SITE.osPortalUrl} rel="noopener" className="hover:text-[#070e1a] hover:underline">
                Betterway OS ↗
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
