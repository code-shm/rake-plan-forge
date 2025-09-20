import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Busy', value: 8, color: '#E67E22' },
  { name: 'Idle', value: 4, color: '#27AE60' },
  { name: 'Maintenance', value: 2, color: '#E74C3C' },
];

const LoadingPointChart = () => {
  return (
    <div className="card-elevated p-6 h-80">
      <h3 className="text-lg font-semibold text-foreground mb-4">Loading Point Status</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: 'var(--radius)',
              color: 'hsl(var(--foreground))'
            }}
          />
          <Legend 
            wrapperStyle={{
              color: 'hsl(var(--foreground))'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LoadingPointChart;