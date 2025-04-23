import React from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = ''
}) => {
  const renderMarkdown = (markdownContent: string) => {
    if (!markdownContent) return null;
    
    const parts = markdownContent.split('```');
    
    return (
      <div className={className}>
        {parts.map((part, index) => {
          if (index % 2 === 0) {
            return (
              <div key={index} className="prose prose-indigo dark:prose-invert max-w-none">
                {part.split('\n').map((line, lineIndex) => {
                  if (line.startsWith('## ')) {
                    return <h2 key={lineIndex} className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-white">{line.replace('## ', '')}</h2>;
                  } else if (line.startsWith('### ')) {
                    return <h3 key={lineIndex} className="text-xl font-semibold mt-6 mb-3 text-gray-700 dark:text-gray-200">{line.replace('### ', '')}</h3>;
                  } else if (line.match(/^\d+\.\s+\*\*.+\*\*\s+-\s+.+$/)) {
                    const match = line.match(/^(\d+)\.\s+\*\*(.+)\*\*\s+-\s+(.+)$/);
                    if (match) {
                      const [, num, term, desc] = match;
                      return (
                        <div key={lineIndex} className="flex items-start space-x-3 mb-2">
                          <div className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                            {num}
                          </div>
                          <div>
                            <span className="font-semibold text-gray-800 dark:text-white">{term}</span>
                            <span className="text-gray-600 dark:text-gray-300"> - {desc}</span>
                          </div>
                        </div>
                      );
                    }
                    return <p key={lineIndex} className="mb-3 text-gray-700 dark:text-gray-300">{line}</p>;
                  } else if (line.trim() === '') {
                    return <div key={lineIndex} className="h-2"></div>;
                  } else if (line.includes('`')) {
                    const segments = line.split('`');
                    return (
                      <p key={lineIndex} className="mb-3 text-gray-700 dark:text-gray-300">
                        {segments.map((segment, segIndex) => {
                          return segIndex % 2 === 0 ? 
                            segment : 
                            <code key={segIndex} className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-indigo-600 dark:text-indigo-400 font-mono text-sm">
                              {segment}
                            </code>;
                        })}
                      </p>
                    );
                  } else {
                    return <p key={lineIndex} className="mb-3 text-gray-700 dark:text-gray-300">{line}</p>;
                  }
                })}
              </div>
            );
          } else {
            const language = part.split('\n')[0];
            const code = part.split('\n').slice(1).join('\n');
            
            return (
              <div key={index} className="relative group mb-6">
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    className="bg-indigo-600 text-white p-1.5 rounded-md hover:bg-indigo-700 transition-colors"
                    onClick={() => navigator.clipboard.writeText(code)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2" />
                    </svg>
                  </button>
                </div>
                <div className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {language}
                    </div>
                  </div>
                  <pre className="font-mono">
                    <code>{code}</code>
                  </pre>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  };
  
  return renderMarkdown(content);
};

export default MarkdownRenderer;