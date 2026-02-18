// src/lib/blogs.ts
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const getBlogs = async () => {
  const q = query(collection(db, "blogs"));
  const snap = await getDocs(q);

  return snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};
