"use client";
import { useTrainingVolumeByUserQuery } from '@/hooks/useSessionsQuery';
import React, { useEffect, useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Activity, Calendar, Target } from 'lucide-react';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { TrainingVolumeData } from '@/types/api';

const chartConfig = {
  volume: {
    label: "Khối lượng tập luyện",
    color: "hsl(var(--chart-3))",
  },
};

export default function PageTrainingVolume() {
  const [user, setUser] = useState<{ id: number }>({ id: 0 });
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error('Lỗi khi parse localStorage user:', e);
        }
      }
    }
  }, []);
  
  const { data: rawVolumeData, isLoading, isError } = useTrainingVolumeByUserQuery(user.id);

  // Chuyển đổi dữ liệu từ API thành format phù hợp cho chart
  const trainingVolumeData = useMemo(() => {
    if (!rawVolumeData || !Array.isArray(rawVolumeData)) return [];
    
    return rawVolumeData.map((item: TrainingVolumeData) => ({
      date: new Date(item.date).toLocaleDateString('vi-VN'),
      volume: item.volume,
      fullDate: item.date
    })).sort((a, b) => new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime());
  }, [rawVolumeData]);

  // Thống kê training volume
  const stats = useMemo(() => {
    if (!trainingVolumeData || trainingVolumeData.length === 0) return null;
    
    const volumes = trainingVolumeData.map(d => d.volume);
    const latest = volumes[volumes.length - 1] || 0;
    const previous = volumes.length > 1 ? volumes[volumes.length - 2] : 0;
    
    return {
      current: latest,
      change: previous ? latest - previous : 0,
      total: volumes.reduce((a, b) => a + b, 0),
      average: volumes.reduce((a, b) => a + b, 0) / volumes.length,
      max: Math.max(...volumes),
      min: Math.min(...volumes)
    };
  }, [trainingVolumeData]);

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
          <h1 className="text-3xl font-bold">Khối lượng tập luyện</h1>
          <p className="text-gray-600 mt-1">Theo dõi khối lượng tập luyện theo thời gian</p>
        </div>
      </div>

      {/* Thống kê */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Volume hiện tại</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.current.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {stats.change > 0 ? '+' : ''}{stats.change.toLocaleString()} so với lần trước
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Volume trung bình</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(stats.average).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Mỗi phiên tập
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Volume cao nhất</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.max.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Kỷ lục cá nhân
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng volume</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Volume thấp nhất: {stats.min.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Biểu đồ Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Biểu đồ khối lượng tập luyện theo thời gian</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-auto w-full">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={trainingVolumeData}>
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
                  domain={['dataMin - 100', 'dataMax + 100']}
                />
                <ChartTooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border rounded-lg shadow-lg">
                          <p className="font-semibold">{label}</p>
                          <p className="text-purple-600">Volume: {data.volume.toLocaleString()}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="volume" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#8b5cf6" }}
                  activeDot={{ r: 7, fill: "#7c3aed" }}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Biểu đồ Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Biểu đồ cột khối lượng tập luyện</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-auto w-full">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={trainingVolumeData}>
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
                />
                <ChartTooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border rounded-lg shadow-lg">
                          <p className="font-semibold">{label}</p>
                          <p className="text-purple-600">Volume: {data.volume.toLocaleString()}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="volume" 
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Training Volume Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Tóm tắt khối lượng tập luyện</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trainingVolumeData.length > 0 ? (
              trainingVolumeData.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">{item.date}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-purple-600">
                      {item.volume.toLocaleString()}
                    </span>
                    <p className="text-sm text-gray-500">volume</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                Chưa có dữ liệu khối lượng tập luyện
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
