
import React, { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  className?: string;
  delay?: number; // ms per character
  cursorClassName?: string;
  repeat?: boolean;
  onComplete?: () => void;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  className = "",
  delay = 90,
  cursorClassName = "",
  repeat = false,
  onComplete,
}) => {
  const [visibleLength, setVisibleLength] = useState(0);

  useEffect(() => {
    if (visibleLength < text.length) {
      const timeout = setTimeout(() => {
        setVisibleLength((v) => v + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (repeat) {
      const resetTimeout = setTimeout(() => setVisibleLength(0), 1200);
      return () => clearTimeout(resetTimeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [visibleLength, text.length, delay, repeat, onComplete]);

  return (
    <span className={className} aria-label={text}>
      {text.slice(0, visibleLength)}
      <span
        className={`inline-block w-2 ml-0.5 align-baseline animate-[blink_1.1s_steps(1)_infinite] ${cursorClassName}`}
        style={{ borderRight: "2.5px solid #e6ea00", height: "1.05em" }}
      ></span>
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1 }
            50% { opacity: 0 }
          }
        `}
      </style>
    </span>
  );
};

export default Typewriter;
