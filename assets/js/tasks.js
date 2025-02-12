const email = JSON.parse(localStorage.getItem("email"));

if (!email) {
  window.location.href = "index.html";
}

async function addTaskToFirestore(taskText) {
  let task = await addDoc(collection(db, "todos"), {
    text: taskText,
    email: email,
    completed: false,
  });
  return task.id;
}

async function getTasksFromFirestore() {
  let q = query(collection(db, "todos"), where("email", "==", email));
  return await getDocs(q);
}
