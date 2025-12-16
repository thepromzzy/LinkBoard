"use client";

import { useState } from 'react';
import { useLinks } from '@/hooks/use-links';
import type { LinkItem } from '@/lib/types';
import { DashboardHeader } from '@/components/dashboard-header';
import { LinkGrid } from '@/components/link-grid';
import { LinkFormDialog } from '@/components/link-form-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/empty-state';

function LoadingState() {
  return (
    <div className="min-h-screen w-full">
      <header className="flex items-center justify-between p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground/90 font-headline">
          LinkBoard
        </h1>
        <Skeleton className="h-10 w-28 rounded-md" />
      </header>
      <main>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 p-4 md:p-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-2xl bg-white/20" />
          ))}
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  const { links, addLink, updateLink, deleteLink, reorderLinks, isLoaded } = useLinks();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [linkToEdit, setLinkToEdit] = useState<LinkItem | null>(null);

  if (!isLoaded) {
    return <LoadingState />;
  }

  const handleSave = (data: Omit<LinkItem, 'id'> | LinkItem) => {
    if ('id' in data && linkToEdit) {
      updateLink(data);
    } else {
      addLink(data as Omit<LinkItem, 'id'>);
    }
    setIsAddDialogOpen(false);
    setLinkToEdit(null);
  };
  
  return (
    <div className="min-h-screen w-full">
      <DashboardHeader onAddClick={() => setIsAddDialogOpen(true)} />
      
      <main>
        {links.length > 0 ? (
            <LinkGrid
                links={links}
                onEditClick={(link) => setLinkToEdit(link)}
                deleteLink={deleteLink}
                reorderLinks={reorderLinks}
            />
        ) : (
            <EmptyState onAddClick={() => setIsAddDialogOpen(true)} />
        )}
      </main>

      <LinkFormDialog
        key={linkToEdit ? `edit-${linkToEdit.id}` : 'add'}
        open={isAddDialogOpen || !!linkToEdit}
        onOpenChange={(isOpen) => {
            if (!isOpen) {
                setIsAddDialogOpen(false);
                setLinkToEdit(null);
            }
        }}
        onSave={handleSave}
        linkToEdit={linkToEdit ?? undefined}
      />
    </div>
  );
}
