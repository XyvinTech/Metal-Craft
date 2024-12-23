export const userColumns = [
  { title: "Unit", field: "unit", padding: "none" },
  { title: "Line No", field: "lineNo" },
  { title: "Line Location", field: "lineLocation" },
  { title: "Area Line Sheet", field: "areaLineSheetIdent" },
  { title: "Area", field: "area" },
  { title: "Line", field: "line" },
  { title: "Sheet", field: "sheet" },
  { title: "Ident Code", field: "identCode" },
  { title: "UOM", field: "uom" },
  { title: "Size", field: "size" },
  { title: "Size Two", field: "sizeTwo" },
  { title: "Spec Code", field: "specCode" },
  { title: "Short Code", field: "shortCode" },
  { title: "Category", field: "cat" },
  { title: "Short Description", field: "shortDesc" },
  { title: "MTO Revision", field: "mtoRev" },
  { title: "SF", field: "sf" },
  { title: "Scope Quantity", field: "scopeQty" },
  {
    title: "Issued Quantity (Assignment)",
    field: "issuedQtyAss",
    editable: true,
  },
  { title: "Issued Date", field: "issuedDate", editable: true },
  { title: "Balance to Issue", field: "balToIssue" },
  { title: "Consumed Quantity", field: "consumedQty", editable: true },
  { title: "Balance Stock", field: "balanceStock" },
  { title: "Created At", field: "createdAt" },
  { title: "Updated At", field: "updatedAt" },
];

export const adminColumn = [
  { title: "Name", field: "name" },
  { title: "Email", field: "email" },
  { title: "Phone", field: "phone" },
  { title: "Created At", field: "createdAt" },
  { title: "Status", field: "status" },
];
export const summaryColumn = [
  { title: "Date", field: "_id", padding: "none" },
  { title: "Sender", field: "name" },
  { title: "Receiver", field: "memberName" },
  { title: "Request Type", field: "type" },
  { title: "Status", field: "status" },
];

export const activityColumn = [
  { title: "Host", field: "host" },
  { title: "Agent", field: "agent" },
  { title: "Old Issued Quantity", field: "oldIssuedQtyAss" },
  { title: "Old Issued Date", field: "oldIssuedDate" },
  { title: "Issued", field: "issued" },
  { title: "New Issued Quantity", field: "newIssuedQtyAss" },
  { title: "New Issued Date", field: "newIssuedDate" },
  { title: "Description", field: "description" },
  { title: "Area Line Sheet Identifier", field: "areaLineSheetIdent" },
  { title: "Created At", field: "createdAt" },
];
