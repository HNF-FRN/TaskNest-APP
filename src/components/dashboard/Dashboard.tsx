import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, CheckSquare, Clock, ListTodo, Trophy } from "lucide-react";
import TaskCard, { Task } from "./TaskCard";
import TaskForm from "./TaskForm";
import mascot from '@/assets/logo.png';
import nest from '@/assets/nest.png';
import feather from '@/assets/feather.png';
import welcomeBird from '@/assets/welcome-bird.png';

interface DashboardProps {
  onBackToHome?: () => void;
}

const Dashboard = ({ onBackToHome }: DashboardProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    return matchesSearch && task.status === activeTab;
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    todo: tasks.filter((t) => t.status === "todo").length,
  };

  const handleCreateTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
  };

  const handleEditTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    if (!editingTask) return;

    setTasks(
      tasks.map((task) =>
        task.id === editingTask.id ? { ...task, ...taskData } : task
      )
    );
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleStatusChange = (taskId: string, status: Task["status"]) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      )
    );
  };

  const openEditForm = (task: Task) => {
    setEditingTask(task);
    setIsTaskFormOpen(true);
  };

  const closeTaskForm = () => {
    setIsTaskFormOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <img
                src={welcomeBird}
                alt="Welcome Bird"
                className="h-14 w-auto object-contain inline-block align-middle mr-2"
              />
              <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  Welcome back!
                  <span className="text-3xl inline-block animate-wiggle">👋</span>
                </h1>
                <p className="text-muted-foreground">Ready to build your nest of tasks?</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Feather Meter Progress */}
              <div className="flex flex-col items-center">
                {/* Animated Feather Progress */}
                <div className="flex flex-col items-center mb-2 min-h-[48px]">
                  <img
                    src={feather}
                    alt="Task Progress Feather"
                    className={`h-9 w-6 animate-wiggle`}
                    style={{ filter: taskStats.completed > 0 ? 'drop-shadow(0 0 12px #fbbf24)' : 'none' }}
                  />
                  <span className="text-xs text-muted-foreground mt-1">{taskStats.completed} / {taskStats.total} tasks</span>
                </div>
              </div>
              {onBackToHome && (
                <Button variant="outline" onClick={onBackToHome} className="flex flex-col items-center gap-1 px-3 py-2 group">
                  <img src={nest} alt="Nest Home" className="h-8 w-10 transition-all group-hover:animate-wiggle" />
                  <span className="text-xs font-medium text-muted-foreground">Home</span>
                </Button>
              )}
              <Button onClick={() => setIsTaskFormOpen(true)} variant="hero" className="gap-2">
                <Plus className="h-4 w-4" />
                New Task
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold">{taskStats.total}</p>
                  </div>
                  <ListTodo className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">To Do</p>
                    <p className="text-2xl font-bold">{taskStats.todo}</p>
                  </div>
                  <CheckSquare className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                    <p className="text-2xl font-bold">{taskStats.inProgress}</p>
                  </div>
                  <Clock className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">{taskStats.completed}</p>
                  </div>
                  <Trophy className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Task Tabs */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="todo">To Do</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredTasks.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <CheckSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery ? "Try adjusting your search terms" : "Get started by creating your first task"}
                  </p>
                  {!searchQuery && (
                    <Button onClick={() => setIsTaskFormOpen(true)} variant="hero">
                      Create Your First Task
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={openEditForm}
                    onDelete={handleDeleteTask}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Task Form Modal */}
      <TaskForm
        isOpen={isTaskFormOpen}
        onClose={closeTaskForm}
        onSave={editingTask ? handleEditTask : handleCreateTask}
        editingTask={editingTask}
      />
    </div>
  );
};

export default Dashboard;