import { useState } from "react";
import { Database, Upload, FileSpreadsheet, BarChart3, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CSVUploader } from "@/components/csv/CSVUploader";
import { CSVDataTable } from "@/components/csv/CSVDataTable";

const DataManagement = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadComplete = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Data Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage your logistics data, upload CSV files for ML training, and configure data sources.
        </p>
      </div>

      <Tabs defaultValue="csv-upload" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="csv-upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            CSV Upload
          </TabsTrigger>
          <TabsTrigger value="training-data" className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Training Data
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Data Analytics
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Data Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="csv-upload" className="space-y-6">
          <CSVUploader onUploadComplete={handleUploadComplete} />
        </TabsContent>

        <TabsContent value="training-data" className="space-y-6">
          <CSVDataTable refreshTrigger={refreshTrigger} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Data Analytics
              </CardTitle>
              <CardDescription>
                Analyze your uploaded data for insights and ML model performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Data Quality</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">95%</div>
                    <p className="text-sm text-muted-foreground">Overall data quality score</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Records Processed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">0</div>
                    <p className="text-sm text-muted-foreground">Total training records</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Model Accuracy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">--</div>
                    <p className="text-sm text-muted-foreground">Latest model performance</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Data Source Configuration
              </CardTitle>
              <CardDescription>
                Configure your data sources and ML model parameters.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Database Connection</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Supabase PostgreSQL</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Storage Backend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Supabase Storage</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">ML Model Configuration</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure your machine learning model parameters and training settings here.
                    This section will be expanded as you upload and process more training data.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataManagement;