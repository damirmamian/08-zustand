'use client';

import Loader from '@/components/Loader/Loader';
import ServerError from '@/components/ServerError/ServerError';
import NoNotesError from '@/components/NoNotesError/NoNotesError';
import { useDebouncedCallback } from 'use-debounce';
import SearchBox from '@/components/SearchBox/SearchBox';
import css from './Notes.module.css';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
/* import Modal from '@/components//Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm'; */
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';


type NoteClientProps = {
    tag: string | undefined,
};

export default function NotesClient({ tag }: NoteClientProps) {

    const [nameNote, setNameNote] = useState('');
    const [page, setPage] = useState(1);

    const { data, isSuccess, isLoading, isError } = useQuery({
        queryKey: ['notes', nameNote, page, tag],
        queryFn: () => fetchNotes(nameNote, page, tag),
        placeholderData: keepPreviousData,
        refetchOnMount: false,
    })

    const totalPages = data?.totalPages || 0;

    const handleSearchChange = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setNameNote(event.target.value);
        setPage(1);
    }, 300);

    const onPageChange = (page: number) => {
        setPage(page);
    }

    /* const [modalOpen, setModalOpen] = useState(false);
	
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false); */

    return (
        <div className={css.app}>
            <div className={css.toolbar}>
                <SearchBox onChange={handleSearchChange} />
                {data && data.totalPages > 1 && (
                    <Pagination totalPages={totalPages} forcePage={page} onPageChange={onPageChange} />
                )}
                <Link className={css.button} href="/notes/action/create">Create note +</Link>
                {/* <button className={css.button} onClick={openModal}>Create note +</button> */}
            </div>
            {isLoading && <Loader />}
            {isError && <ServerError />}
            {data && data.notes.length === 0 && <NoNotesError />}
            {isSuccess && data && (<NoteList notes={data.notes} />)}

            {/* {modalOpen && (
				<Modal onClose={closeModal}>
					<NoteForm onClose={closeModal} />
				</Modal>)} */}
            <Toaster />
        </div>
    );
};