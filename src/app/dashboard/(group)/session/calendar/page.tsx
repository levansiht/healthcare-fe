"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateSetMutation,
  useDeleteSetMutation,
  useSetQueryByUserId,
  useUpdateSetMutation,
} from "@/hooks/useSetsQuery";
import { useExercisesQuery } from "@/hooks/useExercisesQuery";
import {
  useSessionsByUserQuery,
  useCreateSessionMutation,
} from "@/hooks/useSessionsQuery";
import { usePlansQuery } from "@/hooks/usePlansQuery";
import { UpdateSetRequest } from "@/services";
import { CreateSessionRequest } from "@/types/api";

interface SetType {
  id: number;
  weight: number;
  reps: number;
  restTime: number;
  exerciseId: number;
  sessionId: number;
  date: string;
  name?: string; // Tên bài tập
  sessionName?: string; // Thêm tên phiên tập
}

// ==================== Add Session Dialog Component ====================
function AddSessionDialog({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0], // Today's date
    planId: "1",
  });

  const createSessionMutation = useCreateSessionMutation();
  const { data: plans, isLoading: plansLoading } = usePlansQuery(1); // Get plans for user ID 1

  const handleSubmit = async () => {
    try {
      const submitData: CreateSessionRequest = {
        date: formData.date,
        planId: parseInt(formData.planId) || 1,
      };

      await createSessionMutation.mutateAsync(submitData);
      setFormData({
        date: new Date().toISOString().split("T")[0],
        planId: "1",
      });
      setOpen(false);
      onSuccess();
    } catch (error) {
      console.error("Lỗi thêm phiên tập:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Thêm phiên tập
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm phiên tập mới</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="session-date" className="text-sm font-medium">
              Ngày tập
            </Label>
            <Input
              id="session-date"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="session-plan" className="text-sm font-medium">
              Kế hoạch tập
            </Label>
            <Select
              value={formData.planId}
              onValueChange={(value) =>
                setFormData({ ...formData, planId: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn kế hoạch tập" />
              </SelectTrigger>
              <SelectContent>
                {plansLoading ? (
                  <SelectItem value="" disabled>
                    Đang tải...
                  </SelectItem>
                ) : (
                  plans?.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id.toString()}>
                      {plan.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Hủy
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1"
              disabled={createSessionMutation.isPending}
            >
              {createSessionMutation.isPending
                ? "Đang thêm..."
                : "Thêm phiên tập"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export const GetUserId = () => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setUserId(user.id);
      } catch (error) {
        console.error("Lỗi khi parse localStorage user:", error);
      }
    }
  }, []);

  return userId;
}

// ==================== Add Set Dialog Component ====================
function AddSetDialog({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    weight: "0",
    reps: "10",
    restTime: "90",
    exerciseId: "4",
    sessionId: "2",
  });

  const createSetMutation = useCreateSetMutation();
  const { data: exercises, isLoading: exercisesLoading } = useExercisesQuery();  
  const userId = GetUserId();
  const { data: sessions, isLoading: sessionsLoading } = useSessionsByUserQuery(userId || 0);
  console.log("sessions", sessions);
  

  const fieldLabels = {
    weight: "Trọng lượng (kg)",
    reps: "Số lần lặp",
    restTime: "Thời gian nghỉ (giây)",
    exerciseId: "Bài tập",
    sessionId: "Phiên tập",
  };

  const fieldPlaceholders = {
    weight: "Ví dụ: 0, 10, 20...",
    reps: "Ví dụ: 8, 10, 12...",
    restTime: "Ví dụ: 60, 90, 120...",
  };

  const handleSubmit = async () => {
    try {
      const submitData = {
        weight: parseFloat(formData.weight) || 0,
        reps: parseInt(formData.reps) || 1,
        restTime: parseInt(formData.restTime) || 60,
        exerciseId: parseInt(formData.exerciseId) || 1,
        sessionId: parseInt(formData.sessionId) || 1,
      };

      await createSetMutation.mutateAsync(submitData);
      setFormData({
        weight: "0",
        reps: "10",
        restTime: "90",
        exerciseId: "4",
        sessionId: "2",
      });
      setOpen(false);
      onSuccess();
    } catch (error) {
      console.error("Lỗi thêm set:", error);
    }
  };

  const renderField = (field: keyof typeof formData) => {
    if (field === "exerciseId") {
      return (
        <Select
          value={formData.exerciseId}
          onValueChange={(value) =>
            setFormData({ ...formData, exerciseId: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Chọn bài tập" />
          </SelectTrigger>
          <SelectContent>
            {exercisesLoading ? (
              <SelectItem value="" disabled>
                Đang tải...
              </SelectItem>
            ) : (
              exercises?.map((exercise) => (
                <SelectItem key={exercise.id} value={exercise.id.toString()}>
                  {exercise.name} - {exercise.targetMuscle1}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      );
    }

    if (field === "sessionId") {
      return (
        <Select
          value={formData.sessionId}
          onValueChange={(value) =>
            setFormData({ ...formData, sessionId: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Chọn phiên tập" />
          </SelectTrigger>
          <SelectContent>
            {sessionsLoading ? (
              <SelectItem value="" disabled>
                Đang tải...
              </SelectItem>
            ) : (
              sessions?.map((session) => (
                <SelectItem key={session.id} value={session.id.toString()}>
                  {session.name} -{" "}
                  {new Date(session.date).toLocaleDateString("vi-VN")}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      );
    }

    return (
      <Input
        id={field}
        type="number"
        min="0"
        value={formData[field]}
        placeholder={fieldPlaceholders[field as keyof typeof fieldPlaceholders]}
        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
        className="w-full"
      />
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Thêm set
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm set tập</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {(
            ["weight", "reps", "restTime", "exerciseId", "sessionId"] as const
          ).map((field) => (
            <div key={field} className="space-y-2">
              <Label htmlFor={field} className="text-sm font-medium">
                {fieldLabels[field]}
              </Label>
              {renderField(field)}
            </div>
          ))}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Hủy
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1"
              disabled={createSetMutation.isPending}
            >
              {createSetMutation.isPending ? "Đang thêm..." : "Thêm"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function EditSetDialog({
  open,
  setOpen,
  editingSet,
  onSuccess,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  editingSet: UpdateSetRequest | null;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    weight: "",
    reps: "",
    restTime: "",
    exerciseId: "",
  });

  const updateSetMutation = useUpdateSetMutation();
  const { data: exercises, isLoading: exercisesLoading } = useExercisesQuery();

  const fieldLabels = {
    weight: "Trọng lượng (kg)",
    reps: "Số lần lặp",
    restTime: "Thời gian nghỉ (giây)",
    exerciseId: "Bài tập",
  };

  const fieldPlaceholders = {
    weight: "Ví dụ: 0, 10, 20...",
    reps: "Ví dụ: 8, 10, 12...",
    restTime: "Ví dụ: 60, 90, 120...",
  };

  useEffect(() => {
    if (editingSet) {
      setFormData({
        weight: editingSet.weight?.toString() || "",
        reps: editingSet.reps?.toString() || "",
        restTime: editingSet.restTime?.toString() || "",
        exerciseId: editingSet.exerciseId?.toString() || "",
      });
    }
  }, [editingSet]);

  const handleSubmit = async () => {
    if (!editingSet) return;
    try {
      await updateSetMutation.mutateAsync({
        id: editingSet.id,
        weight: parseFloat(formData.weight),
        reps: parseInt(formData.reps),
        restTime: parseInt(formData.restTime),
        exerciseId: parseInt(formData.exerciseId),
      });
      setOpen(false);
      onSuccess();
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
    }
  };

  const renderField = (field: keyof typeof formData) => {
    if (field === "exerciseId") {
      return (
        <Select
          value={formData.exerciseId}
          onValueChange={(value) =>
            setFormData({ ...formData, exerciseId: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Chọn bài tập" />
          </SelectTrigger>
          <SelectContent>
            {exercisesLoading ? (
              <SelectItem value="" disabled>
                Đang tải...
              </SelectItem>
            ) : (
              exercises?.map((exercise) => (
                <SelectItem key={exercise.id} value={exercise.id.toString()}>
                  {exercise.name} - {exercise.targetMuscle1}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      );
    }

    return (
      <Input
        id={field}
        type="number"
        min="0"
        value={formData[field]}
        placeholder={fieldPlaceholders[field as keyof typeof fieldPlaceholders]}
        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
        className="w-full"
      />
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa set tập</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {(["weight", "reps", "restTime", "exerciseId"] as const).map(
            (field) => (
              <div key={field} className="space-y-2">
                <Label htmlFor={field} className="text-sm font-medium">
                  {fieldLabels[field]}
                </Label>
                {renderField(field)}
              </div>
            )
          )}
          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Hủy
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1"
              disabled={updateSetMutation.isPending}
            >
              {updateSetMutation.isPending ? "Đang cập nhật..." : "Cập nhật"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ==================== Main Component ====================
export default function SessionListPage() {
  const [user, setUser] = useState<{ id: number }>({ id: 0 });
  const [isClient, setIsClient] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingSet, setEditingSet] = useState<UpdateSetRequest | null>(null);

  useEffect(() => {
    setIsClient(true);
    const storedUser =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Lỗi khi parse localStorage user:", e);
      }
    }
  }, []);

  const {
    data: setData,
    isLoading,
    isError,
    refetch,
  } = useSetQueryByUserId(user.id);
  console.log("setData:", setData);

  const deleteSetMutation = useDeleteSetMutation();

  const groupedSets = React.useMemo(() => {
    if (!setData) return {};

    return (setData as SetType[]).reduce((groups, set) => {
      const date = set.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(set);
      return groups;
    }, {} as Record<string, SetType[]>);
  }, [setData]);

  const sortedDates = Object.keys(groupedSets).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  const handleEdit = (set: UpdateSetRequest) => {
    setEditingSet(set);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa set này?")) {
      try {
        await deleteSetMutation.mutateAsync(id);
        refetch();
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
      }
    }
  };

  if (!isClient)
    return (
      <div className="flex justify-center items-center h-64">
        Đang khởi tạo...
      </div>
    );
  if (!user?.id) return <div>Vui lòng đăng nhập để xem set tập.</div>;
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
        <h1 className="text-3xl font-bold">Danh sách set tập</h1>
        <div className="flex gap-2">
          <AddSessionDialog onSuccess={refetch} />
          <AddSetDialog onSuccess={refetch} />
        </div>
        <EditSetDialog
          open={editDialogOpen}
          setOpen={setEditDialogOpen}
          editingSet={editingSet}
          onSuccess={() => {
            setEditingSet(null);
            refetch();
          }}
        />
      </div>

      <div className="space-y-8">
        {sortedDates.map((date) => (
          <div key={date} className="space-y-4">
            <div className="border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-800">
                {new Date(date).toLocaleDateString("vi-VN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h2>
              <p className="text-sm text-gray-500">
                {groupedSets[date].length} set tập
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {groupedSets[date].map((set) => (
                <Card key={set.id}>
                  <CardHeader>
                    <CardTitle>Set ID: {set.id}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span className="font-medium">Trọng lượng:</span>
                      <span>{set.weight} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Số lần lặp:</span>
                      <span>{set.reps}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Thời gian nghỉ:</span>
                      <span>{set.restTime} giây</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Bài tập:</span>
                      <span>{set.name || `ID: ${set.exerciseId}`}</span>
                    </div>
                    {/* <div className="flex justify-between">
                      <span className="font-medium">Phiên tập:</span>
                      <span>{set.sessionName || `ID: ${set.sessionId}`}</span>
                    </div> */}
                    <div className="flex justify-end gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(set)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(set.id)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {sortedDates.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          Chưa có set tập nào được ghi nhận.
        </div>
      )}
    </div>
  );
}
