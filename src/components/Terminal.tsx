import { useState, useEffect, useRef, useCallback } from 'react';

const COMMANDS: Record<string, string | null> = {
  help: `Available commands:
  work     — scroll to work & projects
  skills   — scroll to technical skills
  blog     — open blog
  contact  — scroll to contact
  clear    — clear the terminal`,
  work: null,
  skills: null,
  blog: null,
  contact: null,
  clear: null,
};

interface Line {
  type: 'input' | 'output' | 'error';
  text: string;
}

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<Line[]>([{ type: 'output', text: 'Type "help" to see available commands.' }]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '`' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
          e.preventDefault();
          setOpen(o => !o);
        }
      }
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const run = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    setLines(prev => [...prev, { type: 'input', text: cmd }]);
    setInput('');

    if (!trimmed) return;

    if (trimmed === 'clear') {
      setLines([]);
      return;
    }

    if (trimmed === 'blog') {
      setLines(prev => [...prev, { type: 'output', text: 'Opening blog...' }]);
      setTimeout(() => { window.location.href = '/blog'; }, 400);
      return;
    }

    const navTargets: Record<string, string> = {
      work: '#work',
      skills: '#skills',
      contact: '#contact',
    };

    if (navTargets[trimmed]) {
      const el = document.querySelector(navTargets[trimmed]);
      if (el) {
        setLines(prev => [...prev, { type: 'output', text: `Navigating to ${trimmed}...` }]);
        close();
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
      }
      return;
    }

    if (trimmed === 'help') {
      setLines(prev => [...prev, { type: 'output', text: COMMANDS.help as string }]);
      return;
    }

    setLines(prev => [...prev, { type: 'error', text: `Unknown command: ${trimmed}. Type "help" for available commands.` }]);
  }, [close]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') run(input);
  };

  if (!open) {
    return (
      <button
        aria-label="Open terminal"
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 200,
          background: '#111',
          color: '#4ade80',
          border: 'none',
          borderRadius: '4px',
          padding: '0.45rem 0.75rem',
          fontFamily: 'monospace',
          fontSize: '0.8rem',
          fontWeight: 600,
          cursor: 'pointer',
          letterSpacing: '0.05em',
          opacity: 0.6,
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
      >
        &gt;_
      </button>
    );
  }

  return (
    <>
      <div
        onClick={close}
        style={{
          position: 'fixed', inset: 0, zIndex: 198,
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(2px)',
        }}
      />
      <div
        role="dialog"
        aria-label="Terminal"
        style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 199,
          width: 'min(660px, calc(100vw - 2rem))',
          maxHeight: '70vh',
          background: '#0d0d0d',
          borderRadius: '8px',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          fontFamily: "'Menlo', 'Consolas', 'Monaco', monospace",
        }}
      >
        <div style={{ padding: '0.6rem 1rem', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => (
            <span key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c, display: 'inline-block' }} />
          ))}
          <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: '#555', letterSpacing: '0.05em' }}>em — terminal</span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {lines.map((line, i) => (
            <div key={i} style={{
              fontSize: '0.82rem',
              lineHeight: 1.55,
              color: line.type === 'input' ? '#e5e5e5' : line.type === 'error' ? '#f87171' : '#4ade80',
              whiteSpace: 'pre-wrap',
            }}>
              {line.type === 'input' && <span style={{ color: '#6b7280', marginRight: '0.4rem' }}>~&gt;</span>}
              {line.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 1rem', borderTop: '1px solid #1a1a1a' }}>
          <span style={{ color: '#6b7280', fontSize: '0.82rem', marginRight: '0.4rem', flexShrink: 0 }}>~&gt;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#e5e5e5',
              fontFamily: 'inherit',
              fontSize: '0.82rem',
              caretColor: '#4ade80',
            }}
          />
        </div>
      </div>
    </>
  );
}
