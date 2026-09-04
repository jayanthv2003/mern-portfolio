import { useEffect, useState } from 'react';

/**
 * Cycles through an array of strings, typing and deleting each one.
 * @param {string[]} words
 * @param {{ typingSpeed?: number, deletingSpeed?: number, pauseTime?: number }} options
 */
const useTypewriter = (words, { typingSpeed = 80, deletingSpeed = 40, pauseTime = 1800 } = {}) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return undefined;

    const currentWord = words[wordIndex % words.length];

    let timeout;

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      const nextText = isDeleting
        ? currentWord.substring(0, text.length - 1)
        : currentWord.substring(0, text.length + 1);

      timeout = setTimeout(
        () => setText(nextText),
        isDeleting ? deletingSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return text;
};

export default useTypewriter;
