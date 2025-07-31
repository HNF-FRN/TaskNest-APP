import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Edit3, Trash2, CheckCircle2, Circle, Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  deadline?: string;
  createdAt: string;
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: Task["status"]) => void;
}

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) => {
  const getStatusIcon = () => {
    switch (task.status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "in-progress":
        return <Clock3 className="h-5 w-5 text-warning" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = () => {
    switch (task.status) {
      case "completed":
        return <Badge variant="outline" className="border-success text-success">Completed</Badge>;
      case "in-progress":
        return <Badge variant="outline" className="border-warning text-warning">In Progress</Badge>;
      default:
        return <Badge variant="outline" className="border-muted-foreground text-muted-foreground">To Do</Badge>;
    }
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case "high":
        return "border-l-destructive";
      case "medium":
        return "border-l-warning";
      default:
        return "border-l-muted";
    }
  };

  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && task.status !== "completed";

  return (
    <Card className={cn(
      "hover:shadow-card transition-all duration-300 border-l-4 group",
      getPriorityColor(),
      task.status === "completed" && "opacity-75"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0 hover:bg-transparent"
              onClick={() => {
                const nextStatus = task.status === "todo" ? "in-progress" : 
                                 task.status === "in-progress" ? "completed" : "todo";
                onStatusChange(task.id, nextStatus);
              }}
            >
              {getStatusIcon()}
            </Button>
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "font-semibold text-sm leading-tight",
                task.status === "completed" && "line-through text-muted-foreground"
              )}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onEdit(task)}
            >
              <Edit3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => onDelete(task.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {task.deadline && (
              <div className={cn(
                "flex items-center gap-1",
                isOverdue && "text-destructive"
              )}>
                <Calendar className="h-3 w-3" />
                <span>{new Date(task.deadline).toLocaleDateString()}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          {getStatusBadge()}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;