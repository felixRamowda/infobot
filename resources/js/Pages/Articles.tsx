import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { ArticlesType } from '@/types/ArticlesType';
import CardComponent from '@/Components/CardComponent';
import {Button} from "@nextui-org/react";
import ModalComponent from '@/Components/ModalComponent';
import Modal from '@/Components/Modal';

export default function Articles({ Articles }: { Articles: ArticlesType }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Articles
                </h2>
            }
            >
            <Head title="Articles" />
            <div className=' p-2'>
                <ModalComponent/>
            </div>
            <div className='flex justify-center '>
              
                <CardComponent Articles={Articles}/>
            </div>
    
        </AuthenticatedLayout>
    );
}
