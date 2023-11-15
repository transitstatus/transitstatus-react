import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import { useMemo } from "react";

hljs.registerLanguage("typescript", typescript);

const CodeBlock = ({ text, language }) => {
  const highlightedCode = useMemo(() => {
    return hljs.highlight(text, {
      language: language,
    }).value;
  }, [text, language]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
      className='code'
    />
  );
};

export default CodeBlock;
