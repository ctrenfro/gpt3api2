import React, { useState } from "react";
import ResponseItem from "../responses/ReponseItem";
import RangeButton from "../RangeButton";

import "./Message.css";
import axios from "axios";

function Message() {
  const [promptInput, setPromptInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [engine, setEngine] = useState("text-curie-001");
  const [value, onChange] = useState(0.5);

  const onOptionChange = (e) => {
    setEngine(e.target.value);
  };

  const fetchData = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const options = {
      method: "GET",
      url: "http://localhost:8000/new",
      params: {
        prompt: promptInput,
        temperature: value,
        engine: engine,
      },
    };

    await axios
      .request(options)
      .then((response) => {
        const info = response.data;
        setNotes((prevNotes) => [
          ...prevNotes,
          {
            id: Date.now(),
            question: [promptInput],
            answer: info.choices[0].text,
            model: engineName(engine),
            temp: value,
          },
        ]);
      })
      .catch(function (e) {
        console.error(e);
      });

    setIsLoading(false);

    setPromptInput("");
  };

  function engineName(engine) {
    if (engine === "text-davinci-002") return "Da Vinci";
    if (engine === "text-curie-001") return "Curie";
    if (engine === "text-Babbage-001") return "Babbage";
    if (engine === "text-ada-001") return "Ada";
  }

  return (
    <div>
      <section>
        <hr />
        <h2>Temperature</h2>
        <p>
          Higher values means the model will take more risks. Try 1 for more
          creative applications, and 0 for ones with a well-defined answer.
        </p>
        <RangeButton
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={value}
          onChange={({ target: { value: radius } }) => {
            onChange(radius);
          }}
        />
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <div className="counter">
                <div className="counter-value">{value}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <section>
        <h2>Engines</h2>
        <label className="radioButtons">
          <input
            type="radio"
            name="Da-vinci"
            value="text-davinci-002"
            id="Da-vinci"
            checked={engine === "text-davinci-002"}
            onChange={onOptionChange}
          />
          <label htmlFor="Da-vinci">Da-vinci</label>
        </label>

        <label className="radioButtons">
          <input
            type="radio"
            name="Curie"
            value="text-curie-001"
            id="Curie"
            checked={engine === "text-curie-001"}
            onChange={onOptionChange}
          />
          <label htmlFor="Curie">Curie</label>
        </label>
        <label className="radioButtons">
          <input
            type="radio"
            name="Babbage"
            value="text-babbage-001"
            id="Babbage"
            checked={engine === "text-babbage-001"}
            onChange={onOptionChange}
          />
          <label htmlFor="Babbage">Babbage</label>
        </label>
        <label className="radioButtons">
          <input
            type="radio"
            name="Ada"
            value="text-ada-001"
            id="Ada"
            checked={engine === "text-ada-001"}
            onChange={onOptionChange}
          />
          <label htmlFor="Ada">Ada</label>
        </label>
        {engine === "text-davinci-002" && (
          <p className="modelDescription">
            Davinci is the most capable engine and can perform any task the
            other models can perform and often with less instruction. For
            applications requiring a lot of understanding of the content, like
            summarization for a specific audience and creative content
            generation, Davinci is going to produce the best results. These
            increased capabilities require more compute resources, so Davinci
            costs more per API call and is not as fast as the other engines.
            Another area where Davinci shines is in understanding the intent of
            text. Davinci is quite good at solving many kinds of logic problems
            and explaining the motives of characters. Davinci has been able to
            solve some of the most challenging AI problems involving cause and
            effect. Good at: Complex intent, cause and effect, summarization for
            audience
          </p>
        )}
        {engine === "text-curie-001" && (
          <p className="modelDescription">
            Curie is extremely powerful, yet very fast. While Davinci is
            stronger when it comes to analyzing complicated text, Curie is quite
            capable for many nuanced tasks like sentiment classification and
            summarization. Curie is also quite good at answering questions and
            performing Q&A and as a general service chatbot. Good at: Language
            translation, complex classification, text sentiment, summarization
          </p>
        )}
        {engine === "text-babbage-001" && (
          <p className="modelDescription">
            Babbage can perform straightforward tasks like simple
            classification. It’s also quite capable when it comes to Semantic
            Search ranking how well documents match up with search queries. Good
            at: Moderate classification, semantic search classification
          </p>
        )}
        {engine === "text-ada-001" && (
          <p className="modelDescription">
            Ada is usually the fastest model and can perform tasks like parsing
            text, address correction and certain kinds of classification tasks
            that don’t require too much nuance. Ada’s performance can often be
            improved by providing more context. Good at: Parsing text, simple
            classification, address correction, keywords
          </p>
        )}
        <hr />
      </section>

      <section className="container">
        <form onSubmit={fetchData}>
          <div className="omrs-input-group">
            <label className="omrs-input-underlined">
              <input
                type="text"
                name="promptInfo"
                className="textarea"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                required
              ></input>
              <span className="omrs-input-label">Enter</span>
            </label>

            <input
              type="submit"
              className="button"
              value="Generate Response"
            ></input>
          </div>
        </form>
      </section>
      <section>
        {isLoading && <p>Loading</p>}

        {notes.map((createNote) => {
          return (
            <ResponseItem
              key={createNote.id}
              question={createNote.question}
              answer={createNote.answer}
              model={createNote.model}
              temp={createNote.temp}
            />
          );
        })}
      </section>
    </div>
  );
}

export default Message;
