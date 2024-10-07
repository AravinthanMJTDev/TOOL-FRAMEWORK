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
  Chip,
  SortDescriptor,
  Pagination,
} from "@nextui-org/react";

import { columnsForPart } from "../../../Data/SettingsWorkOrderData/page";
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
import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import { parse, unparse } from "papaparse";
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
  const [importedData, setImportedData] = useState<partDB[]>([]);
  useEffect(() => {
    setParts(partDataBase);
  }, [partDataBase]);
  useEffect(() => {
    if (importedData.length) {
      setParts(importedData);
    }
  }, [importedData]);

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
  // --------------------------------------------------------------------------EXPORT/IMPORT Excel format----------------------------------------------------------------------
  // Handle Export
  const convertListToString = (data) => {
    return data.map((part) => ({
      ...part,
      customerName: part.customerName.join(", "), // Convert array to comma-separated string
      historyOfPart: part.historyOfPart.join(","),
    }));
  };
  const exportToExcel = (data, fileName) => {
    const formattedData = convertListToString(data); // Convert arrays before exporting
    const worksheet = XLSX.utils.json_to_sheet(formattedData); // Convert JSON data to Excel format
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1"); // Add worksheet to workbook

    XLSX.writeFile(workbook, `${fileName}.xlsx`); // Export the workbook
  };

  const handleExport = () => {
    exportToExcel(parts, "PartsData");
  };

  // handle import
  function convertDateAndFormat(dateStr) {
    const date = new Date(dateStr);
    console.log(date, " ", dateStr);
    // Format to "yyyy-mm-dd"
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }
  const convertStringToArray = (data) => {
    return data.map((part) => ({
      ...part,
      manufacturingDate: convertDateAndFormat(part.manufacturingDate),
      customerName: part.customerName.split(",").map((name) => name.trim()), // Split string back into array
      historyOfPart: part.historyOfPart
        .split(",")
        .map((history) => history.trim()),
    }));
  };
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
      const formatImportedData = convertStringToArray(importedData);
      // Column verification
      // Convert the sheet to JSON to work with the data
      const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const headers = sheetData[0]; // The first row will contain the headers
      const expectedHeaders = columnsForPart.map((column) => column.uid);
      const isValid = expectedHeaders
        .filter((header) => header !== "actions")
        .every((header) => headers.includes(header));
      if (isValid) {
        setParts(formatImportedData);
      } else {
        alert("ivalid file");
      }
    };

    reader.readAsArrayBuffer(file); // Read the file as an array buffer
  };
  const handleImport = (e) => {
    importFromExcel(e);
  };

  //Remove name
  const removeName = (id: number, value: string) => {
    setParts((prevParts) =>
      prevParts.map((part) => {
        if (part.id === id) {
          return {
            ...part,
            customerName: part.customerName.filter((name) => name !== value),
          };
        }
        return part;
      })
    );
  };

  const renderCell = useCallback(
    (id: number, part: partDB, columnKey: React.Key) => {
      const cellValue = part[columnKey as keyof partDB];
      console.log("cellValue:", cellValue);
      console.log("cellValue type:", typeof cellValue);

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
            <div className="flex gap-2">
              {cellValue.map((value, index) => (
                <Chip
                  key={index}
                  onClose={() => removeName(id, value)}
                  variant="flat"
                >
                  {value}
                </Chip>
              ))}
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
                  New
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
            <Button as="label" htmlFor="import" variant="flat">
              <input
                id="import"
                type="file"
                accept=".xlsx, .xls"
                onChange={handleImport}
                className="hidden"
              />
              <Import />
            </Button>

            <Button onClick={handleExport} variant="flat">
              <FileUp />
            </Button>
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
