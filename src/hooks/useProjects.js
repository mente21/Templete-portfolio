import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "projects"));
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const projectData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projectData);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore Error:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addProject = async (project) => {
    try {
      const docRef = await addDoc(collection(db, "projects"), {
        ...project,
        tech: typeof project.tech === 'string' ? project.tech.split(',').map(s => s.trim()) : project.tech,
        createdAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const editProject = async (id, updatedData) => {
    try {
      const projectRef = doc(db, "projects", id);
      await updateDoc(projectRef, {
        ...updatedData,
        tech: typeof updatedData.tech === 'string' ? updatedData.tech.split(',').map(s => s.trim()) : updatedData.tech,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const removeProject = async (id) => {
    try {
      await deleteDoc(doc(db, "projects", id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return { projects, loading, error, addProject, editProject, removeProject };
};
