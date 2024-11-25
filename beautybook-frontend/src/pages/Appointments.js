import React, { useEffect, useMemo, useState } from "react";
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
import {
  addAppointment,
  deleteAppointment,
  fetchAppointments,
  resetAppointmentStatus,
  updateAppointment,
} from "../redux/appointment/appointment.actions";
import AppointmentModal from "../components/Modal/AppointmentModal";
import { fetchStaffs } from "../redux/staff/staff.actions";
import { jwtDecode } from "jwt-decode";

const AppointmentsTable = ({ appointmentState }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [isAdding, setIsAdding] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  //   const { user } = useSelector((state) => state.auth);
  //   const token = localStorage.getItem("token") || null;
  //   const decodedToken = token ? jwtDecode(token) : {};
  //   const userId = user?.id || decodedToken.id;
  const dispatch = useDispatch();
  const appointmentsData = useMemo(
    () => appointmentState.appointments,
    [appointmentState.appointments]
  );
  const data = useMemo(() => {
    return appointmentsData.map((item) => ({
      date: item.date,
      serviceName: item.service.name,
      servicePrice: item.service.price,
      serviceDuration: item.service.duration,
      staffName: item.staff.name,
      staffPhone: item.staff.phone,
      status: item.status,
      serviceId: item.serviceId,
      staffId: item.staffId,
      id: item.id,
      //   userId: item.userId,
    }));
  }, [appointmentsData]);
  const handleAddSubmit = (e) => {
    e.preventDefault();
    // dispatch(addAppointment({ ...appointment, userId }));
    dispatch(addAppointment(appointment)); // userId is added in the backend controller itself using the token
  };

  useEffect(() => {
    if (!appointmentState.loading) {
      if (appointmentState.error) {
        setShowModal(false);
        setShowDeleteModal(false);
        setToastMessage(appointmentState.error);
        setShowToast(true);
      } else if (appointmentState.successMessage || toastMessage) {
        setAppointment(null); // Reset the form
        setShowModal(false);
        setShowDeleteModal(false);
        setToastMessage(appointmentState.successMessage);
        setShowToast(true);
      }
    }
  }, [
    appointmentState.loading,
    appointmentState.error,
    appointmentState.successMessage,
    dispatch,
    toastMessage,
  ]);

  // Reset state when navigating away
  useEffect(() => {
    return () => {
      dispatch(resetAppointmentStatus());
    };
  }, [dispatch]);
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAppointment(appointment));
    setAppointment(null);
  };

  const handleDeleteConfirm = async (e) => {
    e.preventDefault();
    dispatch(deleteAppointment(selectedAppointment.id));
    setSelectedAppointment(null);
  };

  const columnHelper = createMRTColumnHelper();
  const columns = [
    columnHelper.accessor("date", {
      id: "date",
      header: "Date",
      enableClickToCopy: true,
      size: 250,
      filterVariant: "date",
      filterFn: "between",
      sortingFn: "datetime",
      accessorFn: (row) => new Date(row.date),
      Cell: ({ cell }) => cell.getValue()?.toLocaleString(),
    }),
    columnHelper.accessor("serviceName", {
      id: "serviceName",
      header: "Service Name",
      enableClickToCopy: true,
      size: 300,
    }),
    columnHelper.accessor("servicePrice", {
      id: "servicePrice",
      header: "Service Price",
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
    columnHelper.accessor("serviceDuration", {
      id: "serviceDuration",
      header: "Service Duration",
      enableClickToCopy: true,
      size: 300,
      Cell: ({ cell }) => {
        const value = cell?.getValue()?.toLocaleString("en-US", {
          style: "decimal",
        });
        return <div style={{ textAlign: "right" }}>{value} minutes</div>;
      },
    }),
    columnHelper.accessor("staffName", {
      id: "staffName",
      header: "Staff Name",
      enableClickToCopy: true,
      size: 300,
    }),
    columnHelper.accessor("staffPhone", {
      id: "staffPhone",
      header: "Staff Phone",
      enableClickToCopy: true,
      size: 300,
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: "Status",
      enableClickToCopy: true,
      size: 300,
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
    muiToolbarAlertBannerProps: appointmentState.error
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    state: {
      isLoading: appointmentState.loading,
    },
    renderRowActionMenuItems: ({ closeMenu, row }) => [
      <MenuItem
        key={0}
        onClick={() => {
          // update staff logic...
          setSelectedAppointment(row.original);
          setAppointment(row.original);
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
          setSelectedAppointment(row.original);
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
                "Appointments"
              )
            }
            startIcon={<FileDownloadIcon />}
          >
            Export All Rows
          </Button>
          <Button
            disabled={table.getRowModel().rows.length === 0}
            onClick={() =>
              handleExportRows(
                table.getRowModel().rows,
                columns,
                "Appointments"
              )
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
                Add Appointment
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
      <AppointmentModal
        showModal={showModal}
        setShowModal={setShowModal}
        appointment={appointment}
        setAppointment={setAppointment}
        handleAddSubmit={handleAddSubmit}
        handleUpdateSubmit={handleUpdateSubmit}
        isAdding={isAdding}
        errorMessage={appointmentState.error}
        resetStatus={resetAppointmentStatus}
        resetSelectedItem={() => {
          setSelectedAppointment(null);
          setAppointment(null);
        }}
      />
      {showToast && (
        <SuccessToast
          message={toastMessage}
          showToast={showToast}
          setShowToast={setShowToast}
          isSuccess={appointmentState.error === null}
          resetStatus={resetAppointmentStatus}
        />
      )}

      {
        /* Delete Modal */

        showDeleteModal && (
          <DeleteModal
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            handleDeleteConfirm={handleDeleteConfirm}
            deletedItemName={"Appointment"}
          />
        )
      }
      {appointmentState.error && (
        <Alert variant="danger">{appointmentState.error}</Alert>
      )}
    </>
  );
};
const Appointments = () => {
  const dispatch = useDispatch();
  const appointmentState = useSelector((state) => state.appointment);
  useEffect(() => {
    dispatch(fetchAppointments());
    dispatch(fetchServices());
    dispatch(fetchStaffs());
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
        {appointmentState.appointments ? (
          <AppointmentsTable appointmentState={appointmentState} />
        ) : (
          <>"no data"</>
        )}
      </LocalizationProvider>
    </Box>
  );
};

export default Appointments;
