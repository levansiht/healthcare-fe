'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  useBodyTracksByUserQuery,
  useCreateBodyTrackMutation,
  useUpdateBodyTrackMutation,
  useDeleteBodyTrackMutation,
} from '@/hooks/useBodyTracksQuery';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, TrendingUp } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { BodyTrack } from '@/types/api';

// Chart config
const chartConfig = {
  weight: {
    label: 'Cân nặng (kg)',
    color: 'hsl(var(--chart-1))',
  },
};

export default function PageBodyWeight() {
  const [user, setUser] = useState<{ id: number }>({ id: 0 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<BodyTrack | null>(null);
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Lỗi khi parse localStorage user:', e);
      }
    }
  }, []);

  const { data, isLoading, isError } = useBodyTracksByUserQuery(user.id);

  const createBodyTrackMutation = useCreateBodyTrackMutation();
  const updateBodyTrackMutation = useUpdateBodyTrackMutation();
  const deleteBodyTrackMutation = useDeleteBodyTrackMutation();

  const chartData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return data
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((record) => ({
        date: new Date(record.date).toLocaleDateString('vi-VN'),
        weight: record.weight,
        fullDate: record.date,
      }));
  }, [data]);

  const stats = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) return null;

    const weights = data.map((r) => r.weight);
    const latest = data[data.length - 1];
    const previous = data.length > 1 ? data[data.length - 2] : null;

    return {
      current: latest.weight,
      change: previous ? latest.weight - previous.weight : 0,
      min: Math.min(...weights),
      max: Math.max(...weights),
      avg: weights.reduce((a, b) => a + b, 0) / weights.length,
    };
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      date: formData.date,
      userId: user.id,
    };

    if (editingRecord) {
      updateBodyTrackMutation.mutate({ id: editingRecord.id, ...payload });
    } else {
      createBodyTrackMutation.mutate(payload);
    }

    setIsDialogOpen(false);
    setEditingRecord(null);
    setFormData({
      weight: '',
      height: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const handleEdit = (record: BodyTrack) => {
    setEditingRecord(record);
    setFormData({
      weight: record.weight.toString(),
      height: record.height.toString(),
      date: record.date,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa bản ghi này?')) {
      deleteBodyTrackMutation.mutate(id);
    }
  };

  if (!user || !user.id) {
    return <div>Vui lòng đăng nhập để xem thông tin</div>;
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Đang tải...</div>;
  }

  if (isError) {
    return <div className="text-red-500">Có lỗi xảy ra khi tải dữ liệu</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Theo dõi cân nặng</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingRecord(null);
                setFormData({
                  weight: '',
                  height: '',
                  date: new Date().toISOString().split('T')[0],
                });
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Thêm bản ghi
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingRecord ? 'Chỉnh sửa' : 'Thêm'} bản ghi cân nặng</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="weight">Cân nặng (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="height">Chiều cao (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="date">Ngày</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={createBodyTrackMutation.isPending || updateBodyTrackMutation.isPending}
              >
                {createBodyTrackMutation.isPending || updateBodyTrackMutation.isPending
                  ? 'Đang xử lý...'
                  : editingRecord
                  ? 'Cập nhật'
                  : 'Thêm'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Thống kê */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Cân nặng hiện tại', value: `${stats.current} kg`, extra: `${stats.change > 0 ? '+' : ''}${stats.change.toFixed(1)} kg so với lần trước` },
            { label: 'Cân nặng trung bình', value: `${stats.avg.toFixed(1)} kg` },
            { label: 'Cân nặng thấp nhất', value: `${stats.min} kg` },
            { label: 'Cân nặng cao nhất', value: `${stats.max} kg` },
          ].map((item, idx) => (
            <Card key={idx}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
                {idx === 0 && <TrendingUp className="h-4 w-4 text-muted-foreground" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
                {item.extra && <p className="text-xs text-muted-foreground">{item.extra}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Biểu đồ */}
      <Card>
        <CardHeader>
          <CardTitle>Biểu đồ cân nặng theo thời gian</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-auto w-full">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} tick={{ fontSize: 12 }} />
                <YAxis domain={['dataMin - 2', 'dataMax + 2']} tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#2563eb' }}
                  activeDot={{ r: 7, fill: '#1d4ed8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Bảng dữ liệu */}
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử cân nặng</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ngày</TableHead>
                <TableHead>Cân nặng (kg)</TableHead>
                <TableHead>Chiều cao (cm)</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && data.length > 0 ? (
                data
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{new Date(record.date).toLocaleDateString('vi-VN')}</TableCell>
                      <TableCell>{record.weight}</TableCell>
                      <TableCell>{record.height}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(record)} disabled={updateBodyTrackMutation.isPending}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDelete(record.id)} disabled={deleteBodyTrackMutation.isPending}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">Chưa có dữ liệu</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
