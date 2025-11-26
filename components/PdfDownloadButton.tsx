"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { FileDown, Loader2 } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CoursePdfDocument from "./CoursePdfDocument";

export default function PdfDownLoadButton({ course }: any) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return (
      <Button variant="outline" disabled>
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
        Loading PDF...
      </Button>
    );
  }
  return (
    <PDFDownloadLink
      document={<CoursePdfDocument course={course} />}
      fileName={`${course.courseName.replace(/\s+/g, "_")}_Course.pdf`}
    >
      {({ blob, url, loading, error }) => (
        <Button>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="hidden md:block">Generating</span>
              <span>PDF</span>
            </>
          ) : (
            <>
              <FileDown className="h-4 w-4 " />
              {/* <span className="hidden md:block">Export</span> */}
              <span>PDF</span>
            </>
          )}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
