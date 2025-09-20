import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, Zap } from "lucide-react";

const GeneratePlan = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    horizon: "",
    goal: "",
    constraints: {
      multiDestination: false,
      prioritizeStockyardC: false
    }
  });

  const handleGenerate = async () => {
    if (!formData.horizon || !formData.goal) {
      toast({
        title: "Missing Information",
        description: "Please select both plan horizon and optimization goal.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate optimization process
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Plan Generated Successfully",
        description: "Your optimal dispatch plan is ready for review.",
      });
      // In a real app, this would navigate to the plan details
    }, 5000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Generate New Dispatch Plan</h1>
        <p className="text-muted-foreground">
          Configure your optimization parameters and let AI create the optimal rake formation plan
        </p>
      </div>

      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 text-primary mr-2" />
            Plan Configuration
          </CardTitle>
          <CardDescription>
            Set your planning parameters to generate an optimized dispatch schedule
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Plan Horizon */}
          <div className="space-y-2">
            <Label className="text-base font-medium">Select Plan Horizon</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, horizon: value }))}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Choose planning timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12h">Next 12 Hours</SelectItem>
                <SelectItem value="24h">Next 24 Hours</SelectItem>
                <SelectItem value="48h">Next 48 Hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Optimization Goal */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Primary Optimization Goal</Label>
            <RadioGroup 
              onValueChange={(value) => setFormData(prev => ({ ...prev, goal: value }))}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/30">
                <RadioGroupItem value="cost" id="cost" />
                <Label htmlFor="cost" className="flex-1 cursor-pointer">
                  <div>
                    <p className="font-medium">Minimize Total Logistics Cost</p>
                    <p className="text-sm text-muted-foreground">Optimize for maximum cost efficiency</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/30">
                <RadioGroupItem value="priority" id="priority" />
                <Label htmlFor="priority" className="flex-1 cursor-pointer">
                  <div>
                    <p className="font-medium">Maximize On-Time Priority Fulfillment</p>
                    <p className="text-sm text-muted-foreground">Prioritize high-priority orders and SLA compliance</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Constraints */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Additional Constraints</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border">
                <Checkbox 
                  id="multi-dest"
                  checked={formData.constraints.multiDestination}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({
                      ...prev,
                      constraints: { ...prev.constraints, multiDestination: !!checked }
                    }))
                  }
                />
                <Label htmlFor="multi-dest" className="flex-1 cursor-pointer">
                  <div>
                    <p className="font-medium">Allow multi-destination rakes</p>
                    <p className="text-sm text-muted-foreground">Enable rakes to serve multiple destinations in one trip</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border">
                <Checkbox 
                  id="stockyard-c"
                  checked={formData.constraints.prioritizeStockyardC}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({
                      ...prev,
                      constraints: { ...prev.constraints, prioritizeStockyardC: !!checked }
                    }))
                  }
                />
                <Label htmlFor="stockyard-c" className="flex-1 cursor-pointer">
                  <div>
                    <p className="font-medium">Prioritize clearing Stockyard C</p>
                    <p className="text-sm text-muted-foreground">Give priority to inventory at Stockyard C</p>
                  </div>
                </Label>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full btn-primary py-4 text-lg font-medium"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Running optimization model...
              </>
            ) : (
              "Generate Optimal Plan"
            )}
          </Button>

          {isGenerating && (
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                This may take a few minutes. We will notify you when the plan is ready.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneratePlan;