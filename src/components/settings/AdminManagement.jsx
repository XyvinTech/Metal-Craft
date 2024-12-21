import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledButton } from "../../ui/StyledButton";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import StyledSearchbar from "../../ui/StyledSearchbar";
import StyledTable from "../StyledTable";
import { useNavigate } from "react-router-dom";
import { adminColumn } from "../../json/TableData";
import { useListStore } from "../../store/listStore";
import { toast } from "react-toastify";
import { useAdminStore } from "../../store/adminStore";

const AdminManagement = () => {
  const navigate = useNavigate();
  const [isChange, setIsChange] = useState(false);
  const { getAdmins } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const { deleteAdmins } = useAdminStore();
  useEffect(() => {
    let filter = {};
    filter.pageNo = pageNo;
    filter.limit = row;
    if (search) {
      filter.search = search;
      setPageNo(1);
    }
    getAdmins(filter);
  }, [isChange, pageNo, search, row]);
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      try {
        await Promise.all(selectedRows?.map((id) => deleteAdmins(id)));
        toast.success("Deleted successfully");
        setIsChange(!isChange);
        setSelectedRows([]);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  const handleRowDelete = async (id) => {
    try {
      await deleteAdmins(id);
      toast.success("Deleted successfully");
      setIsChange(!isChange);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleEdit = (id) => {
    navigate(`/settings/add-admin`, {
      state: { adminId: id, isUpdate: true },
    });
  };
  return (
    <>
      <Stack justifyContent={"flex-end"} direction={"row"} spacing={2}>
        <StyledSearchbar
          placeholder={"Search"}
          onchange={(e) => setSearch(e.target.value)}
        />
        <StyledButton
          variant={"primary"}
          name={
            <>
              <Icon path={mdiPlus} size={1} />
              Add Admin
            </>
          }
          onClick={() => navigate("/settings/add-admin")}
        />
      </Stack>
      <Box paddingTop={"15px"}>
        <Box
          borderRadius={"16px"}
          bgcolor={"white"}
          p={1}
          border={"1px solid rgba(0, 0, 0, 0.12)"}
        >
          <StyledTable
            columns={adminColumn}
            pageNo={pageNo}
            setPageNo={setPageNo}
            rowPerSize={row}
            setRowPerSize={setRow}
            onSelectionChange={handleSelectionChange}
            onDelete={handleDelete}
            onDeleteRow={handleRowDelete}
            onModify={handleEdit}
          />
        </Box>
      </Box>
    </>
  );
};

export default AdminManagement;
