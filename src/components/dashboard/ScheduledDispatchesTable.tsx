import { Badge } from "@/components/ui/badge";

const dispatchData = [
  {
    rakeId: "RK-2025-001",
    destination: "Delhi Central",
    dispatchTime: "10:30 AM",
    status: "Loading"
  },
  {
    rakeId: "RK-2025-002", 
    destination: "Mumbai Port",
    dispatchTime: "11:45 AM",
    status: "Scheduled"
  },
  {
    rakeId: "RK-2025-003",
    destination: "Chennai Works",
    dispatchTime: "2:15 PM", 
    status: "Scheduled"
  },
  {
    rakeId: "RK-2025-004",
    destination: "Kolkata Hub",
    dispatchTime: "4:30 PM",
    status: "Loading"
  }
];

const ScheduledDispatchesTable = () => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Loading":
        return "default";
      case "Scheduled":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="card-elevated p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Upcoming Scheduled Dispatches</h3>
      <div className="data-table">
        <table className="w-full">
          <thead>
            <tr>
              <th>Rake ID</th>
              <th>Destination</th>
              <th>Dispatch Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dispatchData.map((dispatch, index) => (
              <tr key={index} className="hover:bg-muted/50">
                <td className="font-mono text-primary">{dispatch.rakeId}</td>
                <td className="text-foreground">{dispatch.destination}</td>
                <td className="text-foreground">{dispatch.dispatchTime}</td>
                <td>
                  <Badge variant={getStatusVariant(dispatch.status)}>
                    {dispatch.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScheduledDispatchesTable;