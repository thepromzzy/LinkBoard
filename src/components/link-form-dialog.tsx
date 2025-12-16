"use client";

import { useState, useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { LinkItem } from "@/lib/types";
import Image from "next/image";
import { ImagePlus } from "lucide-react";

const formSchema = z.object({
  label: z.string().min(1, { message: "Label is required." }),
  url: z.string().url({ message: "Please enter a valid URL." }),
  icon: z.string().nullable(),
});

type LinkFormValues = z.infer<typeof formSchema>;

type LinkFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  linkToEdit?: LinkItem;
  onSave: (data: Omit<LinkItem, 'id'> | LinkItem) => void;
};

export function LinkFormDialog({ open, onOpenChange, linkToEdit, onSave }: LinkFormDialogProps) {
  const [iconPreview, setIconPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<LinkFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
      url: "",
      icon: null,
    },
  });

  useEffect(() => {
    if (open) {
      if (linkToEdit) {
        form.reset({
          label: linkToEdit.label,
          url: linkToEdit.url,
          icon: linkToEdit.icon,
        });
        setIconPreview(linkToEdit.icon);
      } else {
        form.reset({ label: "", url: "https://", icon: null });
        setIconPreview(null);
      }
    }
  }, [linkToEdit, form, open]);
  
  const handleIconUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setIconPreview(result);
        form.setValue("icon", result);
      };
      reader.readAsDataURL(file);
    }
  };

  function onSubmit(values: LinkFormValues) {
    if (linkToEdit) {
      onSave({ ...linkToEdit, ...values });
    } else {
      onSave(values);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background/90 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle>{linkToEdit ? "Edit Link" : "Add New Link"}</DialogTitle>
          <DialogDescription>
            {linkToEdit ? "Update the details for your link." : "Enter the details for your new link."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center gap-4 pt-2">
              <div
                className="w-20 h-20 rounded-lg flex items-center justify-center bg-accent/50 border-2 border-dashed border-accent cursor-pointer hover:bg-accent/70 transition-colors"
                onClick={() => fileInputRef.current?.click()}
                role="button"
                aria-label="Upload icon"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                >
                {iconPreview ? (
                  <Image src={iconPreview} alt="Icon preview" width={80} height={80} className="object-cover rounded-md" />
                ) : (
                  <div className="text-center text-muted-foreground p-1">
                    <ImagePlus className="mx-auto h-8 w-8"/>
                    <span className="text-xs">Upload</span>
                  </div>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*,.svg"
                    onChange={handleIconUpload}
                />
              </div>
              <div className="flex-1 space-y-2">
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Label</FormLabel>
                      <FormControl>
                        <Input placeholder="My Favorite Site" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save Link</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
