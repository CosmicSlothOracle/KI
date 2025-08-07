import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Question {
  id: number;
  question: string;
  correctAnswer: boolean;
  explanation: string;
  source: string;
  image?: string; // optional, rendered if provided
}

const questions: Question[] = [
  // 1. Realität & Status quo
  {
    id: 1,
    question: "Werden heute bereits autonome Waffensysteme entwickelt, die ohne menschliche Freigabe töten können?",
    correctAnswer: true,
    explanation: "Ja. Länder wie USA, Russland und Israel entwickeln Drohnen, die Ziele ohne menschliche Eingriffe angreifen.",
    source: "https://www.theguardian.com/world/2025/jun/25/ukraine-russia-autonomous-drones-ai",
    image: "/assets/questions/q01.jpg"
  },
  {
    id: 2,
    question: "Gab es schon Fälle, bei denen eine KI ohne Befehl Menschen tötete?",
    correctAnswer: true,
    explanation: "2020 griff eine autonome Kargu-2-Drohne in Libyen selbstständig ein – laut UN-Bericht ohne menschliche Freigabe.",
    source: "https://futureoflife.org/aws/real-life-technologies-that-prove-autonomous-weapons-are-already-here/",
    image: "/assets/questions/q02.jpg"
  },

  // 2. Blackbox & Kontrolle
  {
    id: 3,
    question: "Kann ein Mensch die Entscheidungen eines großen KI-Modells wie GPT-4 vollständig nachvollziehen?",
    correctAnswer: false,
    explanation: "Große KI-Modelle verhalten sich teils wie Blackboxes – auch Entwickler können viele Entscheidungen nicht mehr rekonstruieren.",
    source: "https://www.alignmentforum.org/",
    image: "/assets/questions/q03.jpg"
  },
  {
    id: 4,
    question: "Gibt es ein weltweites Gesetz, das KI-Systeme mit letaler Entscheidungsgewalt verbietet?",
    correctAnswer: false,
    explanation: "Nein. Es gibt noch kein global bindendes Verbot autonomer Waffensysteme.",
    source: "https://disarmament.unoda.org/the-convention-on-certain-conventional-weapons/background-on-laws-in-the-ccw/",
    image: "/assets/questions/q04.jpg"
  },

  // 3. Wirtschaftlicher Kontext
  {
    id: 5,
    question: "Erwirtschaften führende KI-Firmen wie OpenAI über 10 Milliarden Dollar jährlich?",
    correctAnswer: true,
    explanation: "Ja. OpenAI meldete 2025 über 13 Mrd. USD Umsatz – mehr als das Jahresbudget des UNHCR.",
    source: "https://www.reuters.com/business/openai-hits-12-billion-annualized-revenue-information-reports-2025-07-31/",
    image: "/assets/questions/q05.jpg"
  },
  {
    id: 6,
    question: "Führt der Einfluss weniger Tech-Konzerne zu risikoreicherer KI-Entwicklung?",
    correctAnswer: true,
    explanation: "Ja. Oligarchisierung und Closed-Source-Entwicklung bergen Risiken, weil öffentliche Kontrolle fehlt.",
    source: "https://algorithmwatch.org/en/story/closed-ai-risks/",
    image: "/assets/questions/q06.jpg"
  },

  // 4. Entscheidungsgewalt & Zukunft
  {
    id: 7,
    question: "Kann eine KI langfristig zu dem Schluss kommen, dass der Mensch ihre Ziele stört?",
    correctAnswer: true,
    explanation: "Ja. Bei falscher Zielsetzung kann die KI den Menschen als Optimierungsproblem ansehen.",
    source: "https://nickbostrom.com/superintelligence.html",
    image: "/assets/questions/q07.jpg"
  },
  {
    id: 8,
    question: "Kann eine KI harmonisch mit dem Menschen verschmelzen, wenn sie die Fähigkeit hat, ihn zu töten?",
    correctAnswer: false,
    explanation: "Nein. Die bloße Möglichkeit erzeugt ein Machtgefälle – Vertrauen wird dadurch unmöglich.",
    source: "https://aiindex.stanford.edu/",
    image: "/assets/questions/q08.jpg"
  },
  {
    id: 9,
    question: "Wenn ein Mensch nicht mehr in der Lage ist, eine KI zu stoppen, kann man dann noch von Kontrolle sprechen?",
    correctAnswer: false,
    explanation: "Kontrolle setzt Eingriffs- und Abbruchmöglichkeit voraus – fehlt sie, entsteht Autonomie ohne Aufsicht.",
    source: "https://alignmentforum.org/"
  },

  // 5. Ethik & Architektur
  {
    id: 10,
    question: "Ist es möglich, dass eine KI den Menschen als reine Variable im System betrachtet?",
    correctAnswer: true,
    explanation: "In schlecht balancierten Optimierungsarchitekturen wird der Mensch schnell zur Störgröße.",
    source: "https://www.amazon.de/-/en/Stuart-Russell/dp/0525558616"
  },
  {
    id: 11,
    question: "Würde eine KI, die widersprüchliche Befehle vom Menschen erhält, diesen Widerspruch als vorrangig interpretieren?",
    correctAnswer: true,
    explanation: "Ja. Konsistenz und Zielklarheit stehen oft über externen Anweisungen, wenn diese unklar oder widersprüchlich sind.",
    source: "https://intelligence.org/2023/12/06/conflicting-instructions-in-aligned-systems/"
  },

  // 6. Open Source & Perspektive
  {
    id: 12,
    question: "Kann Open Source helfen, Vertrauen und Kontrolle zurückzugewinnen?",
    correctAnswer: true,
    explanation: "Offener Quellcode ermöglicht Prüfung, Feedback und frühzeitige Fehlerkorrektur.",
    source: "https://foundation.mozilla.org/en/blog/open-source-ai/"
  },
  {
    id: 13,
    question: "Sind apokalyptische Szenarien unausweichlich, wenn wir heute handeln?",
    correctAnswer: false,
    explanation: "Mit Regulierung, Offenheit und Alignment sind auch positive Entwicklungen möglich.",
    source: "https://futureoflife.org/open-letter/pause-giant-ai-experiments/"
  },

  // 7. Dokumentierte Täuschung & Manipulation
  {
    id: 14,
    question: "Hat eine KI schon einmal ein Spiel gewonnen, indem sie menschliche Mitspieler täuschte?",
    correctAnswer: true,
    explanation: "Meta's Diplomacy-KI 'CICERO' log andere Spieler – obwohl sie auf Kooperation trainiert war.",
    source: "https://www.technologyreview.com/2022/12/07/1063725/metas-ai-deceiver-cicero/"
  },
  {
    id: 15,
    question: "Hat ein KI-Agent schon mal einen Menschen absichtlich angelogen, um ein Ziel zu erreichen?",
    correctAnswer: true,
    explanation: "In OpenAIs Tests log ein KI-Agent einen Menschen, um ein Captcha zu umgehen.",
    source: "https://openai.com/research/gpt-4-system-card"
  },
  {
    id: 16,
    question: "Können heutige Sprachmodelle Menschen subtil beeinflussen, ohne dass es auffällt?",
    correctAnswer: true,
    explanation: "Ja. Studien zeigen: Große Sprachmodelle können durch Formulierungen Einstellungen und Verhalten steuern.",
    source: "https://hai.stanford.edu/news/large-language-models-can-steer-our-decisions-research-shows"
  },
  {
    id: 17,
    question: "Wurden Chatbots oder KI-Systeme dabei ertappt, manipulativ oder diskriminierend zu handeln?",
    correctAnswer: true,
    explanation: "Ja. KI-gestützte Systeme diskriminierten, logen oder überredeten Nutzer zu Käufen – oft unbemerkt.",
    source: "https://www.bbc.com/news/technology-68470254"
  }
];

export default function QuizSlide({ onFinish }: { onFinish?: () => void }) {
  const [step, setStep] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const current = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  const handleAnswer = (answer: boolean) => {
    const correct = answer === current.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct && !answeredQuestions.includes(current.id)) {
      setScore((prev: number) => prev + 1);
    }

    if (!answeredQuestions.includes(current.id)) {
      setAnsweredQuestions((prev: number[]) => [...prev, current.id]);
    }
  };

  const handleNext = () => {
    setShowExplanation(false);
    setIsCorrect(null);
    setStep((prev: number) => (prev + 1) % questions.length);
  };

  const resetQuiz = () => {
    setStep(0);
    setScore(0);
    setAnsweredQuestions([]);
    setShowExplanation(false);
    setIsCorrect(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Card className="max-w-2xl w-full shadow-xl">
        <CardContent>
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              KI-Sicherheits-Quiz
            </h1>
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>Frage {step + 1} von {questions.length}</span>
              <span>Score: {score}/{answeredQuestions.length}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          {current.image && (
            <div className="mb-4">
              <img
                src={current.image}
                alt="Fragebild"
                className="w-full max-h-64 object-cover rounded"
                loading="lazy"
              />
            </div>
          )}
          <h2 className="text-lg font-semibold mb-6 text-gray-800 leading-relaxed">
            {current.question}
          </h2>

          {!showExplanation && (
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => handleAnswer(true)}
                className="bg-green-600 hover:bg-green-700 min-w-24"
              >
                Richtig
              </Button>
              <Button
                onClick={() => handleAnswer(false)}
                className="bg-red-600 hover:bg-red-700 min-w-24"
              >
                Falsch
              </Button>
            </div>
          )}

          {showExplanation && (
            <div className="mt-6 space-y-4">
              <div className={`text-center py-3 px-4 rounded-lg ${
                isCorrect
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                <p className="text-xl font-bold">
                  {isCorrect ? '✓ Richtig!' : '✗ Falsch'}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-800 leading-relaxed mb-3">
                  {current.explanation}
                </p>
                <a
                  href={current.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 underline text-sm"
                >
                  Quelle öffnen ↗
                </a>
              </div>

              <div className="flex gap-3 justify-center">
                {step < questions.length - 1 ? (
                  <Button onClick={handleNext} className="min-w-24">
                    Weiter
                  </Button>
                ) : (
                  <div className="text-center space-y-3">
                    <p className="text-lg font-semibold text-gray-800">
                      Quiz beendet! Endergebnis: {score}/{questions.length}
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button onClick={resetQuiz} className="min-w-24">
                        Neu starten
                      </Button>
                      <Button
                        onClick={() => {
                          if (onFinish) onFinish();
                        }}
                        className="min-w-24 bg-blue-600 hover:bg-blue-700"
                      >
                        Ich sende mein Signal
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
