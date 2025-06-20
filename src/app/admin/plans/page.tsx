"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  User as UserIcon,
  MoreHorizontal,
  Target,
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
import { Plan, CreatePlanRequest, UpdatePlanRequest } from "@/types/api";
import { useForm } from "react-hook-form";
import {
  usePlansQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} from "@/hooks/usePlansQuery";
import { useUsersQuery } from "@/hooks/useUsersQuery";

export default function PlansPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data: plans = [], isLoading: loading } = usePlansQuery();
  const { data: users = [] } = useUsersQuery();
  const createPlanMutation = useCreatePlanMutation();
  const updatePlanMutation = useUpdatePlanMutation();
  const deletePlanMutation = useDeletePlanMutation();

  const createForm = useForm<CreatePlanRequest>();
  const editForm = useForm<UpdatePlanRequest>();

  const filteredPlans = useMemo(() => {
    let filtered = plans || [];

    if (searchTerm) {
      filtered = filtered.filter(
        (plan) =>
          (plan.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (plan.description?.toLowerCase() || "").includes(
            searchTerm.toLowerCase()
          )
      );
    }

    if (selectedUserId !== "all") {
      filtered = filtered.filter(
        (plan) => plan.userId === parseInt(selectedUserId)
      );
    }

    return filtered;
  }, [plans, searchTerm, selectedUserId]);

  const getUserName = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    return user?.username || `User ${userId}`;
  };

  const handleCreatePlan = (data: CreatePlanRequest) => {
    createPlanMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateDialogOpen(false);
        createForm.reset();
      },
    });
  };

  const handleUpdatePlan = (data: UpdatePlanRequest) => {
    updatePlanMutation.mutate(data, {
      onSuccess: () => {
        setIsEditDialogOpen(false);
        editForm.reset();
      },
    });
  };

  const handleDeletePlan = (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa kế hoạch này?")) return;
    deletePlanMutation.mutate(id);
  };

  const handleEditPlan = (plan: Plan) => {
    editForm.reset({
      id: plan.id,
      name: plan.name,
      description: plan.description,
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Target className="h-8 w-8 text-green-600" />
          <div>
            <h1 className="text-3xl font-bold">Quản lý kế hoạch</h1>
            <p className="text-gray-600">
              Quản lý kế hoạch tập luyện của người dùng
            </p>
          </div>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Thêm kế hoạch
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tạo kế hoạch mới</DialogTitle>
              <DialogDescription>
                Thêm kế hoạch tập luyện cho người dùng
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={createForm.handleSubmit(handleCreatePlan)}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Tên kế hoạch</Label>
                  <Input
                    id="name"
                    {...createForm.register("name", { required: true })}
                    placeholder="Nhập tên kế hoạch"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    {...createForm.register("description", { required: true })}
                    placeholder="Nhập mô tả kế hoạch"
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
                <Button type="submit">Tạo kế hoạch</Button>
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
                  placeholder="Tìm kiếm kế hoạch..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả người dùng</SelectItem>
                  {users.map((user) => (
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
            <div className="text-2xl font-bold">{plans?.length || 0}</div>
            <p className="text-sm text-gray-600">Tổng kế hoạch</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {new Set((plans || []).map((p) => p.userId)).size}
            </div>
            <p className="text-sm text-gray-600">Người dùng có kế hoạch</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {filteredPlans?.length || 0}
            </div>
            <p className="text-sm text-gray-600">Hiển thị</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {(users?.length || 0) > 0
                ? ((plans?.length || 0) / (users?.length || 1)).toFixed(1)
                : "0"}
            </div>
            <p className="text-sm text-gray-600">TB kế hoạch/người</p>
          </CardContent>
        </Card>
      </div>

      {/* Plans Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách kế hoạch</CardTitle>
          <CardDescription>
            Quản lý tất cả kế hoạch tập luyện trong hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Đang tải...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên kế hoạch</TableHead>
                  <TableHead>Người dùng</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(filteredPlans || []).map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4 text-gray-400" />
                        <span>{getUserName(plan.userId)}</span>
                        <Badge variant="outline" className="text-xs">
                          {
                            users.find((u) => u.id === plan.userId)
                              ?.membershipTier
                          }
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {plan.description}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">#{plan.id}</Badge>
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
                            onClick={() => handleEditPlan(plan)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeletePlan(plan.id)}
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
            <DialogTitle>Chỉnh sửa kế hoạch</DialogTitle>
            <DialogDescription>Cập nhật thông tin kế hoạch</DialogDescription>
          </DialogHeader>
          <form onSubmit={editForm.handleSubmit(handleUpdatePlan)}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Tên kế hoạch</Label>
                <Input
                  id="edit-name"
                  {...editForm.register("name", { required: true })}
                  placeholder="Nhập tên kế hoạch"
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Mô tả</Label>
                <Textarea
                  id="edit-description"
                  {...editForm.register("description", { required: true })}
                  placeholder="Nhập mô tả kế hoạch"
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
