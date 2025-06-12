"use client";
import { useBodyTracksByUserQuery, useCreateBodyTrackMutation, useUpdateBodyTrackMutation, useDeleteBodyTrackMutation } from '@/hooks/useBodyTracksQuery';
import React, { useState, useMemo, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Activity } from 'lucide-react';
import { ChartContainer, ChartTooltip  } from '@/components/ui/chart';
import { BodyTrack } from '@/types/api';

const chartConfig = {
  bmi: {
    label: "Chỉ số BMI",
    color: "hsl(var(--chart-2))",
  },
};

// Hàm tính BMI
const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

// Hàm phân loại BMI
const getBMICategory = (bmi: number): { category: string; color: string } => {
  if (bmi < 18.5) return { category: 'Thiếu cân', color: 'text-blue-600' };
  if (bmi < 25) return { category: 'Bình thường', color: 'text-green-600' };
  if (bmi < 30) return { category: 'Thừa cân', color: 'text-yellow-600' };
  return { category: 'Béo phì', color: 'text-red-600' };
};

export default function PageBMI() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<BodyTrack | null>(null);
  const [user, setUser] = useState<{ id: number }>({ id: 0 });
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    date: new Date().toISOString().split('T')[0]
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
  const {data, isLoading, isError} = useBodyTracksByUserQuery(user.id);
  const createBodyTrackMutation = useCreateBodyTrackMutation();
  const updateBodyTrackMutation = useUpdateBodyTrackMutation();
  const deleteBodyTrackMutation = useDeleteBodyTrackMutation();

  // Chuẩn bị dữ liệu cho biểu đồ BMI
  const chartData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    return data
      .sort((a: BodyTrack, b: BodyTrack) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((record: BodyTrack) => ({
        date: new Date(record.date).toLocaleDateString('vi-VN'),
        bmi: calculateBMI(record.weight, record.height),
        fullDate: record.date,
        weight: record.weight,
        height: record.height
      }));
  }, [data]);

  // Thống kê BMI
  const stats = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) return null;
    
    const bmis = data.map((r: BodyTrack) => calculateBMI(r.weight, r.height));
    const latest = bmis[bmis.length - 1];
    const previous = bmis.length > 1 ? bmis[bmis.length - 2] : null;
    
    return {
      current: latest,
      change: previous ? latest - previous : 0,
      min: Math.min(...bmis),
      max: Math.max(...bmis),
      avg: bmis.reduce((a: number, b: number) => a + b, 0) / bmis.length
    };
  }, [data]);

  if (!user || !user.id) {
    return <div>Vui lòng đăng nhập để xem thông tin</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRecord) {
      updateBodyTrackMutation.mutate({
        id: editingRecord.id,
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
      });
    } else {
      createBodyTrackMutation.mutate({
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
        date: formData.date,
        userId: user.id
      });
    }
    setIsDialogOpen(false);
    setEditingRecord(null);
    setFormData({ weight: '', height: '', date: new Date().toISOString().split('T')[0] });
  };

  const handleEdit = (record: BodyTrack) => {
    setEditingRecord(record);
    setFormData({
      weight: record.weight.toString(),
      height: record.height.toString(),
      date: record.date
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa bản ghi này?')) {
      deleteBodyTrackMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Đang tải...</div>;
  }

  if (isError) {
    return <div className="text-red-500">Có lỗi xảy ra khi tải dữ liệu</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Theo dõi chỉ số BMI</h1>
          {/* <p className="text-gray-600 mt-1">Body Mass Index - Chỉ số khối cơ thể</p> */}
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingRecord(null);
              setFormData({ weight: '', height: '', date: new Date().toISOString().split('T')[0] });
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Thêm bản ghi
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingRecord ? 'Chỉnh sửa' : 'Thêm'} bản ghi BMI</DialogTitle>
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
              {formData.weight && formData.height && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Chỉ số BMI dự kiến:</p>
                  <p className="text-lg font-semibold">
                    {calculateBMI(parseFloat(formData.weight), parseFloat(formData.height)).toFixed(1)}
                  </p>
                  <p className={`text-sm ${getBMICategory(calculateBMI(parseFloat(formData.weight), parseFloat(formData.height))).color}`}>
                    {getBMICategory(calculateBMI(parseFloat(formData.weight), parseFloat(formData.height))).category}
                  </p>
                </div>
              )}
              <Button 
                type="submit" 
                className="w-full"
                disabled={createBodyTrackMutation.isPending || updateBodyTrackMutation.isPending}
              >
                {createBodyTrackMutation.isPending || updateBodyTrackMutation.isPending ? 
                  'Đang xử lý...' : 
                  (editingRecord ? 'Cập nhật' : 'Thêm')
                }
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Thống kê BMI */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">BMI hiện tại</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.current.toFixed(1)}</div>
              <p className={`text-xs ${getBMICategory(stats.current).color}`}>
                {getBMICategory(stats.current).category}
              </p>
              <p className="text-xs text-muted-foreground">
                {stats.change > 0 ? '+' : ''}{stats.change.toFixed(1)} so với lần trước
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">BMI trung bình</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avg.toFixed(1)}</div>
              <p className={`text-xs ${getBMICategory(stats.avg).color}`}>
                {getBMICategory(stats.avg).category}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">BMI thấp nhất</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.min.toFixed(1)}</div>
              <p className={`text-xs ${getBMICategory(stats.min).color}`}>
                {getBMICategory(stats.min).category}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">BMI cao nhất</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.max.toFixed(1)}</div>
              <p className={`text-xs ${getBMICategory(stats.max).color}`}>
                {getBMICategory(stats.max).category}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* BMI Reference Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Bảng phân loại BMI</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 border rounded-lg">
              <div className="text-blue-600 font-semibold">Thiếu cân</div>
              <div className="text-sm text-gray-600">BMI {"<"} 18.5</div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="text-green-600 font-semibold">Bình thường</div>
              <div className="text-sm text-gray-600">18.5 ≤ BMI {"<"} 25</div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="text-yellow-600 font-semibold">Thừa cân</div>
              <div className="text-sm text-gray-600">25 ≤ BMI {"<"} 30</div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="text-red-600 font-semibold">Béo phì</div>
              <div className="text-sm text-gray-600">BMI ≥ 30</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Biểu đồ BMI */}
      <Card>
        <CardHeader>
          <CardTitle>Biểu đồ chỉ số BMI theo thời gian</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-auto w-full">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  domain={['dataMin - 1', 'dataMax + 1']}
                />
                <ChartTooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border rounded-lg shadow-lg">
                          <p className="font-semibold">{label}</p>
                          <p className="text-blue-600">BMI: {data.bmi.toFixed(1)}</p>
                          <p className="text-gray-600">Cân nặng: {data.weight} kg</p>
                          <p className="text-gray-600">Chiều cao: {data.height} cm</p>
                          <p className={getBMICategory(data.bmi).color}>
                            {getBMICategory(data.bmi).category}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="bmi" 
                  stroke="#059669" 
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#059669" }}
                  activeDot={{ r: 7, fill: "#047857" }}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Bảng dữ liệu BMI */}
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử chỉ số BMI</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ngày</TableHead>
                <TableHead>Cân nặng (kg)</TableHead>
                <TableHead>Chiều cao (cm)</TableHead>
                <TableHead>BMI</TableHead>
                <TableHead>Phân loại</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data && Array.isArray(data) && data.length > 0 ? (
                data
                  .sort((a: BodyTrack, b: BodyTrack) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((record: BodyTrack) => {
                    const bmi = calculateBMI(record.weight, record.height);
                    const category = getBMICategory(bmi);
                    return (
                      <TableRow key={record.id}>
                        <TableCell>{new Date(record.date).toLocaleDateString('vi-VN')}</TableCell>
                        <TableCell>{record.weight}</TableCell>
                        <TableCell>{record.height}</TableCell>
                        <TableCell className="font-semibold">{bmi.toFixed(1)}</TableCell>
                        <TableCell className={category.color}>{category.category}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(record)}
                              disabled={updateBodyTrackMutation.isPending}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(record.id)}
                              disabled={deleteBodyTrackMutation.isPending}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Chưa có dữ liệu
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
