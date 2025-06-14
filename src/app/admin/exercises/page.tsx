"use client";

import { useState, useMemo } from "react";
import {
  Dumbbell,
  Plus,
  Search,
  Edit,
  Trash2,
  MoreHorizontal,
  ExternalLink,
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
import { Textarea } from "@/components/ui/textarea";
import {
  Exercise,
  CreateExerciseRequest,
  UpdateExerciseRequest,
  MuscleGroup,
  MuscleEnum,
} from "@/types/api";
import { useForm } from "react-hook-form";
import {
  useExercisesQuery,
  useCreateExerciseMutation,
  useUpdateExerciseMutation,
  useDeleteExerciseMutation,
} from "@/hooks/useExercisesQuery";

const muscleGroups: MuscleGroup[] = [
  MuscleEnum.QUADS,
  MuscleEnum.HAMSTRING,
  MuscleEnum.CALVES,
  MuscleEnum.GLUTES,
  MuscleEnum.BACK,
  MuscleEnum.CHEST,
  MuscleEnum.SHOULDERS,
  MuscleEnum.TRICEPS,
  MuscleEnum.BICEPS,
  MuscleEnum.TRAPS,
];

const muscleGroupColors: Record<MuscleGroup, string> = {
  [MuscleEnum.QUADS]: "bg-blue-100 text-blue-800",
  [MuscleEnum.HAMSTRING]: "bg-purple-100 text-purple-800",
  [MuscleEnum.CALVES]: "bg-orange-100 text-orange-800",
  [MuscleEnum.GLUTES]: "bg-pink-100 text-pink-800",
  [MuscleEnum.BACK]: "bg-green-100 text-green-800",
  [MuscleEnum.CHEST]: "bg-red-100 text-red-800",
  [MuscleEnum.SHOULDERS]: "bg-yellow-100 text-yellow-800",
  [MuscleEnum.TRICEPS]: "bg-indigo-100 text-indigo-800",
  [MuscleEnum.BICEPS]: "bg-cyan-100 text-cyan-800",
  [MuscleEnum.TRAPS]: "bg-gray-100 text-gray-800",
};

export default function ExercisesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | "all">(
    "all"
  );
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data: exercises = [], isLoading: loading } = useExercisesQuery();
  const createExerciseMutation = useCreateExerciseMutation();
  const updateExerciseMutation = useUpdateExerciseMutation();
  const deleteExerciseMutation = useDeleteExerciseMutation();

  const createForm = useForm<CreateExerciseRequest>();
  const editForm = useForm<UpdateExerciseRequest>();

  const filteredExercises = useMemo(() => {
    let filtered = exercises || [];

    if (searchTerm) {
      filtered = filtered.filter(
        (exercise) =>
          (exercise.name?.toLowerCase() || "").includes(
            searchTerm.toLowerCase()
          ) ||
          (exercise.description?.toLowerCase() || "").includes(
            searchTerm.toLowerCase()
          )
      );
    }

    if (selectedMuscle !== "all") {
      filtered = filtered.filter(
        (exercise) =>
          exercise.muscle === selectedMuscle ||
          exercise.targetMuscle1 === selectedMuscle ||
          exercise.targetMuscle2 === selectedMuscle ||
          exercise.targetMuscle3 === selectedMuscle
      );
    }

    return filtered;
  }, [exercises, searchTerm, selectedMuscle]);
  
  const handleCreateExercise = (data: CreateExerciseRequest) => {
    createExerciseMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateDialogOpen(false);
        createForm.reset();
      },
    });
  };

  const handleUpdateExercise = (data: UpdateExerciseRequest) => {
    updateExerciseMutation.mutate(data, {
      onSuccess: () => {
        setIsEditDialogOpen(false);
        editForm.reset();
      },
    });
  };

  const handleDeleteExercise = (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa bài tập này?")) return;
    deleteExerciseMutation.mutate(id);
  };

  const handleEditExercise = (exercise: Exercise) => {
    editForm.reset({
      id: exercise.id,
      name: exercise.name,
      description: exercise.description,
      muscle: exercise.muscle,
      targetMuscle1: exercise.targetMuscle1,
      targetMuscle2: exercise.targetMuscle2,
      targetMuscle3: exercise.targetMuscle3,
      imageUrl: exercise.imageUrl,
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold">Quản lý bài tập</h1>
            <p className="text-gray-600">
              Quản lý thư viện bài tập và phân nhóm cơ
            </p>
          </div>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Thêm bài tập
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tạo bài tập mới</DialogTitle>
              <DialogDescription>
                Thêm bài tập mới vào thư viện
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={createForm.handleSubmit(handleCreateExercise)}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Tên bài tập</Label>
                  <Input
                    id="name"
                    {...createForm.register("name", { required: true })}
                    placeholder="Nhập tên bài tập"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    {...createForm.register("description", { required: true })}
                    placeholder="Nhập mô tả bài tập"
                  />
                </div>
                <div>
                  <Label htmlFor="muscle">Nhóm cơ chính (tương thích cũ)</Label>
                  <Select
                    onValueChange={(value) =>
                      createForm.setValue("targetMuscle1", value as string)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn nhóm cơ chính" />
                    </SelectTrigger>
                    <SelectContent>
                      {muscleGroups.map((muscle) => (
                        <SelectItem key={muscle} value={muscle}>
                          {muscle}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="targetMuscle1">
                    Nhóm cơ mục tiêu 1 <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      createForm.setValue("targetMuscle1", value as MuscleGroup)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn nhóm cơ mục tiêu 1" />
                    </SelectTrigger>
                    <SelectContent>
                      {muscleGroups.map((muscle) => (
                        <SelectItem key={muscle} value={muscle}>
                          {muscle}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="targetMuscle2">
                    Nhóm cơ mục tiêu 2 (tuỳ chọn)
                  </Label>
                  <Select
                    value={createForm.watch("targetMuscle2") || "none"}
                    onValueChange={(value) =>
                      createForm.setValue(
                        "targetMuscle2",
                        value === "none" ? undefined : (value as MuscleGroup)
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn nhóm cơ mục tiêu 2" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Không chọn</SelectItem>
                      {muscleGroups.map((muscle) => (
                        <SelectItem key={muscle} value={muscle}>
                          {muscle}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="targetMuscle3">
                    Nhóm cơ mục tiêu 3 (tuỳ chọn)
                  </Label>
                  <Select
                    value={createForm.watch("targetMuscle3") || "none"}
                    onValueChange={(value) =>
                      createForm.setValue(
                        "targetMuscle3",
                        value === "none" ? undefined : (value as MuscleGroup)
                      )
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn nhóm cơ mục tiêu 3" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Không chọn</SelectItem>
                      {muscleGroups.map((muscle) => (
                        <SelectItem key={muscle} value={muscle}>
                          {muscle}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="imageUrl">URL hình ảnh (tuỳ chọn)</Label>
                  <Input
                    id="imageUrl"
                    {...createForm.register("imageUrl")}
                    placeholder="https://example.com/image.jpg"
                  />
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
                <Button type="submit">Tạo bài tập</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm bài tập..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Select
                value={selectedMuscle}
                onValueChange={(value) =>
                  setSelectedMuscle(value as MuscleGroup | "all")
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả nhóm cơ</SelectItem>
                  {muscleGroups.map((muscle) => (
                    <SelectItem key={muscle} value={muscle}>
                      {muscle}
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
            <div className="text-2xl font-bold">{exercises?.length || 0}</div>
            <p className="text-sm text-gray-600">Tổng bài tập</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {(() => {
                const allMuscles = new Set<string>();
                exercises?.forEach((exercise) => {
                  allMuscles.add(exercise.targetMuscle1);
                  if (exercise.targetMuscle2)
                    allMuscles.add(exercise.targetMuscle2);
                  if (exercise.targetMuscle3)
                    allMuscles.add(exercise.targetMuscle3);
                });
                return allMuscles.size;
              })()}
            </div>
            <p className="text-sm text-gray-600">Nhóm cơ mục tiêu</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {filteredExercises?.length || 0}
            </div>
            <p className="text-sm text-gray-600">Hiển thị</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {exercises.filter((e) => e.imageUrl).length}
            </div>
            <p className="text-sm text-gray-600">Có hình ảnh</p>
          </CardContent>
        </Card>
      </div>

      {/* Exercises Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách bài tập</CardTitle>
          <CardDescription>
            Quản lý tất cả bài tập trong hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Đang tải...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên bài tập</TableHead>
                  <TableHead>Nhóm cơ mục tiêu</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>URL hình ảnh</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(filteredExercises || []).map((exercise) => (
                  <TableRow key={exercise.id}>
                    <TableCell className="font-medium">
                      {exercise.name}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        <Badge
                          className={muscleGroupColors[exercise.targetMuscle1 as MuscleEnum]}
                          variant="secondary"
                        >
                          {exercise.targetMuscle1}
                        </Badge>
                        {exercise.targetMuscle2 && (
                          <Badge
                            className={
                              muscleGroupColors[exercise.targetMuscle2 as MuscleEnum]
                            }
                            variant="secondary"
                          >
                            {exercise.targetMuscle2}
                          </Badge>
                        )}
                        {exercise.targetMuscle3 && (
                          <Badge
                            className={
                              muscleGroupColors[exercise.targetMuscle3 as MuscleEnum]
                            }
                            variant="secondary"
                          >
                            {exercise.targetMuscle3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {exercise.description}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      {exercise.imageUrl ? (
                        <a
                          href={exercise.imageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{exercise.imageUrl}</span>
                        </a>
                      ) : (
                        <span className="text-gray-400 italic">Không có</span>
                      )}
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
                          <DropdownMenuItem
                            onClick={() => handleEditExercise(exercise)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteExercise(exercise.id)}
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
            <DialogTitle>Chỉnh sửa bài tập</DialogTitle>
            <DialogDescription>Cập nhật thông tin bài tập</DialogDescription>
          </DialogHeader>
          <form onSubmit={editForm.handleSubmit(handleUpdateExercise)}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Tên bài tập</Label>
                <Input
                  id="edit-name"
                  {...editForm.register("name", { required: true })}
                  placeholder="Nhập tên bài tập"
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Mô tả</Label>
                <Textarea
                  id="edit-description"
                  {...editForm.register("description", { required: true })}
                  placeholder="Nhập mô tả bài tập"
                />
              </div>
              <div>
                <Label htmlFor="edit-muscle">
                  Nhóm cơ chính (tương thích cũ)
                </Label>
                <Select
                  value={editForm.watch("muscle")}
                  onValueChange={(value) =>
                    editForm.setValue("muscle", value as MuscleGroup)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn nhóm cơ chính" />
                  </SelectTrigger>
                  <SelectContent>
                    {muscleGroups.map((muscle) => (
                      <SelectItem key={muscle} value={muscle}>
                        {muscle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-targetMuscle1">
                  Nhóm cơ mục tiêu 1 <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={editForm.watch("targetMuscle1") ?? undefined}
                  onValueChange={(value) =>
                    editForm.setValue("targetMuscle1", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn nhóm cơ mục tiêu 1" />
                  </SelectTrigger>
                  <SelectContent>
                    {muscleGroups.map((muscle) => (
                      <SelectItem key={muscle} value={muscle}>
                        {muscle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-targetMuscle2">
                  Nhóm cơ mục tiêu 2 (tuỳ chọn)
                </Label>
                <Select
                  value={editForm.watch("targetMuscle2") || "none"}
                  onValueChange={(value) =>
                    editForm.setValue(
                      "targetMuscle2",
                      value === "none" ? undefined : (value as MuscleGroup)
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn nhóm cơ mục tiêu 2" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Không chọn</SelectItem>
                    {muscleGroups.map((muscle) => (
                      <SelectItem key={muscle} value={muscle}>
                        {muscle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-targetMuscle3">
                  Nhóm cơ mục tiêu 3 (tuỳ chọn)
                </Label>
                <Select
                  value={editForm.watch("targetMuscle3") || "none"}
                  onValueChange={(value) =>
                    editForm.setValue(
                      "targetMuscle3",
                      value === "none" ? undefined : (value as string)
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn nhóm cơ mục tiêu 3" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Không chọn</SelectItem>
                    {muscleGroups.map((muscle) => (
                      <SelectItem key={muscle} value={muscle}>
                        {muscle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-imageUrl">URL hình ảnh (tuỳ chọn)</Label>
                <Input
                  id="edit-imageUrl"
                  {...editForm.register("imageUrl")}
                  placeholder="https://example.com/image.jpg"
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
