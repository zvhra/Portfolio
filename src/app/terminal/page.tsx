'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import './terminal.css';

interface Command {
  name: string;
  description: string;
  execute: () => string;
}

const TerminalPage = () => {
  const [output, setOutput] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalOutputRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage = [
      "Welcome to Zahra's Terminal!",
      'Type "help" to see available commands.',
      '',
    ];
    setOutput(welcomeMessage);
  }, []);


  // Scroll to the bottom when new content is added
  useEffect(() => {
    if (terminalOutputRef.current) {
      terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight;
    }
  }, [output]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);


  const commands: Record<string, Command> = {
    help: {
      name: 'help',
      description: 'Show available commands',
      execute: () => {
        return `Available commands:
  help          - Show this help message
  greet         - Get a personalized greeting
  stack         - View my tech stack
  fact          - Get a random fun fact
  workhours     - View my working hours
  mood          - Check my current mood
  contact-info  - Get my contact information
  quote         - Get an inspirational quote
  about         - Learn more about me
  projects      - View my projects
  clear         - Clear the terminal
  exit          - Return to homepage`;
      },
    },
    greet: {
      name: 'greet',
      description: 'Get a personalized greeting',
      execute: () => {
        const hours = new Date().getHours();
        if (hours < 12) {
          return 'Good morning! ☀️ Hope you have a great day!';
        } else if (hours < 18) {
          return 'Good afternoon! 🌞 How can I help you today?';
        } else {
          return 'Good evening! 🌙 Hope you had a productive day!';
        }
      },
    },
    stack: {
      name: 'stack',
      description: 'View my tech stack',
      execute: () => {
        return `Technologies I work with:
  • Proficient: C#, .NET Core, ASP.NET, SQL, React, Python
  • Advanced: HTML, CSS, JavaScript, TypeScript, Vue.js, TailwindCSS, Node.js, MongoDB
  • Familiar: Java, Docker, Azure`;
      },
    },
    fact: {
      name: 'fact',
      description: 'Get a random fun fact',
      execute: () => {
        const facts = [
          'Honey never spoils. Archaeologists have found pots of honey in ancient tombs that are over 3,000 years old!',
          'A cloud can weigh more than a million pounds.',
          'Bananas are berries, but strawberries are not.',
          'Octopuses have three hearts and blue blood.',
          "There are more stars in the universe than grains of sand on all the Earth's beaches.",
          'A single strand of spaghetti is called a "spaghetto".',
          'Wombat poop is cube-shaped.',
          'Sharks have been around longer than trees.',
          'A day on Venus is longer than its year.',
        ];
        return facts[Math.floor(Math.random() * facts.length)];
      },
    },
    workhours: {
      name: 'workhours',
      description: 'View my working hours',
      execute: () => {
        return 'I typically work from 9 AM to 5 PM (GMT) on weekdays. Feel free to reach out!';
      },
    },
    mood: {
      name: 'mood',
      description: 'Check my current mood',
      execute: () => {
        const moods = [
          'Feeling productive today! 🚀',
          'Just vibing and coding. 😎',
          "Can't stop, won't stop! 💻",
          'Feeling a bit tired, but pushing through! 💪',
          'In the zone, building something awesome! ⚡',
          'Learning new things and loving it! 📚',
        ];
        return moods[Math.floor(Math.random() * moods.length)];
      },
    },
    'contact-info': {
      name: 'contact-info',
      description: 'Get my contact information',
      execute: () => {
        return `You can reach me through:
  LinkedIn: https://www.linkedin.com/in/zfahmed/
  GitHub: https://github.com/zvhra
  
  Or use the contact form on the main page!`;
      },
    },
    quote: {
      name: 'quote',
      description: 'Get an inspirational quote',
      execute: () => {
        const quotes = [
          '"The only way to do great work is to love what you do." – Steve Jobs',
          '"Life is 10% what happens to us and 90% how we react to it." – Charles R. Swindoll',
          '"You miss 100% of the shots you don\'t take." – Wayne Gretzky',
          '"The best time to plant a tree was 20 years ago. The second best time is now." – Chinese Proverb',
          '"It does not matter how slowly you go as long as you do not stop." – Confucius',
          '"Success usually comes to those who are too busy to be looking for it." – Henry David Thoreau',
          '"Opportunities don\'t happen. You create them." – Chris Grosser',
          '"Code is like humor. When you have to explain it, it\'s bad." – Cory House',
        ];
        return quotes[Math.floor(Math.random() * quotes.length)];
      },
    },
    about: {
      name: 'about',
      description: 'Learn more about me',
      execute: () => {
        return `About Zahra:
  I'm a Computing Graduate with a Bachelor's Honours degree.
  I have hands-on experience in full-stack development, software
  engineering, and project management. My skills span across C#,
  Python, Java, and web technologies, with a strong focus on
  creating efficient, user-centric applications.
  
  Location: London, UK
  Education: BSc (Hons) Computing`;
      },
    },
    projects: {
      name: 'projects',
      description: 'View my projects',
      execute: () => {
        return `My Featured Projects:
  1. Fitness Social Media Platform
     - Full-stack C#/.NET application
     - GitHub: https://github.com/zvhra/fitnessplatform
  
  2. Internet Relay Chat System
     - Java-based IRC system
     - GitHub: https://github.com/zvhra/ircsystem
  
  3. Gadgets Information System
     - C# desktop application
     - GitHub: https://github.com/zvhra/gadgets
  
  Visit my portfolio homepage to see more details!`;
      },
    },
    clear: {
      name: 'clear',
      description: 'Clear the terminal',
      execute: () => {
        // Clear will be handled separately in handleCommand
        return '';
      },
    },
    exit: {
      name: 'exit',
      description: 'Return to homepage',
      execute: () => {
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
        return 'Returning to homepage...';
      },
    },
  };

  const handleCommand = (command: string) => {
    const trimmedCommand = command.trim().toLowerCase();
    
    if (!trimmedCommand) {
      return;
    }

    // Handle clear command separately
    if (trimmedCommand === 'clear') {
      setOutput([]);
      setCommandHistory((prev) => [...prev, command]);
      setHistoryIndex(-1);
      return;
    }

    // Add command to history
    const newHistory = [...commandHistory, command];
    setCommandHistory(newHistory);
    setHistoryIndex(-1);

    // Execute command
    if (commands[trimmedCommand]) {
      const result = commands[trimmedCommand].execute();
      if (result) {
        setOutput((prev) => [...prev, `> ${command}`, result, '']);
      } else {
        setOutput((prev) => [...prev, `> ${command}`]);
      }
    } else {
      setOutput((prev) => [
        ...prev,
        `> ${command}`,
        `Command not found: "${command}". Type "help" to see available commands.`,
        '',
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple autocomplete - find matching commands
      const matches = Object.keys(commands).filter((cmd) =>
        cmd.startsWith(input.toLowerCase())
      );
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setOutput((prev) => [
          ...prev,
          `> ${input}`,
          `Possible completions: ${matches.join(', ')}`,
          '',
        ]);
      }
    }
  };

  return (
    <div className="terminal-page">
      <Navbar />
      <div className="terminal-container">
        <div className="terminal-box">
          <div className="terminal-window-controls">
            <div className="control-btn" aria-label="Close window">
              <span className="control-dot close"></span>
            </div>
            <div className="control-btn" aria-label="Minimize window">
              <span className="control-dot minimize"></span>
            </div>
            <div className="control-btn" aria-label="Maximize window">
              <span className="control-dot maximize"></span>
            </div>
            <div className="terminal-path">/terminal</div>
          </div>
          <div className="terminal-output" ref={terminalOutputRef}>
            {output.map((line, i) => (
              <div key={`terminal-line-${i}-${line.substring(0, Math.min(20, line.length))}`} className="terminal-line">
                {line}
              </div>
            ))}
            <div className="terminal-input-line">
              <span className="terminal-arrow">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="terminal-input-field"
                autoFocus
                autoComplete="off"
                spellCheck="false"
                aria-label="Terminal input"
              />
              <span className="terminal-cursor">█</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalPage;
