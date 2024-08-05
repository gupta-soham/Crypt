"use client";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface CloseModalProps {
  onClick: () => void;
}

export default function CloseModal({ onClick }: CloseModalProps): JSX.Element {
  return (
    <Button
      variant="secondary"
      className="h-8 w-8 p-0 rounded-md"
      onClick={onClick}
      aria-label="Close modal"
    >
      <X className="h-4 w-4" />
    </Button>
  );
}
