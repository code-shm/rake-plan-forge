import { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: number;
    isPositive: boolean;
  };
  suffix?: string;
}

const KPICard = ({ title, value, icon: Icon, change, suffix }: KPICardProps) => {
  return (
    <div className="kpi-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="mt-2 flex items-baseline">
            <p className="text-3xl font-bold text-foreground">
              {value}
              {suffix && <span className="text-lg text-muted-foreground ml-1">{suffix}</span>}
            </p>
          </div>
          {change && (
            <div className="mt-2 flex items-center">
              {change.isPositive ? (
                <TrendingUp className="h-4 w-4 text-[hsl(var(--success))] mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive mr-1" />
              )}
              <span 
                className={`text-sm font-medium ${
                  change.isPositive ? 'text-[hsl(var(--success))]' : 'text-destructive'
                }`}
              >
                {change.isPositive ? '+' : ''}{change.value}%
              </span>
            </div>
          )}
        </div>
        <div className="ml-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPICard;