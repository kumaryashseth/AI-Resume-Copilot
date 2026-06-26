import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportPDF = async () => {
  try {
    // Find Resume Preview
    const input = document.getElementById("resume-preview");

    if (!input) {
      alert("Resume Preview Not Found");
      return;
    }

    // Convert HTML to Canvas
    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
    });

    // Convert Canvas to Image
    const imgData = canvas.toDataURL("image/png");

    // Create PDF
    const pdf = new jsPDF("p", "mm", "a4");

    // PDF Size
    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add Image
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Download
    pdf.save("Resume.pdf");
  } catch (error) {
    console.log(error);
  }
};
