import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const generateExcel = (csvData) => {
  console.log("xcl",csvData);
  
  const lines = csvData.trim()?.split("\n");
  const headers = lines[0].split(",");
  const body = lines.slice(1).map((line) => line.split(","));

  const workbook = XLSX.utils.book_new();

  const worksheetData = [headers, ...body];
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, "report.xlsx");
};
