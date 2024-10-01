"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  User,
  Selection,
  SortDescriptor,
  CircularProgressProps,
  Chip,
  Pagination,
} from "@nextui-org/react";
// import { pagination } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/progress";

import { columns, usersDB, statusOptions } from "./Data";
import {
  ChevronDownIcon,
  Ellipsis,
  Filter,
  Menu,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
  X,
} from "lucide-react";
import Popup from "./popupform";
import EditForm from "./EditForm";
import { UserDB } from "./types";
import CreateNewWorkOrder from "./createNewWorkOrder";

const statusColorMap: Record<string, CircularProgressProps["color"]> = {
  Recent: "success",
  Overdue: "danger",
  Remaining: "warning",
  Responded: "primary",
  closed: "default",
};

const priorityValue: Record<string, CircularProgressProps["value"]> = {
  urgent: 100,
  high: 75,
  medium: 50,
  low: 25,
};

const priorityColor: Record<string, CircularProgressProps["color"]> = {
  urgent: "danger",
  high: "warning",
  medium: "primary",
  low: "success",
};

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "subject",
  "status",
  "priority",
  "agent",
  "actions",
];

// type User = (typeof usersDB)[0];

export default function TicketDashboard() {
  const [users, setUsers] = useState([]);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [popup, setPopup] = useState(false);
  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);
  const [menuExpand, setMenuExpand] = useState(false);
  const [editForm, setEditForm] = useState(0);
  console.log(typeof editForm);

  useEffect(() => {
    setUsers(usersDB);
  }, [usersDB]);
  console.log("user ", users);
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];
    console.log(statusFilter);
    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status.toLowerCase())
      );
    }
    console.log(filteredUsers);
    return filteredUsers;
  }, [users, statusFilter, hasSearchFilter, filterValue]);

  // PAGES
  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: UserDB, b: UserDB) => {
      const first = a[sortDescriptor.column as keyof UserDB] as number;
      const second = b[sortDescriptor.column as keyof UserDB] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);
  //  HANDLE DELETE
  const handleDelete = () => {
    const newUsers = users.filter(
      (user) => !Array.from(selectedKeys).includes(user.id.toString())
    );
    setSelectedKeys(new Set());
    setUsers(newUsers);
  };

  const renderCell = React.useCallback(
    (user: UserDB, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof UserDB];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: user.avatar }}
              description={user.email}
              name={cellValue}
              className="font-medium"
            >
              {user.email}
            </User>
          );
        case "role":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
              <p className="text-bold text-tiny capitalize text-default-400 font-medium">
                {user.team}
              </p>
            </div>
          );

        case "subject":
          return <p className="text-blue-400 font-semibold">{cellValue}</p>;
        case "priority":
          const progressValue = priorityValue[user.priority];
          const progressColor = priorityColor[user.priority];
          console.log(progressColor, "  ", progressValue);
          return (
            <CircularProgress
              aria-label="circularProgress"
              size="lg"
              value={progressValue}
              color={progressColor}
            />
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[cellValue]}
              size="sm"
              variant="flat"
            >
              <p className="font-semibold">{cellValue}</p>
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <Ellipsis className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  onAction={(value) => {
                    setEditForm(Number.parseInt(value));
                  }}
                >
                  <DropdownItem key={user.id} value={user.id}>
                    Edit
                  </DropdownItem>
                  <DropdownItem>QR Scan</DropdownItem>
                  <DropdownItem>Export</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );

        default:
          return cellValue;
      }
    },
    [editForm]
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);
  const capitalize = (str: string) => {
    if (typeof str !== "string") return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // TOP CONTENT

  const topContent = React.useMemo(() => {
    return (
      <div className=" flex flex-col gap-4   transition-all duration-1000 ease-in-out overflow-x-auto">
        <div className=" flex  justify-between gap-3 items-center  ">
          <p className="hidden sm:flex text-sm font-semibold">
            Unsolved Tickets
          </p>
          <Input
            isClearable
            className="min-w-[40%] sm:w-[10%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex sm:hidden">
            <Menu onClick={() => setMenuExpand(true)} />
            {menuExpand && (
              <div
                className={`fixed top-0 left-0 h-full w-1/2 bg-neutral-100 z-50 transition-transform duration-300 ease-in-out ${
                  menuExpand ? "translate-x-full" : "translate-x-0"
                }`}
              >
                <div className="flex justify-end p-4">
                  <X onClick={() => setMenuExpand(false)} />
                </div>
                <Dropdown>
                  <DropdownTrigger className="w-full">
                    <Button className="w-full">Status</Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectedKeys={statusFilter}
                    selectionMode="multiple"
                    onSelectionChange={setStatusFilter}
                  >
                    {statusOptions.map((status) => (
                      <DropdownItem key={status.uid} className="capitalize">
                        {capitalize(status.name)}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Dropdown>
                  <DropdownTrigger className="w-full">
                    <Button className="w-full">Filter</Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectedKeys={visibleColumns}
                    selectionMode="multiple"
                    onSelectionChange={setVisibleColumns}
                  >
                    {columns.map((column) => (
                      <DropdownItem key={column.uid} className="capitalize">
                        {capitalize(column.name)}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>

                <Button onClick={() => setPopup(true)} className="w-full">
                  Add New
                </Button>
                <Button
                  onClick={handleDelete}
                  isDisabled={selectedKeys.size === 0}
                  className="w-full"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* MEDIUM SCREEN CONTENT */}
          <div className="hidden sm:flex md:flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                  startContent={<Filter></Filter>}
                >
                  Filter
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Button endContent={<PlusIcon />} onClick={() => setPopup(true)}>
              Add New
            </Button>
            <Button
              startContent={<Trash2Icon />}
              color="danger"
              onClick={handleDelete}
              isDisabled={selectedKeys.size === 0}
            >
              Delete
            </Button>
          </div>
        </div>
        {/* POPUP COMPONENT */}
        {popup && (
          // <Popup
          //   onClose={() => setPopup(false)}
          //   priorityColor={priorityColor}
          //   setUsers={setUsers}
          // />
          <CreateNewWorkOrder onClose={() => setPopup(false)} />
        )}
        {editForm > 0 && (
          <EditForm
            id={editForm}
            onClose={() => setEditForm(0)}
            setUsers={setUsers}
          />
        )}

        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    menuExpand,
    statusFilter,
    visibleColumns,
    handleDelete,
    selectedKeys.size,
    popup,
    editForm,
    users.length,
    onRowsPerPageChange,
    onClear,
  ]);
  console.log(selectedKeys);

  // BOTTOM CONTENT
  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex flex-wrap justify-between items-center ">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>

        <Pagination
          classNames={{
            wrapper: "flex flex-row ",
          }}
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />

        <div className="hidden sm:flex w-[30%] sm:justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [
    selectedKeys,
    filteredItems.length,
    page,
    pages,
    onPreviousPage,
    onNextPage,
  ]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px] ",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No users found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell key={`${item.id}-${String(columnKey)}`}>
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
