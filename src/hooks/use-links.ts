"use client";

import { useState, useEffect, useCallback } from 'react';
import type { LinkItem } from '@/lib/types';

const STORAGE_KEY = 'link-board-links';

export function useLinks() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const items = window.localStorage.getItem(STORAGE_KEY);
      if (items) {
        setLinks(JSON.parse(items));
      }
    } catch (error) {
      console.error("Failed to load links from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
      } catch (error) {
        console.error("Failed to save links to localStorage", error);
      }
    }
  }, [links, isLoaded]);

  const addLink = useCallback((link: Omit<LinkItem, 'id'>) => {
    const newLink = { ...link, id: crypto.randomUUID() };
    setLinks(prevLinks => [...prevLinks, newLink]);
  }, []);

  const updateLink = useCallback((updatedLink: LinkItem) => {
    setLinks(prevLinks =>
      prevLinks.map(link => (link.id === updatedLink.id ? updatedLink : link))
    );
  }, []);

  const deleteLink = useCallback((id: string) => {
    setLinks(prevLinks => prevLinks.filter(link => link.id !== id));
  }, []);

  const reorderLinks = useCallback((draggedId: string, targetId: string) => {
    setLinks(prevLinks => {
      const draggedIndex = prevLinks.findIndex(p => p.id === draggedId);
      const targetIndex = prevLinks.findIndex(p => p.id === targetId);
      if (draggedIndex === -1 || targetIndex === -1 || draggedIndex === targetIndex) return prevLinks;

      const newLinks = [...prevLinks];
      const [draggedItem] = newLinks.splice(draggedIndex, 1);
      newLinks.splice(targetIndex, 0, draggedItem);
      return newLinks;
    });
  }, []);

  return { links, addLink, updateLink, deleteLink, reorderLinks, isLoaded };
}
