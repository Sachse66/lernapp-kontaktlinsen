import React from "react";
import { useState, useEffect } from "react";

const fragenkatalog = [
  {
    frage: "Was ist eine Dioptrie?",
    antwort: "Maßeinheit für die Brechkraft eines optischen Systems. 1/f in Metern."
  },
  {
    frage: "Welche drei Schichten hat der Tränenfilm?",
    antwort: "Lipid-, wässrige und Muzinschicht."
  },
  {
    frage: "Nennen Sie die einzelnen Schichten der Hornhaut.",
    antwort: "1. Epithelschicht\n2. Bowman'sche Membran\n3. Stroma\n4. Descemet-Membran\n5. Endothel"
  },
  {
    frage: "Was bedeutet Zykloplegie?",
    antwort: "Medikamentöse Lähmung des Ziliarmuskels zur Ausschaltung der Akkommodation."
  }
];

export default function App() {
  const [fragen, setFragen] = useState([]);
  const [aktuelleFrage, setAktuelleFrage] = useState(null);
  const [geleseneFragen, setGeleseneFragen] = useState(() => {
    const gespeicherte = localStorage.getItem("geleseneFragen");
    return gespeicherte ? JSON.parse(gespeicherte) : [];
  });

  useEffect(() => {
    const ungefilterte = fragenkatalog.filter((_, i) => !geleseneFragen.includes(i));
    setFragen(ungefilterte);
    zieheNeueFrage(ungefilterte);
  }, [geleseneFragen]);

  const zieheNeueFrage = (fragenPool = fragen) => {
    if (fragenPool.length === 0) {
      setAktuelleFrage(null);
      return;
    }
    const index = Math.floor(Math.random() * fragenPool.length);
    setAktuelleFrage({ ...fragenPool[index], index });
  };

  const alsGelesenMarkieren = () => {
    const neueGelesene = [...geleseneFragen, aktuelleFrage.index];
    setGeleseneFragen(neueGelesene);
    localStorage.setItem("geleseneFragen", JSON.stringify(neueGelesene));
  };

  const resetGelesene = () => {
    setGeleseneFragen([]);
    localStorage.removeItem("geleseneFragen");
  };

  const buttonStyle = {
    background: "#333",
    color: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer"
  };

  return (
    <div style={{ minHeight: "100vh", background: "#111", color: "#fff", padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "1rem" }}>
        LernApp Kontaktlinsenprüfung (NQR6)
      </h1>

      {aktuelleFrage ? (
        <div style={{ background: "#222", padding: "1rem", borderRadius: "1rem", marginBottom: "1rem", maxWidth: "600px" }}>
          <p><strong>Frage:</strong></p>
          <p style={{ marginBottom: "1rem", whiteSpace: "pre-line" }}>{aktuelleFrage.frage}</p>
          <p><strong>Antwort:</strong></p>
          <p style={{ whiteSpace: "pre-line" }}>{aktuelleFrage.antwort}</p>
        </div>
      ) : (
        <p>🎉 Du hast alle Fragen durchgesehen!</p>
      )}

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <button onClick={zieheNeueFrage} disabled={!aktuelleFrage} style={buttonStyle}>
          Nächste Frage
        </button>
        <button onClick={alsGelesenMarkieren} disabled={!aktuelleFrage} style={buttonStyle}>
          Als gelesen markieren
        </button>
        <button onClick={resetGelesene} style={{ ...buttonStyle, background: "#b91c1c" }}>
          Zurücksetzen
        </button>
      </div>
    </div>
  );
}
