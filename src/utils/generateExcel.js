import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const generateExcel = (csvData) => {

  // Parse CSV properly using XLSX
  const workbook = XLSX.read(csvData, { type: "string", raw: false });

  // Get first sheet name
  const sheetName = workbook.SheetNames[0];

  // Convert sheet to JSON
  const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
    header: 1, // Keep headers as an array
    defval: "", // Prevent undefined values
  });

  // Create new workbook
  const newWorkbook = XLSX.utils.book_new();
  const newWorksheet = XLSX.utils.aoa_to_sheet(jsonData);

  XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, "Report");


  const buffer = XLSX.write(newWorkbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, "report.xlsx");
};
