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
      margin: "0.75rem 0",
      padding: "0 0 0 1rem",
    },
    listItem: {
      fontSize: "0.875rem",
      lineHeight: "1.5rem",
      margin: "0.375rem 0",
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
};

export default function EditorOutput({
  content,
  className,
}: EditorComponentProps) {
  return (
    <div
      className={cn("prose prose-sm dark:prose-invert max-w-none", className)}
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
