"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Calendar,
  Plus,
  Search,
  Edit,
  Trash2,
  Clock,
  MoreHorizontal,
  Target,
  Eye,
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
  Session,
  CreateSessionRequest,
  UpdateSessionRequest,
} from "@/types/api";
import { useForm } from "react-hook-form";
import {
  useSessionsQuery,
  useCreateSessionMutation,
  useUpdateSessionMutation,
  useDeleteSessionMutation,
} from "@/hooks/useSessionsQuery";
import { usePlansQuery } from "@/hooks/usePlansQuery";

export default function SessionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<Session | null>(null);

  const { data: sessions = [], isLoading: loading } = useSessionsQuery();
  const { data: plans = [] } = usePlansQuery();
  const createSessionMutation = useCreateSessionMutation();
  const updateSessionMutation = useUpdateSessionMutation();
  const deleteSessionMutation = useDeleteSessionMutation();

  const createForm = useForm<CreateSessionRequest>();
  const editForm = useForm<UpdateSessionRequest>();

  const getPlanName = useCallback(
    (planId: number) => {
      const plan = plans.find((p) => p.id === planId);
      return plan?.name || `Plan ${planId}`;
    },
    [plans]
  );

  const filteredSessions = useMemo(() => {
    let filtered = sessions || [];

    if (searchTerm) {
      filtered = filtered.filter((session) =>
        getPlanName(session.planId)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (selectedPlanId !== "all") {
      filtered = filtered.filter(
        (session) => session.planId === parseInt(selectedPlanId)
      );
    }

    return filtered;
  }, [sessions, searchTerm, selectedPlanId, getPlanName]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const isSessionPast = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  const handleCreateSession = (data: CreateSessionRequest) => {
    createSessionMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateDialogOpen(false);
        createForm.reset();
      },
    });
  };

  const handleUpdateSession = (data: UpdateSessionRequest) => {
    updateSessionMutation.mutate(data, {
      onSuccess: () => {
        setIsEditDialogOpen(false);
        editForm.reset();
      },
    });
  };

  const handleDeleteSession = (session: Session) => {
    setSessionToDelete(session);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteSession = () => {
    if (sessionToDelete) {
      deleteSessionMutation.mutate(sessionToDelete.id);
      setIsDeleteDialogOpen(false);
      setSessionToDelete(null);
    }
  };

  const handleViewSets = (sessionId: number) => {
    window.open(`/admin/sets?sessionId=${sessionId}`, "_blank");
  };

  const handleEditSession = (session: Session) => {
    editForm.reset({
      id: session.id,
      date: session.date,
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="h-8 w-8 text-purple-600" />
          <div>
            <h1 className="text-3xl font-bold">Quản lý phiên tập</h1>
            <p className="text-gray-600">
              Quản lý lịch tập luyện theo kế hoạch
            </p>
          </div>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Thêm phiên tập
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tạo phiên tập mới</DialogTitle>
              <DialogDescription>Thêm phiên tập vào kế hoạch</DialogDescription>
            </DialogHeader>
            <form onSubmit={createForm.handleSubmit(handleCreateSession)}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="date">Ngày tập</Label>
                  <Input
                    id="date"
                    type="date"
                    {...createForm.register("date", { required: true })}
                  />
                </div>
                <div>
                  <Label htmlFor="planId">Kế hoạch</Label>
                  <Select
                    onValueChange={(value) =>
                      createForm.setValue("planId", parseInt(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn kế hoạch" />
                    </SelectTrigger>
                    <SelectContent>
                      {(plans || []).map((plan) => (
                        <SelectItem key={plan.id} value={plan.id.toString()}>
                          {plan.name}
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
                <Button type="submit">Tạo phiên tập</Button>
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
                  placeholder="Tìm kiếm theo kế hoạch..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Select value={selectedPlanId} onValueChange={setSelectedPlanId}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả kế hoạch</SelectItem>
                  {plans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id.toString()}>
                      {plan.name}
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
            <div className="text-2xl font-bold">{sessions?.length || 0}</div>
            <p className="text-sm text-gray-600">Tổng phiên tập</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {(sessions || []).filter((s) => !isSessionPast(s.date)).length}
            </div>
            <p className="text-sm text-gray-600">Sắp diễn ra</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {(sessions || []).filter((s) => isSessionPast(s.date)).length}
            </div>
            <p className="text-sm text-gray-600">Đã hoàn thành</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {filteredSessions?.length || 0}
            </div>
            <p className="text-sm text-gray-600">Hiển thị</p>
          </CardContent>
        </Card>
      </div>

      {/* Sessions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách phiên tập</CardTitle>
          <CardDescription>
            Quản lý tất cả phiên tập trong hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Đang tải...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kế hoạch</TableHead>
                  <TableHead>Ngày tập</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(filteredSessions || []).map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-gray-400" />
                        <span>{getPlanName(session.planId)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>{formatDate(session.date)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {isSessionPast(session.date) ? (
                        <Badge variant="secondary">Đã hoàn thành</Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-800">
                          Sắp diễn ra
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">#{session.id}</Badge>
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
                            onClick={() => handleViewSets(session.id)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Xem Sets
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleEditSession(session)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteSession(session)}
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
            <DialogTitle>Chỉnh sửa phiên tập</DialogTitle>
            <DialogDescription>Cập nhật thông tin phiên tập</DialogDescription>
          </DialogHeader>
          <form onSubmit={editForm.handleSubmit(handleUpdateSession)}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-date">Ngày tập</Label>
                <Input
                  id="edit-date"
                  type="date"
                  {...editForm.register("date", { required: true })}
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa phiên tập</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa phiên tập này không? Hành động này không
              thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          {sessionToDelete && (
            <div className="py-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Target className="h-4 w-4" />
                <span>Kế hoạch: {getPlanName(sessionToDelete.planId)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <Clock className="h-4 w-4" />
                <span>Ngày tập: {formatDate(sessionToDelete.date)}</span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={confirmDeleteSession}
            >
              Xóa phiên tập
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
