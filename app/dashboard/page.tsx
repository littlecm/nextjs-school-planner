"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpenIcon,
  CalendarIcon,
  ListTodoIcon,
  NotebookIcon,
  PlusIcon,
  SearchIcon,
  EditIcon,
  TrashIcon,
} from "lucide-react";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete Math Assignment",
      dueDate: "2023-06-15",
      completed: false,
      classId: 1,
    },
    {
      id: 2,
      title: "Read Chapter 5 of History Book",
      dueDate: "2023-06-18",
      completed: true,
      classId: 2,
    },
  ]);
  const [classes, setClasses] = useState([
    { id: 1, name: "Mathematics 101", schedule: "MWF 10:00 AM" },
    { id: 2, name: "History 202", schedule: "TTh 2:00 PM" },
  ]);
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Math Formulas",
      content: "Quadratic equation: ax^2 + bx + c = 0",
    },
    { id: 2, title: "History Dates", content: "French Revolution: 1789-1799" },
  ]);
  const [newTask, setNewTask] = useState({
    title: "",
    dueDate: "",
    classId: "",
  });
  const [newClass, setNewClass] = useState({ name: "", schedule: "" });
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState("all");

  useEffect(() => {
    const tasksForSelectedDate = tasks.filter(
      (task) =>
        new Date(task.dueDate).toDateString() === selectedDate.toDateString()
    );
    // You could update UI or state here based on the filtered tasks
  }, [selectedDate, tasks]);

  const addTask = () => {
    if (newTask.title && newTask.dueDate && newTask.classId) {
      setTasks([...tasks, { id: Date.now(), ...newTask, completed: false }]);
      setNewTask({ title: "", dueDate: "", classId: "" });
    }
  };

  const addClass = () => {
    if (newClass.name && newClass.schedule) {
      setClasses([...classes, { id: Date.now(), ...newClass }]);
      setNewClass({ name: "", schedule: "" });
    }
  };

  const addNote = () => {
    if (newNote.title && newNote.content) {
      setNotes([...notes, { id: Date.now(), ...newNote }]);
      setNewNote({ title: "", content: "" });
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteItem = (id, type) => {
    switch (type) {
      case "task":
        setTasks(tasks.filter((task) => task.id !== id));
        break;
      case "class":
        setClasses(classes.filter((cls) => cls.id !== id));
        setTasks(tasks.filter((task) => task.classId !== id));
        break;
      case "note":
        setNotes(notes.filter((note) => note.id !== id));
        break;
    }
  };

  const startEdit = (item, type) => {
    setEditItem({ ...item, type });
  };

  const saveEdit = () => {
    if (!editItem) return;

    switch (editItem.type) {
      case "task":
        setTasks(
          tasks.map((task) =>
            task.id === editItem.id ? { ...editItem } : task
          )
        );
        break;
      case "class":
        setClasses(
          classes.map((cls) => (cls.id === editItem.id ? { ...editItem } : cls))
        );
        break;
      case "note":
        setNotes(
          notes.map((note) =>
            note.id === editItem.id ? { ...editItem } : note
          )
        );
        break;
    }

    setEditItem(null);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedClass === "all" || task.classId.toString() === selectedClass)
  );

  const filteredClasses = classes.filter((cls) =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-6">School Planner</h1>
        <nav>
          <ul className="space-y-2">
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <ListTodoIcon className="mr-2 h-4 w-4" />
                Tasks
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <BookOpenIcon className="mr-2 h-4 w-4" />
                Classes
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start">
                <NotebookIcon className="mr-2 h-4 w-4" />
                Notes
              </Button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-6 flex flex-wrap gap-4">
          <Input
            type="search"
            placeholder="Search tasks, classes, or notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {classes.map((cls) => (
                <SelectItem key={cls.id} value={cls.id.toString()}>
                  {cls.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="tasks">
          <TabsList className="mb-4">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          {/* Tasks Tab */}
          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>
                  Manage your school tasks here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <div>
                        <span className={task.completed ? "line-through" : ""}>
                          {task.title}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">
                          Due: {task.dueDate}
                        </span>
                        <span className="text-sm text-blue-500 ml-2">
                          {classes.find((cls) => cls.id === task.classId)?.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleTaskCompletion(task.id)}
                        >
                          {task.completed ? "Undo" : "Complete"}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => startEdit(task, "task")}
                        >
                          <EditIcon className="h-4 w-4" />
                          <span className="sr-only">Edit task</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => deleteItem(task.id, "task")}
                        >
                          <TrashIcon className="h-4 w-4" />
                          <span className="sr-only">Delete task</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  <Input
                    placeholder="New task title"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                  />
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) =>
                      setNewTask({ ...newTask, dueDate: e.target.value })
                    }
                  />
                  <Select
                    value={newTask.classId}
                    onValueChange={(value) =>
                      setNewTask({ ...newTask, classId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id.toString()}>
                          {cls.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={addTask}>Add Task</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Classes Tab */}
          <TabsContent value="classes">
            <Card>
              <CardHeader>
                <CardTitle>Classes</CardTitle>
                <CardDescription>
                  Manage your class schedule here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredClasses.map((cls) => (
                    <div
                      key={cls.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <div>
                        <div className="font-medium">{cls.name}</div>
                        <div className="text-sm text-gray-500">
                          {cls.schedule}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => startEdit(cls, "class")}
                        >
                          <EditIcon className="h-4 w-4" />
                          <span className="sr-only">Edit class</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => deleteItem(cls.id, "class")}
                        >
                          <TrashIcon className="h-4 w-4" />
                          <span className="sr-only">Delete class</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  <Input
                    placeholder="Class name"
                    value={newClass.name}
                    onChange={(e) =>
                      setNewClass({ ...newClass, name: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Class schedule"
                    value={newClass.schedule}
                    onChange={(e) =>
                      setNewClass({ ...newClass, schedule: e.target.value })
                    }
                  />
                  <Button onClick={addClass}>Add Class</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
                <CardDescription>Manage your study notes here.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredNotes.map((note) => (
                    <div
                      key={note.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <div>
                        <div className="font-medium">{note.title}</div>
                        <div className="text-sm">{note.content}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => startEdit(note, "note")}
                        >
                          <EditIcon className="h-4 w-4" />
                          <span className="sr-only">Edit note</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => deleteItem(note.id, "note")}
                        >
                          <TrashIcon className="h-4 w-4" />
                          <span className="sr-only">Delete note</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  <Input
                    placeholder="Note title"
                    value={newNote.title}
                    onChange={(e) =>
                      setNewNote({ ...newNote, title: e.target.value })
                    }
                  />
                  <Textarea
                    placeholder="Note content"
                    value={newNote.content}
                    onChange={(e) =>
                      setNewNote({ ...newNote, content: e.target.value })
                    }
                  />
                  <Button onClick={addNote}>Add Note</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>
                  View your tasks and classes on a calendar.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
                <div className="mt-4">
                  <h3 className="font-semibold">
                    Tasks for {selectedDate.toDateString()}:
                  </h3>
                  <ul className="list-disc list-inside">
                    {tasks
                      .filter(
                        (task) =>
                          new Date(task.dueDate).toDateString() ===
                          selectedDate.toDateString()
                      )
                      .map((task) => (
                        <li
                          key={task.id}
                          className={task.completed ? "line-through" : ""}
                        >
                          {task.title} -{" "}
                          {classes.find((cls) => cls.id === task.classId)?.name}
                        </li>
                      ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Edit Dialog */}
      {editItem && (
        <Dialog open={!!editItem} onOpenChange={() => setEditItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit {editItem.type}</DialogTitle>
            </DialogHeader>
            {editItem.type === "task" && (
              <>
                <Input
                  value={editItem.title}
                  onChange={(e) =>
                    setEditItem({ ...editItem, title: e.target.value })
                  }
                  placeholder="Task title"
                />
                <Input
                  type="date"
                  value={editItem.dueDate}
                  onChange={(e) =>
                    setEditItem({ ...editItem, dueDate: e.target.value })
                  }
                />
                <Select
                  value={editItem.classId.toString()}
                  onValueChange={(value) =>
                    setEditItem({ ...editItem, classId: parseInt(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id.toString()}>
                        {cls.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
            {editItem.type === "class" && (
              <>
                <Input
                  value={editItem.name}
                  onChange={(e) =>
                    setEditItem({ ...editItem, name: e.target.value })
                  }
                  placeholder="Class name"
                />
                <Input
                  value={editItem.schedule}
                  onChange={(e) =>
                    setEditItem({ ...editItem, schedule: e.target.value })
                  }
                  placeholder="Class schedule"
                />
              </>
            )}
            {editItem.type === "note" && (
              <>
                <Input
                  value={editItem.title}
                  onChange={(e) =>
                    setEditItem({ ...editItem, title: e.target.value })
                  }
                  placeholder="Note title"
                />
                <Textarea
                  value={editItem.content}
                  onChange={(e) =>
                    setEditItem({ ...editItem, content: e.target.value })
                  }
                  placeholder="Note content"
                />
              </>
            )}
            <DialogFooter>
              <Button onClick={saveEdit}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
