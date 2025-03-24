"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

// Definice komponent pro ReactMarkdown mimo hlavní komponentu
const MarkdownH1 = ({ children }: { children?: ReactNode }) => (
  <h1 className="text-2xl font-bold mt-8 mb-4">{children}</h1>
);
const MarkdownH2 = ({ children }: { children?: ReactNode }) => (
  <h2 className="text-xl font-semibold mt-6 mb-3">{children}</h2>
);
const MarkdownH3 = ({ children }: { children?: ReactNode }) => (
  <h3 className="text-lg font-medium mt-4 mb-2">{children}</h3>
);
const MarkdownUl = ({ children }: { children?: ReactNode }) => (
  <ul className="list-disc pl-6 mb-4">{children}</ul>
);
const MarkdownLi = ({ children }: { children?: ReactNode }) => (
  <li className="mb-1">{children}</li>
);
const MarkdownP = ({ children }: { children?: ReactNode }) => (
  <p className="mb-4">{children}</p>
);

// Vytvoření objektu s komponentami
const markdownComponents = {
  h1: MarkdownH1,
  h2: MarkdownH2,
  h3: MarkdownH3,
  ul: MarkdownUl,
  li: MarkdownLi,
  p: MarkdownP,
};

interface LegalDocumentProps {
  filePath: string;
  title: string;
}

const LegalDocument: React.FC<LegalDocumentProps> = ({ filePath, title }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(filePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load document");
        }
        return response.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading markdown:", error);
        setError("Failed to load document. Please try again later.");
        setLoading(false);
      });
  }, [filePath]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-[200px]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      );
    }

    if (error) {
      return <div className="text-center text-red-600 py-8">{error}</div>;
    }

    return (
      <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
    );
  };

  return (
    <Card className="w-full max-w-4xl mx-auto my-8">
      <CardHeader>
        <h1 className="text-2xl font-bold text-center">{title}</h1>
      </CardHeader>
      <CardContent className="prose prose-blue max-w-none min-h-[200px]">
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default LegalDocument;
