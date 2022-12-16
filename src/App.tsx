import React, { useState } from "react";
import "./App.css";

type Synonym = {
  word: string;
  score: number;
};

const API_URL = `https://api.datamuse.com`;

function App() {
  const [word, setWord] = useState("");
  const [synonyms, setSynonyms] = useState<Synonym[]>([]);

  const fetchSynonyms = (word: string) => {
    fetch(`${API_URL}/words?rel_syn=${word}`)
      .then((response) => response.json())
      .then((data: Synonym[]) => {
        setSynonyms(data);
      });
  };

  const handleFetchSynonyms = (e: React.FormEvent) => {
    console.log("radi");
    e.preventDefault();
    fetchSynonyms(word);
  };

  const handleSynonymClicked = (newWord: string) => {
    setWord(newWord);
    fetchSynonyms(newWord);
  };

  return (
    <div className="App">
      <form onSubmit={handleFetchSynonyms}>
        <label htmlFor="word-input">
          Your Word
          <input
            id="word-input"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <button>Submit</button>
        </label>
      </form>
      <ul>
        {synonyms.map((synonym) => (
          <li
            onClick={() => handleSynonymClicked(synonym.word)}
            key={synonym.word}
          >
            {synonym.word}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
