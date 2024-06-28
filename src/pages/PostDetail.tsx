import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';

interface Post {
  id: string;
  title: string;
  content: string;
}

function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() } as Post);
        }
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (id) {
      await deleteDoc(doc(db, 'posts', id));
      navigate('/');
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => navigate(`/posts/${id}/edit`)}>Edit</button>
    </div>
  );
}

export default PostDetail;

