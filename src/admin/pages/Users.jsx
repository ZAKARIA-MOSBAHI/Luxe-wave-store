import { useEffect, useState } from "react";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Badge } from "@/components/ui/Badge";
import {
  Search,
  MoreHorizontal,
  Eye,
  Mail,
  ShieldAlert,
  ShoppingBag,
  UserX,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";

import { useNavigate } from "react-router-dom";
import { useAdminUsers } from "@/hooks/admin/useAdminUsers";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { formatDateToText } from "@/utils/formatDateToText";

const Users = () => {
  const { users, suspendUser, deleteUser } = useAdminUsers();

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users?.filter(
    (user) =>
      user?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase()?.includes(searchTerm.toLowerCase()),
  );

  const handleDelete = async (id) => {
    const res = await deleteUser(id);
    console.log(res);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const handleSuspend = async (id) => {
    const res = await suspendUser(id);
    console.log(res);
    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold">Users</h1>

          <Button onClick={() => navigate("/admin/users/add")}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage your users and admin users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-6">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by name or email..."
                  className="w-full pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead className="hidden md:table-cell">Role</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Status
                    </TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Last Active
                    </TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers?.length > 0 ? (
                    filteredUsers?.map((user) => (
                      <TableRow key={user?._id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 bg-zinc-100">
                              <AvatarFallback className="">
                                {user?.name?.charAt(0)?.toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{user?.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {user?.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge
                            variant={
                              user?.role === "admin" ? "default" : "outline"
                            }
                          >
                            {user?.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge
                            variant={
                              user?.status === "active"
                                ? "success"
                                : user?.status === "inactive"
                                  ? "warning"
                                  : "danger"
                            }
                          >
                            {user?.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user?.orderCount}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">
                          {formatDateToText(user?.lastLogin)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ShoppingBag className="mr-2 h-4 w-4" />
                                View Orders
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {user.status !== "suspended" && (
                                <DropdownMenuItem
                                  className="text-amber-600 focus:text-amber-600"
                                  onClick={() => handleSuspend(user._id)}
                                >
                                  <ShieldAlert className="mr-2 h-4 w-4" />
                                  Suspend User
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                className="text-red-600 focus:text-red-600"
                                onClick={() => handleDelete(user._id)}
                              >
                                <UserX className="mr-2 h-4 w-4" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No users found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Users;
