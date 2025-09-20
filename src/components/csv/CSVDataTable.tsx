import { useState, useEffect } from "react";
import { FileSpreadsheet, Download, Trash2, Database, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CSVUpload {
  id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  upload_date: string;
  processing_status: string;
  total_rows: number;
  columns_info: any;
  error_message?: string;
}

interface CSVDataTableProps {
  refreshTrigger?: number;
}

export const CSVDataTable = ({ refreshTrigger }: CSVDataTableProps) => {
  const [uploads, setUploads] = useState<CSVUpload[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUploads = async () => {
    try {
      const { data, error } = await supabase
        .from('csv_uploads')
        .select('*')
        .order('upload_date', { ascending: false });

      if (error) throw error;
      setUploads(data || []);
    } catch (error: any) {
      toast({
        title: "Error Loading Data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, [refreshTrigger]);

  const handleDelete = async (upload: CSVUpload) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('csv-uploads')
        .remove([upload.file_path]);

      if (storageError) throw storageError;

      // Delete from database (this will cascade to ml_training_data)
      const { error: dbError } = await supabase
        .from('csv_uploads')
        .delete()
        .eq('id', upload.id);

      if (dbError) throw dbError;

      toast({
        title: "File Deleted",
        description: `${upload.file_name} has been deleted successfully.`,
      });

      fetchUploads();
    } catch (error: any) {
      toast({
        title: "Delete Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleProcessToML = async (upload: CSVUpload) => {
    try {
      // Update status to processing
      await supabase
        .from('csv_uploads')
        .update({ processing_status: 'processing' })
        .eq('id', upload.id);

      // Get the file and parse it
      const { data: fileData, error: downloadError } = await supabase.storage
        .from('csv-uploads')
        .download(upload.file_path);

      if (downloadError) throw downloadError;

      const text = await fileData.text();
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

      // Process each row and insert into ml_training_data
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const batchSize = 100;
      for (let i = 1; i < lines.length; i += batchSize) {
        const batch = lines.slice(i, i + batchSize).map((line, index) => {
          const values = line.split(',').map(cell => cell.trim().replace(/"/g, ''));
          const rowData: any = {};
          headers.forEach((header, idx) => {
            rowData[header] = values[idx] || null;
          });

          return {
            csv_upload_id: upload.id,
            user_id: user.id,
            row_data: rowData,
            row_index: i + index
          };
        });

        const { error: insertError } = await supabase
          .from('ml_training_data')
          .insert(batch);

        if (insertError) throw insertError;
      }

      // Update status to processed
      await supabase
        .from('csv_uploads')
        .update({ processing_status: 'processed' })
        .eq('id', upload.id);

      toast({
        title: "Processing Complete",
        description: `${upload.file_name} has been processed and is ready for ML training.`,
      });

      fetchUploads();
    } catch (error: any) {
      // Update status to error
      await supabase
        .from('csv_uploads')
        .update({ 
          processing_status: 'error',
          error_message: error.message
        })
        .eq('id', upload.id);

      toast({
        title: "Processing Failed",
        description: error.message,
        variant: "destructive",
      });

      fetchUploads();
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'uploaded':
        return <Badge variant="secondary">Uploaded</Badge>;
      case 'processing':
        return <Badge variant="outline">Processing</Badge>;
      case 'processed':
        return <Badge variant="default">Processed</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading uploaded files...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          ML Training Data Files
        </CardTitle>
        <CardDescription>
          Manage your uploaded CSV files and process them for machine learning models.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {uploads.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <FileSpreadsheet className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>No CSV files uploaded yet.</p>
            <p className="text-sm">Upload your first CSV file to get started.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Rows</TableHead>
                <TableHead>Columns</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uploads.map((upload) => (
                <TableRow key={upload.id}>
                  <TableCell className="font-medium">{upload.file_name}</TableCell>
                  <TableCell>{formatFileSize(upload.file_size)}</TableCell>
                  <TableCell>{upload.total_rows || 0}</TableCell>
                  <TableCell>{upload.columns_info?.total_columns || 0}</TableCell>
                  <TableCell>{getStatusBadge(upload.processing_status)}</TableCell>
                  <TableCell>
                    {new Date(upload.upload_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {upload.processing_status === 'uploaded' && (
                        <Button
                          size="sm"
                          onClick={() => handleProcessToML(upload)}
                          className="h-8"
                        >
                          <Database className="h-4 w-4 mr-1" />
                          Process
                        </Button>
                      )}
                      {upload.processing_status === 'error' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleProcessToML(upload)}
                          className="h-8"
                        >
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Retry
                        </Button>
                      )}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive" className="h-8">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete CSV File</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{upload.file_name}"? 
                              This will also remove all processed training data. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(upload)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};