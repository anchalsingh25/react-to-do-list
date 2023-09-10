import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskItem from "./components/TaskItem";
import TaskInput from "./components/TaskInput";
import { getTasks } from "./services/api";


function App() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await getTasks();
      if (res.status === 200){
        if(mounted){
          setTodoItems(res.data);
        }
      }
    })();
        
    return () => {
      mounted = false;
    };
  }, []);


  const todoItemComponents = todoItems.map((data) => {
    return (
      <TaskItem
        setTodoItems={setTodoItems}
        title={data.title}
        description={data.description}
        completed={data.completed}
        key={data.id}
        id={data.id}
      />
    );
  });

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <div className="w-1/4 mx-auto">
          <TaskInput setTodoItems={setTodoItems}/>
          {todoItemComponents}
        </div>
      </div>
    </div>
  );
}

export default App;
