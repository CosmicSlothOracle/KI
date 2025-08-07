# KI-Sicherheits-Quiz

Ein interaktives Quiz über die Sicherheit von Künstlicher Intelligenz, entwickelt mit React + TypeScript + Vite.

## 🎯 Über das Projekt

Dieses Quiz sensibilisiert für wichtige Aspekte der KI-Sicherheit durch 17 fundierte Fragen zu aktuellen Entwicklungen und Risiken von Künstlicher Intelligenz. Jede Frage wird mit Erklärungen und Quellenangaben unterstützt.

## 🚀 Live Demo

Das Quiz wird automatisch über GitHub Pages deployed: `https://[your-username].github.io/KI/`

## 🛠️ Technologie-Stack

- **React 18** - UI Framework
- **TypeScript** - Type-sichere Entwicklung
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS** - Utility-First CSS Framework
- **GitHub Actions** - Automatisches Deployment

## 📦 Installation & Development

### Voraussetzungen

- Node.js (Version 18 oder höher)
- npm

### Setup

```bash
# Repository klonen
git clone <repository-url>
cd KI

# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

### Build & Preview

```bash
# Production Build
npm run build

# Build lokal testen
npm run preview
```

## 🚀 Deployment auf GitHub Pages

### Automatisches Deployment

1. Repository auf GitHub erstellen
2. Code pushen
3. In Repository Settings → Pages → Source auf "GitHub Actions" umstellen
4. Bei jedem Push auf `main` wird automatisch deployed

### Manuelle Schritte für GitHub Pages

1. **Repository Settings**:

   - Gehe zu deinem GitHub Repository
   - Settings → Pages
   - Source: "Deploy from a branch" → "GitHub Actions"

2. **First Push**:

   ```bash
   git add .
   git commit -m "Initial commit - KI Safety Quiz"
   git push origin main
   ```

3. **GitHub Actions aktivieren**:
   - Die `.github/workflows/deploy.yml` wird automatisch ausgeführt
   - Check den "Actions" Tab für Build-Status

## 📁 Projektstruktur

```
KI/
├── .github/workflows/     # GitHub Actions
├── src/
│   ├── components/
│   │   ├── ui/           # Wiederverwendbare UI-Komponenten
│   │   └── QuizSlide.tsx # Haupt-Quiz-Komponente
│   ├── App.tsx           # App Root
│   ├── main.tsx         # React Entry Point
│   └── index.css        # Global Styles
├── public/              # Statische Assets
├── index.html          # HTML Template
└── vite.config.ts      # Vite Konfiguration
```

## 🎨 Features

- **17 fundierte Fragen** zu KI-Sicherheit
- **Fortschrittsanzeige** und Score-Tracking
- **Responsive Design** für alle Geräte
- **Quellenangaben** für jede Frage
- **Smooth Animationen** und moderne UI

## 🔧 Anpassungen

### Neue Fragen hinzufügen

Editiere `src/components/QuizSlide.tsx` und füge neue Einträge zum `questions` Array hinzu:

```typescript
{
  id: 18,
  question: "Deine Frage hier?",
  correctAnswer: true, // oder false
  explanation: "Erklärung der korrekten Antwort",
  source: "https://link-zur-quelle.com"
}
```

### Styling anpassen

- Tailwind Classes in den Komponenten editieren
- Globale Styles in `src/index.css`
- Tailwind Konfiguration in `tailwind.config.js`

## 📝 Deployment Troubleshooting

### Häufige Probleme

1. **404 Error nach Deployment**:

   - Überprüfe die `base` URL in `vite.config.ts`
   - Sollte `/KI/` für GitHub Pages sein

2. **GitHub Actions schlägt fehl**:

   - Überprüfe Node.js Version in `.github/workflows/deploy.yml`
   - Stelle sicher, dass Pages in Repository Settings aktiviert ist

3. **Build Errors**:
   - Führe `npm run build` lokal aus
   - TypeScript Errors beheben

## 📄 Lizenz

MIT License - Siehe LICENSE Datei für Details.

## 🤝 Contribution

Fragen und Verbesserungsvorschläge sind willkommen! Erstelle gerne Issues oder Pull Requests.
