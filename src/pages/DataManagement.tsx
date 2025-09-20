import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Upload, Download, RefreshCw } from "lucide-react";

const DataManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Data Management</h1>
        <p className="text-muted-foreground">
          Manage your logistics data sources and configurations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Data Sources */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 text-primary mr-2" />
              Data Sources
            </CardTitle>
            <CardDescription>Connected data systems</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
              <span className="text-sm">ERP System</span>
              <Badge variant="default">Connected</Badge>
            </div>
            <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
              <span className="text-sm">Inventory DB</span>
              <Badge variant="default">Connected</Badge>
            </div>
            <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
              <span className="text-sm">Transport MS</span>
              <Badge variant="secondary">Syncing</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Data Import */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="h-5 w-5 text-primary mr-2" />
              Data Import
            </CardTitle>
            <CardDescription>Upload and sync data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Upload className="h-4 w-4 mr-2" />
              Import Orders
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Upload className="h-4 w-4 mr-2" />
              Update Inventory
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync All Data
            </Button>
          </CardContent>
        </Card>

        {/* Data Export */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Download className="h-5 w-5 text-primary mr-2" />
              Data Export
            </CardTitle>
            <CardDescription>Export reports and data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              Export Plans
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              Performance Report
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              Cost Analysis
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataManagement;