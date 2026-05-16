import { NewNote } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type NoteDraftStore = {
    draft: NewNote;
    setDraft: (draft: NewNote) => void;
    clearDraft: () => void;
};

const initialDraft: NewNote = {
    title: '',
    content: '',
    tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftStore>()(
    persist(
        (set) => ({
            draft: initialDraft,
            setDraft: (note) => set({ draft: note }),
            clearDraft: () => set({ draft: initialDraft }),
        }),
        {
            name: "note-draft",
        }
    )
);
