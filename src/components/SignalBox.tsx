import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { addSignal, getSignals, Signal } from '@/utils/netlifyBlob';
import { fetchQuotes, pickRandomQuote } from '@/utils/quotes';
import { detectCountryCode, buildSignalLink, buildInviteLink } from '@/utils/geo';

const DEFAULT_QUOTE = 'Transparenz ist der erste Schritt zur Verantwortung.';

export default function SignalBox() {
  const [signals, setSignals] = useState<Signal[] | null>(null);
  const [message, setMessage] = useState<React.ReactNode | null>(null);
  const [sending, setSending] = useState(false);
  const [quote, setQuote] = useState<string>(DEFAULT_QUOTE);

  const loadSignals = async () => {
    try {
      const data = await getSignals();
      setSignals(data);
    } catch (error) {
      console.error(error);
      setMessage('❌ Fehler beim Laden der Signale.');
    }
  };

  useEffect(() => {
    void loadSignals();
    (async () => {
      const list = await fetchQuotes();
      const random = pickRandomQuote(list);
      if (random) setQuote(random.text);
    })();
  }, []);

  const handleSend = async () => {
    if (sending) return;
    setSending(true);
    try {
      const ref = new URLSearchParams(window.location.search).get('ref');
      const newSignal: Signal = {
        id: crypto.randomUUID(),
        quote: quote,
        timestamp: new Date().toISOString(),
        referrer: ref || null,
        countryCode: await detectCountryCode()
      };

      const updated = await addSignal(newSignal);
      setSignals(updated);
      setMessage(
        <div className="space-y-2">
          <div>
            ✅ Dein Signal wurde gespeichert.
          </div>
          <div>
            👉 <a
              href={`signal.html?id=${newSignal.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >Persönliche Signal-Seite öffnen</a>
            {' '}·{' '}
            <button
              onClick={async () => {
                const link = buildSignalLink(newSignal.id);
                try {
                  await navigator.clipboard.writeText(link);
                  alert('Signal-Link kopiert');
                } catch {
                  alert('Kopieren nicht möglich, Link wird in der Konsole angezeigt.');
                  console.log(link);
                }
              }}
              className="text-blue-600 underline"
            >kopieren</button>
          </div>
          <div className="text-sm text-gray-700">
            🔗 Andere einladen (Referral):
            {' '}
            <button
              onClick={async () => {
                const invite = buildInviteLink(newSignal.id);
                try {
                  await navigator.clipboard.writeText(invite);
                  alert('Einladungslink kopiert');
                } catch {
                  alert('Kopieren nicht möglich, Link wird in der Konsole angezeigt.');
                  console.log(invite);
                }
              }}
              className="text-blue-600 underline"
            >Einladungslink kopieren</button>
          </div>
        </div>
      );
    } catch (error) {
      console.error(error);
      setMessage('❌ Fehler beim Speichern.');
    } finally {
      setSending(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto shadow-xl">
      <CardContent className="space-y-4 text-center">
        <p id="quote" className="text-lg font-medium text-gray-800">
          {quote}
        </p>
        <Button onClick={handleSend} disabled={sending} className="min-w-48">
          {sending ? 'Sende…' : '✅ Ich sende mein Signal'}
        </Button>
        {message && (
          <div id="response" className="text-gray-700">
            {message}
          </div>
        )}
        {signals && (
          <p className="text-sm text-gray-600">
            🧠 Bisher gesendete Signale: <span id="counter">{signals.length}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
