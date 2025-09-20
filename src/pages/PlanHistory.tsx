import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, X, Eye } from "lucide-react";

const planData = [
  {
    id: "PLAN-2025-001",
    generatedAt: "2025-09-20 08:30 AM",
    horizon: "24 Hours",
    status: "Approved",
    estCost: "₹2,45,000",
    rakeCount: 8
  },
  {
    id: "PLAN-2025-002", 
    generatedAt: "2025-09-20 06:15 AM",
    horizon: "48 Hours",
    status: "Executed",
    estCost: "₹4,12,000", 
    rakeCount: 15
  },
  {
    id: "PLAN-2025-003",
    generatedAt: "2025-09-20 04:45 AM", 
    horizon: "12 Hours",
    status: "Pending Review",
    estCost: "₹1,28,000",
    rakeCount: 5
  }
];

const activeRakeData = [
  {
    rakeId: "RK-2025-001",
    orders: ["ORD-456", "ORD-789"],
    destinations: "Delhi Central",
    materials: "TMT Bars, Steel Coils",
    stockyard: "Stockyard A",
    loadingPoint: "LP-01", 
    scheduledDispatch: "10:30 AM"
  },
  {
    rakeId: "RK-2025-002",
    orders: ["ORD-123"],
    destinations: "Mumbai Port", 
    materials: "Wire Rods",
    stockyard: "Stockyard B",
    loadingPoint: "LP-02",
    scheduledDispatch: "11:45 AM"
  }
];

const PlanHistory = () => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Approved":
        return "default";
      case "Executed": 
        return "secondary";
      case "Pending Review":
        return "outline";
      default:
        return "destructive";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
      case "Executed":
        return <CheckCircle className="h-4 w-4" />;
      case "Pending Review":
        return <Clock className="h-4 w-4" />;
      default:
        return <X className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Plan History</h1>
        <p className="text-muted-foreground">
          Review and manage your generated dispatch plans
        </p>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="active">Active Plan</TabsTrigger>
          <TabsTrigger value="history">Past Plans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-6">
          {/* Active Plan Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="card-elevated">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Plan ID</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">PLAN-2025-001</p>
              </CardContent>
            </Card>
            <Card className="card-elevated">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Total Est. Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">₹2,45,000</p>
              </CardContent>
            </Card>
            <Card className="card-elevated">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Number of Rakes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">8</p>
              </CardContent>
            </Card>
          </div>

          {/* Active Plan Details */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Detailed Rake Plan</CardTitle>
              <CardDescription>Current active dispatch schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="data-table">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Rake ID</th>
                      <th>Assigned Orders</th>
                      <th>Destination(s)</th>
                      <th>Bill of Materials</th>
                      <th>Source Stockyard</th>
                      <th>Loading Point</th>
                      <th>Scheduled Dispatch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeRakeData.map((rake, index) => (
                      <tr key={index} className="hover:bg-muted/50">
                        <td className="font-mono text-primary">{rake.rakeId}</td>
                        <td>
                          <div className="flex gap-1">
                            {rake.orders.map(order => (
                              <Badge key={order} variant="outline" className="text-xs">
                                {order}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="text-foreground">{rake.destinations}</td>
                        <td className="text-foreground">{rake.materials}</td>
                        <td className="text-foreground">{rake.stockyard}</td>
                        <td className="font-mono text-foreground">{rake.loadingPoint}</td>
                        <td className="text-foreground">{rake.scheduledDispatch}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Generated Plans</CardTitle>
              <CardDescription>Historical record of all generated plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="data-table">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th>Plan ID</th>
                      <th>Generated At</th>
                      <th>Horizon</th>
                      <th>Status</th>
                      <th>Est. Cost</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {planData.map((plan, index) => (
                      <tr key={index} className="hover:bg-muted/50">
                        <td className="font-mono text-primary">{plan.id}</td>
                        <td className="text-foreground">{plan.generatedAt}</td>
                        <td className="text-foreground">{plan.horizon}</td>
                        <td>
                          <Badge variant={getStatusVariant(plan.status)} className="flex items-center gap-1 w-fit">
                            {getStatusIcon(plan.status)}
                            {plan.status}
                          </Badge>
                        </td>
                        <td className="text-foreground font-semibold">{plan.estCost}</td>
                        <td>
                          <Button variant="ghost" size="sm" className="p-2">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Action Buttons for Pending Review Plans */}
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-foreground mb-3">Actions for Pending Plans</h4>
                <div className="flex gap-3">
                  <Button className="btn-success">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve & Send to TMS
                  </Button>
                  <Button variant="outline">
                    Run What-If Scenario
                  </Button>
                  <Button variant="destructive">
                    <X className="h-4 w-4 mr-2" />
                    Discard Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlanHistory;