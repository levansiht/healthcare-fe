"use client";

import { useState, useMemo } from "react";
import {
  Zap,
  Plus,
  Edit,
  Trash2,
  Weight,
  MoreHorizontal,
  Target,
  Calendar,
  Dumbbell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Set, CreateSetRequest, UpdateSetRequest } from "@/types/api";
import { useForm } from "react-hook-form";
import {
  useSetsQuery,
  useCreateSetMutation,
  useUpdateSetMutation,
  useDeleteSetMutation,
} from "@/hooks/useSetsQuery";
import { useSessionsQuery } from "@/hooks/useSessionsQuery";
import { useExercisesQuery } from "@/hooks/useExercisesQuery";

export default function SetsPage() {
  const [selectedSessionId, setSelectedSessionId] = useState<string>("all");
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // React Query hooks
  const { data: sets = [], isLoading: loading } = useSetsQuery();
  const { data: sessions = [] } = useSessionsQuery();
  const { data: exercises = [] } = useExercisesQuery();
  const createSetMutation = useCreateSetMutation();
  const updateSetMutation = useUpdateSetMutation();
  const deleteSetMutation = useDeleteSetMutation();

  const createForm = useForm<CreateSetRequest>();
  const editForm = useForm<UpdateSetRequest>();

  const filteredSets = useMemo(() => {
    let filtered = sets || [];

    if (selectedSessionId !== "all") {
      filtered = filtered.filter(
        (set) => set.sessionId === parseInt(selectedSessionId)
      );
    }

    if (selectedExerciseId !== "all") {
      filtered = filtered.filter(
        (set) => set.exerciseId === parseInt(selectedExerciseId)
      );
    }

    return filtered;
  }, [sets, selectedSessionId, selectedExerciseId]);

  const getSessionName = (sessionId: number) => {
    const session = sessions.find((s) => s.id === sessionId);
    return session?.name || `Session ${sessionId}`;
  };

  const getExerciseName = (exerciseId: number) => {
    const exercise = exercises.find((e) => e.id === exerciseId);
    return exercise?.name || `Exercise ${exerciseId}`;
  };

  const getExerciseMuscle = (exerciseId: number) => {
    const exercise = exercises.find((e) => e.id === exerciseId);
    return exercise?.muscle || "";
  };

  const handleCreateSet = (data: CreateSetRequest) => {
    createSetMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateDialogOpen(false);
        createForm.reset();
      },
    });
  };

  const handleUpdateSet = (data: UpdateSetRequest) => {
    updateSetMutation.mutate(data, {
      onSuccess: () => {
        setIsEditDialogOpen(false);
        editForm.reset();
      },
    });
  };

  const handleDeleteSet = (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa set này?")) return;
    deleteSetMutation.mutate(id);
  };

  const handleEditSet = (set: Set) => {
    editForm.reset({
      id: set.id,
      reps: set.reps,
      weight: set.weight,
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Zap className="h-8 w-8 text-orange-600" />
          <div>
            <h1 className="text-3xl font-bold">Quản lý Set</h1>
            <p className="text-gray-600">
              Quản lý chi tiết các set trong phiên tập
            </p>
          </div>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Thêm set
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tạo set mới</DialogTitle>
              <DialogDescription>Thêm set vào phiên tập</DialogDescription>
            </DialogHeader>
            <form onSubmit={createForm.handleSubmit(handleCreateSet)}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="reps">Số lần lặp</Label>
                  <Input
                    id="reps"
                    type="number"
                    min="1"
                    {...createForm.register("reps", {
                      required: true,
                      valueAsNumber: true,
                    })}
                    placeholder="Nhập số lần lặp"
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Trọng lượng (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    min="0"
                    step="0.1"
                    {...createForm.register("weight", {
                      required: true,
                      valueAsNumber: true,
                    })}
                    placeholder="Nhập trọng lượng"
                  />
                </div>
                <div>
                  <Label htmlFor="exerciseId">Bài tập</Label>
                  <Select
                    onValueChange={(value) =>
                      createForm.setValue("exerciseId", parseInt(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn bài tập" />
                    </SelectTrigger>
                    <SelectContent>
                      {(exercises || []).map((exercise) => (
                        <SelectItem
                          key={exercise.id}
                          value={exercise.id.toString()}
                        >
                          {exercise.name} ({exercise.muscle})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sessionId">Phiên tập</Label>
                  <Select
                    onValueChange={(value) =>
                      createForm.setValue("sessionId", parseInt(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn phiên tập" />
                    </SelectTrigger>
                    <SelectContent>
                      {(sessions || []).map((session) => (
                        <SelectItem
                          key={session.id}
                          value={session.id.toString()}
                        >
                          {session.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button type="submit">Tạo set</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-48">
              <Select
                value={selectedSessionId}
                onValueChange={setSelectedSessionId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn phiên tập" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả phiên tập</SelectItem>
                  {(sessions || []).map((session) => (
                    <SelectItem key={session.id} value={session.id.toString()}>
                      {session.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-48">
              <Select
                value={selectedExerciseId}
                onValueChange={setSelectedExerciseId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn bài tập" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả bài tập</SelectItem>
                  {(exercises || []).map((exercise) => (
                    <SelectItem
                      key={exercise.id}
                      value={exercise.id.toString()}
                    >
                      {exercise.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{sets?.length || 0}</div>
            <p className="text-sm text-gray-600">Tổng set</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {(sets?.length || 0) > 0
                ? (
                    (sets || []).reduce((sum, set) => sum + set.reps, 0) /
                    (sets?.length || 1)
                  ).toFixed(1)
                : "0"}
            </div>
            <p className="text-sm text-gray-600">TB số lần lặp</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {(sets?.length || 0) > 0
                ? (
                    (sets || []).reduce((sum, set) => sum + set.weight, 0) /
                    (sets?.length || 1)
                  ).toFixed(1)
                : "0"}
              kg
            </div>
            <p className="text-sm text-gray-600">TB trọng lượng</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {filteredSets?.length || 0}
            </div>
            <p className="text-sm text-gray-600">Hiển thị</p>
          </CardContent>
        </Card>
      </div>

      {/* Sets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách Set</CardTitle>
          <CardDescription>Quản lý tất cả set trong hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Đang tải...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bài tập</TableHead>
                  <TableHead>Phiên tập</TableHead>
                  <TableHead>Số lần lặp</TableHead>
                  <TableHead>Trọng lượng</TableHead>
                  <TableHead>Nhóm cơ</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(filteredSets || []).map((set) => (
                  <TableRow key={set.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dumbbell className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">
                          {getExerciseName(set.exerciseId)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{getSessionName(set.sessionId)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-blue-500" />
                        <span className="font-semibold text-blue-600">
                          {set.reps}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Weight className="h-4 w-4 text-green-500" />
                        <span className="font-semibold text-green-600">
                          {set.weight}kg
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getExerciseMuscle(set.exerciseId)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">#{set.id}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEditSet(set)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteSet(set.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa set</DialogTitle>
            <DialogDescription>Cập nhật thông tin set</DialogDescription>
          </DialogHeader>
          <form onSubmit={editForm.handleSubmit(handleUpdateSet)}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-reps">Số lần lặp</Label>
                <Input
                  id="edit-reps"
                  type="number"
                  min="1"
                  {...editForm.register("reps", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  placeholder="Nhập số lần lặp"
                />
              </div>
              <div>
                <Label htmlFor="edit-weight">Trọng lượng (kg)</Label>
                <Input
                  id="edit-weight"
                  type="number"
                  min="0"
                  step="0.1"
                  {...editForm.register("weight", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  placeholder="Nhập trọng lượng"
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button type="submit">Cập nhật</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
