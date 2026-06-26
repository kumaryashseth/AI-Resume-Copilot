import ModernTemplate from "../templates/ModernTemplate";
import ATSClassicTemplate from "../templates/ATSClassicTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";
import DeveloperTemplate from "../templates/DeveloperTemplate";
import PDFDownloadButton from "./PDFDownloadButton";

const ResumePreview = ({ resume, template }) => {
  const templates = {
    modern: ModernTemplate,
    ats: ATSClassicTemplate,
    minimal: MinimalTemplate,
    developer: DeveloperTemplate,
  };

  const SelectedTemplate = templates[template] || ModernTemplate;

  return (
    <div
      id="resume-preview"
      className="bg-white shadow-xl rounded-lg overflow-hidden min-h-[1123px]"
    >
      <div className="flex flex-col gap-4">
        <PDFDownloadButton />
        <SelectedTemplate resume={resume} />
      </div>
    </div>
  );
};

export default ResumePreview;
