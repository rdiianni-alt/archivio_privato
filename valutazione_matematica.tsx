import { useState } from "react";

const GIUDIZI_COLORS = {
  "Ottimo":           { color: "#0F6E56", bg: "#E1F5EE" },
  "Distinto":         { color: "#185FA5", bg: "#E6F1FB" },
  "Buono":            { color: "#534AB7", bg: "#EEEDFE" },
  "Discreto":         { color: "#BA7517", bg: "#FAEEDA" },
  "Sufficiente":      { color: "#993C1D", bg: "#FAECE7" },
  "Non sufficiente":  { color: "#A32D2D", bg: "#FCEBEB" },
};

const DESCRITTORI = {
  "1-2": {
    m: {
      "Ottimo":          { padronanza: "Dimostra un'adeguata conoscenza dei concetti matematici e li applica con sicurezza.", linguaggio: "Utilizza in modo corretto il linguaggio matematico, comprendendone i simboli e le rappresentazioni grafiche. Risolve semplici problemi utilizzando strategie corrette.", rielaborazione: "Dimostra una buona capacità di rielaborazione delle conoscenze acquisite riuscendo a formulare soluzioni alternative." },
      "Distinto":        { padronanza: "Dimostra un'adeguata conoscenza dei concetti matematici e li applica correttamente.", linguaggio: "Utilizza il linguaggio matematico comprendendone i simboli e le rappresentazioni grafiche, in modo quasi sempre appropriato. Risolve semplici problemi, seppur con qualche lieve incertezza.", rielaborazione: "Rielabora le conoscenze acquisite riuscendo a formulare soluzioni corrette." },
      "Buono":           { padronanza: "Possiede una buona conoscenza dei contenuti matematici e li applica, seppur con qualche errore.", linguaggio: "Utilizza un linguaggio matematico comprensibile, anche se con imprecisioni. Comprende e utilizza le rappresentazioni grafiche con alcune difficoltà. Risolve semplici problemi in contesti noti.", rielaborazione: "Applica le conoscenze, facendo collegamenti tra gli argomenti proposti riuscendo a trovare semplici soluzioni." },
      "Discreto":        { padronanza: "Ha una comprensione essenziale dei concetti matematici; incontra difficoltà nell'applicarli in autonomia.", linguaggio: "Utilizza il linguaggio matematico di base in modo ancora impreciso. Ha generalmente bisogno di supporto per interpretare grafici, rappresentazioni numeriche e per risolvere problemi.", rielaborazione: "Applica le conoscenze in modo essenziale, riuscendo talvolta a trovare semplici soluzioni." },
      "Sufficiente":     { padronanza: "Possiede una comprensione basilare dei concetti matematici; incontra difficoltà nell'applicarli in modo autonomo e gli errori risultano frequenti.", linguaggio: "Utilizza un linguaggio matematico essenziale e talvolta impreciso. Necessita di costante supporto. Risolve problemi semplici se aiutato poiché l'acquisizione delle procedure è ancora incerta.", rielaborazione: "Applica le conoscenze in maniera basilare e, se guidato, riesce a trovare soluzioni." },
      "Non sufficiente": { padronanza: "Mostra notevoli difficoltà nell'applicare i concetti matematici di base affrontati.", linguaggio: "Ha difficoltà nel riconoscere simboli, numeri e rappresentazioni grafiche. Per risolvere semplici problemi necessita del supporto costante dell'insegnante.", rielaborazione: "Fatica ad applicare le informazioni apprese." },
    },
    f: {
      "Ottimo":          { padronanza: "Dimostra un'adeguata conoscenza dei concetti matematici e li applica con sicurezza.", linguaggio: "Utilizza in modo corretto il linguaggio matematico, comprendendone i simboli e le rappresentazioni grafiche. Risolve semplici problemi utilizzando strategie corrette.", rielaborazione: "Dimostra una buona capacità di rielaborazione delle conoscenze acquisite riuscendo a formulare soluzioni alternative." },
      "Distinto":        { padronanza: "Dimostra un'adeguata conoscenza dei concetti matematici e li applica correttamente.", linguaggio: "Utilizza il linguaggio matematico comprendendone i simboli e le rappresentazioni grafiche, in modo quasi sempre appropriato. Risolve semplici problemi, seppur con qualche lieve incertezza.", rielaborazione: "Rielabora le conoscenze acquisite riuscendo a formulare soluzioni corrette." },
      "Buono":           { padronanza: "Possiede una buona conoscenza dei contenuti matematici e li applica, seppur con qualche errore.", linguaggio: "Utilizza un linguaggio matematico comprensibile, anche se con imprecisioni. Comprende e utilizza le rappresentazioni grafiche con alcune difficoltà. Risolve semplici problemi in contesti noti.", rielaborazione: "Applica le conoscenze, facendo collegamenti tra gli argomenti proposti riuscendo a trovare semplici soluzioni." },
      "Discreto":        { padronanza: "Ha una comprensione essenziale dei concetti matematici; incontra difficoltà nell'applicarli in autonomia.", linguaggio: "Utilizza il linguaggio matematico di base in modo ancora impreciso. Ha generalmente bisogno di supporto per interpretare grafici, rappresentazioni numeriche e per risolvere problemi.", rielaborazione: "Applica le conoscenze in modo essenziale, riuscendo talvolta a trovare semplici soluzioni." },
      "Sufficiente":     { padronanza: "Possiede una comprensione basilare dei concetti matematici; incontra difficoltà nell'applicarli in modo autonomo e gli errori risultano frequenti.", linguaggio: "Utilizza un linguaggio matematico essenziale e talvolta impreciso. Necessita di costante supporto. Risolve problemi semplici se aiutata poiché l'acquisizione delle procedure è ancora incerta.", rielaborazione: "Applica le conoscenze in maniera basilare e, se guidata, riesce a trovare soluzioni." },
      "Non sufficiente": { padronanza: "Mostra notevoli difficoltà nell'applicare i concetti matematici di base affrontati.", linguaggio: "Ha difficoltà nel riconoscere simboli, numeri e rappresentazioni grafiche. Per risolvere semplici problemi necessita del supporto costante dell'insegnante.", rielaborazione: "Fatica ad applicare le informazioni apprese." },
    },
  },
  "3-5": {
    m: {
      "Ottimo":          { padronanza: "Dimostra un'adeguata conoscenza dei concetti matematici, applicandoli con sicurezza e precisione.", linguaggio: "Utilizza il linguaggio matematico in modo appropriato. Risolve problemi complessi utilizzando strategie adeguate e verificando la correttezza delle soluzioni.", rielaborazione: "Dimostra una buona capacità di rielaborazione, facendo collegamenti tra i diversi ambiti della matematica. Propone soluzioni alternative e spiega i propri ragionamenti in modo approfondito." },
      "Distinto":        { padronanza: "Ha un'adeguata conoscenza dei contenuti matematici e li applica in modo corretto.", linguaggio: "Utilizza il linguaggio matematico in modo appropriato. Risolve problemi in modo efficace, seppur con qualche lieve incertezza.", rielaborazione: "Collega le conoscenze tra diversi ambiti matematici, formulando ipotesi e strategie personali." },
      "Buono":           { padronanza: "Possiede una buona conoscenza dei contenuti matematici e li applica, seppur con qualche errore.", linguaggio: "Utilizza un linguaggio matematico comprensibile, anche se con imprecisioni. Risolve semplici problemi.", rielaborazione: "Applica le conoscenze, facendo collegamenti tra gli argomenti studiati, ma con difficoltà nell'individuazione di soluzioni alternative." },
      "Discreto":        { padronanza: "Ha una comprensione essenziale dei concetti matematici fondamentali, ma incontra difficoltà nell'applicarli in modo preciso e autonomo.", linguaggio: "Utilizza il linguaggio matematico di base con imprecisioni. Ha bisogno di supporto per interpretare grafici e schemi. Risolve semplici problemi con alcune incertezze.", rielaborazione: "Applica le conoscenze in modo essenziale, facendo qualche collegamento tra gli argomenti." },
      "Sufficiente":     { padronanza: "Possiede competenze di base; incontra difficoltà nell'applicazione autonoma dei concetti matematici. Sono presenti frequenti errori.", linguaggio: "Utilizza un linguaggio matematico essenziale e con molte imprecisioni. Risolve problemi semplici con aiuto, mostrando incertezze nei procedimenti.", rielaborazione: "Riferisce informazioni essenziali senza rielaborazione personale. I collegamenti tra gli argomenti sono da consolidare." },
      "Non sufficiente": { padronanza: "Mostra notevoli difficoltà nell'applicare i concetti matematici di base affrontati.", linguaggio: "Non utilizza correttamente il linguaggio matematico. Non riesce a risolvere problemi autonomamente.", rielaborazione: "Fatica ad applicare le informazioni e a fare collegamenti tra i diversi argomenti matematici." },
    },
    f: {
      "Ottimo":          { padronanza: "Dimostra un'adeguata conoscenza dei concetti matematici, applicandoli con sicurezza e precisione.", linguaggio: "Utilizza il linguaggio matematico in modo appropriato. Risolve problemi complessi utilizzando strategie adeguate e verificando la correttezza delle soluzioni.", rielaborazione: "Dimostra una buona capacità di rielaborazione, facendo collegamenti tra i diversi ambiti della matematica. Propone soluzioni alternative e spiega i propri ragionamenti in modo approfondito." },
      "Distinto":        { padronanza: "Ha un'adeguata conoscenza dei contenuti matematici e li applica in modo corretto.", linguaggio: "Utilizza il linguaggio matematico in modo appropriato. Risolve problemi in modo efficace, seppur con qualche lieve incertezza.", rielaborazione: "Collega le conoscenze tra diversi ambiti matematici, formulando ipotesi e strategie personali." },
      "Buono":           { padronanza: "Possiede una buona conoscenza dei contenuti matematici e li applica, seppur con qualche errore.", linguaggio: "Utilizza un linguaggio matematico comprensibile, anche se con imprecisioni. Risolve semplici problemi.", rielaborazione: "Applica le conoscenze, facendo collegamenti tra gli argomenti studiati, ma con difficoltà nell'individuazione di soluzioni alternative." },
      "Discreto":        { padronanza: "Ha una comprensione essenziale dei concetti matematici fondamentali, ma incontra difficoltà nell'applicarli in modo preciso e autonomo.", linguaggio: "Utilizza il linguaggio matematico di base con imprecisioni. Ha bisogno di supporto per interpretare grafici e schemi. Risolve semplici problemi con alcune incertezze.", rielaborazione: "Applica le conoscenze in modo essenziale, facendo qualche collegamento tra gli argomenti." },
      "Sufficiente":     { padronanza: "Possiede competenze di base; incontra difficoltà nell'applicazione autonoma dei concetti matematici. Sono presenti frequenti errori.", linguaggio: "Utilizza un linguaggio matematico essenziale e con molte imprecisioni. Risolve problemi semplici con aiuto, mostrando incertezze nei procedimenti.", rielaborazione: "Riferisce informazioni essenziali senza rielaborazione personale. I collegamenti tra gli argomenti sono da consolidare." },
      "Non sufficiente": { padronanza: "Mostra notevoli difficoltà nell'applicare i concetti matematici di base affrontati.", linguaggio: "Non utilizza correttamente il linguaggio matematico. Non riesce a risolvere problemi autonomamente.", rielaborazione: "Fatica ad applicare le informazioni e a fare collegamenti tra i diversi argomenti matematici." },
    },
  },
};

const DOMANDE = {
  1: [
    { id: "numeri", area: "Numeri", testo: "Legge e scrive i numeri fino a 20 (in cifra e in lettera), rispettando la direzionalità?" },
    { id: "conteggio", area: "Conteggio", testo: "Conta in senso progressivo e regressivo da 0 a 20, partendo da qualsiasi numero?" },
    { id: "operazioni", area: "Calcolo", testo: "Esegue addizioni e sottrazioni entro il 20, anche senza strumenti di supporto?" },
    { id: "problemi", area: "Problemi", testo: "Riconosce situazioni problematiche, le rappresenta graficamente e sa scegliere l'operazione giusta?" },
    { id: "geometria", area: "Geometria", testo: "Riconosce e nomina le principali figure geometriche piane e solide nell'ambiente?" },
    { id: "autonomia", area: "Autonomia", testo: "Lavora in modo autonomo? Sa spiegare come ha risolto un problema?" },
  ],
  2: [
    { id: "numeri", area: "Numeri", testo: "Legge, scrive e ordina i numeri entro e oltre il 100? Comprende il valore posizionale?" },
    { id: "operazioni", area: "Calcolo", testo: "Esegue addizioni e sottrazioni in colonna con e senza cambio?" },
    { id: "tabelline", area: "Tabelline", testo: "Ha memorizzato le tabelline? Esegue moltiplicazioni e divisioni in riga e in colonna?" },
    { id: "problemi", area: "Problemi", testo: "Individua i dati di un problema, sceglie l'operazione e sa argomentare la risposta?" },
    { id: "geometria", area: "Geometria", testo: "Riconosce poligoni e figure solide con i loro elementi (lati, angoli, vertici, facce, spigoli)?" },
    { id: "autonomia", area: "Autonomia", testo: "Sa lavorare in modo autonomo? Costruisce e legge tabelle e grafici a barre?" },
  ],
  3: [
    { id: "numeri", area: "Numeri", testo: "Legge e scrive numeri entro il migliaio e oltre (anche decimali)? Comprende il valore posizionale?" },
    { id: "operazioni", area: "Calcolo", testo: "Esegue le quattro operazioni in riga e in colonna, anche con i decimali? Sa spiegare le strategie usate?" },
    { id: "frazioni", area: "Frazioni", testo: "Riconosce e rappresenta frazioni di un intero e di una quantità? Conosce l'unità frazionaria?" },
    { id: "problemi", area: "Problemi", testo: "Sa individuare i dati, scegliere la strategia risolutiva e argomentare la soluzione?" },
    { id: "geometria", area: "Geometria", testo: "Riconosce tipi di angoli, figure piane e solide? Sa misurare il perimetro?" },
    { id: "autonomia", area: "Autonomia", testo: "Affronta situazioni nuove con metodo? Sa confrontare strategie diverse?" },
  ],
  4: [
    { id: "numeri", area: "Numeri", testo: "Riconosce il valore posizionale entro il 100.000? Esegue equivalenze e scomposizioni?" },
    { id: "operazioni", area: "Calcolo", testo: "Esegue le quattro operazioni con numeri interi e decimali, in colonna e a mente? Sa verbalizzare il procedimento?" },
    { id: "frazioni", area: "Frazioni", testo: "Classifica frazioni (proprie, improprie, apparenti), trova frazioni equivalenti, calcola la frazione di un numero?" },
    { id: "problemi", area: "Problemi", testo: "Sa analizzare problemi con dati impliciti, usare più operazioni e confrontare strategie risolutive?" },
    { id: "geometria", area: "Geometria", testo: "Misura perimetri e aree? Classifica triangoli e poligoni? Riconosce angoli, diagonali e assi di simmetria?" },
    { id: "autonomia", area: "Autonomia", testo: "Legge e interpreta grafici e tabelle? Sa collegare argomenti diversi e proporre soluzioni personali?" },
  ],
  5: [
    { id: "numeri", area: "Numeri", testo: "Gestisce numeri grandi, decimali, frazioni, percentuali e numeri negativi in contesti concreti?" },
    { id: "operazioni", area: "Calcolo", testo: "Esegue tutte le operazioni con sicurezza? Sa scegliere tra calcolo mentale, scritto o calcolatrice?" },
    { id: "geometria", area: "Geometria", testo: "Calcola aree di quadrilateri, triangoli e poligoni complessi? Conosce le formule di circonferenza e cerchio?" },
    { id: "problemi", area: "Problemi", testo: "Analizza problemi articolati con dati espliciti/impliciti/superflui? Costruisce espressioni e diagrammi a blocchi?" },
    { id: "dati", area: "Dati e statistica", testo: "Legge, costruisce e interpreta grafici e tabelle? Conosce media, moda e mediana?" },
    { id: "autonomia", area: "Autonomia", testo: "Sa proporre strategie diverse? Argomenta i procedimenti e fa collegamenti tra ambiti matematici diversi?" },
  ],
};

const OPZIONI = [
  { val: 5, label: "Sì, sempre e con sicurezza" },
  { val: 4, label: "Spesso, con buona autonomia" },
  { val: 3, label: "A volte, con qualche incertezza" },
  { val: 2, label: "Con guida e supporto" },
  { val: 1, label: "Raramente o con grande difficoltà" },
];

function calcolaGiudizio(risposte) {
  const vals = Object.values(risposte);
  if (!vals.length) return null;
  const m = vals.reduce((a, b) => a + b, 0) / vals.length;
  if (m >= 4.6) return "Ottimo";
  if (m >= 3.8) return "Distinto";
  if (m >= 3.1) return "Buono";
  if (m >= 2.4) return "Discreto";
  if (m >= 1.6) return "Sufficiente";
  return "Non sufficiente";
}

function stampaPDFRiepilogo(classe, alunni) {
  const oggi = new Date().toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" });
  const righe = alunni.map((a, i) => {
    const gc = GIUDIZI_COLORS[a.giudizio];
    const gruppo = parseInt(classe) <= 2 ? "1-2" : "3-5";
    const d = DESCRITTORI[gruppo][a.sesso][a.giudizio];
    return `
      <tr style="page-break-inside:avoid;">
        <td style="padding:10px 12px;border-bottom:1px solid #eee;font-size:13px;font-weight:bold;vertical-align:top;">${i+1}. ${a.nome}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;vertical-align:top;">
          <span style="display:inline-block;background:${gc.bg};color:${gc.color};border-radius:4px;padding:3px 10px;font-size:12px;font-weight:bold;">${a.giudizio}</span>
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;font-size:12px;line-height:1.55;vertical-align:top;color:#333;">
          ${d.padronanza} ${d.linguaggio} ${d.rielaborazione}
        </td>
      </tr>`;
  }).join("");

  const html = `<!DOCTYPE html>
<html lang="it"><head><meta charset="UTF-8">
<title>Scrutinio Matematica — Classe ${classe}ª</title>
<style>
  @page { margin: 2cm 2.2cm; }
  body { font-family: Georgia, serif; color: #222; margin: 0; font-size: 13px; }
  h1 { font-size: 20px; font-weight: normal; margin: 0 0 4px; }
  .sub { font-size: 12px; color: #888; margin: 0 0 24px; font-family: Arial, sans-serif; }
  table { width: 100%; border-collapse: collapse; }
  th { font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; color: #aaa; padding: 8px 12px; text-align: left; border-bottom: 2px solid #ddd; font-family: Arial, sans-serif; }
  .footer { margin-top: 32px; font-size: 10px; color: #ccc; font-family: Arial, sans-serif; text-align: right; }
</style>
</head><body>
  <h1>Scrutinio matematica — Classe ${classe}ª elementare</h1>
  <p class="sub">Anno scolastico 2024/25 · ${oggi} · ${alunni.length} alunni</p>
  <table>
    <thead><tr>
      <th style="width:18%">Alunno/a</th>
      <th style="width:14%">Giudizio</th>
      <th style="width:68%">Descrittori</th>
    </tr></thead>
    <tbody>${righe}</tbody>
  </table>
  <p class="footer">Documento generato il ${oggi}</p>
</body></html>`;

  const w = window.open("", "_blank");
  w.document.write(html);
  w.document.close();
  setTimeout(() => w.print(), 600);
}

// Checkbox personalizzata
function Checkbox({ checked, onChange, label }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" }} onClick={onChange}>
      <div style={{
        width: 20, height: 20, borderRadius: 4, flexShrink: 0,
        border: checked ? "none" : "1.5px solid var(--color-border-secondary)",
        background: checked ? "#185FA5" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {checked && <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5l3.5 3.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </div>
      <span style={{ fontSize: 15, color: "var(--color-text-primary)" }}>{label}</span>
    </label>
  );
}

export default function App() {
  // step: "setup" | "alunno_info" | "domande" | "conferma" | "riepilogo"
  const [step, setStep] = useState("setup");
  const [classeGlobale, setClasseGlobale] = useState("");
  const [alunni, setAlunni] = useState([]);

  // alunno corrente
  const [nome, setNome] = useState("");
  const [sesso, setSesso] = useState({ m: false, f: false });
  const [risposte, setRisposte] = useState({});
  const [dIdx, setDIdx] = useState(0);

  const classeN = parseInt(classeGlobale);
  const domande = DOMANDE[classeN] || [];
  const domandaCorrente = domande[dIdx];
  const sessoVal = sesso.m ? "m" : sesso.f ? "f" : null;

  const giudizioCorrente = calcolaGiudizio(risposte);
  const gc = giudizioCorrente ? GIUDIZI_COLORS[giudizioCorrente] : null;
  const gruppo = classeN <= 2 ? "1-2" : "3-5";
  const desc = giudizioCorrente && sessoVal ? DESCRITTORI[gruppo][sessoVal][giudizioCorrente] : null;

  const iniziaNuovoAlunno = () => {
    setNome("");
    setSesso({ m: false, f: false });
    setRisposte({});
    setDIdx(0);
    setStep("alunno_info");
  };

  const avviaDomande = () => {
    if (!nome.trim() || !sessoVal) return;
    setRisposte({});
    setDIdx(0);
    setStep("domande");
  };

  const rispondi = (val) => {
    const nuove = { ...risposte, [domandaCorrente.id]: val };
    setRisposte(nuove);
    if (dIdx < domande.length - 1) setDIdx(dIdx + 1);
    else setStep("conferma");
  };

  const salvaAlunno = () => {
    setAlunni(prev => [...prev, { nome, sesso: sessoVal, giudizio: giudizioCorrente, risposte: { ...risposte } }]);
    iniziaNuovoAlunno();
  };

  const handleSesso = (s) => {
    if (s === "m") setSesso({ m: true, f: false });
    else setSesso({ m: false, f: true });
  };

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "2rem 1rem", fontFamily: "var(--font-sans)" }}>
      <p style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.07em" }}>Strumento docente</p>
      <h2 style={{ fontSize: 22, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 4 }}>Valutazione matematica</h2>
      <p style={{ fontSize: 14, color: "var(--color-text-secondary)", marginBottom: 28 }}>Scrutinio di fine anno · Scuola primaria</p>

      {/* ── SETUP CLASSE ── */}
      {step === "setup" && (
        <div>
          <label style={{ fontSize: 13, color: "var(--color-text-secondary)", display: "block", marginBottom: 8 }}>Prima di iniziare, seleziona la classe</label>
          <select value={classeGlobale} onChange={e => setClasseGlobale(e.target.value)} style={{ width: "100%", marginBottom: 28 }}>
            <option value="">Seleziona la classe</option>
            {[1,2,3,4,5].map(c => <option key={c} value={c}>Classe {c}ª</option>)}
          </select>
          <button onClick={() => classeGlobale && setStep("alunno_info")} disabled={!classeGlobale} style={{ width: "100%" }}>
            Inizia lo scrutinio →
          </button>
        </div>
      )}

      {/* ── DATI ALUNNO ── */}
      {step === "alunno_info" && (
        <div>
          {alunni.length > 0 && (
            <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "10px 14px", marginBottom: 20, fontSize: 13, color: "var(--color-text-secondary)" }}>
              Alunni valutati finora: <strong style={{ color: "var(--color-text-primary)" }}>{alunni.length}</strong> — {alunni.map(a => a.nome).join(", ")}
            </div>
          )}
          <p style={{ fontSize: 15, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: 18 }}>
            Nuovo alunno — Classe {classeN}ª
          </p>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, color: "var(--color-text-secondary)", display: "block", marginBottom: 8 }}>Nome</label>
            <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="es. Sofia" style={{ width: "100%", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: 28 }}>
            <label style={{ fontSize: 13, color: "var(--color-text-secondary)", display: "block", marginBottom: 12 }}>Seleziona</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Checkbox checked={sesso.m} onChange={() => handleSesso("m")} label="Bambino" />
              <Checkbox checked={sesso.f} onChange={() => handleSesso("f")} label="Bambina" />
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {alunni.length > 0 && (
              <button onClick={() => setStep("riepilogo")} style={{ flex: 1, fontSize: 13 }}>
                Fine scrutinio →
              </button>
            )}
            <button onClick={avviaDomande} disabled={!nome.trim() || !sessoVal} style={{ flex: 2 }}>
              Inizia valutazione →
            </button>
          </div>
        </div>
      )}

      {/* ── DOMANDE ── */}
      {step === "domande" && domandaCorrente && (
        <div>
          <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
            {domande.map((_, i) => (
              <div key={i} style={{ height: 4, flex: 1, borderRadius: 2, background: i < dIdx ? "#0F6E56" : i === dIdx ? "#1D9E75" : "var(--color-border-tertiary)" }} />
            ))}
          </div>
          <p style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {nome} · {domandaCorrente.area} · {dIdx + 1} di {domande.length}
          </p>
          <p style={{ fontSize: 17, fontWeight: 500, color: "var(--color-text-primary)", lineHeight: 1.55, marginBottom: 22 }}>{domandaCorrente.testo}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {OPZIONI.map(op => (
              <button key={op.val} onClick={() => rispondi(op.val)} style={{ textAlign: "left", padding: "11px 16px", fontSize: 14 }}>{op.label}</button>
            ))}
          </div>
          {dIdx > 0 && (
            <button onClick={() => setDIdx(dIdx - 1)} style={{ marginTop: 12, background: "none", border: "none", color: "var(--color-text-secondary)", fontSize: 13, cursor: "pointer", padding: 0 }}>← indietro</button>
          )}
        </div>
      )}

      {/* ── CONFERMA SINGOLO ── */}
      {step === "conferma" && gc && desc && (
        <div>
          <div style={{ background: gc.bg, border: `0.5px solid ${gc.color}50`, borderRadius: "var(--border-radius-lg)", padding: "1.25rem 1.5rem", marginBottom: 20 }}>
            <p style={{ fontSize: 11, color: gc.color, marginBottom: 4, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>Giudizio sintetico · Matematica</p>
            <p style={{ fontSize: 28, fontWeight: 500, color: gc.color, margin: "0 0 2px" }}>{giudizioCorrente}</p>
            <p style={{ fontSize: 13, color: gc.color, margin: 0, opacity: 0.8 }}>{nome} · Classe {classeN}ª</p>
          </div>

          <div style={{ marginBottom: 16 }}>
            {domande.map(d => {
              const v = risposte[d.id] || 0;
              return (
                <div key={d.id} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                    <span style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>{d.area}</span>
                    <span style={{ color: "var(--color-text-secondary)" }}>{OPZIONI.find(o => o.val === v)?.label}</span>
                  </div>
                  <div style={{ height: 4, background: "var(--color-border-tertiary)", borderRadius: 2 }}>
                    <div style={{ height: "100%", width: `${(v/5)*100}%`, background: gc.color, borderRadius: 2 }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", border: "0.5px solid var(--color-border-tertiary)", padding: "1rem", marginBottom: 20, fontSize: 13, lineHeight: 1.6, color: "var(--color-text-primary)" }}>
            {desc.padronanza} {desc.linguaggio} {desc.rielaborazione}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={salvaAlunno} style={{ flex: 2, background: gc.bg, color: gc.color, border: `0.5px solid ${gc.color}60` }}>
              Salva e prossimo alunno →
            </button>
            <button onClick={() => { salvaAlunno(); setTimeout(() => setStep("riepilogo"), 50); }} style={{ flex: 1 }}>
              Fine scrutinio
            </button>
          </div>
        </div>
      )}

      {/* ── RIEPILOGO ── */}
      {step === "riepilogo" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <p style={{ fontSize: 16, fontWeight: 500, margin: "0 0 2px", color: "var(--color-text-primary)" }}>Scrutinio — Classe {classeN}ª</p>
              <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0 }}>{alunni.length} alunni valutati</p>
            </div>
            <button onClick={() => stampaPDFRiepilogo(classeGlobale, alunni)} style={{ fontSize: 13, padding: "8px 16px" }}>
              Stampa / PDF ↗
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
            {alunni.map((a, i) => {
              const gc2 = GIUDIZI_COLORS[a.giudizio];
              const d2 = DESCRITTORI[classeN <= 2 ? "1-2" : "3-5"][a.sesso][a.giudizio];
              return (
                <div key={i} style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "1rem 1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <span style={{ fontSize: 15, fontWeight: 500, color: "var(--color-text-primary)" }}>{i + 1}. {a.nome}</span>
                    <span style={{ background: gc2.bg, color: gc2.color, fontSize: 12, fontWeight: 500, padding: "3px 10px", borderRadius: "var(--border-radius-md)", border: `0.5px solid ${gc2.color}40` }}>
                      {a.giudizio}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.6, margin: 0 }}>
                    {d2.padronanza} {d2.linguaggio} {d2.rielaborazione}
                  </p>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={iniziaNuovoAlunno} style={{ flex: 1, fontSize: 13 }}>+ Aggiungi alunno</button>
            <button onClick={() => { setAlunni([]); setStep("setup"); setClasseGlobale(""); }} style={{ flex: 1, fontSize: 13 }}>Nuova classe</button>
          </div>
        </div>
      )}
    </div>
  );
}
