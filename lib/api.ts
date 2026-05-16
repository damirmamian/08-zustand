import axios from "axios";
import type { Note } from "@/types/note";

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

export async function fetchNotes(
    searchNote: string,
    page: number,
    tag?: string
) {
    const res = await axios.get<FetchNotesResponse>('https://notehub-public.goit.study/api/notes', {
        params: {
            search: searchNote,
            page: page,
            perPage: 12,
            tag,
        },
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
        },
    });

    return res.data;
}



export async function deleteNote(id: string): Promise<Note> {
    const result = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
        },
    });

    return result.data;
}

type CreateNoteProps = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;

export async function createNote({ title, content, tag }: CreateNoteProps): Promise<Note> {
    const create = await axios.post<Note>('https://notehub-public.goit.study/api/notes', {
        title,
        content,
        tag,
    }, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        }
    }
    );

    return create.data;
}



export async function fetchNoteById(id: string) {
    const res = await axios.get<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
        params: {
        },
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
        },
    });

    return res.data;
}