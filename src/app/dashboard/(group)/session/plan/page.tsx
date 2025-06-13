"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash, Target } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  usePlansQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} from "@/hooks/usePlansQuery";
import { CreatePlanRequest, UpdatePlanRequest, Plan } from "@/types/api";
import { useForm } from "react-hook-form";

// User ID cố định
const FIXED_USER_ID = 1;

interface PlanFormData {
  name: string;
  description: string;
}

// ==================== Add Plan Dialog Component ====================
function AddPlanDialog({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const createPlanMutation = useCreatePlanMutation();
  const form = useForm<PlanFormData>();

  const handleSubmit = async (data: PlanFormData) => {
    try {
      const submitData: CreatePlanRequest = {
        ...data,
        userId: FIXED_USER_ID,
      };

      await createPlanMutation.mutateAsync(submitData);
      form.reset();
      setOpen(false);
      onSuccess();
    } catch (error) {
      console.error("Lỗi tạo kế hoạch:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Thêm kế hoạch
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm kế hoạch tập luyện</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Tên kế hoạch
            </Label>
            <Input
              id="name"
              {...form.register("name", {
                required: "Tên kế hoạch là bắt buộc",
              })}
              placeholder="Ví dụ: Kế hoạch giảm cân, Tăng cơ bắp..."
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Mô tả
            </Label>
            <Textarea
              id="description"
              {...form.register("description", {
                required: "Mô tả là bắt buộc",
              })}
              placeholder="Mô tả chi tiết về kế hoạch tập luyện..."
              className="w-full"
              rows={3}
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={createPlanMutation.isPending}
            >
              {createPlanMutation.isPending ? "Đang tạo..." : "Tạo kế hoạch"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ==================== Edit Plan Dialog Component ====================
function EditPlanDialog({
  open,
  setOpen,
  editingPlan,
  onSuccess,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  editingPlan: Plan | null;
  onSuccess: () => void;
}) {
  const updatePlanMutation = useUpdatePlanMutation();
  const form = useForm<PlanFormData>();

  React.useEffect(() => {
    if (editingPlan) {
      form.reset({
        name: editingPlan.name || "",
        description: editingPlan.description || "",
      });
    }
  }, [editingPlan, form]);

  const handleSubmit = async (data: PlanFormData) => {
    if (!editingPlan) return;

    try {
      const submitData: UpdatePlanRequest = {
        id: editingPlan.id,
        ...data,
      };

      await updatePlanMutation.mutateAsync(submitData);
      setOpen(false);
      onSuccess();
    } catch (error) {
      console.error("Lỗi cập nhật kế hoạch:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa kế hoạch</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name" className="text-sm font-medium">
              Tên kế hoạch
            </Label>
            <Input
              id="edit-name"
              {...form.register("name", {
                required: "Tên kế hoạch là bắt buộc",
              })}
              placeholder="Ví dụ: Kế hoạch giảm cân, Tăng cơ bắp..."
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-description" className="text-sm font-medium">
              Mô tả
            </Label>
            <Textarea
              id="edit-description"
              {...form.register("description", {
                required: "Mô tả là bắt buộc",
              })}
              placeholder="Mô tả chi tiết về kế hoạch tập luyện..."
              className="w-full"
              rows={3}
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={updatePlanMutation.isPending}
            >
              {updatePlanMutation.isPending ? "Đang cập nhật..." : "Cập nhật"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ==================== Delete Plan Popover Component ====================
function DeletePlanPopover({
  plan,
  onDelete,
}: {
  plan: Plan;
  onDelete: (id: number) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    onDelete(plan.id);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="text-red-600 hover:text-red-700"
        >
          <Trash className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Xác nhận xóa</h4>
            <p className="text-sm text-gray-600">
              Bạn có chắc chắn muốn xóa kế hoạch &quot;{plan.name}&quot;? Hành
              động này không thể hoàn tác.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              className="flex-1"
            >
              Xóa
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ==================== Main Component ====================
export default function UserPlansPage() {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  // Lấy plans với user ID cố định là 1
  const {
    data: plans = [],
    isLoading,
    isError,
    refetch,
  } = usePlansQuery(FIXED_USER_ID);
  const deletePlanMutation = useDeletePlanMutation();

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePlanMutation.mutateAsync(id);
      refetch();
    } catch (error) {
      console.error("Lỗi khi xóa kế hoạch:", error);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        Đang tải dữ liệu...
      </div>
    );
  if (isError) return <div className="text-red-500">Lỗi khi tải dữ liệu.</div>;

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Target className="h-8 w-8 text-green-600" />
          <div>
            <h1 className="text-3xl font-bold">Kế hoạch tập luyện</h1>
            <p className="text-gray-600">
              Quản lý các kế hoạch tập luyện cá nhân
            </p>
          </div>
        </div>
        <AddPlanDialog onSuccess={refetch} />
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span className="text-lg font-semibold">{plan.name}</span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(plan)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <DeletePlanPopover plan={plan} onDelete={handleDelete} />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-600">
                <p className="line-clamp-3">{plan.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {plans.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">Chưa có kế hoạch nào</h3>
          <p className="text-sm">
            Tạo kế hoạch tập luyện đầu tiên của bạn để bắt đầu!
          </p>
        </div>
      )}

      {/* Edit Dialog */}
      <EditPlanDialog
        open={editDialogOpen}
        setOpen={setEditDialogOpen}
        editingPlan={editingPlan}
        onSuccess={() => {
          setEditingPlan(null);
          refetch();
        }}
      />
    </div>
  );
}
