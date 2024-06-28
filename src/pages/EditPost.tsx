import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

interface Post {
  id: string;
  title: string;
  content: string;
}

function EditPost() {
  const { id } = useParams<{ id: string }>();
  const [initialValues, setInitialValues] = useState({ id: '', title: '', content: '' });

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setInitialValues({ id: docSnap.id, ...docSnap.data() } as Post);
        }
      }
    };

    fetchPost();
  }, [id]);

  return (
    <div>
      <h1>Edit Post</h1>
      <PostForm isEdit={true} initialValues={initialValues} />
    </div>
  );
}

export default EditPost;



