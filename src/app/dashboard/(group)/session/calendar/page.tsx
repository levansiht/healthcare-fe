"use client";

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Plus,
  Edit,
  Trash,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  useCreateSetMutation,
  useDeleteSetMutation,
  useSetQueryByUserId,
  useUpdateSetMutation,
} from '@/hooks/useSetsQuery';
import { UpdateSetRequest } from '@/services';

interface SetType {
  id: number;
  weight: number;
  reps: number;
  restTime: number;
  exerciseId: number;
  sessionId: number;
  date: string; 
}

// ==================== Add Set Dialog Component ====================
function AddSetDialog({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    weight: '',
    reps: '',
    restTime: '',
    exerciseId: '',
    sessionId: '',
  });

  const createSetMutation = useCreateSetMutation();

  const handleSubmit = async () => {
    try {
      await createSetMutation.mutateAsync({
        weight: parseFloat(formData.weight),
        reps: parseInt(formData.reps),
        restTime: parseInt(formData.restTime),
        exerciseId: parseInt(formData.exerciseId),
        sessionId: parseInt(formData.sessionId),
      });
      setFormData({ weight: '', reps: '', restTime: '', exerciseId: '', sessionId: '' });
      setOpen(false);
      onSuccess();
    } catch (error) {
      console.error('Lỗi thêm set:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Thêm set
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm set tập</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {['weight', 'reps', 'restTime', 'exerciseId', 'sessionId'].map((field) => (
            <div key={field}>
              <Label htmlFor={field}>{field}</Label>
              <Input
                id={field}
                type="number"
                value={formData[field as keyof typeof formData]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
              />
            </div>
          ))}
          <Button onClick={handleSubmit} className="w-full">Thêm</Button>
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
    weight: '',
    reps: '',
    restTime: '',
    exerciseId: '',
  });

  const updateSetMutation = useUpdateSetMutation();

  useEffect(() => {
    if (editingSet) {
      setFormData({
        weight: editingSet.weight?.toString() || '',
        reps: editingSet.reps?.toString() || '',
        restTime: editingSet.restTime?.toString() || '',
        exerciseId: editingSet.exerciseId?.toString() || '',
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
      console.error('Lỗi cập nhật:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa set tập</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {['weight', 'reps', 'restTime', 'exerciseId'].map((field) => (
            <div key={field}>
              <Label htmlFor={field}>{field}</Label>
              <Input
                id={field}
                type="number"
                value={formData[field as keyof typeof formData]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
              />
            </div>
          ))}
          <Button onClick={handleSubmit} className="w-full">Cập nhật</Button>
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
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Lỗi khi parse localStorage user:', e);
      }
    }
  }, []);

  const { data: setData, isLoading, isError, refetch } = useSetQueryByUserId(user.id);
  console.log('setData:', setData);
  
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

  const sortedDates = Object.keys(groupedSets).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  const handleEdit = (set: UpdateSetRequest) => {
    setEditingSet(set);
    setEditDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa set này?')) {
      try {
        await deleteSetMutation.mutateAsync(id);
        refetch();
      } catch (error) {
        console.error('Lỗi khi xóa:', error);
      }
    }
  };

  if (!isClient) return <div className="flex justify-center items-center h-64">Đang khởi tạo...</div>;
  if (!user?.id) return <div>Vui lòng đăng nhập để xem set tập.</div>;
  if (isLoading) return <div className="flex justify-center items-center h-64">Đang tải dữ liệu...</div>;
  if (isError) return <div className="text-red-500">Lỗi khi tải dữ liệu.</div>;

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Danh sách set tập</h1>
        <AddSetDialog onSuccess={refetch} />
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

      {/* Hiển thị theo từng nhóm ngày */}
      <div className="space-y-8">
        {sortedDates.map((date) => (
          <div key={date} className="space-y-4">
            <div className="border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-800">
                {new Date(date).toLocaleDateString('vi-VN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
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
                    <div className="flex justify-between"><span className="font-medium">Trọng lượng:</span><span>{set.weight} kg</span></div>
                    <div className="flex justify-between"><span className="font-medium">Số lần lặp:</span><span>{set.reps}</span></div>
                    <div className="flex justify-between"><span className="font-medium">Thời gian nghỉ:</span><span>{set.restTime} giây</span></div>
                    <div className="flex justify-between"><span className="font-medium">Bài tập ID:</span><span>{set.exerciseId}</span></div>
                    <div className="flex justify-between"><span className="font-medium">Phiên tập ID:</span><span>{set.sessionId}</span></div>
                    <div className="flex justify-end gap-2 mt-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(set)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(set.id)}>
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
