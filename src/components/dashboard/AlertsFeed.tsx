import { AlertTriangle, Clock, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const alerts = [
  {
    id: 1,
    type: "sla_risk",
    title: "SLA Risk Alert",
    message: "Order ORD-456 deadline in 4 hours",
    timestamp: "2 mins ago",
    icon: Clock,
    severity: "high"
  },
  {
    id: 2,
    type: "inventory",
    title: "Low Inventory",
    message: "TMT Bars at Stockyard A below threshold",
    timestamp: "15 mins ago", 
    icon: TrendingDown,
    severity: "medium"
  },
  {
    id: 3,
    type: "maintenance",
    title: "Maintenance Required",
    message: "Loading Point LP-03 scheduled maintenance",
    timestamp: "1 hour ago",
    icon: AlertTriangle,
    severity: "low"
  }
];

const AlertsFeed = () => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="card-elevated p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Alerts</h3>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="mt-1">
              <alert.icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-foreground">{alert.title}</p>
                <Badge variant={getSeverityColor(alert.severity)} className="text-xs">
                  {alert.severity}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{alert.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsFeed;