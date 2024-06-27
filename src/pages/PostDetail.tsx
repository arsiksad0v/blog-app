import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';

function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    const docRef = doc(db, 'posts', id);
    await deleteDoc(docRef);
    navigate('/');
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>{new Date(post.createdAt.seconds * 1000).toLocaleDateString()}</p>
      <button onClick={handleDelete}>Delete</button>
      <Link to={`/posts/${id}/edit`}>Edit</Link>
    </div>
  );
}

export default PostDetail;
