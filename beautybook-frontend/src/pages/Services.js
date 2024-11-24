import React, { useEffect, useState } from "react";
//MRT Imports
import {
  createMRTColumnHelper,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
//Material UI Imports
import { Box, Button, ListItemIcon, MenuItem } from "@mui/material";

import { Alert } from "react-bootstrap";

//Icons Imports
import { AccountCircle, Send } from "@mui/icons-material";
//Mock Data
// import { data } from "./makeData";

//Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useDispatch, useSelector } from "react-redux";
import SuccessToast from "../components/Modal/SuccessToast";
import DeleteModal from "../components/Modal/DeleteModal";
import {
  addService,
  deleteService,
  fetchServices,
  resetServiceStatus,
  updateService,
} from "../redux/service/service.actions";
import handleExportRows from "../utils/handleExportRows";
import ServiceModal from "../components/Modal/ServiceModal";

const ServicesTable = ({ serviceState }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [service, setService] = useState(null);
  const [isAdding, setIsAdding] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const data = serviceState.services;
  const handleAddSubmit = (e) => {
    e.preventDefault();
    dispatch(addService(service));
  };

  useEffect(() => {
    if (!serviceState.loading) {
      if (serviceState.error) {
        setShowModal(false);
        setShowDeleteModal(false);
        setToastMessage(serviceState.error);
        setShowToast(true);
      } else if (serviceState.successMessage || toastMessage) {
        setService(null); // Reset the form
        setShowModal(false);
        setShowDeleteModal(false);
        setToastMessage(serviceState.successMessage);
        setShowToast(true);
      }
    }
  }, [
    serviceState.loading,
    serviceState.error,
    serviceState.successMessage,
    dispatch,
    toastMessage,
  ]);

  // Reset state when navigating away
  useEffect(() => {
    return () => {
      dispatch(resetServiceStatus());
    };
  }, [dispatch]);
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(updateService(service));
    setService(null);
  };

  const handleDeleteConfirm = async (e) => {
    e.preventDefault();
    dispatch(deleteService(selectedService.id));
    setSelectedService(null);
  };

  const columnHelper = createMRTColumnHelper();
  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      enableClickToCopy: true,
      size: 250,
    }),
    columnHelper.accessor("description", {
      header: "Description",
      enableClickToCopy: true,
      size: 300,
    }),
    columnHelper.accessor("price", {
      header: "Price",
      enableClickToCopy: true,
      size: 300,
      //   filterVariant: "range",
      filterFn: "between",
      Cell: ({ cell }) => {
        const value = cell?.getValue()?.toLocaleString("en-US", {
          style: "currency",
          currency: "JOD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return <div style={{ textAlign: "right" }}>{value}</div>;
      },
    }),
    columnHelper.accessor("duration", {
      header: "Duration",
      enableClickToCopy: true,
      size: 300,
      Cell: ({ cell }) => {
        const value = cell?.getValue()?.toLocaleString("en-US", {
          style: "decimal",
        });
        return <div style={{ textAlign: "right" }}>{value} minutes</div>;
      },
    }),
  ];
  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableRowActions: true,
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
    muiToolbarAlertBannerProps: serviceState.error
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    state: {
      isLoading: serviceState.loading,
    },
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <MenuItem
        key={0}
        onClick={() => {
          // update staff logic...
          setSelectedService(row.original);
          setService(row.original);
          setIsAdding(false);
          setShowModal(true);
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
          setSelectedService(row.original);
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
        setIsAdding(true);
        setShowModal(true);
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
          <Button
            disabled={table.getPrePaginationRowModel().rows.length === 0}
            onClick={() =>
              handleExportRows(
                table.getPrePaginationRowModel().rows,
                columns,
                "Services"
              )
            }
            startIcon={<FileDownloadIcon />}
          >
            Export All Rows
          </Button>
          <Button
            disabled={table.getRowModel().rows.length === 0}
            onClick={() =>
              handleExportRows(table.getRowModel().rows, columns, "Services")
            }
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
      {/* Modal */}
      <ServiceModal
        showModal={showModal}
        setShowModal={setShowModal}
        service={service}
        setService={setService}
        handleAddSubmit={handleAddSubmit}
        handleUpdateSubmit={handleUpdateSubmit}
        isAdding={isAdding}
        errorMessage={serviceState.error}
        resetStatus={resetServiceStatus}
        resetSelectedItem={() => {
          setSelectedService(null);
          setService(null);
        }}
      />
      {showToast && (
        <SuccessToast
          message={toastMessage}
          showToast={showToast}
          setShowToast={setShowToast}
          isSuccess={serviceState.error === null}
          resetStatus={resetServiceStatus}
        />
      )}

      {
        /* Delete Modal */

        showDeleteModal && (
          <DeleteModal
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            handleDeleteConfirm={handleDeleteConfirm}
            deletedItemName={"Service"}
          />
        )
      }
      {serviceState.error && (
        <Alert variant="danger">{serviceState.error}</Alert>
      )}
    </>
  );
};
const Services = () => {
  const dispatch = useDispatch();
  const serviceState = useSelector((state) => state.service);
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);
  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        minHeight: "100vh",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {serviceState.services ? (
          <ServicesTable serviceState={serviceState} />
        ) : (
          <>"no data"</>
        )}
      </LocalizationProvider>
    </Box>
  );
};

export default Services;
