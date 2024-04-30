'use client';
import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

const Chat = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  });

  const chatContainer = useRef<HTMLDivElement>(null);

  const scroll = () => {
    const { offsetHeight, scrollHeight, scrollTop } =
      chatContainer.current as HTMLDivElement;
    if (scrollHeight >= scrollTop + offsetHeight) {
      chatContainer.current?.scrollTo(0, scrollHeight + 200);
    }
  };

  useEffect(() => {
    scroll();
  }, [messages]);

  const renderResponse = () => {
    return (
      <div className="response">
        {messages.map((m, index) => (
          <div
            key={m.id}
            className={`chat-line ${
              m.role === 'user' ? 'user-chat' : 'ai-chat'
            }`}
          >
            <div style={{ width: '100%', marginLeft: '16px' }}>
              <p className="message">{m.content}</p>
              {index < messages.length - 1 && (
                <div className="horizental-line" />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div ref={chatContainer} className="chat">
      {renderResponse()}
      <form onSubmit={handleSubmit} className="mainForm">
        <input
          name="input-field"
          type="text"
          placeholder="Say anything"
          onChange={handleInputChange}
          value={input}
        />
        <button type="submit" className="mainButton">
          Enter
        </button>
      </form>
    </div>
  );
};

export default Chat;
