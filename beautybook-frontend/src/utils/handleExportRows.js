import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const handleExportRows = (rows, columns, fileName = "table") => {
    const doc = new jsPDF();
    console.log("rows", rows);
    console.log("columns", columns);
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);
    console.log("tableData", tableData);  
    console.log("tableHeaders", tableHeaders);
    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });
    doc.save(`${fileName}-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

export default handleExportRows;