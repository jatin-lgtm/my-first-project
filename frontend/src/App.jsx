import React, { useEffect, useState } from "react";

export default function App() {
  const [hello, setHello] = useState(null);
  const [input, setInput] = useState("");
  const [echo, setEcho] = useState(null);

  useEffect(() => {
    fetch("/api/hello")
      .then((r) => r.json())
      .then(setHello)
      .catch((e) => setHello({ error: e.message }));
  }, []);

  const sendEcho = async () => {
    const res = await fetch("/api/echo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input })
    });
    const data = await res.json();
    setEcho(data);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 20 }}>
      <h1>React ↔ Backend Demo</h1>

      <section style={{ marginBottom: 20 }}>
        <h2>GET /api/hello</h2>
        <pre>{hello ? JSON.stringify(hello, null, 2) : "loading..."}</pre>
      </section>

      <section>
        <h2>POST /api/echo</h2>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type something"
          style={{ padding: 8, width: 300 }}
        />
        <button onClick={sendEcho} style={{ marginLeft: 8, padding: "8px 12px" }}>
          Send
        </button>
        <pre>{echo ? JSON.stringify(echo, null, 2) : "no response yet"}</pre>
      </section>
    </div>
  );
}
