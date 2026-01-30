import { useState, useEffect } from "react";
import "./Kanban.css";

interface Task {
  id: string;
  title: string;
  description: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  { id: "pendiente", title: "PENDIENTE", tasks: [] },
  { id: "ejecucion", title: "EN EJECUCION", tasks: [] },
  { id: "terminado", title: "TERMINADO", tasks: [] },
];

export default function Kanban() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [draggedFrom, setDraggedFrom] = useState<string | null>(null);

  // Cargar desde localStorage
  useEffect(() => {
    const savedColumns = localStorage.getItem("kanbanColumns");
    if (savedColumns) {
      try {
        setColumns(JSON.parse(savedColumns));
      } catch (error) {
        console.error("Error loading columns:", error);
      }
    }
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("kanbanColumns", JSON.stringify(columns));
  }, [columns]);

  const getColumnColor = (taskCount: number): string => {
    if (taskCount <= 2) return "libre";
    if (taskCount <= 5) return "ocupado";
    return "saturado";
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDescription,
    };

    setColumns((prev) =>
      prev.map((col) =>
        col.id === "pendiente" ? { ...col, tasks: [...col.tasks, newTask] } : col
      )
    );

    setNewTaskTitle("");
    setNewTaskDescription("");

    alert("Tarea creada exitosamente!");
  };

  const handleDeleteTask = (taskId: string, columnId: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) }
          : col
      )
    );
  };

  const handleDragStart = (e: React.DragEvent, task: Task, fromColumnId: string) => {
    setDraggedTask(task);
    setDraggedFrom(fromColumnId);
  };

  const handleDrop = (e: React.DragEvent, toColumnId: string) => {
    e.preventDefault();
    if (!draggedTask || !draggedFrom || draggedFrom === toColumnId) return;

    setColumns((prev) => {
      const newColumns = prev.map((col) => ({ ...col, tasks: [...col.tasks] }));

      // Remover de la columna origen
      const fromCol = newColumns.find((col) => col.id === draggedFrom);
      if (fromCol) {
        fromCol.tasks = fromCol.tasks.filter((t) => t.id !== draggedTask.id);
      }

      // Agregar a la columna destino
      const toCol = newColumns.find((col) => col.id === toColumnId);
      if (toCol) {
        toCol.tasks.push(draggedTask);
      }

      return newColumns;
    });

    setDraggedTask(null);
    setDraggedFrom(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="kanban-container">
      <div className="kanban-header">
        <h1 className="kanban-title">LISTA DE TAREAS KANBAN</h1>
        <div className="add-task-form">
          <input
            type="text"
            placeholder="Título de la tarea..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="task-input"
          />
          <input
            type="text"
            placeholder="Descripción..."
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            className="task-input"
          />
          <button onClick={handleAddTask} className="btn-add">
            + AGREGAR TAREA
          </button>
        </div>
      </div>

      <div className="kanban-board">
        {columns.map((column) => (
          <div
            key={column.id}
            className={`kanban-column ${getColumnColor(column.tasks.length)}`}
            onDrop={(e) => handleDrop(e, column.id)}
            onDragOver={handleDragOver}
          >
            <h2 className="column-title">{column.title}</h2>
            <div className="column-tasks">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  className="task-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task, column.id)}
                >
                  <div className="task-header">
                    <h3 className="task-title">{task.title}</h3>
                    <button
                      onClick={() => handleDeleteTask(task.id, column.id)}
                      className="btn-delete"
                    >
                      ×
                    </button>
                  </div>
                  <p className="task-description">{task.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}