"use client";

import Image from "next/image";
import { MoreHorizontal, Link2, Pencil, Trash2 } from "lucide-react";
import type { LinkItem } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type LinkCardProps = {
  link: LinkItem;
  onEdit: () => void;
  onDelete: () => void;
};

export function LinkCard({ link, onEdit, onDelete }: LinkCardProps) {
  return (
    <Card className="group relative overflow-hidden bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg h-36 flex flex-col items-center justify-center text-center p-4 transition-all duration-300 hover:bg-white/30 hover:shadow-xl hover:-translate-y-1">
      <a href={link.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" aria-label={link.label}></a>
      <CardContent className="relative z-20 p-0 flex flex-col items-center justify-center gap-2">
          {link.icon ? (
            <Image
              src={link.icon}
              alt={`${link.label} icon`}
              width={48}
              height={48}
              className="rounded-lg object-cover w-12 h-12"
            />
          ) : (
            <Link2 className="w-12 h-12 text-primary-foreground/70" />
          )}
          <p className="font-semibold text-sm text-primary-foreground truncate max-w-[100px]">{link.label}</p>
      </CardContent>
      <div className="absolute top-2 right-2 z-30">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100">
                  <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={(e) => { e.preventDefault(); onEdit(); }}>
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={(e) => { e.preventDefault(); onDelete(); }} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
    </Card>
  );
}
