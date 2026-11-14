  import { DollarSign, Coffee, CheckCircle2, TrendingUp } from "lucide-react";
  
  export const stats = [
    {
      title: "Today's Revenue",
      value: "$2,847",
      subtext: "+12.4% from yesterday",
      icon: DollarSign,
      iconBg: "bg-matcha text-coffee",
    },
    {
      title: "Active Orders",
      value: "12",
      subtext: "5 preparing, 7 incoming",
      icon: Coffee,
      iconBg: "bg-caramel/20 text-coffee",
    },
    {
      title: "Total Drinks Sold",
      value: "186",
      subtext: "Matcha Latte is top choice",
      icon: CheckCircle2,
      iconBg: "bg-matcha/50 text-coffee",
    },
    {
      title: "Avg Order Value",
      value: "$15.30",
      subtext: "+4.2% vs last week",
      icon: TrendingUp,
      iconBg: "bg-caramel text-milk",
    },
  ];