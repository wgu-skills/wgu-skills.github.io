import React from 'react';
import {marked} from 'marked';

type MarkdownRendererProps = {
  markdown: string;
};

const MarkdownRenderer = ({ markdown }: MarkdownRendererProps) => {
  const getMarkdownText = () => {
    var rawMarkup = marked(markdown, { sanitize: true }) as string;
    return { __html: rawMarkup };
  };

  return <div dangerouslySetInnerHTML={getMarkdownText()} />;
};

export default MarkdownRenderer;
