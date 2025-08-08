import { db } from './firebase'
import { collection, query, where, getDocs } from "firebase/firestore";

export async function getUserPosts(userId: string) {
  const postsRef = collection(db, "posts");
  const q = query(postsRef, where("authorId", "==", userId));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}