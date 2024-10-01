"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
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
  Selection,
  SortDescriptor,
  Pagination,
} from "@nextui-org/react";

import { columnsForPart } from "../../../Data/SettingsWorkOrderData/page";
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

import { partDB } from "../types";
import Part from "./addNewPart";
import EditForm from "./EditForm";

const INITIAL_VISIBLE_COLUMNS = [
  "Part_No",
  "name",
  "manufacturingDate",
  "customerName",

  "actions",
];

// Define the User type if needed
// type User = (typeof partsDB)[0];

export default function PartDashBoard({
  partDataBase,
}: {
  partDataBase: partDB;
}) {
  const [parts, setParts] = useState<partDB[]>([]);
  console.log("set parts ", parts);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [popup, setPopup] = useState(false);
  const [page, setPage] = useState(1);
  const hasSearchFilter = Boolean(filterValue);
  const [menuExpand, setMenuExpand] = useState(false);
  const [editForm, setEditForm] = useState<number>(0);
  const [showAll, setShowAll] = useState<boolean>(false);
  useEffect(() => {
    setParts(partDataBase);
  }, [partDataBase]);

  const headerColumns = useMemo(() => {
    if (visibleColumns.has("all")) return columnsForPart;

    return columnsForPart.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredParts = [...parts];
    if (hasSearchFilter) {
      filteredParts = filteredParts.filter((part) =>
        part.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredParts;
  }, [parts, hasSearchFilter, filterValue]);

  // Pagination
  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: partDB, b: partDB) => {
      const aValue = a[sortDescriptor.column as keyof partDB];
      const bValue = b[sortDescriptor.column as keyof partDB];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDescriptor.direction === "descending"
          ? bValue - aValue
          : aValue - bValue;
      }

      // Add more type checks if necessary
      return 0;
    });
  }, [sortDescriptor, items]);

  // Handle Delete
  const handleDelete = useCallback(() => {
    const newParts = parts.filter(
      (part) => !selectedKeys.has(part.id.toString())
    );
    setSelectedKeys(new Set());
    setParts(newParts);
  }, [parts, selectedKeys]);
  console.log("showAll:", showAll);
  //handle toogle names
  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("Button clicked, current showAll:", showAll);
    setShowAll((prev) => !prev);
  };

  const renderCell = useCallback(
    (id: number, part: partDB, columnKey: React.Key) => {
      const cellValue = part[columnKey as keyof partDB];

      switch (columnKey) {
        case "Part_No":
        case "name":
        case "openingShots":
        case "totalShots":
        case "avgMeantimeBWFailure":
        case "totalCost":
          return (
            <div className="flex flex-col">
              <p className=" text-sm capitalize">{cellValue}</p>
            </div>
          );
        case "historyOfPart":
          return (
            <div className="relative flex justify-start items-center gap-2 overflow-auto whitespace-nowrap">
              {cellValue.map((value, index) => (
                <p key={index} className="mr-1">
                  {value}
                  {index < cellValue.length - 1 ? "," : ""}
                </p>
              ))}
            </div>
          );
        case "customerName":
          return (
            <div className="relative flex justify-start items-center gap-2 overflow-auto whitespace-nowrap">
              {cellValue.length > 2 ? (
                <>
                  {cellValue.slice(0, 2).map((value, index) => (
                    <p key={index} className="mr-1">
                      {value}
                      {index < cellValue.length - 1 ? "," : ""}
                    </p>
                  ))}
                  <button onClick={handleToggle} className="mr-1 text-blue-500">
                    ...
                  </button>
                  {showAll &&
                    cellValue.slice(2).map((value, index) => (
                      <p key={index + 2} className="mr-1">
                        {value}
                        {index < cellValue.length - 1 ? "," : ""}
                      </p>
                    ))}
                </>
              ) : (
                cellValue.map((value, index) => (
                  <p key={index} className="mr-1">
                    {value}
                    {index < cellValue.length - 1 ? "," : ""}
                  </p>
                ))
              )}
            </div>
          );
        case "actions":
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <Ellipsis className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem onClick={() => setEditForm(id)}>
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
    [showAll]
  );

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage((prev) => prev + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const capitalize = (str: string) => {
    if (typeof str !== "string") return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // TOP CONTENT
  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 transition-all duration-1000 ease-in-out overflow-x-auto">
        <div className="flex justify-between gap-3 items-center">
          <Input
            isClearable
            className="min-w-[40%] sm:w-[10%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <div className="flex sm:hidden">
            <Menu onClick={() => setMenuExpand(true)} />
            {menuExpand && (
              <div
                className={`fixed top-0 left-0 h-full w-1/2 bg-neutral-100 z-50 transition-transform duration-300 ease-in-out ${
                  menuExpand ? "translate-x-0" : "-translate-x-full"
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
                    {columnsForPart.map((column) => (
                      <DropdownItem key={column.uid} className="capitalize">
                        {capitalize(column.name)}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>

                <Button onClick={() => setPopup(true)} className="w-full mt-2">
                  Add New
                </Button>
                <Button
                  onClick={handleDelete}
                  isDisabled={selectedKeys.size === 0}
                  className="w-full mt-2"
                  color="danger"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* MEDIUM SCREEN CONTENT */}
          <div className="hidden sm:flex md:flex gap-3">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                  startContent={<Filter />}
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
                {columnsForPart.map((column) => (
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
        {popup && <Part onClose={() => setPopup(false)} setparts={setParts} />}
        {editForm >= 0 && (
          <EditForm
            id={editForm}
            onClose={() => setEditForm(-1)}
            setParts={setParts}
          />
        )}

        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {parts.length} parts
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small ml-2"
              onChange={onRowsPerPageChange}
              value={rowsPerPage}
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
    visibleColumns,
    handleDelete,
    selectedKeys.size,
    popup,
    parts.length,
    onRowsPerPageChange,
    onClear,
    setParts,
    editForm,
  ]);

  // BOTTOM CONTENT
  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex flex-wrap justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys.size === parts.length
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>

        <Pagination
          classNames={{
            wrapper: "flex flex-row",
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
            isDisabled={page === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={page === pages || pages === 0}
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
    selectedKeys.size,
    parts.length,
    filteredItems.length,
    page,
    pages,
    onPreviousPage,
    onNextPage,
  ]);

  return (
    <Table
      aria-label="Parts Dashboard"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
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
      <TableBody emptyContent="No parts found" items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell key={`${item.id}-${String(columnKey)}`}>
                {renderCell(item.id, item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
