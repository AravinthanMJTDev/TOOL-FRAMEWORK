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
  Pagination,
} from "@nextui-org/react";

import { columns } from "../../../Data/SettingsWorkOrderData/page";
import {
  ChevronDownIcon,
  Ellipsis,
  FileUp,
  Filter,
  Import,
  Menu,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
  X,
} from "lucide-react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import EditForm from "./EditForm";
import { UserDB } from "../types";

import Popup from "../AddUser/page";
import AddUser from "./addUser";

const INITIAL_VISIBLE_COLUMNS = [
  "employeeid",
  "name",
  "department",
  "mobilenumber",
  "sign",
  "actions",
];

// type User = (typeof usersDB)[0];

export default function TicketDashboard({ usersDB }: { usersDB: UserDB }) {
  const [users, setUsers] = useState([]);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  console.log("selected ", selectedKeys);
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  //   const [Filter, setFilter] = React.useState<Selection>("all");
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
  const [importedData, setImportedData] = useState<UserDB[]>([]);

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

  useEffect(() => {
    if (importedData.length) {
      setUsers(importedData);
    }
  }, [importedData]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];
    // console.log(statusFilter);
    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    console.log(filteredUsers);
    return filteredUsers;
  }, [users, hasSearchFilter, filterValue]);

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
    usersDB = newUsers;
    setUsers(newUsers);
  };

  const renderCell = React.useCallback(
    (user: UserDB, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof UserDB];

      switch (columnKey) {
        case "employeeid":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
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
        case "sign":
          return (
            <User
              avatarProps={{ radius: "lg", src: user.sign }}
              //   description={user.email}
              name=""
              className="font-medium"
            ></User>
          );
        case "mobilenumber":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
            </div>
          );
        case "department":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{cellValue}</p>
              <p className="text-bold text-tiny capitalize text-default-400 font-medium">
                {user.department}
              </p>
            </div>
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

  // --------------------------------------------------------------------------EXPORT/IMPORT Excel format----------------------------------------------------------------------
  // Handle Export

  const exportToExcel = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data); // Convert JSON data to Excel format
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1"); // Add worksheet to workbook

    XLSX.writeFile(workbook, `${fileName}.xlsx`); // Export the workbook
  };

  const handleExport = () => {
    exportToExcel(users, "UsersData");
  };

  // handle import

  const importFromExcel = (event) => {
    const file = event.target.files[0]; // Get the selected file
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result); // Read file data
      const workbook = XLSX.read(data, { type: "array" }); // Parse the Excel file

      const sheetName = workbook.SheetNames[0]; // Get the first sheet
      const worksheet = workbook.Sheets[sheetName]; // Get the worksheet
      const importedData = XLSX.utils.sheet_to_json(worksheet, {
        raw: false, //ensures that dates arent parsed as serial num
        dateNF: "yyyy-mm-dd", // format date as string
      }); // Convert worksheet to JSON
      console.log("file", importedData);

      // Column verification
      // Convert the sheet to JSON to work with the data
      const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const headers = sheetData[0]; // The first row will contain the headers
      const expectedHeaders = columns.map((column) => column.uid);
      const isValid = expectedHeaders
        .filter((header) => header !== "actions")
        .every((header) => headers.includes(header));
      if (isValid) {
        setUsers(importedData);
      } else {
        alert("ivalid file");
      }
    };

    reader.readAsArrayBuffer(file); // Read the file as an array buffer
  };
  const handleImport = (e) => {
    importFromExcel(e);
  };
  // TOP CONTENT

  const topContent = React.useMemo(() => {
    return (
      <div className=" flex flex-col gap-4   transition-all duration-1000 ease-in-out overflow-x-auto">
        <div className=" flex  justify-between gap-3 items-center  ">
          {/* <p className="hidden sm:flex text-sm font-semibold">
            Unsolved Tickets
          </p> */}
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
                <Button>
                  <FileUp />
                </Button>
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
            <Button
              as="label"
              htmlFor="import"
              variant="flat"
              className="rounded-full p-0"
            >
              <input
                id="import"
                type="file"
                accept=".xlsx, .xls"
                onChange={handleImport}
                className="hidden"
              />
              <Import />
            </Button>

            <Button
              onClick={handleExport}
              variant="flat"
              className="rounded-full p-0 w-auto"
            >
              <FileUp />
            </Button>
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
              New
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
          // <CreateNewWorkOrder onClose={() => setPopup(false)} />
          <AddUser onClose={() => setPopup(false)} setUsers={setUsers} />
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
