"use client";
import React, { useEffect, useState } from 'react';
import { FileType } from '../../../typing';
import { Button } from '../ui/button';
import { DataTable } from './table';
import columns from './Column';
import { useUser } from '@clerk/nextjs';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '../../../fitebase';
import { Skeleton } from "@/components/ui/skeleton"

function TableWrapper({ skeletonFiles }: { skeletonFiles: FileType[] }) {
  const { user } = useUser();

  const [files, setFiles] = useState<FileType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const [docs, loading, error] = useCollection(
    user && query(
      collection(db, "users", user.id, "files"),
      orderBy("timestamp", sort)
    )
  );


  useEffect(() => {
    if (docs) {
      const fetchedFiles: FileType[] = docs.docs.map((doc) => ({
        userId: doc.data().userId,
        fileName: doc.data().fileName,
        fullName: doc.data().fullName,
        profileImg: doc.data().profileImg,
        type: doc.data().type,
        size: doc.data().size,
        timestamp: doc.data().timestamp ? doc.data().timestamp.toDate().toISOString() : null,
        createdAt: doc.data().createdAt ? doc.data().createdAt.toDate().toISOString() : null,
        lastModified: doc.data().lastModified,
        downloadUrl: doc.data().downloadUrl,
      }));

      setFiles(fetchedFiles);
      console.log('Fetched Files:', fetchedFiles);
    }
  }, [docs]);

  if (docs?.docs.length == undefined) {
    return <div className=' flex flex-col'>
      <Button variant={'outline'} className='ml-auto text-sm w-36 h-10 mb-2'>
        <Skeleton />
      </Button>
      <div className=' border rounded-lg'>
        <div className=''>
          {skeletonFiles.map((file) => {
            return <div key={file.userId}
              className='flex items-center space-x-4 p-5 w-full'
            >
              <Skeleton className='w-12 h-12' />
              <Skeleton className='w-full h-12' />
            </div>
          })}
        </div>

      </div>
    </div>
  }
  const handleSortChange = () => {
    setSort(sort === "desc" ? "asc" : "desc");
  };

  return (
    <div className=' flex flex-col space-x-5'>
      <Button onClick={handleSortChange} variant={'outline'} className='ml-auto text-sm w-fit mb-2'>
        Sort by {sort === "desc" ? "Newest" : "Oldest"}
      </Button>
      <DataTable columns={columns} data={files} />
    </div>
  );
}

export default TableWrapper;
