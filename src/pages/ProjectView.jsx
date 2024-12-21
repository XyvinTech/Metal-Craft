import React, { useState } from "react";
import StyledDataTable from "../ui/StyledDataTable";
import { userColumns, userData } from "../Layout/TableData";

const ProjectView = () => {
  const [row, setRow] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [total, setTotal] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  return (
    <>
      <StyledDataTable
        data={userData}
        columns={userColumns}
        pageNo={pageNo}
        setPageNo={setPageNo}
        rowPerSize={row}
        setRowPerSize={setRow}
        totalCount={total}
        onSelectionChange={handleSelectionChange}
      />
    </>
  );
};

export default ProjectView;
