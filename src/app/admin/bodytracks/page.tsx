"use client";

import { useState, useMemo } from "react";
import {
  Activity,
  Plus,
  Edit,
  Trash2,
  Scale,
  MoreHorizontal,
  User as UserIcon,
  Calendar,
  Ruler,
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
import {
  BodyTrack,
  CreateBodyTrackRequest,
  UpdateBodyTrackRequest,
} from "@/types/api";
import { useForm } from "react-hook-form";
import {
  useBodyTracksQuery,
  useCreateBodyTrackMutation,
  useUpdateBodyTrackMutation,
  useDeleteBodyTrackMutation,
} from "@/hooks/useBodyTracksQuery";
import { useUsersQuery } from "@/hooks/useUsersQuery";

export default function BodyTracksPage() {
  const [selectedUserId, setSelectedUserId] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data: bodyTracks = [], isLoading: loading } = useBodyTracksQuery();
  const { data: users = [] } = useUsersQuery();
  const createBodyTrackMutation = useCreateBodyTrackMutation();
  const updateBodyTrackMutation = useUpdateBodyTrackMutation();
  const deleteBodyTrackMutation = useDeleteBodyTrackMutation();

  const createForm = useForm<CreateBodyTrackRequest>();
  const editForm = useForm<UpdateBodyTrackRequest>();

  const filteredBodyTracks = useMemo(() => {
    let filtered = bodyTracks || [];

    if (selectedUserId !== "all") {
      filtered = filtered.filter(
        (track) => track.userId === parseInt(selectedUserId)
      );
    }

    return filtered;
  }, [bodyTracks, selectedUserId]);

  const getUserName = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    return user?.username || `User ${userId}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5)
      return { text: "Thiếu cân", color: "bg-blue-100 text-blue-800" };
    if (bmi < 25)
      return { text: "Bình thường", color: "bg-green-100 text-green-800" };
    if (bmi < 30)
      return { text: "Thừa cân", color: "bg-yellow-100 text-yellow-800" };
    return { text: "Béo phì", color: "bg-red-100 text-red-800" };
  };

  const handleCreateBodyTrack = async (data: CreateBodyTrackRequest) => {
    createBodyTrackMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateDialogOpen(false);
        createForm.reset();
      },
    });
  };

  const handleUpdateBodyTrack = async (data: UpdateBodyTrackRequest) => {
    updateBodyTrackMutation.mutate(data, {
      onSuccess: () => {
        setIsEditDialogOpen(false);
        editForm.reset();
      },
    });
  };

  const handleDeleteBodyTrack = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa bản ghi thể trạng này?")) return;

    deleteBodyTrackMutation.mutate(id);
  };

  const handleEditBodyTrack = (bodyTrack: BodyTrack) => {
    editForm.reset({
      id: bodyTrack.id,
      weight: bodyTrack.weight,
      height: bodyTrack.height,
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className="h-8 w-8 text-pink-600" />
          <div>
            <h1 className="text-3xl font-bold">Quản lý thể trạng</h1>
            <p className="text-gray-600">
              Theo dõi cân nặng và chiều cao của người dùng
            </p>
          </div>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Thêm bản ghi
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tạo bản ghi thể trạng mới</DialogTitle>
              <DialogDescription>
                Thêm thông tin cân nặng và chiều cao
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={createForm.handleSubmit(handleCreateBodyTrack)}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="weight">Cân nặng (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    min="1"
                    step="0.1"
                    {...createForm.register("weight", {
                      required: true,
                      valueAsNumber: true,
                    })}
                    placeholder="Nhập cân nặng"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Chiều cao (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    min="50"
                    {...createForm.register("height", {
                      required: true,
                      valueAsNumber: true,
                    })}
                    placeholder="Nhập chiều cao"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Ngày đo</Label>
                  <Input
                    id="date"
                    type="date"
                    {...createForm.register("date", { required: true })}
                  />
                </div>
                <div>
                  <Label htmlFor="userId">Người dùng</Label>
                  <Select
                    onValueChange={(value) =>
                      createForm.setValue("userId", parseInt(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn người dùng" />
                    </SelectTrigger>
                    <SelectContent>
                      {(users || []).map((user) => (
                        <SelectItem key={user.id} value={user.id.toString()}>
                          {user.username} ({user.membershipTier})
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
                <Button type="submit">Tạo bản ghi</Button>
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
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả người dùng</SelectItem>
                  {(users || []).map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.username}
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
            <div className="text-2xl font-bold">{bodyTracks?.length || 0}</div>
            <p className="text-sm text-gray-600">Tổng bản ghi</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {(bodyTracks?.length || 0) > 0
                ? (
                    (bodyTracks || []).reduce(
                      (sum, track) => sum + track.weight,
                      0
                    ) / (bodyTracks?.length || 1)
                  ).toFixed(1)
                : "0"}
              kg
            </div>
            <p className="text-sm text-gray-600">TB cân nặng</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {(bodyTracks?.length || 0) > 0
                ? (
                    (bodyTracks || []).reduce(
                      (sum, track) => sum + track.height,
                      0
                    ) / (bodyTracks?.length || 1)
                  ).toFixed(0)
                : "0"}
              cm
            </div>
            <p className="text-sm text-gray-600">TB chiều cao</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {new Set((bodyTracks || []).map((track) => track.userId)).size}
            </div>
            <p className="text-sm text-gray-600">Người dùng theo dõi</p>
          </CardContent>
        </Card>
      </div>

      {/* Body Tracks Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách bản ghi thể trạng</CardTitle>
          <CardDescription>
            Quản lý tất cả bản ghi thể trạng trong hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Đang tải...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Người dùng</TableHead>
                  <TableHead>Cân nặng</TableHead>
                  <TableHead>Chiều cao</TableHead>
                  <TableHead>BMI</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày đo</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBodyTracks.map((track) => {
                  const bmi = parseFloat(
                    calculateBMI(track.weight, track.height)
                  );
                  const bmiStatus = getBMIStatus(bmi);
                  return (
                    <TableRow key={track.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <UserIcon className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">
                            {getUserName(track.userId)}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {
                              users.find((u) => u.id === track.userId)
                                ?.membershipTier
                            }
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Scale className="h-4 w-4 text-blue-500" />
                          <span className="font-semibold text-blue-600">
                            {track.weight}kg
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Ruler className="h-4 w-4 text-green-500" />
                          <span className="font-semibold text-green-600">
                            {track.height}cm
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-purple-600">
                          {calculateBMI(track.weight, track.height)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={bmiStatus.color}>
                          {bmiStatus.text}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{formatDate(track.date)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">#{track.id}</Badge>
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
                              onClick={() => handleEditBodyTrack(track)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteBodyTrack(track.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa bản ghi thể trạng</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin cân nặng và chiều cao
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={editForm.handleSubmit(handleUpdateBodyTrack)}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-weight">Cân nặng (kg)</Label>
                <Input
                  id="edit-weight"
                  type="number"
                  min="1"
                  step="0.1"
                  {...editForm.register("weight", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  placeholder="Nhập cân nặng"
                />
              </div>
              <div>
                <Label htmlFor="edit-height">Chiều cao (cm)</Label>
                <Input
                  id="edit-height"
                  type="number"
                  min="50"
                  {...editForm.register("height", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  placeholder="Nhập chiều cao"
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
