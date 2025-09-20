import { useState, useRef } from "react";
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface CSVUploaderProps {
  onUploadComplete?: () => void;
}

export const CSVUploader = ({ onUploadComplete }: CSVUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a CSV file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to upload files.",
          variant: "destructive",
        });
        return;
      }

      // Upload file to storage
      const fileName = `${Date.now()}_${file.name}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('csv-uploads')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Parse CSV to get column info
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      
      // Save metadata to database
      const { error: dbError } = await supabase
        .from('csv_uploads')
        .insert({
          user_id: user.id,
          file_name: file.name,
          file_path: filePath,
          file_size: file.size,
          total_rows: lines.length - 1, // excluding header
          columns_info: {
            headers,
            total_columns: headers.length,
            sample_row: lines[1]?.split(',').map(cell => cell.trim().replace(/"/g, ''))
          }
        });

      if (dbError) {
        throw dbError;
      }

      toast({
        title: "Upload Successful",
        description: `CSV file "${file.name}" uploaded successfully with ${lines.length - 1} rows.`,
      });

      onUploadComplete?.();
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message || "An error occurred during upload.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          Upload CSV Data for ML Models
        </CardTitle>
        <CardDescription>
          Upload CSV files to store training data for your machine learning models. Files will be parsed and stored securely.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Drop CSV files here</h3>
          <p className="text-muted-foreground mb-4">
            or click to select files from your computer
          </p>
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="mb-4"
          >
            {uploading ? "Uploading..." : "Select CSV File"}
          </Button>
          <div className="text-sm text-muted-foreground">
            <p>Maximum file size: 10MB</p>
            <p>Supported format: .csv</p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="hidden"
        />
      </CardContent>
    </Card>
  );
};