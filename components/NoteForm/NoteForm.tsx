"use client";

import { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';
import { useRouter } from 'next/navigation';
import { useId } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { toast } from 'react-hot-toast';
import { useNoteDraftStore } from '@/lib/store/noteStore';

type NoteFormValues = {
    title: string;
    content: string;
    tag: NoteTag;
};

export default function NoteForm() {
    const formId = useId();

    const router = useRouter();

    const { draft, setDraft, clearDraft } = useNoteDraftStore();

    const createToast = () => toast.success('Note created successfully!');
    const createToastError = () => toast.error('Failed to create the note. Please try later.');

    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            createToast();
            clearDraft();
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            router.push("/notes/filter/all");
        },
        onError: () => {
            router.push("/notes/filter/all");
            createToastError();
        },
    });

    const handleSubmit = (formData: FormData) => {
        const values = Object.fromEntries(formData) as NoteFormValues;
        createMutation.mutate(values);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setDraft({ ...draft, [name]: value });
    };
    const handleCancel = () => {
        router.push("/notes/filter/all");
    }

    return (
        <form action={handleSubmit} className={css.form}>
            <div className={css.formGroup}>
                <label htmlFor={`${formId}-title`}>Title</label>
                <input id={`${formId}-title`} type="text" name="title" className={css.input} defaultValue={draft.title} onChange={handleChange} />
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${formId}-content`}>Content</label>
                <textarea id={`${formId}-content`} name="content" rows={8} className={css.textarea} defaultValue={draft.content} onChange={handleChange} />
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${formId}-tag`}>Tag</label>
                <select id={`${formId}-tag`} name="tag" className={css.select} defaultValue={draft.tag} onChange={handleChange}>
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
            </div>

            <div className={css.actions}>
                <button type="button" className={css.cancelButton} onClick={handleCancel}>
                    Cancel
                </button>
                <button
                    type="submit"
                    className={css.submitButton}
                    disabled={false}
                >
                    Create note
                </button>
            </div>
        </form>
    );
};