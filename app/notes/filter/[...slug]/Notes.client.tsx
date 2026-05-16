'use client';

import { useEffect, useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

import Loader from '@/components/Loader/Loader';
import ServerError from '@/components/ServerError/ServerError';
import NoNotesError from '@/components/NoNotesError/NoNotesError';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';

import { fetchNotes } from '@/lib/api';

import { Toaster } from 'react-hot-toast';
import Link from 'next/link';

import css from './Notes.module.css';

type NoteClientProps = {
    tag: string | undefined;
};

export default function NotesClient({ tag }: NoteClientProps) {
    const [inputValue, setInputValue] = useState('');
    const [page, setPage] = useState(1);

    const [debouncedValue] = useDebounce(inputValue, 300);



    const { data, isSuccess, isLoading, isError } = useQuery({
        queryKey: ['notes', debouncedValue, page, tag],
        queryFn: () => fetchNotes(debouncedValue, page, tag),
        placeholderData: keepPreviousData,
    });

    const totalPages = data?.totalPages || 0;

    const handleSearchChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setInputValue(event.target.value);
        setPage(1);
    };

    const onPageChange = (selectedPage: number) => {
        setPage(selectedPage);
    };

    return (
        <div className={css.app}>
            <div className={css.toolbar}>
                <SearchBox
                    value={inputValue}
                    onChange={handleSearchChange}
                />

                {data && data.totalPages > 1 && (
                    <Pagination
                        totalPages={totalPages}
                        forcePage={page}
                        onPageChange={onPageChange}
                    />
                )}

                <Link
                    className={css.button}
                    href="/notes/action/create"
                >
                    Create note +
                </Link>
            </div>

            {isLoading && <Loader />}
            {isError && <ServerError />}
            {data && data.notes.length === 0 && <NoNotesError />}
            {isSuccess && data && (
                <NoteList notes={data.notes} />
            )}

            <Toaster />
        </div>
    );
}