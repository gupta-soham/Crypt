"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { Prisma, Subgroup } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import debounce from "lodash.debounce";
import { Search, Users } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface SearchBarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function SearchBar({ isOpen, setIsOpen }: SearchBarProps) {
  const [input, setInput] = useState<string>("");
  const pathname = usePathname();
  const commandRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useOnClickOutside(commandRef, () => {
    setInput("");
    setIsOpen(false);
  });

  const request = debounce(async () => {
    refetch();
  }, 800);

  const debounceRequest = useCallback(() => {
    request();
  }, [request]);

  const {
    data: queryResults,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];
      const { data } = await axios.get(`/api/search?q=${input}`);
      return data as (Subgroup & {
        _count: Prisma.SubgroupCountOutputType;
      })[];
    },
    queryKey: ["search-query"],
    enabled: false,
  });

  useEffect(() => {
    setInput("");
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-black/20"
          aria-label="Open search"
        >
          <Search className="w-5 h-5 text-primary dark:text-white" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-black/80 text-black dark:text-white">
        <div ref={commandRef} className="w-full">
          <Command className="w-full bg-transparent">
            <CommandInput
              onValueChange={(text) => {
                setInput(text);
                debounceRequest();
              }}
              value={input}
              className="outline-none border-none focus:border-none focus:outline-none ring-0 text-black dark:text-white bg-transparent dark:bg-black/60"
              placeholder="Search Communities..."
            />
            <CommandList>
              {isFetched && <CommandEmpty>No results found.</CommandEmpty>}
              {(queryResults?.length ?? 0) > 0 && (
                <CommandGroup heading="Communities">
                  {queryResults?.map((sub) => (
                    <CommandItem
                      key={sub.id}
                      onSelect={() => {
                        router.push(`/sub/${sub.name}`);
                        router.refresh();
                        setIsOpen(false);
                      }}
                      value={sub.name}
                      className="hover:bg-gray-100 dark:hover:bg-black/40"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      <span>sub/{sub.name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      </DialogContent>
    </Dialog>
  );
}
