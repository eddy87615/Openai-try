import Image from 'next/image';
import OpenAI from 'openai';
import Chat from './components/Chat';
import { DiUikit } from 'react-icons/di';

const openai = new OpenAI();

export default async function App() {
  return (
    <main className="App">
      <div className="container">
        <div className="header">
          <DiUikit />
          <p>
            Talk to <span>the Last Codebender</span>
          </p>
        </div>
        <Chat />
      </div>
    </main>
  );
}
