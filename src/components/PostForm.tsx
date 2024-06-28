import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';

interface PostFormProps {
  isEdit?: boolean;
  initialValues?: { id?: string; title: string; content: string };
}

function PostForm({ isEdit = false, initialValues = { title: '', content: '' } }: PostFormProps) {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      setTitle(initialValues.title);
      setContent(initialValues.content);
    }
  }, [initialValues, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit && initialValues.id) {
      const postDocRef = doc(db, 'posts', initialValues.id);
      await updateDoc(postDocRef, { title, content });
    } else {
      await addDoc(collection(db, 'posts'), { title, content });
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Content</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
      </div>
      <button type="submit">{isEdit ? 'Update' : 'Create'} Post</button>
    </form>
  );
}

export default PostForm;



