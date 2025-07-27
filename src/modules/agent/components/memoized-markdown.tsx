import { memo, useMemo } from "react";

import { marked } from "marked";
import ReactMarkdown from "react-markdown";

function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown);
  return tokens.map((token) => token.raw);
}

const MemoizedMarkdownBlock = memo(
  ({ content }: { content: string }) => {
    return (
      <ReactMarkdown
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline transition-colors"
            >
              {children}
            </a>
          ),
          p: ({ children }) => <p className="mb-4 text-base leading-relaxed">{children}</p>,
          h1: ({ children }) => <h1 className="mt-6 mb-4 text-3xl font-bold tracking-tight">{children}</h1>,
          h2: ({ children }) => <h2 className="mt-5 mb-3 text-2xl font-semibold tracking-tight">{children}</h2>,
          h3: ({ children }) => <h3 className="mt-4 mb-2 text-xl font-semibold tracking-tight">{children}</h3>,
          h4: ({ children }) => <h4 className="mt-3 mb-2 text-lg font-medium tracking-tight">{children}</h4>,
          ul: ({ children }) => <ul className="mb-4 list-disc space-y-1 pl-6 text-base">{children}</ul>,
          ol: ({ children }) => <ol className="mb-4 list-decimal space-y-1 pl-6 text-base">{children}</ol>,
          li: ({ children }) => <li className="">{children}</li>,
          blockquote: ({ children }) => <blockquote className="mb-4 border-l-4 pl-4 italic">{children}</blockquote>,
          code: ({ children }) => <code className="rounded px-1.5 py-1 font-mono text-sm">{children}</code>,
          pre: ({ children }) => <pre className="mb-4 overflow-auto rounded p-4 text-sm">{children}</pre>,
        }}
      >
        {content}
      </ReactMarkdown>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.content !== nextProps.content) return false;
    return true;
  },
);

MemoizedMarkdownBlock.displayName = "MemoizedMarkdownBlock";

export const MemoizedMarkdown = memo(({ content, id }: { content: string; id: string }) => {
  const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);

  return blocks.map((block, index) => <MemoizedMarkdownBlock content={block} key={`${id}-block_${index}`} />);
});

MemoizedMarkdown.displayName = "MemoizedMarkdown";
