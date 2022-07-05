import "./App.css";
import Message from "./components/textPrompt/Message";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Fun with GPT-3</h1>

        <p className="intro">
          OpenAI’s API provides access to GPT-3, which performs a wide variety
          of natural language tasks. This app utilizes the completions endpoint,
          which allows you to input some text, and the model will will generate
          a text completion that attempts to match whatever context or pattern
          you gave it.
        </p>
      </header>
      <Message />
    </div>
  );
}

export default App;
