"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  {
    ssr: false,
  }
);

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
};

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
};

interface EditorComponentProps {
  content: any;
}

export default function EditorOutput({ content }: EditorComponentProps) {
  return (
    <Output
      className="text-sm"
      style={style}
      data={content}
      renderers={renderers}
    />
  );
}

function CustomCodeRenderer({ data }: any) {
  data;

  return (
    <pre className="bg-secondary rounded-md p-4 mt-2">
      <code className="text-primary text-sm">{data.code}</code>
    </pre>
  );
}

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="relative w-full min-h-[15rem]">
      <Image alt="image" className="object-contain" fill src={src} />
    </div>
  );
}
