import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

import { exportPDF } from "../utils/exportPDF";

const PDFDownloadButton = () => {
  return (
    <Button
      variant="contained"
      color="success"
      startIcon={<DownloadIcon />}
      onClick={exportPDF}
    >
      Download PDF
    </Button>
  );
};

export default PDFDownloadButton;