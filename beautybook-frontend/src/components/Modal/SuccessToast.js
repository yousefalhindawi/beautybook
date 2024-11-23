import { Toast, ToastContainer } from "react-bootstrap";

const SuccessToast = ({
  message = "operation successful!",
  showToast,
  setShowToast,
  headerMessage = "Success",
  isSuccess = true,
  resetStatus,
}) => {
  return (
    <>
      {/* <div
        aria-live="polite"
        aria-atomic="true"
        className="bg-dark position-relative"
        style={{ minHeight: "240px" }}
      > */}
      <ToastContainer className="p-3" position="top-end" style={{ zIndex: 1 }}>
        <Toast
          onClose={() => {
            setShowToast(false);
            resetStatus();
          }}
          show={showToast}
          delay={3000}
          autohide
          bg={isSuccess ? "success" : "danger"}
          className="bg-opacity-75"
        >
          <Toast.Header>
            <strong className="me-auto">
              {isSuccess ? "operation successful" : "operation failed"}
            </strong>
            {/* <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              /> */}
            {/* <strong className="me-auto">Bootstrap</strong> */}
            {/* <small>11 mins ago</small> */}
          </Toast.Header>
          <Toast.Body className="text-white bg-opacity-25">
            {message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
      {/* </div> */}
    </>
  );
};

export default SuccessToast;
