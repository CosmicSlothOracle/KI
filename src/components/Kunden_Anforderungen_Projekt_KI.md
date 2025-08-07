🌐 PROJEKTBRIEFING
Titel: KI-Quiz mit öffentlichem Signalsystem
Kunde: [Name einsetzen]
Umfang: Interaktive Aufklärungsseite mit Beteiligungssystem gegen unkontrollierte KI-Entwicklung

1. 🎯 ZIEL DER WEBSEITE
   Die Webseite führt Besucher:innen durch ein kurzes, visuell unterstütztes Quiz zum Thema „Künstliche Intelligenz und Gesellschaft“.
   Anschließend können Nutzer:innen ein öffentlich sichtbares „Signal“ senden – als Zeichen ihres Bewusstseins und ihrer Haltung.
   Diese Signale werden gezählt, verortet und weiterteilbar gemacht. Ziel ist es, eine globale Welle der Sichtbarkeit auszulösen.

2. 📄 SEITENAUFBAU UND NAVIGATION
3. Startseite / Quizseite (index.html)
   Kurze Einleitung zum Thema

5–10 Fragen mit einfachen Antwortoptionen (kein Richtig/Falsch)

Zu jeder Frage gehört ein visuelles Bild (PNG), das vom Kunden gestellt wird

Nach dem Quiz:

Anzeige eines zufällig ausgewählten Zitats zum Thema KI und Ethik

Button „Ich sende mein Signal“

Danach erscheint:

Persönlicher Link zum eigenen Signal

Öffentlicher Zähler mit aktueller Signalanzahl

Möglichkeit, das Signal zu teilen (z. B. per Link)

2. Signal-Seite (signal.html)
   Darstellung des individuellen Signals:

Das persönliche Zitat

Das Datum/Uhrzeit des Signals

Optional: Wer eingeladen hat (Referral)

Aufforderung zur Weitergabe

3. Weltkarte (z. B. map.html)
   Interaktive Karte, die zeigt:

Von welchen Regionen der Welt bereits Signale gesendet wurden

Jeder Punkt steht für eine echte Aktion

Karte aktualisiert sich automatisch mit neuen Signalen

Farben oder Größen können anzeigen, wo besonders viele Signale eingegangen sind

3. 📦 BEREITGESTELLTE INHALTE DURCH DEN KUNDEN
   Fragenkatalog mit Antworten (als Textdatei oder Tabelle)

Ein passendes PNG-Bild pro Frage im Ordner /assets/

Zitat-Pool für das Signalsystem (10–20 Texte)

Optional: Textvorschläge für Einleitung, Footer, Impressum etc.

4. 🔐 DATENSCHUTZ & TECHNISCHE ANFORDERUNGEN
   Keine Anmeldung oder personenbezogenen Daten erforderlich

Kein Tracking, keine Cookies

Datenschutzkonform nach europäischen Standards

Das System basiert auf einer einfachen, zentral verwalteten Datenspeicherung
(intern durch das Hosting-System verwaltet; keine separate Datenbank notwendig)

Alle Informationen werden dauerhaft gespeichert und sind öffentlich sichtbar, aber anonym

5. 🔄 INTERAKTION & VIRALE VERBREITUNG
   Jede:r erhält nach Teilnahme einen eindeutigen Link zum eigenen Signal

Dieser Link kann öffentlich geteilt werden

Wer über diesen Link teilnimmt, erzeugt eine sichtbare Verbindung („Weiterempfohlen von…“)

Dadurch entsteht eine Kette oder Welle von Verbindungen, die verfolgt werden kann

6. 🌍 INTERAKTIVE WELTKARTE (zentrale Komponente)
   Zeigt alle eingegangenen Signale als Punkte auf einer Weltkarte

Punkte sind anonym, aber eindeutig

Die Karte vermittelt visuell die globale Dimension der Beteiligung

Optional:

Farbcodierung nach Region oder Zeit

Zähler pro Kontinent oder Land

Tooltip mit Datum und Zitat (nur falls gewünscht)

7. 📱 DESIGNANFORDERUNGEN
   Mobile First: Optimale Darstellung auf Smartphones

Aufgeräumtes, reduziertes Design

Großzügige Schriftgrößen, klare Kontraste

Hochwertige Typografie, zurückhaltende Farbpalette

Bilder sollen prominent und stimmungsvoll wirken

8. ✅ ERFOLGSKRITERIEN (Qualitätskontrolle)
   Testfall Ziel
   T1 Quiz kann problemlos durchlaufen werden
   T2 Passende Bilder werden angezeigt
   T3 Signal kann gesendet werden
   T4 Nutzer erhält persönlichen Link
   T5 Zähler steigt korrekt mit jedem Signal
   T6 Weltkarte zeigt neue Signale korrekt an
   T7 Links sind teilbar, führen auf persönliche Seite
   T8 Referral wird korrekt erkannt und angezeigt
