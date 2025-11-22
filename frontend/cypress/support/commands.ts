/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        speak(text: string): Chainable<void>;
    }
}

Cypress.Commands.add('speak', (text: string) => {
    cy.window().then((win) => {
        return new Promise<void>((resolve) => {
            const utterance = new SpeechSynthesisUtterance(text);
            // Optional: Configure voice, rate, pitch
            // const voices = win.speechSynthesis.getVoices();
            // utterance.voice = voices.find(v => v.lang === 'en-US') || null; 
            utterance.rate = 0.9; // Slightly slower for clarity

            utterance.onend = () => {
                resolve();
            };

            // Handle case where speech synthesis might fail or hang
            utterance.onerror = (e) => {
                console.error('Speech synthesis error:', e);
                resolve(); // Resolve anyway to not block tests
            };

            win.speechSynthesis.speak(utterance);
        });
    });
});
