import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const handleExportRows = (rows, columns, fileName = "table") => {
  const doc = new jsPDF();
  const tableData = rows.map((row) => Object.values(row.original));
  const tableHeaders = columns.map((c) => c.header);
  autoTable(doc, {
    head: [tableHeaders],
    body: tableData,
  });
  doc.save(`${fileName}-${new Date().toISOString().slice(0, 10)}.pdf`);
};

export default handleExportRows;
