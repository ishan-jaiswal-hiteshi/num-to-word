import './App.css'
import React, { useState } from 'react';
import { toWords } from 'number-to-words'; // Library to convert number to words

function App() {

  const [inputNumber, setInputNumber] = useState('');
  const [wordRepresentation, setWordRepresentation] = useState('');
  const [isValidInput, setIsValidInput] = useState(true);
  const [isChanged, setIsChanged] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputNumber(value);
    setIsChanged(true);
    convertNumber(value);
  };

  // Convert number to words
  const convertNumber = (value) => {
    if (!isNaN(value) && value.trim() !== '') {
      setWordRepresentation(toWords(value));
      setIsValidInput(true);
    } else {
      setWordRepresentation('');
      setIsValidInput(false);
    }
  };

  // Function to handle text to speech
  const wordsToSpeech = () => {
    if (wordRepresentation) {
      const utterance = new SpeechSynthesisUtterance(wordRepresentation);
      
      // Set the language, rate, pitch, and volume
      utterance.lang = 'en-US';  // Set the language to English (US)
      utterance.rate = 1;        // Speed of speech (1 is normal speed)
      utterance.pitch = 1;       // Pitch of the voice (1 is normal pitch)
      utterance.volume = 100;      // Volume of the speech (1 is max volume)
      
      // Speak the utterance
      speechSynthesis.speak(utterance);
    } 
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Number to Words</h1>

          {/* Input Field */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-5">
              
              {/* Input Box */}
              <input
                id="number-input"
                type="text"
                value={inputNumber}
                onChange={handleInputChange}
                placeholder="Enter a number"
                className={`bg-${isValidInput ? 'green' : 'red'}-50 border ${isValidInput ? 'border-green-500' : 'border-red-500'} text-${isValidInput ? 'green' : 'red'}-900 placeholder-${isValidInput ? 'green' : 'red'}-700 text-sm rounded-lg focus:ring-${isValidInput ? 'green' : 'red'}-500 focus:border-${isValidInput ? 'green' : 'red'}-500 block w-full p-2.5`}
              />

              {/* Feedback Message */}
              {isChanged && !wordRepresentation && (
                <p className={`mt-2 text-sm ${isValidInput ? 'text-green-600' : 'text-red-600'}`}>
                  <span className="font-medium">{isValidInput ? 'Alright!' : 'Oops!'}</span> {isValidInput ? 'Valid number!' : 'Invalid number!'}
                </p>
              )}
            </div>

            {/* Output Box */}
            {wordRepresentation && (
              <div className="mt-4">
                <div className={`p-4 text-lg font-medium ${isValidInput ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  <p className="mt-2 text-xl">{wordRepresentation}</p>
                </div>
              </div>
            )}

            {/* Text-to-Speech Button */}
            {wordRepresentation && isValidInput && (
              <button
                type="button"
                onClick={wordsToSpeech}
                className="mt-4 w-full p-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Hear it 
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
