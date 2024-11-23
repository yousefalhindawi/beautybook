import React, { useEffect, useState } from "react";
//MRT Imports
import {
  createMRTColumnHelper,
  MaterialReactTable,
  // MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
  useMaterialReactTable,
} from "material-react-table";
//Material UI Imports
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  // Modal,
  // lighten,
} from "@mui/material";

import { Alert, Form, Modal } from "react-bootstrap";

//Icons Imports
import { AccountCircle, Send } from "@mui/icons-material";
//Mock Data
// import { data } from "./makeData";

//Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useDispatch, useSelector } from "react-redux";
import {
  addStaff,
  deleteStaff,
  fetchStaffs,
  resetStaffStatus,
  updateStaff,
} from "../redux/staff/staff.actions";
// import AddStaffModal from "../components/Modal/StaffModal";
import SuccessToast from "../components/Modal/SuccessToast";
import StaffModal from "../components/Modal/StaffModal";
import DeleteModal from "../components/Modal/DeleteModal";
import handleExportRows from "../utils/handleExportRows";

const StaffTable = ({ staffState }) => {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [staff, setStaff] = useState(null);
  const [isAdding, setIsAdding] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const data = staffState.staffs;
  console.log("StaffTable", data);
  console.log("Staffstaff", staff);
  const handleAddSubmit = (e) => {
    e.preventDefault();
    dispatch(addStaff(staff));
    // if (staffState.error === null && staffState.loading === false) {
    //   setShowModal(false);
    //   setToastMessage("Staff Added Successfully");
    //   setShowToast(true);
    // }
  };

  useEffect(() => {
    if (!staffState.loading) {
      if (staffState.error) {
        setShowModal(false);
        setShowDeleteModal(false);
        setToastMessage(staffState.error);
        setShowToast(true);
      } else if (staffState.successMessage || toastMessage) {
        setStaff(null); // Reset the form
        setShowModal(false);
        setShowDeleteModal(false);
        setToastMessage(staffState.successMessage);
        setShowToast(true);
      }
    }
  }, [
    staffState.loading,
    staffState.error,
    staffState.successMessage,
    dispatch,
    toastMessage,
  ]);

  // Reset state when navigating away
  useEffect(() => {
    return () => {
      dispatch(resetStaffStatus());
    };
  }, [dispatch]);
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(updateStaff(staff));
    setStaff(null);
    // if (staffState.error === null && staffState.loading === false) {
    //   setStaff(null);
    //   setShowModal(false);
    //   setToastMessage("Staff updated successfully!");
    //   setShowToast(true);
    // }
  };

  const handleDeleteConfirm = async (e) => {
    e.preventDefault();
    await dispatch(deleteStaff(selectedStaff.id));
    setSelectedStaff(null);
    // if (!staffState.error && !staffState.loading) {
    //   setSelectedStaff(null);
    //   setShowDeleteModal(false);
    //   setToastMessage("Staff deleted successfully!");
    //   setShowToast(true);
    // }
  };

  // const handleExportRows = (rows) => {
  //   const doc = new jsPDF();
  //   const tableData = rows.map((row) => Object.values(row.original));
  //   const tableHeaders = columns.map((c) => c.header);
  //   console.log("tableData", tableData);
  //   console.log("tableHeaders", tableHeaders);
  //   autoTable(doc, {
  //     head: [tableHeaders],
  //     body: tableData,
  //   });
  //   console.log("doc", doc);
  //   doc.save(`staff-${new Date().toISOString().slice(0, 10)}.pdf`);
  // };
  const columnHelper = createMRTColumnHelper();
  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      enableClickToCopy: true,
      size: 250,
    }),
    columnHelper.accessor("email", {
      header: "Email",
      enableClickToCopy: true,
      size: 300,
    }),
    columnHelper.accessor("phone", {
      header: "Phone",
      enableClickToCopy: true,
      size: 300,
    }),
  ];
  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: true,
    // columnFilterDisplayMode: 'popover',
    enableColumnOrdering: true,
    enableRowActions: true,
    // enableRowSelection: true,
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "top",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "primary",
      rowsPerPageOptions: [10, 20, 30],
      shape: "rounded",
      variant: "outlined",
    },
    rowCount: data?.length || 0,
    muiToolbarAlertBannerProps: staffState.error
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    state: {
      isLoading: staffState.loading,
    },
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <MenuItem
        key={0}
        onClick={() => {
          // update staff logic...
          setSelectedStaff(row.original);
          setStaff(row.original);
          setIsAdding(false);
          setShowModal(true);
          console.log("Update", row.original);
          console.log("Update", data);
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        Update
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          // Delete staff logic...
          console.log("Delete", row.original);
          setSelectedStaff(row.original);
          setShowDeleteModal(true);
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Send />
        </ListItemIcon>
        Delete
      </MenuItem>,
    ],
    renderTopToolbarCustomActions: ({ table }) => {
      const handleAddStaff = () => {
        // alert("handleAddStaff ");
        console.log("handleAddStaff");
        setIsAdding(true);
        setShowModal(true);
        // dispatch(addStaff());
      };
      return (
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            padding: "8px",
            flexWrap: "wrap",
          }}
        >
          {/* <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}> */}
            {/* import MRT sub-components */}
            {/* <MRT_GlobalFilterTextField table={table} /> */}
            {/* <MRT_ToggleFiltersButton table={table} /> */}
          {/* </Box> */}
          <Button
            disabled={table.getPrePaginationRowModel().rows.length === 0}
            //export all rows, including from the next page, (still respects filtering and sorting)
            onClick={() =>
              handleExportRows(table.getPrePaginationRowModel().rows, columns, "staff")
            }
            startIcon={<FileDownloadIcon />}
          >
            Export All Rows
          </Button>
          <Button
            disabled={table.getRowModel().rows.length === 0}
            //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
            onClick={() => handleExportRows(table.getRowModel().rows, columns, "staff")}
            startIcon={<FileDownloadIcon />}
          >
            Export Page Rows
          </Button>
          <Box>
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              <Button
                color="primary"
                onClick={handleAddStaff}
                variant="outlined"
              >
                Add Staff
              </Button>
            </Box>
          </Box>
        </Box>
      );
    },
  });

  return (
    <>
      <MaterialReactTable table={table} />
      {/* Add Modal */}
      <StaffModal
        showModal={showModal}
        setShowModal={setShowModal}
        staff={staff}
        setStaff={setStaff}
        handleAddSubmit={handleAddSubmit}
        handleUpdateSubmit={handleUpdateSubmit}
        isAdding={isAdding}
        errorMessage={staffState.error}
        resetStatus={resetStaffStatus}
        resetSelectedItem={() => {
          setSelectedStaff(null);
          setStaff(null);
        }}
      />
      {showToast && (
        <SuccessToast
          message={toastMessage}
          showToast={showToast}
          setShowToast={setShowToast}
          isSuccess={staffState.error === null}
          resetStatus={resetStaffStatus}
        />
      )}

      {
        /* Delete Modal */

        showDeleteModal && (
          <DeleteModal
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            handleDeleteConfirm={handleDeleteConfirm}
            deletedItemName={"staff"}
          />
        )
      }
      {staffState.error && <Alert variant="danger">{staffState.error}</Alert>}
    </>
  );
};

const Staffs = () => {
  const dispatch = useDispatch();
  const staffState = useSelector((state) => state.staff);
  // const staffs = useMemo(() => {
  //   return staffState.staffs;
  // }, [staffState.staffs]);

  console.log("staffssssss", staffState);
  useEffect(() => {
    const fetchStaff = async () => {
      await dispatch(fetchStaffs());
    };
    fetchStaff();
  }, [dispatch]);
  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {staffState.staffs ? (
          <StaffTable staffState={staffState} />
        ) : (
          <>"no data"</>
        )}
      </LocalizationProvider>
    </Box>
  );
};

export default Staffs;
