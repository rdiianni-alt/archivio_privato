import { useState } from "react";

const GC = {
  "Ottimo":          { color: "#0F6E56", bg: "#E1F5EE" },
  "Distinto":        { color: "#185FA5", bg: "#E6F1FB" },
  "Buono":           { color: "#534AB7", bg: "#EEEDFE" },
  "Discreto":        { color: "#BA7517", bg: "#FAEEDA" },
  "Sufficiente":     { color: "#993C1D", bg: "#FAECE7" },
  "Non sufficiente": { color: "#A32D2D", bg: "#FCEBEB" },
};
const pi = (v) => Math.max(0, Math.min(4, v - 1));

// ── FRASI PER AREA (dal documento O.M. 172/2020) ─────────────────────────────

const FR_MAT = {
  numeri_12: [
    "Necessita dei suggerimenti e della guida dell insegnante per leggere e scrivere correttamente i numeri in lettera e cifra.",
    "Utilizza modelli offerti dall insegnante per leggere e scrivere correttamente i numeri in lettera e cifra.",
    "Legge e scrive in autonomia i numeri in lettera e cifra.",
    "Legge e scrive correttamente i numeri in lettera e cifra con facilita.",
    "Legge e scrive correttamente i numeri in lettera e cifra con facilita e sicurezza.",
  ],
  composiz_12: [
    "Con l aiuto dell insegnante riconosce il valore posizionale dei numeri e compone e scompone i numeri in cifra.",
    "Riconosce il valore posizionale dei numeri e compone e scompone i numeri in cifra utilizzando una procedura guidata o uno strumento suggerito.",
    "Riconosce il valore posizionale dei numeri e compone e scompone i numeri in cifra in autonomia.",
    "Riconosce il valore posizionale dei numeri e compone e scompone i numeri in cifra in autonomia e con sicurezza.",
    "Riconosce il valore posizionale dei numeri e compone e scompone i numeri in cifra con padronanza.",
  ],
  calcolo_12: [
    "Si affida all aiuto dell insegnante e dei compagni per eseguire operazioni di calcolo.",
    "Svolge operazioni di calcolo semplice, ma in maniera non sempre corretta; per algoritmi piu complessi segue procedure messe a disposizione.",
    "Sa svolgere in autonomia operazioni di calcolo scritto e orale; ha memorizzato le tabelline principali.",
    "Sa svolgere addizioni e sottrazioni con sicurezza applicando gli algoritmi in tutte le situazioni; ha memorizzato le tabelline.",
    "Sa svolgere le operazioni con sicurezza e padronanza riuscendo ad applicare gli algoritmi in tutte le situazioni; e di supporto ai compagni in difficolta.",
  ],
  problemi_12: [
    "Legge il testo del problema e necessita della guida dell insegnante per comprendere la richiesta e i dati utili alla risoluzione.",
    "Legge il testo e si affida a strategie condivise per comprendere la richiesta e i dati utili (parole chiave, disegno...).",
    "Legge e comprende in autonomia il testo, individua i dati utili espliciti; per i dati impliciti talvolta ricorre al supporto dell insegnante.",
    "Legge e comprende in autonomia il testo di un problema individuando i dati utili e la richiesta anche in situazioni di inferenza.",
    "Legge e comprende in autonomia il testo, individua i dati e la richiesta anche in situazioni di inferenza; formula ipotesi originali e le confronta con le proposte altrui.",
  ],
  geometria_12: [
    "Con l aiuto dell insegnante riconosce le figure piane e i solidi presentati.",
    "Riconosce le figure piane e i solidi presentati, li disegna e con l aiuto dell insegnante individua gli elementi caratterizzanti.",
    "In autonomia riconosce le figure piane e i solidi, li disegna e classifica in base ai loro elementi caratterizzanti.",
    "Riconosce, disegna e classifica figure piane e solidi in base ai loro elementi caratterizzanti.",
    "Riconosce, disegna e classifica figure piane e solidi in base ai loro elementi caratterizzanti, utilizzando un linguaggio specifico.",
  ],
  dati_12: [
    "Con l aiuto dell insegnante raccoglie i dati di un indagine e li registra in semplici tabelle; non riesce ancora a operare con i dati raccolti.",
    "Raccoglie i dati di un indagine e li registra in semplici tabelle a doppia entrata; con il supporto del gruppo interpreta grafici e tabelle.",
    "In autonomia raccoglie dati, costruisce tabelle a doppia entrata e le legge, facendo somme con qualche incertezza.",
    "In autonomia raccoglie dati, costruisce tabelle a doppia entrata, opera con i dati letti e li interpreta correttamente.",
    "In autonomia raccoglie dati, costruisce tabelle a doppia entrata, opera con i dati e li interpreta, mettendoli in relazione con contesti di vita quotidiana.",
  ],
  numeri_35: [
    "Necessita dei suggerimenti e della guida dell insegnante per leggere e scrivere correttamente i numeri in lettera e cifra.",
    "Utilizza modelli offerti dall insegnante per leggere e scrivere correttamente i numeri in lettera e cifra.",
    "Legge e scrive in autonomia i numeri interi e decimali in lettera e cifra.",
    "Legge e scrive correttamente i numeri interi e decimali in lettera e cifra con facilita.",
    "Legge e scrive correttamente i numeri interi e decimali con facilita e sicurezza; e di supporto ai compagni in difficolta.",
  ],
  frazioni_35: [
    "Con l aiuto del disegno riconosce una frazione e i suoi elementi (numeratore e denominatore).",
    "Riconosce una frazione anche senza il disegno; con strumenti riesce a fare confronti e a stabilire la frazione di una quantita.",
    "Conosce i termini della frazione, confronta e classifica frazioni anche senza il disegno e ne calcola il valore.",
    "Riconosce le frazioni, le classifica, confronta e opera con esse in autonomia.",
    "Opera con le frazioni in autonomia e sicurezza; passa con disinvoltura dalla frazione al numero decimale e viceversa.",
  ],
  calcolo_35: [
    "Si affida all aiuto dell insegnante per eseguire le operazioni di calcolo con numeri interi e decimali.",
    "Svolge le operazioni piu semplici, seguendo procedure messe a disposizione; per algoritmi piu complessi necessita ancora di guida.",
    "Sa svolgere in autonomia le quattro operazioni in riga e in colonna con i numeri interi; con i decimali mostra qualche incertezza.",
    "Sa svolgere le quattro operazioni con sicurezza con i numeri interi e con discreta autonomia con i decimali.",
    "Sa svolgere le quattro operazioni con sicurezza e padronanza sia con i numeri interi che con i decimali; sa valutare quando usare la calcolatrice.",
  ],
  problemi_35: [
    "Legge il testo del problema e necessita della guida dell insegnante per comprendere la richiesta e i dati utili alla risoluzione.",
    "Legge il testo e si affida a strategie condivise per comprendere la richiesta e i dati utili alla risoluzione.",
    "Legge e comprende in autonomia il testo, individua i dati utili espliciti; per i dati impliciti talvolta ricorre al supporto dell insegnante.",
    "Legge e comprende in autonomia il testo di un problema individuando i dati e la richiesta anche in situazioni di inferenza.",
    "Legge e comprende in autonomia il testo, formula ipotesi di risoluzione originali e le confronta con le proposte altrui usando diverse strategie.",
  ],
  geometria_35: [
    "Con l aiuto dell insegnante riconosce poligoni, triangoli e angoli e li disegna.",
    "Riconosce poligoni, triangoli e angoli, li disegna e con l aiuto dell insegnante li classifica sommariamente.",
    "In autonomia riconosce poligoni, triangoli e angoli; li disegna e li classifica in base ai loro elementi caratterizzanti.",
    "Riconosce, disegna e classifica poligoni, triangoli e angoli in base ai loro elementi caratterizzanti.",
    "Riconosce, disegna e classifica poligoni, triangoli e angoli in base ai loro elementi caratterizzanti, usando un linguaggio specifico.",
  ],
  misure_35: [
    "Riconosce il concetto di perimetro ed estensione solo in condizioni concrete, con materiale non strutturato.",
    "Riconosce il concetto di perimetro ed estensione e ne intuisce il calcolo ricorrendo a misure non convenzionali.",
    "Riconosce il concetto di perimetro ed estensione e con l aiuto di una procedura guidata li calcola usando le formule.",
    "Riconosce e calcola perimetro ed estensione usando le opportune unita di misura.",
    "Calcola perimetri e aree con sicurezza e autonomia; applica l esperienza a situazioni di vita quotidiana.",
  ],
  dati_35: [
    "Con l aiuto dell insegnante raccoglie i dati di un indagine e li registra in semplici tabelle; non riesce ancora a operare con i dati raccolti.",
    "Raccoglie i dati e li registra in tabelle e grafici; con il supporto del gruppo da la giusta interpretazione ai dati letti.",
    "In autonomia raccoglie dati, costruisce grafici e tabelle e li legge dandone la giusta interpretazione.",
    "In autonomia raccoglie dati, costruisce grafici e tabelle, opera con i dati e li interpreta in modo autonomo e corretto.",
    "In autonomia raccoglie dati, costruisce e interpreta grafici e tabelle; mette in relazione l attivita con contesti di vita quotidiana (planning, orari, frequenze...).",
  ],
};

const FR_ITA = {
  lettura_12: [
    "Nella lettura ha ancora bisogno di scandire le sillabe e di soffermarsi sulla decodifica delle parole piu difficili.",
    "La lettura e ancora stentata; rispetta solo saltuariamente la punteggiatura.",
    "La lettura e scorrevole; saltuariamente rispetta la punteggiatura.",
    "La lettura e scorrevole e rispetta la punteggiatura.",
    "La lettura e scorrevole, rispetta la punteggiatura ed e espressiva.",
  ],
  comprensione_12: [
    "Con l aiuto dell insegnante comprende le informazioni direttamente esplicitate nel testo letto.",
    "Comprende le informazioni direttamente esplicitate nel testo letto.",
    "Comprende le informazioni sia esplicite che implicite contenute nel testo letto.",
    "Comprende l argomento centrale e le informazioni esplicite ed implicite presenti nel testo letto.",
    "Comprende l argomento centrale e le informazioni esplicite ed implicite presenti nel testo letto; e in grado di fare inferenze.",
  ],
  oralita_12: [
    "Si interessa saltuariamente alle conversazioni, talvolta con interventi poco pertinenti; ascolta le narrazioni e le riferisce solo parzialmente.",
    "Si interessa alle conversazioni con l ascolto pur dimostrando di essere in grado di dare risposte pertinenti; riferisce il senso globale di cio che ascolta.",
    "Interagisce nelle conversazioni con interventi pertinenti; ascolta narrazioni e ne riferisce il senso globale e importanti dettagli.",
    "Interagisce nella conversazione con domande e risposte pertinenti; ascolta e riferisce il senso globale, i dettagli e le informazioni implicite.",
    "Interagisce nella conversazione con domande e risposte pertinenti fornendo importanti contributi di arricchimento; ascolta e riferisce con completezza.",
  ],
  scrittura_12: [
    "I messaggi che scrive hanno bisogno di chiarimenti per facilitarne la comprensione; nella scrittura confonde spesso i suoni della lingua italiana.",
    "I messaggi che scrive hanno bisogno di pochi chiarimenti; talvolta nella scrittura confonde i suoni della lingua italiana.",
    "Scrive messaggi esprimendo con chiarezza lo scopo comunicativo; scrive correttamente i suoni della lingua italiana con l aiuto di strumenti.",
    "Scrive messaggi esprimendo con chiarezza lo scopo comunicativo; rispetta le fondamentali convenzioni ortografiche.",
    "Scrive messaggi esprimendo con chiarezza lo scopo comunicativo; rispetta speditamente le fondamentali convenzioni ortografiche.",
  ],
  riflessione_12: [
    "Riconosce e nomina le prime semplici categorie morfologiche solo se guidato dall insegnante.",
    "Con l utilizzo di strumenti riconosce e nomina le prime semplici categorie morfologiche.",
    "Riconosce e nomina le prime semplici categorie morfologiche in autonomia.",
    "Individua le prime semplici categorie morfologiche e le usa con discreta padronanza in contesti diversi.",
    "Individua le prime semplici categorie morfologiche e le usa con padronanza in contesti diversi.",
  ],
  lettura_35: [
    "Nella lettura ha ancora bisogno di soffermarsi sulla decodifica delle parole piu difficili.",
    "La lettura e scorrevole ma saltuariamente rispetta la punteggiatura.",
    "La lettura e scorrevole e rispetta la punteggiatura.",
    "Sa leggere in modo espressivo; cura con passione la lettura autonoma.",
    "Sa leggere in modo espressivo; cura con passione la lettura autonoma anche al di la dei testi consigliati, scegliendo in base al genere letterario.",
  ],
  comprensione_35: [
    "Con l aiuto dell insegnante comprende le informazioni direttamente esplicitate nel testo letto.",
    "Comprende l argomento centrale e sa ricercare le informazioni direttamente esplicitate nel testo letto.",
    "Comprende l argomento centrale e sa ricercare le informazioni sia esplicite che implicite contenute nel testo letto.",
    "Comprende l argomento centrale, sa ricercare e distinguere le informazioni principali da quelle secondarie e le intenzioni comunicative di chi scrive.",
    "Comprende l argomento centrale, sa ricercare e distinguere le informazioni principali da quelle secondarie e le intenzioni comunicative di chi scrive; e in grado di fare inferenze.",
  ],
  oralita_35: [
    "Si interessa saltuariamente alle conversazioni; racconta esperienze in tempi lunghi e con il supporto dell insegnante.",
    "Si interessa alle conversazioni con interventi brevi; racconta le esperienze personali seguendo un parziale ordine logico e cronologico con un linguaggio essenziale.",
    "Interagisce nelle conversazioni con interventi pertinenti; racconta le esperienze personali seguendo l ordine logico e cronologico con un linguaggio adeguato.",
    "Interagisce nella conversazione con domande e risposte pertinenti; racconta le esperienze personali seguendo l ordine logico e cronologico inserendo elementi descrittivi.",
    "Interagisce nella conversazione con domande e risposte pertinenti fornendo importanti contributi; ascolta narrazioni cogliendone il senso globale, i dettagli e le informazioni implicite.",
  ],
  produzione_35: [
    "Ha ancora difficolta a organizzare in modo logico e consequenziale il testo scritto.",
    "Organizza in modo logico e consequenziale il testo scritto ma e ancora essenziale o troppo prolisso.",
    "Organizza in modo logico e consequenziale il testo scritto esprimendo con coerenza il proprio pensiero.",
    "Organizza in modo logico e consequenziale il testo scritto esprimendo con coerenza il proprio pensiero, con lessico curato.",
    "Organizza in modo logico e consequenziale il testo scritto esprimendo con coerenza e creativita il proprio pensiero, con lessico ricco e originale.",
  ],
  ortografia_35: [
    "Rispetta saltuariamente le fondamentali convenzioni ortografiche e la punteggiatura.",
    "Con l aiuto dell insegnante e di strumenti rispetta le fondamentali convenzioni ortografiche e la punteggiatura.",
    "Rispetta le fondamentali convenzioni ortografiche e la punteggiatura.",
    "Rispetta le fondamentali convenzioni ortografiche, la punteggiatura e la concordanza nei tempi dei verbi.",
    "Rispetta con sicurezza le fondamentali convenzioni ortografiche, la punteggiatura e la concordanza nei tempi dei verbi.",
  ],
  riflessione_35: [
    "Riconosce in semplici frasi le parti principali del discorso solo se guidato dall insegnante.",
    "Sa riconoscere in semplici frasi le parti principali del discorso affrontate.",
    "Sa riconoscere in un testo e analizzare le parti del discorso affrontate.",
    "Sa riconoscere in un testo, analizzare e usare correttamente le parti del discorso; sa individuare soggetto, predicato e complementi.",
    "Sa riconoscere, analizzare e usare con padronanza le parti del discorso e gli elementi della frase minima e complessa.",
  ],
};

const FR_ING = {
  ascolto_12: [
    "Comprende semplici vocaboli ed espressioni di saluto solo con l aiuto dell insegnante e di immagini.",
    "Comprende semplici vocaboli, istruzioni ed espressioni di saluto con l aiuto di immagini.",
    "Comprende vocaboli, istruzioni ed espressioni di uso quotidiano.",
    "Comprende con sicurezza vocaboli, istruzioni ed espressioni di uso quotidiano.",
    "Comprende con sicurezza vocaboli, istruzioni ed espressioni di uso quotidiano e identifica il senso globale di semplici messaggi.",
  ],
  parlato_12: [
    "Usa vocaboli per nominare oggetti con il supporto di immagini e utilizza semplici espressioni di saluto solo con l aiuto dell insegnante.",
    "Usa vocaboli per nominare oggetti con l aiuto di immagini e utilizza semplici espressioni di saluto.",
    "Utilizza semplici vocaboli ed espressioni di saluto per interagire con compagni e insegnante.",
    "Utilizza con sicurezza vocaboli ed espressioni di saluto e presentazione per interagire con compagni e insegnante.",
    "Utilizza con sicurezza vocaboli ed espressioni per interagire, riproducendo i suoni della lingua in maniera corretta.",
  ],
  lettura_12: [
    "Talvolta riesce a mettere in relazione parola e immagine solo con l aiuto dell insegnante.",
    "Mette in relazione parola e immagine con l aiuto dell insegnante.",
    "Mette in relazione parola e immagine in autonomia.",
    "Comprende parole e semplici frasi.",
    "Comprende con sicurezza parole, brevi frasi e semplici fumetti.",
  ],
  scrittura_12: [
    "Talvolta riesce a copiare parole attinenti alle attivita svolte in classe solo con l aiuto dell insegnante.",
    "Copia parole attinenti alle attivita svolte in classe con l aiuto dell insegnante.",
    "Copia parole attinenti alle attivita svolte in classe.",
    "Copia con sicurezza parole e semplici frasi attinenti alle attivita svolte in classe.",
    "Copia con sicurezza parole e frasi attinenti alle attivita svolte in classe e produce semplici testi su modello.",
  ],
  ascolto_35: [
    "Comprende consegne e il senso globale di un semplice testo solo con l aiuto dell insegnante e di immagini.",
    "Comprende il senso globale di un breve testo con l aiuto di immagini.",
    "Comprende il senso globale e alcuni dettagli di un breve testo.",
    "Comprende con sicurezza il senso globale e i dettagli di istruzioni, dialoghi e storie.",
    "Comprende con sicurezza il senso globale e i dettagli di testi e storie anche senza supporto visivo.",
  ],
  parlato_35: [
    "Usa i vocaboli e le strutture linguistiche presentate solo con l aiuto dell insegnante.",
    "Usa i vocaboli e le strutture linguistiche presentate in modo generalmente corretto.",
    "Utilizza le strutture linguistiche conosciute in frasi pertinenti al contesto per interagire con gli altri.",
    "Utilizza con sicurezza le strutture linguistiche per interagire con gli altri in modo pertinente al contesto.",
    "Utilizza con sicurezza le strutture linguistiche per interagire e per brevi esposizioni, con pronuncia e intonazione corrette.",
  ],
  lettura_35: [
    "Legge e comprende brevi messaggi con l aiuto dell insegnante e supporti visivi.",
    "Legge e comprende brevi messaggi e semplici descrizioni con l aiuto di supporti visivi.",
    "Legge e comprende messaggi, semplici descrizioni e testi con l aiuto di immagini.",
    "Legge e comprende con sicurezza messaggi, semplici descrizioni e testi.",
    "Legge e comprende con sicurezza messaggi, descrizioni e testi di vario genere.",
  ],
  scrittura_35: [
    "Scrive parole e semplici frasi di uso quotidiano solo con l aiuto dell insegnante.",
    "Scrive parole e semplici frasi di uso quotidiano usando alcune delle strutture conosciute.",
    "Scrive frasi relative alle strutture apprese oralmente, completa testi e risponde a domande seguendo un modello dato.",
    "Scrive autonomamente frasi relative alle strutture apprese oralmente, completa testi e risponde a domande.",
    "Scrive in modo sicuro e autonomo frasi e brevi testi, risponde a domande e crea testi su modello dato.",
  ],
};

const FR_GEO = {
  orientamento_12: [
    "Con l aiuto dell adulto distingue e denomina le posizioni nello spazio relative a se stesso e agli oggetti.",
    "Distingue e denomina le posizioni nello spazio relativamente a se stesso e ad altri.",
    "Si muove consapevolmente nello spazio, sapendosi orientare attraverso punti di riferimento e organizzatori topologici.",
    "Sa usare consapevolmente i punti di riferimento e gli organizzatori topologici per descrivere relazioni spaziali.",
    "Sa usare consapevolmente i punti di riferimento e gli organizzatori topologici per descrivere relazioni spaziali e per rappresentare percorsi spaziali noti.",
  ],
  linguaggio_12: [
    "Con la guida dell adulto sa ricostruire in modo tridimensionale uno spazio conosciuto rispettando le relazioni spaziali.",
    "Sa ricostruire in modo tridimensionale uno spazio conosciuto rispettando le relazioni spaziali.",
    "Sa ricostruire in modo tridimensionale uno spazio conosciuto e sa realizzarne la pianta con la guida dell adulto.",
    "Sa leggere e interpretare la pianta dello spazio conosciuto, basandosi su punti di riferimento fissi.",
    "Sa leggere e interpretare con sicurezza la pianta di spazi conosciuti e non conosciuti, basandosi su punti di riferimento fissi.",
  ],
  paesaggio_12: [
    "Nell osservazione del paesaggio circostante, con la guida dell adulto, ne individua solo gli elementi globali.",
    "Nell osservazione del paesaggio circostante ne individua gli elementi globali.",
    "Nell osservazione del paesaggio circostante, con la guida dell adulto, ne individua gli elementi globali e specifici.",
    "Nell osservazione del paesaggio circostante ne individua gli elementi globali e specifici.",
    "Nell osservazione del paesaggio circostante ne individua e descrive gli elementi globali e specifici con linguaggio adeguato.",
  ],
  orientamento_35: [
    "Si orienta nello spazio supportato dalle indicazioni verbali dell insegnante.",
    "Affidandosi a procedure e strumenti forniti, si orienta nello spazio (istruzioni verbali, simboli, percorsi grafici, piante...).",
    "Si orienta autonomamente nello spazio seguendo i punti di riferimento indicati.",
    "Si orienta con disinvoltura nello spazio; sa usare la bussola e i punti cardinali per orientarsi nello spazio e sulle carte.",
    "Si orienta con disinvoltura e sicurezza utilizzando gli strumenti presentati e proponendo alternative originali.",
  ],
  linguaggio_35: [
    "Per l analisi di fatti e fenomeni locali e globali necessita di informazioni esplicite perche ha difficolta a ricavarle dalle carte.",
    "Con l aiuto dell adulto ricava dalle carte informazioni utili per l analisi di fatti e fenomeni locali e globali.",
    "Sa ricavare dalle carte informazioni utili per l analisi di fatti e fenomeni locali e globali, esplicitandole in modo essenziale.",
    "Sa ricavare dalle carte informazioni utili per l analisi di fatti e fenomeni locali e globali, esplicitandole con padronanza verbale e scritta.",
    "Sa ricavare con padronanza dalle carte informazioni utili; sa localizzare elementi fisici e antropici anche sul planisfero.",
  ],
  paesaggio_35: [
    "Sa individuare gli elementi caratterizzanti i principali paesaggi e necessita dell adulto per la loro ricostruzione.",
    "Sa individuare e descrivere in modo essenziale gli elementi caratterizzanti i principali paesaggi; classifica alcune regioni geografiche sulla base delle loro caratteristiche.",
    "Sa individuare, descrivere e confrontare in modo adeguato gli elementi caratterizzanti i principali paesaggi; classifica in autonomia alcune regioni geografiche.",
    "Sa individuare, descrivere e confrontare in modo particolareggiato i principali paesaggi; classifica con padronanza regioni geografiche in base alle loro caratteristiche.",
    "Sa individuare, descrivere e confrontare in modo particolareggiato i principali paesaggi; classifica con padronanza regioni geografiche e sa ipotizzare soluzioni originali alle problematiche naturalistiche e culturali.",
  ],
  relazioni_35: [
    "Attraverso la sollecitazione dell adulto dimostra di aver intuito l interdipendenza degli elementi fisici e antropici del territorio.",
    "Sa argomentare l interdipendenza degli elementi fisici e antropici del territorio spiegandone le relazioni di causa-effetto in modo essenziale.",
    "Sa argomentare l interdipendenza degli elementi fisici e antropici del territorio spiegandone le relazioni di causa-effetto in modo adeguato.",
    "Sa argomentare in modo particolareggiato le relazioni di causa-effetto; con l aiuto del gruppo formula soluzioni alle problematiche naturalistiche e culturali.",
    "Sa argomentare in modo particolareggiato le relazioni di causa-effetto e sa ipotizzare soluzioni adeguate e originali alle problematiche naturalistiche e culturali.",
  ],
};

const FR_STO = {
  fonti: [
    "Sa riconoscere le fonti storiche.",
    "Sa riconoscere le fonti storiche e ne sa trarre informazioni.",
    "Sa riconoscere le fonti storiche, ne sa trarre informazioni e con l aiuto dell adulto sa metterle in relazione con i fatti storici.",
    "Sa riconoscere le fonti storiche, ne sa trarre informazioni e sa mettere in relazione i fatti storici emersi dallo studio delle fonti.",
    "Sa riconoscere le fonti storiche, ne sa trarre informazioni e sa mettere autonomamente in relazione i fatti storici emersi dallo studio delle fonti.",
  ],
  tempo: [
    "Con l aiuto dell adulto sa collocare i fatti sulla linea del tempo.",
    "Sa collocare i fatti sulla linea del tempo.",
    "Sa collocare i fatti sulla linea del tempo e con l aiuto dell adulto riconosce le relazioni di successione e contemporaneita.",
    "Sa collocare i fatti sulla linea del tempo riconoscendo le relazioni di successione e contemporaneita.",
    "Sa collocare con padronanza i fatti sulla linea del tempo riconoscendo con sicurezza le relazioni di successione e contemporaneita.",
  ],
  periodi: [
    "Con l aiuto dell adulto sa riconoscere, nei fatti studiati, i segni tipici dei diversi periodi storici.",
    "Sa riconoscere, nei fatti studiati, i segni tipici dei diversi periodi storici e i relativi elementi di continuita e cambiamento.",
    "Sa riconoscere i segni tipici dei diversi periodi storici e con l aiuto dell adulto sa stabilire i nessi tra gli aspetti delle diverse civilta e le confronta.",
    "Sa riconoscere i segni tipici dei diversi periodi storici e sa stabilire i nessi tra gli aspetti delle diverse civilta e le confronta.",
    "Sa riconoscere i segni tipici dei diversi periodi storici, sa stabilire in modo autonomo i nessi tra le civilta studiate e le confronta con sicurezza.",
  ],
  produzione: [
    "Se stimolato con domande rappresenta graficamente e/o verbalmente i fatti studiati usando le principali coordinate temporali.",
    "Rappresenta graficamente e/o verbalmente i fatti studiati usando le principali coordinate temporali.",
    "Con l aiuto dell adulto utilizza informazioni dirette e/o inferenziali per la produzione di brevi testi di sintesi degli argomenti studiati.",
    "Utilizza informazioni dirette e/o inferenziali per la produzione di testi di sintesi degli argomenti studiati.",
    "Utilizza con padronanza informazioni dirette e inferenziali per la produzione di testi di sintesi; sa esporre oralmente i contenuti con linguaggio appropriato.",
  ],
};

const FR_SCI = {
  osservazione: [
    "Riesce a descrivere oggetti e fenomeni osservati solo seguendo uno schema dato o con la guida dell insegnante.",
    "Sa ricercare e selezionare informazioni utili seguendo le indicazioni dell insegnante; descrive oggetti e fenomeni in modo essenziale.",
    "Sa ricercare e selezionare informazioni utili seguendo una procedura scritta; descrive oggetti e fenomeni in modo adeguato.",
    "Sa descrivere oggetti, fenomeni e trasformazioni in modo adeguato; ricerca e seleziona informazioni in maniera autonoma.",
    "Sa descrivere oggetti, fenomeni e trasformazioni in modo particolareggiato; ricerca e seleziona informazioni in maniera autonoma e originale.",
  ],
  ipotesi: [
    "Pone domande ovvie sul fenomeno osservato e, se guidato dall insegnante, tenta di fare ipotesi.",
    "Pone domande abbastanza coerenti sul fenomeno osservato e formula ipotesi se guidato nella riflessione.",
    "Pone domande coerenti sul fenomeno osservato e formula ipotesi in modo autonomo.",
    "Pone domande coerenti sul fenomeno osservato, formula ipotesi in modo autonomo e le verifica in maniera efficace.",
    "Pone domande coerenti e originali sul fenomeno osservato, formula ipotesi in modo autonomo e le verifica in maniera efficace.",
  ],
  linguaggio_sci: [
    "Fatica a usare il linguaggio scientifico in modo adeguato per descrivere i fenomeni osservati.",
    "Usa un linguaggio scientifico essenziale per descrivere i fenomeni osservati.",
    "Usa il linguaggio scientifico in modo abbastanza corretto per descrivere i fenomeni osservati.",
    "Usa il linguaggio specifico per descrivere concetti scientifici in modo corretto.",
    "Usa il linguaggio specifico per descrivere concetti scientifici con precisione e padronanza.",
  ],
};

const FR_TEC = {
  oggetti: [
    "Sa abbinare il nome e le funzioni delle principali componenti di apparecchi presentati, ma non li nomina e descrive in autonomia.",
    "Sa nominare e descrivere in modo essenziale le funzioni delle principali componenti di apparecchi presentati.",
    "Sa nominare e descrivere in modo adeguato le funzioni delle principali componenti di apparecchi presentati.",
    "Sa nominare, descrivere e riconoscere in autonomia le funzioni delle principali componenti di apparecchi presentati in modo preciso.",
    "Sa nominare, descrivere e riconoscere con precisione le funzioni delle principali componenti di apparecchi; sa guidare i compagni in difficolta.",
  ],
  codice: [
    "Con l aiuto sa leggere e interpretare una semplice scrittura in codice.",
    "Legge, interpreta e scrive una scrittura in codice con l aiuto di una legenda condivisa precedentemente ricordata.",
    "Legge, interpreta e scrive una scrittura in codice in autonomia senza bisogno di essere supportato.",
    "Sa leggere e interpretare una scrittura in codice in autonomia; scrive autonomamente un codice usando la simbologia convenzionale.",
    "Sa leggere, interpretare e scrivere scritture in codice con sicurezza; riesce a guidare i compagni in difficolta nell operazione.",
  ],
  costruzione: [
    "Deve essere guidato durante la costruzione di un oggetto o per comprendere le cause di un malfunzionamento.",
    "Sa pianificare la costruzione di un oggetto o di una procedura seguendo istruzioni suggerite; sa riconoscere le cause di un semplice malfunzionamento.",
    "Sa pianificare la costruzione di un oggetto o di una procedura in modo autonomo e sa seguire le istruzioni per risolvere un malfunzionamento di oggetti noti.",
    "Sa pianificare la costruzione di un oggetto o di una procedura in modo autonomo e originale; sa risolvere le cause di un malfunzionamento di oggetti noti e non noti.",
    "Sa pianificare in modo autonomo e originale; sa risolvere malfunzionamenti anche complessi e prevedere le conseguenze delle proprie scelte.",
  ],
  digitale: [
    "Se opportunamente guidato, sa utilizzare le procedure di taglia, copia e incolla.",
    "Seguendo una successione scritta di comandi, sa utilizzare le procedure di taglia, copia e incolla.",
    "Sa utilizzare in autonomia le procedure di taglia, copia e incolla.",
    "Intuisce l utilita delle procedure digitali e le utilizza al bisogno.",
    "Usa con padronanza le procedure digitali; riesce a guidare altri nella loro esecuzione; usa gli strumenti digitali in modo consapevole.",
  ],
};

const FR_ART = {
  produzione: [
    "Elabora disegni con schemi grafici essenziali e difficolta nell uso dello spazio foglio; utilizza colori e materiali in elaborati che necessitano di maggiore accuratezza.",
    "Elabora disegni con schemi grafici adeguati, non sempre con un utilizzo appropriato dello spazio foglio; utilizza colori e materiali in elaborati essenziali.",
    "Elabora disegni con schemi grafici adeguati e buon utilizzo dello spazio foglio; utilizza colori, materiali e tecniche in elaborati espressivi e accurati.",
    "Elabora disegni con schemi grafici particolareggiati e utilizza correttamente lo spazio foglio; utilizza colori, materiali e tecniche in lavori accurati.",
    "Elabora creativamente disegni con schemi grafici particolareggiati e originali; utilizza colori, materiali e tecniche in lavori molto ricchi, accurati e originali.",
  ],
  copiadalvero: [
    "Copia dal vero oggetti, persone, animali o ambienti con difficolta.",
    "Copia dal vero oggetti, persone, animali o ambienti riproducendo gli elementi basilari.",
    "Copia dal vero oggetti, persone, animali o ambienti riproducendo gli elementi con accuratezza e utilizzando tecniche diverse.",
    "Copia dal vero oggetti, persone, animali o ambienti con precisione e accuratezza, utilizzando tecniche diverse.",
    "Copia dal vero oggetti, persone, animali o ambienti con precisione e accuratezza, utilizzando tecniche diverse e semplici regole prospettiche.",
  ],
  osservazione_art: [
    "Coglie solo gli elementi piu evidenti delle immagini d arte.",
    "E in grado di osservare e cogliere gli elementi basilari delle immagini d arte.",
    "E in grado di osservare, esplorare e descrivere gli elementi essenziali delle immagini d arte.",
    "E in grado di osservare, esplorare, leggere e descrivere le immagini d arte.",
    "E in grado di osservare, esplorare, leggere e descrivere le immagini d arte con sicurezza e linguaggio appropriato.",
  ],
};

const FR_MOT = {
  schemi: [
    "Esegue esercizi a corpo libero e semplici percorsi imitando un modello e con il supporto dell insegnante.",
    "Esegue esercizi a corpo libero e semplici percorsi in maniera autonoma ma non sempre disinvolta.",
    "Esegue esercizi a corpo libero e semplici percorsi coordinandosi con sicurezza.",
    "Esegue esercizi a corpo libero e percorsi coordinandosi con sicurezza; sa muoversi in relazione allo spazio e agli elementi che lo occupano.",
    "Esegue esercizi e percorsi con sicurezza e diventa un modello per i compagni in difficolta; sa muoversi in relazione allo spazio considerando anche la variabile del tempo.",
  ],
  corpo: [
    "Deve essere sollecitato per esprimere messaggi e stati d animo attraverso il corpo; riesce a usare il corpo solo in contesti di piccolo gruppo.",
    "Sa esprimere i propri stati d animo attraverso il corpo e il movimento in contesti di piccolo gruppo o familiari.",
    "Sa esprimere i propri stati d animo e comunicare attraverso il corpo e il movimento.",
    "Sa esprimere i propri stati d animo e comunicare attraverso il corpo e il movimento in modo consapevole.",
    "Sa esprimere i propri stati d animo e comunicare attraverso il corpo e il movimento in maniera originale.",
  ],
  regole: [
    "In situazioni di giochi proposti da altri deve essere sollecitato perche non sempre accetta di buon grado di partecipare.",
    "Sa accettare le proposte di gioco altrui partecipando all attivita se sono a lui familiari; conosce le regole dei giochi ma non sempre riesce a rispettarle.",
    "Sa accettare le proposte di gioco altrui partecipando all attivita; conosce le regole dei giochi proposti e le rispetta.",
    "Sa accettare le proposte di gioco altrui partecipando con continuita; conosce le regole e le rispetta.",
    "Accetta le proposte di gioco partecipando e assumendo un ruolo significativo; conosce le regole e contribuisce al rispetto da parte dei compagni.",
  ],
  salute: [
    "Intuisce con fatica che alimentazione, esercizio fisico e igiene personale rappresentano elementi fondamentali per la salute; deve essere sollecitato alla riflessione.",
    "Dimostra di aver intuito il legame tra alimentazione, esercizio fisico, igiene e salute, ma non sempre riesce a ricondurre le riflessioni ad azioni concrete.",
    "Sa che alimentazione, esercizio fisico e igiene personale rappresentano elementi fondamentali per la salute e si adegua ai comportamenti proposti.",
    "Dimostra comportamenti che dimostrano di aver compreso la relazione tra alimentazione, esercizio fisico, igiene e salute.",
    "Nella quotidianita attiva comportamenti che dimostrano la comprensione del legame tra alimentazione, esercizio fisico, igiene e salute, proponendo idee e contributi come mezzi di prevenzione.",
  ],
};

const FR_CIV = {
  costituzione: [
    "Conosce e applica parzialmente i principi fondamentali alla base della convivenza pacifica; riconosce con il supporto del docente la necessita di regole condivise.",
    "Conosce e applica in modo essenziale i principi fondamentali alla base della convivenza pacifica; riconosce in parte la necessita di regole condivise.",
    "Conosce e applica i principi fondamentali alla base della convivenza pacifica; riconosce la necessita di regole condivise.",
    "Conosce e applica in modo consapevole i principi fondamentali alla base della convivenza pacifica; riconosce in piena autonomia la necessita di regole condivise.",
    "Conosce e applica in modo consapevole i principi fondamentali alla base della convivenza pacifica; riconosce in piena autonomia la necessita di regole condivise e conosce in modo approfondito i documenti affrontati.",
  ],
  sostenibilita: [
    "Conosce e applica parzialmente i principi di sicurezza, sostenibilita e salvaguardia dei beni comuni; assume comportamenti corretti solo con il supporto del docente riguardo al consumo del cibo e allo smaltimento dei rifiuti.",
    "Conosce e applica in modo essenziale i principi di sicurezza, sostenibilita e salvaguardia dei beni comuni; assume comportamenti corretti dietro suggerimento del docente.",
    "Conosce e applica i principi di sicurezza, sostenibilita e salvaguardia dei beni comuni; assume comportamenti corretti riguardo al consumo del cibo e allo smaltimento dei rifiuti.",
    "Conosce e applica in modo consapevole i principi di sicurezza, sostenibilita e salvaguardia dei beni comuni; assume comportamenti corretti apportando contributi personali.",
    "Conosce e applica in modo consapevole i principi di sicurezza, sostenibilita e salvaguardia dei beni comuni; assume comportamenti corretti apportando contributi personali e promuovendo la riflessione nel gruppo.",
  ],
  digitale: [
    "Comprende il ruolo dei media digitali nella comunicazione interpersonale solo se guidato.",
    "Comprende con l aiuto dell adulto il ruolo dei media digitali nella comunicazione interpersonale e come strumento di conoscenza.",
    "Comprende il ruolo dei media digitali nella comunicazione interpersonale e come strumento di conoscenza.",
    "Comprende pienamente il ruolo dei media digitali; si avvia a riconoscerne, oltre alle opportunita, i rischi.",
    "Comprende pienamente il ruolo dei media digitali nella comunicazione e nella conoscenza; riconosce con sicurezza sia le opportunita che i rischi relativi.",
  ],
};

// ── DOMANDE ──────────────────────────────────────────────────────────────────

const DOMANDE = {
  matematica: {
    1: [
      { id:"numeri",    area:"Numeri",    t:"Legge e scrive i numeri fino a 20 in cifra e in lettera, rispettando la direzionalita?",           frasi: FR_MAT.numeri_12 },
      { id:"calcolo",   area:"Calcolo",   t:"Esegue addizioni e sottrazioni entro il 20, anche senza strumenti di supporto?",                    frasi: FR_MAT.calcolo_12 },
      { id:"problemi",  area:"Problemi",  t:"Riconosce situazioni problematiche e sa scegliere l operazione giusta per risolverle?",              frasi: FR_MAT.problemi_12 },
      { id:"geometria", area:"Geometria", t:"Riconosce e nomina le principali figure geometriche piane e solide?",                               frasi: FR_MAT.geometria_12 },
      { id:"dati",      area:"Dati",      t:"Sa raccogliere dati e leggerli in semplici rappresentazioni grafiche?",                             frasi: FR_MAT.dati_12 },
    ],
    2: [
      { id:"numeri",    area:"Numeri",    t:"Legge, scrive e ordina i numeri entro il 100?",                                                     frasi: FR_MAT.numeri_12 },
      { id:"composiz",  area:"Valore posizionale", t:"Compone e scompone i numeri entro il 100 riconoscendo il valore posizionale delle cifre?",  frasi: FR_MAT.composiz_12 },
      { id:"calcolo",   area:"Calcolo",   t:"Esegue addizioni e sottrazioni in colonna con e senza cambio? Sa affidarsi alle tabelline?",         frasi: FR_MAT.calcolo_12 },
      { id:"problemi",  area:"Problemi",  t:"Legge e comprende il testo di un problema, individua i dati utili e sceglie la strategia?",         frasi: FR_MAT.problemi_12 },
      { id:"geometria", area:"Geometria", t:"Riconosce e classifica linee, figure piane e solidi in base ai loro elementi caratterizzanti?",      frasi: FR_MAT.geometria_12 },
      { id:"dati",      area:"Dati",      t:"Raccoglie dati, costruisce e legge semplici tabelle a doppia entrata?",                             frasi: FR_MAT.dati_12 },
    ],
    3: [
      { id:"numeri",    area:"Numeri",    t:"Legge e scrive numeri entro il migliaio e oltre, anche decimali?",                                  frasi: FR_MAT.numeri_35 },
      { id:"composiz",  area:"Valore posizionale", t:"Compone e scompone i numeri entro il migliaio in autonomia? Conta in progressivo e regressivo da qualsiasi numero?", frasi: FR_MAT.composiz_12 },
      { id:"calcolo",   area:"Calcolo",   t:"Esegue le quattro operazioni con numeri interi (e decimali) con sufficiente sicurezza?",            frasi: FR_MAT.calcolo_35 },
      { id:"frazioni",  area:"Frazioni",  t:"Riconosce una frazione, ne indica gli elementi e applica il concetto a quantita concrete?",         frasi: FR_MAT.frazioni_35 },
      { id:"problemi",  area:"Problemi",  t:"Individua i dati utili di un problema e formula ipotesi risolutive anche con strategie personali?",  frasi: FR_MAT.problemi_35 },
      { id:"dati",      area:"Dati e misure", t:"Usa sistemi di misura convenzionali? Legge e interpreta tabelle e grafici a barre?",            frasi: FR_MAT.dati_35 },
    ],
    4: [
      { id:"numeri",    area:"Numeri",    t:"Riconosce il valore posizionale dei numeri entro il 100.000? Compone e scompone numeri interi e decimali?", frasi: FR_MAT.numeri_35 },
      { id:"frazioni",  area:"Frazioni",  t:"Classifica frazioni proprie, improprie e apparenti? Sa passare dalla frazione al numero decimale?",  frasi: FR_MAT.frazioni_35 },
      { id:"calcolo",   area:"Calcolo",   t:"Esegue le quattro operazioni con interi e decimali (a mente e in colonna) con sicurezza?",          frasi: FR_MAT.calcolo_35 },
      { id:"geometria", area:"Spazio e figure", t:"Riconosce, disegna e classifica poligoni, triangoli e angoli?",                               frasi: FR_MAT.geometria_35 },
      { id:"misure",    area:"Perimetri e aree", t:"Calcola perimetri e aree utilizzando le formule in modo corretto?",                           frasi: FR_MAT.misure_35 },
      { id:"problemi",  area:"Problemi",  t:"Legge problemi con dati impliciti, formula ipotesi risolutive e argomenta il procedimento?",        frasi: FR_MAT.problemi_35 },
      { id:"dati",      area:"Dati",      t:"Costruisce, legge e interpreta grafici e tabelle? Sa raccogliere dati da un indagine?",             frasi: FR_MAT.dati_35 },
    ],
    5: [
      { id:"numeri",    area:"Numeri",    t:"Opera con i grandi numeri e i numeri decimali in modo autonomo? Sa scegliere quando usare la calcolatrice?", frasi: FR_MAT.numeri_35 },
      { id:"calcolo",   area:"Calcolo",   t:"Esegue le quattro operazioni con sicurezza, anche con i decimali (a mente e in colonna)?",          frasi: FR_MAT.calcolo_35 },
      { id:"misure",    area:"Spazio e misure", t:"Rappresenta, confronta e analizza figure geometriche? Calcola perimetri e aree con le formule?", frasi: FR_MAT.misure_35 },
      { id:"problemi",  area:"Problemi",  t:"Riconosce e risolve problemi in modo autonomo, giustificando il procedimento con diverse strategie?", frasi: FR_MAT.problemi_35 },
      { id:"dati",      area:"Dati",      t:"Classifica, raccoglie dati e li rappresenta graficamente? Sa leggere e interpretare grafici di vario tipo?", frasi: FR_MAT.dati_35 },
    ],
  },
  italiano: {
    1: [
      { id:"lettura",     area:"Lettura",       t:"Legge sillabando fino alla lettura scorrevole? Rispetta la punteggiatura di base?",            frasi: FR_ITA.lettura_12 },
      { id:"comprensione",area:"Comprensione",  t:"Comprende le informazioni principali di un testo letto o ascoltato?",                         frasi: FR_ITA.comprensione_12 },
      { id:"oralita",     area:"Oralita",       t:"Partecipa alle conversazioni in modo pertinente? Ascolta narrazioni e ne riferisce il contenuto?", frasi: FR_ITA.oralita_12 },
      { id:"scrittura",   area:"Scrittura",     t:"Scrive frasi rispettando le prime convenzioni ortografiche (maiuscole, apostrofo, suoni difficili)?", frasi: FR_ITA.scrittura_12 },
      { id:"riflessione", area:"Riflessione",   t:"Riconosce le prime categorie grammaticali (nome, verbo, aggettivo)?",                         frasi: FR_ITA.riflessione_12 },
    ],
    2: [
      { id:"lettura",     area:"Lettura",       t:"Legge testi in modo scorrevole rispettando la punteggiatura? Cura la lettura autonoma?",       frasi: FR_ITA.lettura_12 },
      { id:"comprensione",area:"Comprensione",  t:"Comprende le informazioni sia esplicite che implicite di un testo? Ascolta e riferisce il senso globale con i dettagli?", frasi: FR_ITA.comprensione_12 },
      { id:"oralita",     area:"Oralita",       t:"Interagisce nelle conversazioni con interventi pertinenti? Sa raccontare fatti in ordine cronologico?", frasi: FR_ITA.oralita_12 },
      { id:"scrittura",   area:"Scrittura",     t:"Scrive messaggi esprimendo chiaramente lo scopo comunicativo? Rispetta le convenzioni ortografiche?", frasi: FR_ITA.scrittura_12 },
      { id:"riflessione", area:"Riflessione",   t:"Riconosce e usa le principali categorie morfologiche? Costruisce frasi e discorsi in modo corretto?", frasi: FR_ITA.riflessione_12 },
    ],
    3: [
      { id:"lettura",     area:"Lettura",       t:"Legge in modo scorrevole ed espressivo testi di diverso tipo? Si interessa alla lettura autonoma?", frasi: FR_ITA.lettura_35 },
      { id:"comprensione",area:"Comprensione",  t:"Comprende argomento centrale, informazioni esplicite e implicite? Sa cogliere le intenzioni comunicative di chi scrive?", frasi: FR_ITA.comprensione_35 },
      { id:"oralita",     area:"Oralita",       t:"Racconta eventi in ordine cronologico? Partecipa attivamente alle discussioni con interventi pertinenti?", frasi: FR_ITA.oralita_35 },
      { id:"produzione",  area:"Produzione scritta", t:"Organizza testi scritti in modo logico e consequenziale esprimendo con coerenza il proprio pensiero?", frasi: FR_ITA.produzione_35 },
      { id:"ortografia",  area:"Ortografia",    t:"Rispetta le fondamentali convenzioni ortografiche e la punteggiatura (inclusa quella interna e dei dialoghi)?", frasi: FR_ITA.ortografia_35 },
      { id:"riflessione", area:"Riflessione",   t:"Riconosce e usa correttamente le parti variabili del discorso? Analizza gli elementi della frase semplice?", frasi: FR_ITA.riflessione_35 },
    ],
    4: [
      { id:"lettura",     area:"Lettura",       t:"Legge in modo espressivo riconoscendo le diverse tipologie testuali? Sa scegliere testi in base al genere letterario?", frasi: FR_ITA.lettura_35 },
      { id:"comprensione",area:"Comprensione",  t:"Sa ricercare e distinguere informazioni principali da secondarie? Comprende le intenzioni comunicative dell autore?", frasi: FR_ITA.comprensione_35 },
      { id:"oralita",     area:"Oralita",       t:"Racconta esperienze in modo logico e cronologico? Sa argomentare la propria opinione in modo pertinente?", frasi: FR_ITA.oralita_35 },
      { id:"produzione",  area:"Produzione scritta", t:"Scrive testi coerenti e coesi per scopi diversi (narrare, descrivere, informare) con lessico curato?", frasi: FR_ITA.produzione_35 },
      { id:"ortografia",  area:"Ortografia",    t:"Rispetta le convenzioni ortografiche, la punteggiatura e la concordanza dei tempi verbali?",    frasi: FR_ITA.ortografia_35 },
      { id:"riflessione", area:"Riflessione",   t:"Riconosce e analizza le parti del discorso? Sa individuare predicato, soggetto e complementi?",  frasi: FR_ITA.riflessione_35 },
    ],
    5: [
      { id:"lettura",     area:"Lettura",       t:"Legge con sicurezza testi complessi? Cura con passione la lettura autonoma anche a casa?",      frasi: FR_ITA.lettura_35 },
      { id:"comprensione",area:"Comprensione",  t:"Comprende argomento centrale, informazioni implicite e intenzioni comunicative? Sa distinguere informazioni principali da secondarie?", frasi: FR_ITA.comprensione_35 },
      { id:"oralita",     area:"Oralita",       t:"Espone contenuti studiati in modo chiaro? Interagisce con domande e contributi pertinenti rispettando il turno di parola?", frasi: FR_ITA.oralita_35 },
      { id:"produzione",  area:"Produzione scritta", t:"Produce testi strutturati e coesi con lessico curato e pensiero originale?",                frasi: FR_ITA.produzione_35 },
      { id:"ortografia",  area:"Ortografia",    t:"Rispetta le convenzioni ortografiche, la punteggiatura e la concordanza dei tempi verbali?",    frasi: FR_ITA.ortografia_35 },
      { id:"riflessione", area:"Riflessione",   t:"Analizza le parti del discorso e gli elementi della frase minima e complessa? Usa il dizionario?", frasi: FR_ITA.riflessione_35 },
    ],
  },
  inglese: {
    1: [
      { id:"ascolto",   area:"Ascolto",   t:"Comprende vocaboli, istruzioni e semplici espressioni di saluto pronunciate chiaramente?",          frasi: FR_ING.ascolto_12 },
      { id:"parlato",   area:"Parlato",   t:"Usa vocaboli per nominare oggetti e utilizza semplici espressioni di saluto per interagire?",        frasi: FR_ING.parlato_12 },
      { id:"lettura",   area:"Lettura",   t:"Sa mettere in relazione parola e immagine in modo autonomo?",                                       frasi: FR_ING.lettura_12 },
      { id:"scrittura", area:"Scrittura", t:"Sa copiare parole attinenti alle attivita svolte in classe?",                                       frasi: FR_ING.scrittura_12 },
    ],
    2: [
      { id:"ascolto",   area:"Ascolto",   t:"Comprende semplici vocaboli, istruzioni e frasi di uso quotidiano? Capisce il senso globale di dialoghi semplici?", frasi: FR_ING.ascolto_12 },
      { id:"parlato",   area:"Parlato",   t:"Usa vocaboli ed espressioni di saluto e presentazione per interagire con compagni e insegnante?",    frasi: FR_ING.parlato_12 },
      { id:"lettura",   area:"Lettura",   t:"Comprende parole, brevi frasi e semplici fumetti in modo sicuro?",                                  frasi: FR_ING.lettura_12 },
      { id:"scrittura", area:"Scrittura", t:"Sa copiare parole e semplici frasi attinenti alle attivita svolte in classe?",                      frasi: FR_ING.scrittura_12 },
    ],
    3: [
      { id:"ascolto",   area:"Ascolto",   t:"Comprende vocaboli, istruzioni e frasi per descrivere oggetti e persone, anche senza immagini?",     frasi: FR_ING.ascolto_35 },
      { id:"parlato",   area:"Parlato",   t:"Utilizza frasi significative per interagire e fa brevi descrizioni di oggetti, persone e luoghi?",   frasi: FR_ING.parlato_35 },
      { id:"lettura",   area:"Lettura",   t:"Legge e comprende messaggi e semplici descrizioni in modo sicuro?",                                 frasi: FR_ING.lettura_35 },
      { id:"scrittura", area:"Scrittura", t:"Scrive parole e semplici frasi di uso quotidiano usando le strutture conosciute?",                  frasi: FR_ING.scrittura_35 },
    ],
    4: [
      { id:"ascolto",   area:"Ascolto",   t:"Comprende il senso globale e i dettagli di un testo anche senza supporto visivo?",                  frasi: FR_ING.ascolto_35 },
      { id:"parlato",   area:"Parlato",   t:"Utilizza le strutture linguistiche per interagire in modo pertinente al contesto, con buona pronuncia?", frasi: FR_ING.parlato_35 },
      { id:"lettura",   area:"Lettura",   t:"Legge e comprende messaggi, descrizioni e semplici testi in modo sicuro?",                          frasi: FR_ING.lettura_35 },
      { id:"scrittura", area:"Scrittura", t:"Scrive autonomamente frasi sulle strutture apprese? Sa completare testi e creare brevi elaborati su modello?", frasi: FR_ING.scrittura_35 },
    ],
    5: [
      { id:"ascolto",   area:"Ascolto",   t:"Comprende il senso globale e i dettagli di istruzioni, dialoghi e storie con sicurezza?",           frasi: FR_ING.ascolto_35 },
      { id:"parlato",   area:"Parlato",   t:"Utilizza le strutture linguistiche per interagire e fare brevi esposizioni con pronuncia e intonazione corrette?", frasi: FR_ING.parlato_35 },
      { id:"lettura",   area:"Lettura",   t:"Legge e comprende messaggi, descrizioni e testi di vario genere in modo sicuro?",                   frasi: FR_ING.lettura_35 },
      { id:"scrittura", area:"Scrittura", t:"Scrive in modo sicuro e autonomo frasi e brevi testi? Sa rispondere a domande e creare testi su modello?", frasi: FR_ING.scrittura_35 },
    ],
  },
  geografia: {
    1: [
      { id:"orientamento", area:"Orientamento",     t:"Distingue e denomina le posizioni nello spazio relative a se stesso e agli oggetti? Sa rappresentare percorsi noti?", frasi: FR_GEO.orientamento_12 },
      { id:"linguaggio",   area:"Rappresentazione", t:"Sa ricostruire in modo tridimensionale uno spazio conosciuto? Sa leggere e interpretare la pianta di uno spazio noto?", frasi: FR_GEO.linguaggio_12 },
      { id:"paesaggio",    area:"Paesaggio",         t:"Sa individuare gli elementi globali e specifici del paesaggio circostante attraverso l osservazione diretta?",        frasi: FR_GEO.paesaggio_12 },
    ],
    2: [
      { id:"orientamento", area:"Orientamento",     t:"Sa usare punti di riferimento e organizzatori topologici per orientarsi nello spazio? Sa rappresentare percorsi spaziali noti?", frasi: FR_GEO.orientamento_12 },
      { id:"linguaggio",   area:"Rappresentazione", t:"Sa ricostruire in modo tridimensionale uno spazio conosciuto e realizzarne la pianta? Sa leggere la pianta basandosi su punti di riferimento fissi?", frasi: FR_GEO.linguaggio_12 },
      { id:"paesaggio",    area:"Paesaggio",         t:"Sa individuare gli elementi globali e specifici del paesaggio circostante?",                                           frasi: FR_GEO.paesaggio_12 },
    ],
    3: [
      { id:"orientamento", area:"Orientamento",   t:"Si orienta autonomamente nello spazio seguendo istruzioni verbali, simboli, percorsi grafici e piante?",               frasi: FR_GEO.orientamento_35 },
      { id:"linguaggio",   area:"Linguaggio geo", t:"Sa rappresentare in prospettiva verticale ambienti noti? Sa leggere semplici carte cartografiche?",                    frasi: FR_GEO.linguaggio_35 },
      { id:"paesaggio",    area:"Paesaggio",       t:"Sa descrivere in modo particolareggiato il territorio circostante e individuare gli elementi fisici e antropici dei vari paesaggi?", frasi: FR_GEO.paesaggio_35 },
      { id:"relazioni",    area:"Relazioni",       t:"Sa dedurre conoscenze su un ambiente attraverso l analisi degli elementi? Sa fare ipotesi sulle relazioni causa-effetto nel territorio?", frasi: FR_GEO.relazioni_35 },
    ],
    4: [
      { id:"orientamento", area:"Orientamento",   t:"Sa usare la bussola e i punti cardinali per orientarsi nello spazio e sulle carte in modo autonomo?",                 frasi: FR_GEO.orientamento_35 },
      { id:"linguaggio",   area:"Linguaggio geo", t:"Sa ricavare dalle carte informazioni utili per l analisi di fatti locali e globali? Sa localizzare elementi fisici e antropici sulla carta?", frasi: FR_GEO.linguaggio_35 },
      { id:"paesaggio",    area:"Paesaggio",       t:"Sa individuare, descrivere e confrontare gli elementi dei principali paesaggi italiani? Sa classificare regioni geografiche?", frasi: FR_GEO.paesaggio_35 },
      { id:"relazioni",    area:"Relazioni",       t:"Sa argomentare l interdipendenza tra elementi fisici e antropici del territorio? Sa spiegare le relazioni causa-effetto?", frasi: FR_GEO.relazioni_35 },
    ],
    5: [
      { id:"orientamento", area:"Orientamento",   t:"Si orienta con sicurezza usando bussola, carte e punti cardinali? Sa proporre alternative di orientamento?",           frasi: FR_GEO.orientamento_35 },
      { id:"linguaggio",   area:"Linguaggio geo", t:"Ricava con padronanza informazioni da carte per analizzare fenomeni locali e globali? Sa localizzare elementi sul planisfero?", frasi: FR_GEO.linguaggio_35 },
      { id:"paesaggio",    area:"Paesaggio",       t:"Sa individuare, descrivere e confrontare in modo particolareggiato i principali paesaggi italiani e mondiali?",       frasi: FR_GEO.paesaggio_35 },
      { id:"relazioni",    area:"Relazioni",       t:"Sa argomentare l interdipendenza degli elementi fisici e antropici? Sa ipotizzare soluzioni alle problematiche naturalistiche e culturali?", frasi: FR_GEO.relazioni_35 },
    ],
  },
  storia: {
    2: [
      { id:"fonti",      area:"Uso delle fonti",    t:"Sa riconoscere le fonti storiche e trarne informazioni? Sa metterle in relazione con i fatti storici?",               frasi: FR_STO.fonti },
      { id:"tempo",      area:"Linea del tempo",    t:"Sa collocare i fatti sulla linea del tempo? Riconosce relazioni di successione e contemporaneita?",                   frasi: FR_STO.tempo },
      { id:"produzione", area:"Produzione",         t:"Sa rappresentare graficamente e/o verbalmente i fatti vissuti e studiati usando le coordinate temporali?",            frasi: FR_STO.produzione },
    ],
    3: [
      { id:"fonti",      area:"Uso delle fonti",    t:"Sa riconoscere le fonti storiche, trarne informazioni e metterle in relazione con i fatti storici studiati?",         frasi: FR_STO.fonti },
      { id:"tempo",      area:"Linea del tempo",    t:"Sa collocare i fatti sulla linea del tempo e riconosce relazioni di successione e contemporaneita?",                  frasi: FR_STO.tempo },
      { id:"periodi",    area:"Orientamento storico", t:"Sa riconoscere i segni tipici dei diversi periodi storici e stabilire nessi tra le caratteristiche degli ominidi?", frasi: FR_STO.periodi },
      { id:"produzione", area:"Produzione",         t:"Sa produrre brevi testi di sintesi sugli argomenti studiati, utilizzando informazioni dirette e inferenziali?",       frasi: FR_STO.produzione },
    ],
    4: [
      { id:"fonti",      area:"Uso delle fonti",    t:"Sa riconoscere le fonti storiche, trarne informazioni e metterle in relazione con i fatti storici?",                  frasi: FR_STO.fonti },
      { id:"tempo",      area:"Linea del tempo",    t:"Sa collocare i fatti sulla linea del tempo con sicurezza? Riconosce relazioni di successione e contemporaneita?",     frasi: FR_STO.tempo },
      { id:"periodi",    area:"Orientamento storico", t:"Sa riconoscere i segni tipici dei diversi periodi e stabilire nessi tra le diverse civilta, confrontandole?",       frasi: FR_STO.periodi },
      { id:"produzione", area:"Produzione",         t:"Sa produrre testi di sintesi? Sa esporre i fatti con le coordinate temporali e fare collegamenti causa-effetto?",     frasi: FR_STO.produzione },
    ],
    5: [
      { id:"fonti",      area:"Uso delle fonti",    t:"Sa riconoscere le fonti storiche, trarne informazioni e metterle autonomamente in relazione con i fatti storici?",    frasi: FR_STO.fonti },
      { id:"tempo",      area:"Linea del tempo",    t:"Sa collocare con padronanza i fatti sulla linea del tempo? Riconosce con sicurezza le relazioni temporali?",          frasi: FR_STO.tempo },
      { id:"periodi",    area:"Orientamento storico", t:"Sa riconoscere i segni tipici dei periodi storici e stabilire in modo autonomo i nessi tra le civilta studiate?",   frasi: FR_STO.periodi },
      { id:"produzione", area:"Produzione",         t:"Sa produrre testi di sintesi con informazioni dirette e inferenziali? Sa esporre i contenuti con linguaggio appropriato?", frasi: FR_STO.produzione },
    ],
  },
  scienze: {
    1: [
      { id:"osservazione", area:"Osservazione", t:"Sa descrivere oggetti, fenomeni e esseri viventi osservati in modo adeguato, evidenziando i particolari?",               frasi: FR_SCI.osservazione },
      { id:"ipotesi",      area:"Ipotesi",      t:"Pone domande coerenti sul fenomeno osservato e formula ipotesi in modo autonomo?",                                       frasi: FR_SCI.ipotesi },
      { id:"linguaggio",   area:"Linguaggio",  t:"Usa un linguaggio scientifico adeguato per descrivere i fenomeni osservati?",                                             frasi: FR_SCI.linguaggio_sci },
    ],
    2: [
      { id:"osservazione", area:"Osservazione", t:"Sa descrivere oggetti, fenomeni e esseri viventi osservati in modo adeguato, evidenziando i particolari?",               frasi: FR_SCI.osservazione },
      { id:"ipotesi",      area:"Ipotesi",      t:"Pone domande coerenti sul fenomeno osservato e formula ipotesi in modo autonomo?",                                       frasi: FR_SCI.ipotesi },
      { id:"linguaggio",   area:"Linguaggio",  t:"Usa un linguaggio scientifico adeguato per descrivere i fenomeni osservati?",                                             frasi: FR_SCI.linguaggio_sci },
    ],
    3: [
      { id:"osservazione", area:"Osservazione", t:"Sa descrivere oggetti, fenomeni e trasformazioni in modo adeguato? Sa ricercare informazioni seguendo procedure scritte?", frasi: FR_SCI.osservazione },
      { id:"ipotesi",      area:"Ipotesi",      t:"Pone domande coerenti sul fenomeno osservato e formula ipotesi in modo autonomo? Sa verificarle in maniera efficace?",   frasi: FR_SCI.ipotesi },
      { id:"linguaggio",   area:"Linguaggio",  t:"Usa il linguaggio specifico per descrivere concetti scientifici in modo corretto?",                                       frasi: FR_SCI.linguaggio_sci },
    ],
    4: [
      { id:"osservazione", area:"Osservazione", t:"Sa descrivere oggetti, fenomeni e trasformazioni in modo particolareggiato? Sa ricercare informazioni in modo autonomo?", frasi: FR_SCI.osservazione },
      { id:"ipotesi",      area:"Ipotesi",      t:"Pone domande coerenti e originali? Formula ipotesi in modo autonomo e sa verificarle in maniera efficace?",              frasi: FR_SCI.ipotesi },
      { id:"linguaggio",   area:"Linguaggio",  t:"Usa il linguaggio scientifico con precisione? Sa collegare i contenuti appresi con la vita quotidiana?",                  frasi: FR_SCI.linguaggio_sci },
    ],
    5: [
      { id:"osservazione", area:"Osservazione", t:"Sa descrivere oggetti, fenomeni e trasformazioni in modo particolareggiato? Sa ricercare informazioni in modo autonomo e originale?", frasi: FR_SCI.osservazione },
      { id:"ipotesi",      area:"Ipotesi",      t:"Pone domande coerenti e originali? Formula ipotesi in modo autonomo e le verifica in maniera efficace?",                 frasi: FR_SCI.ipotesi },
      { id:"linguaggio",   area:"Linguaggio",  t:"Usa il linguaggio scientifico con padronanza? Sa fare collegamenti tra fenomeni e con la vita quotidiana?",               frasi: FR_SCI.linguaggio_sci },
    ],
  },
  tecnologia: {
    1: [
      { id:"oggetti",     area:"Oggetti",     t:"Sa nominare e descrivere le funzioni delle principali componenti di apparecchi presentati?",                              frasi: FR_TEC.oggetti },
      { id:"codice",      area:"Codice",      t:"Sa leggere e interpretare una semplice scrittura in codice con l aiuto di una legenda condivisa?",                        frasi: FR_TEC.codice },
      { id:"costruzione", area:"Costruzione", t:"Sa pianificare la costruzione di un semplice oggetto seguendo istruzioni suggerite? Sa riconoscere un semplice malfunzionamento?", frasi: FR_TEC.costruzione },
      { id:"digitale",    area:"Digitale",    t:"Sa usare le procedure di taglia, copia e incolla con il supporto dell insegnante?",                                       frasi: FR_TEC.digitale },
    ],
    2: [
      { id:"oggetti",     area:"Oggetti",     t:"Sa nominare e descrivere in modo adeguato le funzioni delle principali componenti di apparecchi presentati?",             frasi: FR_TEC.oggetti },
      { id:"codice",      area:"Codice",      t:"Sa leggere, interpretare e scrivere una scrittura in codice con l aiuto di una legenda condivisa?",                       frasi: FR_TEC.codice },
      { id:"costruzione", area:"Costruzione", t:"Sa pianificare la costruzione di un oggetto seguendo istruzioni suggerite?",                                              frasi: FR_TEC.costruzione },
      { id:"digitale",    area:"Digitale",    t:"Sa usare le procedure digitali di base (taglia, copia, incolla) nelle situazioni note?",                                  frasi: FR_TEC.digitale },
    ],
    3: [
      { id:"oggetti",     area:"Oggetti",     t:"Sa nominare, descrivere e riconoscere le funzioni delle principali componenti di apparecchi in modo adeguato?",           frasi: FR_TEC.oggetti },
      { id:"codice",      area:"Codice",      t:"Sa leggere, interpretare e scrivere una scrittura in codice in autonomia?",                                               frasi: FR_TEC.codice },
      { id:"costruzione", area:"Costruzione", t:"Sa pianificare in modo autonomo la costruzione di oggetti o procedure? Sa risolvere malfunzionamenti di oggetti noti?",   frasi: FR_TEC.costruzione },
      { id:"digitale",    area:"Digitale",    t:"Sa usare con padronanza le procedure digitali e le usa al bisogno?",                                                      frasi: FR_TEC.digitale },
    ],
    4: [
      { id:"oggetti",     area:"Oggetti",     t:"Sa nominare, descrivere e riconoscere con precisione le funzioni delle principali componenti di apparecchi?",             frasi: FR_TEC.oggetti },
      { id:"codice",      area:"Codice",      t:"Sa leggere, interpretare e scrivere scritture in codice in modo autonomo? Sa guidare compagni in difficolta?",            frasi: FR_TEC.codice },
      { id:"costruzione", area:"Costruzione", t:"Sa pianificare in modo autonomo e originale costruzioni e procedure? Sa risolvere malfunzionamenti anche non noti?",      frasi: FR_TEC.costruzione },
      { id:"digitale",    area:"Digitale",    t:"Sa usare con padronanza le procedure digitali in modo consapevole? Sa guidare altri nella loro esecuzione?",              frasi: FR_TEC.digitale },
    ],
    5: [
      { id:"oggetti",     area:"Oggetti",     t:"Sa nominare, descrivere e riconoscere con sicurezza le funzioni delle principali componenti di apparecchi?",              frasi: FR_TEC.oggetti },
      { id:"codice",      area:"Codice",      t:"Sa leggere, interpretare e scrivere scritture in codice con sicurezza? Sa essere di supporto ai compagni?",               frasi: FR_TEC.codice },
      { id:"costruzione", area:"Costruzione", t:"Sa pianificare in modo autonomo e originale? Sa risolvere malfunzionamenti complessi e prevedere le conseguenze delle scelte?", frasi: FR_TEC.costruzione },
      { id:"digitale",    area:"Digitale",    t:"Usa gli strumenti digitali in modo sicuro, autonomo e consapevole? Sa valutare rischi e opportunita delle tecnologie?",   frasi: FR_TEC.digitale },
    ],
  },
  arte: {
    all: [
      { id:"produzione",   area:"Produzione grafica", t:"Elabora disegni con schemi grafici adeguati e buon uso dello spazio foglio? Usa colori, materiali e tecniche in modo accurato?", frasi: FR_ART.produzione },
      { id:"copiadalvero", area:"Copia dal vero",     t:"Sa copiare dal vero oggetti, persone, animali o ambienti riproducendo gli elementi con accuratezza?",              frasi: FR_ART.copiadalvero },
      { id:"osservazione", area:"Lettura immagini",   t:"Sa osservare, esplorare e descrivere le immagini d arte cogliendone gli elementi formali (linee, colori, forme)?", frasi: FR_ART.osservazione_art },
    ],
  },
  motoria: {
    all: [
      { id:"schemi",   area:"Schemi motori",  t:"Coordina i movimenti con sicurezza (equilibrio, lateralita, coordinazione)? Sa eseguire percorsi motori in autonomia?",   frasi: FR_MOT.schemi },
      { id:"corpo",    area:"Corpo espressivo", t:"Sa esprimere stati d animo e comunicare attraverso il corpo e il movimento?",                                            frasi: FR_MOT.corpo },
      { id:"regole",   area:"Regole e gioco", t:"Accetta le proposte di gioco altrui e vi partecipa attivamente? Conosce le regole dei giochi proposti e le rispetta?",    frasi: FR_MOT.regole },
      { id:"salute",   area:"Salute",         t:"Dimostra di aver compreso la relazione tra alimentazione, esercizio fisico, igiene e salute nella vita quotidiana?",      frasi: FR_MOT.salute },
    ],
  },
  civica: {
    1: [
      { id:"costituzione", area:"Costituzione",        t:"Conosce e applica i principi fondamentali della convivenza pacifica? Riconosce la necessita di regole condivise?", frasi: FR_CIV.costituzione },
      { id:"sostenibilita",area:"Sostenibilita",       t:"Conosce i principi di sicurezza e sostenibilita? Assume comportamenti corretti riguardo al cibo e allo smaltimento dei rifiuti?", frasi: FR_CIV.sostenibilita },
      { id:"digitale",     area:"Cittadinanza digitale", t:"Comprende il ruolo dei media digitali nella comunicazione e come strumento di conoscenza?",                    frasi: FR_CIV.digitale },
    ],
    2: [
      { id:"costituzione", area:"Costituzione",        t:"Conosce e applica i principi fondamentali della convivenza pacifica? Riconosce la necessita di regole condivise?", frasi: FR_CIV.costituzione },
      { id:"sostenibilita",area:"Sostenibilita",       t:"Conosce i principi di sicurezza e sostenibilita? Assume comportamenti corretti riguardo al cibo e allo smaltimento dei rifiuti?", frasi: FR_CIV.sostenibilita },
      { id:"digitale",     area:"Cittadinanza digitale", t:"Comprende il ruolo dei media digitali nella comunicazione e come strumento di conoscenza?",                    frasi: FR_CIV.digitale },
    ],
    3: [
      { id:"costituzione", area:"Costituzione",        t:"Conosce e applica i principi fondamentali della convivenza pacifica? Riconosce autonomamente la necessita di regole condivise?", frasi: FR_CIV.costituzione },
      { id:"sostenibilita",area:"Sostenibilita",       t:"Conosce e applica i principi di sostenibilita? Assume comportamenti corretti in modo autonomo riguardo al cibo e ai rifiuti?", frasi: FR_CIV.sostenibilita },
      { id:"digitale",     area:"Cittadinanza digitale", t:"Comprende pienamente il ruolo dei media digitali come strumento di comunicazione e conoscenza?",               frasi: FR_CIV.digitale },
    ],
    4: [
      { id:"costituzione", area:"Costituzione",        t:"Conosce e applica i principi fondamentali della convivenza pacifica? Conosce i documenti affrontati sui diritti umani?", frasi: FR_CIV.costituzione },
      { id:"sostenibilita",area:"Sostenibilita",       t:"Conosce e applica i principi di sostenibilita e salvaguardia dei beni comuni? Assume comportamenti corretti apportando contributi personali?", frasi: FR_CIV.sostenibilita },
      { id:"digitale",     area:"Cittadinanza digitale", t:"Comprende il ruolo dei media digitali? Si avvia a riconoscerne, oltre alle opportunita, i rischi?",            frasi: FR_CIV.digitale },
    ],
    5: [
      { id:"costituzione", area:"Costituzione",        t:"Conosce e applica in modo consapevole i principi fondamentali della convivenza? Conosce in modo approfondito i documenti sui diritti umani?", frasi: FR_CIV.costituzione },
      { id:"sostenibilita",area:"Sostenibilita",       t:"Conosce e applica in modo consapevole i principi di sostenibilita? Apporta contributi personali e promuove la riflessione nel gruppo?", frasi: FR_CIV.sostenibilita },
      { id:"digitale",     area:"Cittadinanza digitale", t:"Comprende pienamente il ruolo dei media digitali e riconosce con sicurezza sia le opportunita che i rischi?",  frasi: FR_CIV.digitale },
    ],
  },
};

const MATERIE = [
  { id: "matematica", label: "Matematica" },
  { id: "italiano",   label: "Italiano" },
  { id: "inglese",    label: "Inglese" },
  { id: "geografia",  label: "Geografia" },
  { id: "storia",     label: "Storia" },
  { id: "scienze",    label: "Scienze" },
  { id: "motoria",    label: "Ed. Motoria" },
  { id: "tecnologia", label: "Tecnologia" },
  { id: "arte",       label: "Arte e Immagine" },
  { id: "civica",     label: "Ed. Civica" },
];

const OPZIONI = [
  { v:5, l:"Si, sempre e con sicurezza" },
  { v:4, l:"Spesso, con buona autonomia" },
  { v:3, l:"A volte, con qualche incertezza" },
  { v:2, l:"Con guida e supporto" },
  { v:1, l:"Raramente o con grande difficolta" },
];

function calcG(risposte) {
  const vals = Object.values(risposte);
  if (!vals.length) return null;
  const m = vals.reduce((a,b) => a+b,0) / vals.length;
  if (m >= 4.6) return "Ottimo";
  if (m >= 3.8) return "Distinto";
  if (m >= 3.1) return "Buono";
  if (m >= 2.4) return "Discreto";
  if (m >= 1.6) return "Sufficiente";
  return "Non sufficiente";
}

function getDomande(materia, classe) {
  const dm = DOMANDE[materia];
  if (!dm) return [];
  if (dm.all) return dm.all;
  return dm[parseInt(classe)] || [];
}

function buildTesto(dom, risposte) {
  if (!dom || !dom.length) return "";
  return dom.map(d => {
    const v = risposte[d.id] || 3;
    return d.frasi ? d.frasi[pi(v)] : "";
  }).filter(Boolean).join(" ");
}

function stampaPDF(materia, classe, alunni) {
  const dom = getDomande(materia, classe);
  const ml = MATERIE.find(m => m.id === materia)?.label || materia;
  const oggi = new Date().toLocaleDateString("it-IT",{day:"2-digit",month:"long",year:"numeric"});
  let righe = "";
  alunni.forEach((a,i) => {
    const gc = GC[a.giudizio];
    const testo = buildTesto(dom, a.risposte);
    righe += "<tr><td style='padding:10px 12px;border-bottom:1px solid #eee;font-size:13px;font-weight:600;vertical-align:top'>"+(i+1)+". "+a.nome+"</td>";
    righe += "<td style='padding:10px 12px;border-bottom:1px solid #eee;vertical-align:top'><span style='background:"+gc.bg+";color:"+gc.color+";border-radius:4px;padding:3px 9px;font-size:12px;font-weight:600'>"+a.giudizio+"</span></td>";
    righe += "<td style='padding:10px 12px;border-bottom:1px solid #eee;font-size:12px;line-height:1.7;color:#333;vertical-align:top'>"+testo+"</td></tr>";
  });
  const w = window.open("","_blank");
  w.document.write("<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Scrutinio "+ml+"</title><style>@page{margin:2cm}body{font-family:Georgia,serif;color:#222;margin:0}h1{font-size:20px;font-weight:normal;margin:0 0 4px}p.sub{font-size:12px;color:#888;margin:0 0 20px}table{width:100%;border-collapse:collapse}th{font-size:10px;text-transform:uppercase;color:#aaa;padding:8px 12px;text-align:left;border-bottom:2px solid #ddd}</style></head><body>");
  w.document.write("<h1>Scrutinio "+ml+" - Classe "+classe+" elementare</h1>");
  w.document.write("<p class='sub'>Anno scolastico 2024/25 - "+oggi+" - "+alunni.length+" alunni</p>");
  w.document.write("<table><thead><tr><th style='width:18%'>Alunno/a</th><th style='width:12%'>Giudizio</th><th style='width:70%'>Descrittori</th></tr></thead><tbody>"+righe+"</tbody></table></body></html>");
  w.document.close(); setTimeout(() => w.print(), 600);
}

export default function App() {
  const [step, setStep]         = useState("setup");
  const [materia, setMateria]   = useState("");
  const [classe, setClasse]     = useState("");
  const [alunni, setAlunni]     = useState([]);
  const [nome, setNome]         = useState("");
  const [risposte, setRisposte] = useState({});
  const [dIdx, setDIdx]         = useState(0);

  const dom          = getDomande(materia, classe);
  const g            = calcG(risposte);
  const gc           = g ? GC[g] : null;
  const ml           = MATERIE.find(m => m.id === materia)?.label || "";
  const testoPreview = g ? buildTesto(dom, risposte) : "";

  const salva = () => {
    setAlunni(prev => [...prev, { nome, giudizio: g, risposte:{...risposte} }]);
    setNome(""); setRisposte({}); setDIdx(0);
  };

  const btn = (onClick, children, extra={}) => (
    <button onClick={onClick} style={{ fontFamily:"sans-serif", fontSize:14, cursor:"pointer", border:"1px solid #bbb", background:"#fff", color:"#1a1a1a", borderRadius:8, padding:"11px 16px", ...extra }}>{children}</button>
  );

  return (
    <div style={{ maxWidth:580, margin:"0 auto", padding:"2rem 1rem", fontFamily:"sans-serif" }}>
      <p style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".07em", color:"#888", marginBottom:4 }}>Strumento docente</p>
      <h1 style={{ fontSize:22, fontWeight:500, marginBottom:4 }}>Valutazione {ml || "scuola primaria"}</h1>
      <p style={{ fontSize:14, color:"#666", marginBottom:28 }}>Scrutinio di fine anno · Scuola primaria</p>

      {step === "setup" && (
        <div>
          <div style={{ marginBottom:18 }}>
            <label style={{ fontSize:13, color:"#555", display:"block", marginBottom:8 }}>Seleziona la materia</label>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {MATERIE.map(m => (
                <button key={m.id} onClick={() => setMateria(m.id)} style={{ padding:"10px 14px", fontSize:13, borderRadius:8, cursor:"pointer", textAlign:"left", border: materia===m.id ? "2px solid #185FA5" : "1px solid #ccc", background: materia===m.id ? "#E6F1FB" : "#fff", color: materia===m.id ? "#185FA5" : "#1a1a1a", fontFamily:"sans-serif" }}>
                  {m.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom:28 }}>
            <label style={{ fontSize:13, color:"#555", display:"block", marginBottom:7 }}>Seleziona la classe</label>
            <select value={classe} onChange={e => setClasse(e.target.value)} style={{ width:"100%", padding:"10px 12px", fontSize:15, border:"1px solid #ccc", borderRadius:8, background:"#fff" }}>
              <option value="">Seleziona la classe</option>
              {[1,2,3,4,5].map(c => <option key={c} value={c}>Classe {c}ª</option>)}
            </select>
          </div>
          {btn(() => { if(materia && classe) setStep("info"); }, "Inizia lo scrutinio →", { width:"100%", opacity:(!materia||!classe)?0.4:1 })}
        </div>
      )}

      {step === "info" && (
        <div>
          {alunni.length > 0 && (
            <div style={{ background:"#f0f0ec", borderRadius:8, padding:"10px 14px", fontSize:13, color:"#555", marginBottom:18 }}>
              Valutati: <strong>{alunni.length}</strong> — {alunni.map(a=>a.nome).join(", ")}
            </div>
          )}
          <p style={{ fontSize:15, fontWeight:500, marginBottom:18 }}>Nuovo alunno/a — Classe {classe}ª — {ml}</p>
          <div style={{ marginBottom:24 }}>
            <label style={{ fontSize:13, color:"#555", display:"block", marginBottom:7 }}>Nome</label>
            <input value={nome} onChange={e => setNome(e.target.value)} placeholder="es. Sofia" style={{ width:"100%", padding:"10px 12px", fontSize:15, border:"1px solid #ccc", borderRadius:8, boxSizing:"border-box" }} />
          </div>
          <div style={{ display:"flex", gap:10 }}>
            {alunni.length > 0 && btn(()=>setStep("riepilogo"), "Fine scrutinio →")}
            {btn(()=>{ if(nome){ setRisposte({}); setDIdx(0); setStep("domande"); } }, "Inizia valutazione →", { flex:2, opacity:!nome?0.4:1 })}
          </div>
        </div>
      )}

      {step === "domande" && dom[dIdx] && (
        <div>
          <div style={{ display:"flex", gap:6, marginBottom:12 }}>
            {dom.map((_,i) => <div key={i} style={{ height:4, flex:1, borderRadius:2, background: i<dIdx?"#0F6E56":i===dIdx?"#1D9E75":"#ddd" }} />)}
          </div>
          <p style={{ fontSize:11, textTransform:"uppercase", letterSpacing:".05em", color:"#888", marginBottom:14 }}>
            {nome} · {dom[dIdx].area} · {dIdx+1} di {dom.length}
          </p>
          <p style={{ fontSize:17, fontWeight:500, lineHeight:1.55, marginBottom:22 }}>{dom[dIdx].t}</p>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {OPZIONI.map(op => btn(()=>{
              const nr = {...risposte, [dom[dIdx].id]: op.v};
              setRisposte(nr);
              if (dIdx < dom.length-1) setDIdx(dIdx+1);
              else setStep("conferma");
            }, op.l, { textAlign:"left" }))}
          </div>
          {dIdx > 0 && <button onClick={()=>setDIdx(dIdx-1)} style={{ marginTop:12, background:"none", border:"none", color:"#888", fontSize:13, cursor:"pointer", padding:0 }}>← indietro</button>}
        </div>
      )}

      {step === "conferma" && gc && (
        <div>
          <div style={{ background:gc.bg, border:"1px solid "+gc.color, borderRadius:12, padding:"1.25rem 1.5rem", marginBottom:18 }}>
            <p style={{ fontSize:11, color:gc.color, marginBottom:4, fontWeight:500, textTransform:"uppercase", letterSpacing:".06em" }}>Giudizio sintetico · {ml}</p>
            <p style={{ fontSize:28, fontWeight:500, color:gc.color, margin:"0 0 2px" }}>{g}</p>
            <p style={{ fontSize:13, color:gc.color, opacity:.8, margin:0 }}>{nome} · Classe {classe}ª</p>
          </div>
          <div style={{ marginBottom:16 }}>
            {dom.map(dd => {
              const v = risposte[dd.id] || 0;
              return (
                <div key={dd.id} style={{ marginBottom:9 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:3 }}>
                    <span style={{ fontWeight:500 }}>{dd.area}</span>
                    <span style={{ color:"#666" }}>{OPZIONI.find(o=>o.v===v)?.l}</span>
                  </div>
                  <div style={{ height:5, background:"#e5e5e5", borderRadius:3 }}>
                    <div style={{ height:"100%", width:Math.round((v/5)*100)+"%", background:gc.color, borderRadius:3 }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ background:"#fff", border:"1px solid #e0e0e0", borderRadius:12, padding:"1.25rem", marginBottom:18 }}>
            <p style={{ fontSize:10, textTransform:"uppercase", letterSpacing:".05em", color:"#999", marginBottom:8 }}>Testo per lo scrutinio</p>
            <p style={{ fontSize:13, lineHeight:1.75, color:"#222", margin:0 }}>{testoPreview}</p>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            {btn(()=>{ salva(); setStep("info"); }, "Salva e prossimo →", { flex:2, background:gc.bg, color:gc.color, border:"1px solid "+gc.color })}
            {btn(()=>{ salva(); setStep("riepilogo"); }, "Fine scrutinio")}
          </div>
        </div>
      )}

      {step === "riepilogo" && (
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
            <div>
              <p style={{ fontSize:16, fontWeight:500, marginBottom:2 }}>Scrutinio {ml} — Classe {classe}ª</p>
              <p style={{ fontSize:13, color:"#666" }}>{alunni.length} alunni valutati</p>
            </div>
            {btn(()=>stampaPDF(materia,classe,alunni), "Stampa / PDF →", { fontSize:13, padding:"8px 14px" })}
          </div>
          {alunni.map((a,i) => {
            const gc2   = GC[a.giudizio];
            const testo2 = buildTesto(getDomande(materia, classe), a.risposte);
            return (
              <div key={i} style={{ background:"#fff", border:"1px solid #e0e0e0", borderRadius:12, padding:"1rem 1.25rem", marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:7 }}>
                  <span style={{ fontSize:15, fontWeight:500 }}>{i+1}. {a.nome}</span>
                  <span style={{ background:gc2.bg, color:gc2.color, border:"1px solid "+gc2.color, borderRadius:6, padding:"3px 11px", fontSize:12, fontWeight:600 }}>{a.giudizio}</span>
                </div>
                <p style={{ fontSize:12, color:"#555", lineHeight:1.7, margin:0 }}>{testo2}</p>
              </div>
            );
          })}
          <div style={{ display:"flex", gap:10, marginTop:16 }}>
            {btn(()=>setStep("info"), "+ Aggiungi alunno/a")}
            {btn(()=>{ setAlunni([]); setMateria(""); setClasse(""); setStep("setup"); }, "Nuovo scrutinio")}
          </div>
        </div>
      )}
    </div>
  );
}
