"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  {
    ssr: false,
  }
);

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.5rem",
    margin: "0.75rem 0",
  },
  header: {
    h1: {
      fontSize: "1.5rem",
      fontWeight: "600",
      lineHeight: "2rem",
      margin: "1rem 0",
    },
    h2: {
      fontSize: "1.25rem",
      fontWeight: "600",
      lineHeight: "1.75rem",
      margin: "0.875rem 0",
    },
    h3: {
      fontSize: "1.125rem",
      fontWeight: "600",
      lineHeight: "1.75rem",
      margin: "0.75rem 0",
    },
  },
  list: {
    container: {
      margin: "1rem 0",
      padding: "0 0 0 1.5rem",
    },
    listItem: {
      fontSize: "0.875rem",
      lineHeight: "1.5rem",
      margin: "0 0 0.5rem 0",
    },
  },
  table: {
    container: {
      margin: "0.75rem 0",
      width: "100%",
      overflowX: "auto",
    },
    table: {
      borderCollapse: "collapse",
      width: "100%",
    },
    tableCell: {
      border: "1px solid #e2e8f0",
      padding: "0.5rem",
    },
    tableHeader: {
      backgroundColor: "#f7fafc",
      fontWeight: "600",
    },
  },
};

interface EditorComponentProps {
  content: any;
  className?: string;
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
  table: CustomTableRenderer,
  list: CustomListRenderer,
};

export default function EditorOutput({
  content,
  className,
}: EditorComponentProps) {
  return (
    <div
      className={cn(
        "prose prose-sm dark:prose-invert max-w-none",
        "sm:prose-base lg:prose-lg",
        "prose-code:bg-gray-200 prose-code:dark:bg-gray-700 prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono",
        "prose-ul:pl-6 prose-ul:my-4 prose-ul:list-disc",
        "prose-ol:pl-6 prose-ol:my-4 prose-ol:list-decimal",
        "prose-li:mb-2",
        className
      )}
    >
      <Output
        data={content}
        style={style}
        renderers={renderers}
        className="overflow-x-auto"
      />
    </div>
  );
}

function CustomCodeRenderer({ data }: any) {
  return (
    <pre className="bg-secondary/50 dark:bg-muted-foreground/20 rounded-lg p-4 my-3 overflow-x-auto">
      <code className="text-sm text-primary/80 dark:text-white/80 font-mono">
        {data.code}
      </code>
    </pre>
  );
}

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="relative w-full min-h-[15rem] my-4">
      <Image
        alt="image"
        className="object-contain rounded-lg"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
        src={src}
      />
    </div>
  );
}

function CustomTableRenderer({ data }: any) {
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {data.content[0].map((header: string, index: number) => (
              <th
                key={index}
                className="border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-2 text-left"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.content.slice(1).map((row: string[], rowIndex: number) => (
            <tr key={rowIndex}>
              {row.map((cell: string, cellIndex: number) => (
                <td
                  key={cellIndex}
                  className="border border-gray-300 dark:border-gray-700 p-2"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CustomListRenderer({ data }: any) {
  const ListTag = data.style === "ordered" ? "ol" : "ul";
  const listStyle = data.style === "ordered" ? "list-decimal" : "list-disc";

  return (
    <ListTag className={`pl-6 my-4 ${listStyle}`}>
      {data.items.map((item: string, index: number) => (
        <li
          key={index}
          className="mb-2"
          dangerouslySetInnerHTML={{ __html: item }}
        />
      ))}
    </ListTag>
  );
}
