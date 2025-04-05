
import React, { useEffect, useState } from 'react';
import { Battery, BatteryCharging } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface BatteryHealthIndicatorProps {
  batteryHealth: number;
  size?: 'sm' | 'md' | 'lg';
  showAnimation?: boolean;
  showIcon?: boolean;
}

const BatteryHealthIndicator = ({
  batteryHealth,
  size = 'md',
  showAnimation = true,
  showIcon = true,
}: BatteryHealthIndicatorProps) => {
  const [visibleHealth, setVisibleHealth] = useState(0);

  useEffect(() => {
    if (showAnimation) {
      // Animate the battery health from 0 to the actual value
      const timer = setTimeout(() => {
        setVisibleHealth(batteryHealth);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setVisibleHealth(batteryHealth);
    }
  }, [batteryHealth, showAnimation]);

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'bg-green';
    if (health >= 60) return 'bg-blue';
    if (health >= 40) return 'bg-orange';
    return 'bg-red-500';
  };

  const getHealthLabel = (health: number) => {
    if (health >= 80) return 'Mükemmel';
    if (health >= 60) return 'İyi';
    if (health >= 40) return 'Orta';
    return 'Zayıf';
  };

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'sm': return 'h-1.5';
      case 'lg': return 'h-3';
      default: return 'h-2';
    }
  };

  const isCharging = showAnimation && visibleHealth < batteryHealth;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600 flex items-center gap-1.5">
          {showIcon && (
            isCharging ? 
              <BatteryCharging className="text-green h-4 w-4" /> : 
              <Battery className="h-4 w-4" />
          )}
          Batarya Sağlığı
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{visibleHealth}%</span>
          <span className={cn(
            "text-xs px-2 py-0.5 rounded-full",
            visibleHealth >= 80 ? "bg-green/10 text-green" :
            visibleHealth >= 60 ? "bg-blue/10 text-blue" :
            visibleHealth >= 40 ? "bg-orange/10 text-orange" :
            "bg-red-500/10 text-red-500"
          )}>
            {getHealthLabel(visibleHealth)}
          </span>
        </div>
      </div>
      
      <Progress 
        value={visibleHealth} 
        className={cn("w-full bg-gray-100", getSizeClass(size))}
        indicatorClassName={cn(
          getHealthColor(visibleHealth),
          showAnimation && "transition-all duration-1000"
        )}
      />
      
      {showAnimation && visibleHealth >= 40 && (
        <div className="absolute w-full h-full top-0 left-0 pointer-events-none">
          <div className={cn(
            "absolute top-0 right-0 w-10 h-full opacity-0",
            isCharging && "animate-lightning-flash"
          )}>
            ⚡
          </div>
        </div>
      )}
    </div>
  );
};

export default BatteryHealthIndicator;
