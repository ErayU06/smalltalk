import { useEffect, useRef, useState } from 'react';

import type { Scenario } from '@/data/scenarios';

export type Message = {
  id: string;
  from: 'partner' | 'me';
  text: string;
};

const PARTNER_REPLY_DELAY_MS = 900;

/** Plays a scenario's scripted partner lines in response to the learner's replies. */
export function usePracticeSession(scenario: Scenario) {
  const [messages, setMessages] = useState<Message[]>(() => [
    { id: 'partner-0', from: 'partner', text: scenario.script[0] },
  ]);
  // Number of replies the learner has sent.
  const [turn, setTurn] = useState(0);
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timeout.current), []);

  const lastTurn = scenario.script.length - 1;
  const isFinished = turn >= lastTurn && !isPartnerTyping;

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || isPartnerTyping || turn >= lastTurn) return;

    const nextTurn = turn + 1;
    setMessages((prev) => [...prev, { id: `me-${nextTurn}`, from: 'me', text: trimmed }]);
    setTurn(nextTurn);
    setIsPartnerTyping(true);

    timeout.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `partner-${nextTurn}`, from: 'partner', text: scenario.script[nextTurn] },
      ]);
      setIsPartnerTyping(false);
    }, PARTNER_REPLY_DELAY_MS);
  }

  const suggestions = isPartnerTyping || isFinished ? [] : (scenario.suggestions[turn] ?? []);
  const learnerReplies = messages.filter((m) => m.from === 'me').map((m) => m.text);

  return { messages, send, suggestions, isPartnerTyping, isFinished, learnerReplies };
}
