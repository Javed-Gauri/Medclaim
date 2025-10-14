import React, { useState } from "react";
import axios from "axios";

const DenialForm = () => {
  const [form, setForm] = useState({ denialCode: "", payer: "", procedure: "" });
  const [result, setResult] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/denials/resolve", form);
    setResult(res.data.resolution);
  };

  return (
    <div>
      <h2>Quick Denial Fix</h2>
      <form onSubmit={handleSubmit}>
        <input name="denialCode" placeholder="Denial Code" onChange={handleChange} />
        <input name="payer" placeholder="Payer Name" onChange={handleChange} />
        <input name="procedure" placeholder="Procedure Code" onChange={handleChange} />
        <button type="submit">Resolve</button>
      </form>
      {result && (
        <div style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
          <h3>AI-Generated Resolution:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default DenialForm;
