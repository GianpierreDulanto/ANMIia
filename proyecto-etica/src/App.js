import logo from './logo.svg';
import './App.css';
import ANMIChatbot from './ANMIChatbot';
import { useEffect, useState } from 'react';

function App() {
  const [isReadyForInstall, setIsReadyForInstall] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      console.log('👍', "beforeinstallprompt", event);
      window.deferredPrompt = event;
      setIsReadyForInstall(true);
    });
  }, []);

  async function downloadApp() {
    console.log('👍', "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      console.log("oops, no prompt event guardado");
      return;
    }
    promptEvent.prompt();
    const { result } = await promptEvent.userChoice;
    console.log('👍', "userChoice", result);
    window.deferredPrompt = null;
    setIsReadyForInstall(false);
  }

  return (
    <div>
      {isReadyForInstall && <button onClick={downloadApp} className="btn btn-light btn-sm fw-bold"
              style={{ fontSize: '0.85rem' }}>Instalar</button>}
      <ANMIChatbot />
    </div>
  );
}

export default App;
