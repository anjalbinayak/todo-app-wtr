import { initializeApp } from "firebase/app";
import {
  doc,
  getDocs,
  addDoc,
  updateDoc,
  getFirestore,
  collection,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtj2_7GgeY5ehrJO4L0B0zEX1cbdfcnDA",
  authDomain: "fanshawe-web-trends.firebaseapp.com",
  projectId: "fanshawe-web-trends",
  storageBucket: "fanshawe-web-trends.firebasestorage.app",
  messagingSenderId: "168492363002",
  appId: "1:168492363002:web:a13643eda15437d31ced43",
  measurementId: "G-W93MECTFGD",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const sw = new URL("service-worker.js", import.meta.url);
if ("serviceWorker" in navigator) {
  const s = navigator.serviceWorker;
  s.register(sw.href, {
    scope: "/YOUR_REPOSITORY_NAME_HERE/",
  })
    .then((_) =>
      console.log(
        "Service Worker Registered for scope:",
        sw.href,
        "with",
        import.meta.url
      )
    )
    .catch((err) => console.error("Service Worker Error:", err));
}

// Add Task
addTaskBtn.addEventListener("click", async () => {
  const task = sanitizeInput(taskInput.value.trim());
  if (task) {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText) {
      await addTaskToFirestore(taskText);
      renderTasks();
      taskInput.value = "";
    }
    renderTasks();
  }
});

async function addTaskToFirestore(taskText) {
  await addDoc(collection(db, "todos"), {
    text: taskText,
    completed: false,
  });
}

async function renderTasks() {
  var tasks = await getTasksFromFirestore();
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    if (!task.data().completed) {
      const taskItem = document.createElement("li");
      taskItem.id = task.id;
      taskItem.textContent = task.data().text;
      taskList.appendChild(taskItem);
    }
  });
}
async function getTasksFromFirestore() {
  var data = await getDocs(collection(db, "todos"));
  let userData = [];
  data.forEach((doc) => {
    userData.push(doc);
  });
  return userData;
}

function sanitizeInput(input) {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML;
}

// Remove Task on Click
taskList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.remove();
  }
});

window.addEventListener("error", function (event) {
  console.error("Error occurred: ", event.message);
});
