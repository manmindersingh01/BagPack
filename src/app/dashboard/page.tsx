import React from 'react';
import { auth } from "@clerk/nextjs/server";
import DropZone from '../../components/DropZone';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../fitebase';
import { FileType } from '../../../typing';
import TableWrapper from '@/components/table/TableWrapper';

const page = async () => {
  const { userId } = auth();

  console.log('User ID:', userId); // Check if userId is correctly fetched

  if (!userId) {
    console.error('User ID is null or undefined.');
    return null;
  }

  try {
    const docRes = await getDocs(collection(db, "users", userId, "files"));

    console.log('Documents:', docRes.docs); // Log documents fetched from Firestore

    const skeletonFiles: FileType[] = docRes.docs.map((doc) => ({
      userId: doc.data().userId,
      fileName: doc.data().fileName,
      fullName: doc.data().fullName,
      profileImg: doc.data().profileImg,
      type: doc.data().type,
      size: doc.data().size,
      timestamp: doc.data().timestamp.toDate().toISOString(),
      createdAt: doc.data().createdAt.toDate().toISOString(),
      lastModified: doc.data().lastModified,
      downloadUrl: doc.data().downloadUrl,
    }));

    console.log('Skeleton Files:', skeletonFiles); // Ensure this logs the expected data

    return (
      <div className=' '>
        <DropZone />
        <section className='container space-y-4'>
          <h2 className='font-bold'>All files</h2>
          <TableWrapper skeletonFiles={skeletonFiles} />
          <div></div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Error fetching documents:', error);
    return null;
  }
}

export default page;
