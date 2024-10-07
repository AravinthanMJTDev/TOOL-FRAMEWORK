// Define the columns for the work order table
const columnsForToolRoomWorkOrder = [
  { name: "ID", uid: "id", sortable: true },
  { name: "WORKORDERSTAGE", uid: "workorderstage" },
  { name: "DATE", uid: "date" },
  { name: "SHIFT", uid: "shift" },
  { name: "PARTNAME", uid: "partname" },
  { name: "STATUS", uid: "status" },
  { name: "REASONFORUNLOAD", uid: "reasonforunload" },
  { name: "SHOTCOUNT", uid: "shotcount" },
  { name: "DESCRIPTIONOFWORKREQUEST", uid: "descriptionofworkrequest" },
  { name: "ACTIONS", uid: "actions" },
];

// Update the interface for the work order data to reflect individual entries
export interface columnsForToolRoomWorkOrderType {
  id: number;
  workorderstage: string;
  date: string;
  shift: string;
  status: string;
  partname: string;
  reasonforunload: string;
  shotcount: number;
  descriptionofworkrequest: string;
}

// Correct the data type to reflect an array of work orders
const dataForToolRoomWorkOrder: columnsForToolRoomWorkOrderType[] = [
  {
    id: 1,
    workorderstage: "WO-06-01",
    date: "Today",
    shift: "Afternoon",
    partname: "IO Toggle-D5-NEW",
    reasonforunload: "",
    status: "new",
    shotcount: 39199,
    descriptionofworkrequest: "good",
  },
  {
    id: 2,
    workorderstage: "WO-06-01",
    date: "Today",
    shift: "Afternoon",
    partname: "IO Toggle-D5-NEW",
    reasonforunload: "",
    status: "part yet to be recieved",
    shotcount: 39199,
    descriptionofworkrequest: "good",
  },
  {
    id: 3,
    workorderstage: "WO-06-01",
    date: "Today",
    shift: "Afternoon",
    partname: "IO Toggle-D5-NEW",
    reasonforunload: "",
    status: "new",
    shotcount: 39199,
    descriptionofworkrequest: "good",
  },
  {
    id: 4,
    workorderstage: "WO-06-01",
    date: "Today",
    shift: "Afternoon",
    partname: "IO Toggle-D5-NEW",
    reasonforunload: "",
    status: "quality approval",
    shotcount: 39199,
    descriptionofworkrequest: "good",
  },
  {
    id: 5,
    workorderstage: "WO-06-01",
    date: "Today",
    shift: "Afternoon",
    partname: "IO Toggle-D5-NEW",
    reasonforunload: "",
    status: "new",
    shotcount: 39199,
    descriptionofworkrequest: "good",
  },
  {
    id: 6,
    workorderstage: "WO-06-01",
    date: "Today",
    shift: "Afternoon",
    partname: "IO Toggle-D5-NEW",
    reasonforunload: "",
    status: "part recieved",
    shotcount: 39199,
    descriptionofworkrequest: "good",
  },
  {
    id: 7,
    workorderstage: "WO-06-01",
    date: "Today",
    shift: "Afternoon",
    partname: "IO Toggle-D5-NEW",
    reasonforunload: "",
    status: "work ongoing",
    shotcount: 39199,
    descriptionofworkrequest: "good",
  },
  {
    id: 8,
    workorderstage: "WO-06-01",
    date: "Today",
    shift: "Afternoon",
    partname: "IO Toggle-D5-NEW",
    reasonforunload: "",
    status: "work ongoing",
    shotcount: 39199,
    descriptionofworkrequest: "good",
  },
  {
    id: 9,
    workorderstage: "WO-06-01",
    date: "Today",
    shift: "Afternoon",
    partname: "IO Toggle-D5-NEW",
    reasonforunload: "",
    status: "part yet to be recieved",
    shotcount: 39199,
    descriptionofworkrequest: "good",
  },
  {
    id: 10,
    workorderstage: "WO-06-01",
    date: "Today",
    shift: "Afternoon",
    partname: "IO Toggle-D5-NEW",
    reasonforunload: "",
    status: "part recieved",
    shotcount: 39199,
    descriptionofworkrequest: "good",
  },
];

export { columnsForToolRoomWorkOrder, dataForToolRoomWorkOrder };
