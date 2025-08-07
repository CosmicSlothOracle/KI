import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { addSignal, getSignals, Signal } from '@/utils/netlifyBlob';

const QUOTE = 'Transparenz ist der erste Schritt zur Verantwortung.';

export default function SignalBox() {
  const [signals, setSignals] = useState<Signal[] | null>(null);
  const [message, setMessage] = useState<React.ReactNode | null>(null);
  const [sending, setSending] = useState(false);

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
  }, []);

  const handleSend = async () => {
    if (sending) return;
    setSending(true);
    try {
      const ref = new URLSearchParams(window.location.search).get('ref');
      const newSignal: Signal = {
        id: crypto.randomUUID(),
        quote: QUOTE,
        timestamp: new Date().toISOString(),
        referrer: ref || null
      };

      const updated = await addSignal(newSignal);
      setSignals(updated);
      setMessage(
        <span>
          ✅ Dein Signal wurde gespeichert.<br />
          👉 <a
            href={`signal.html?id=${newSignal.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >Hier ist dein persönlicher Signal-Link</a>
        </span>
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
          {QUOTE}
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
