import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Label } from "recharts";

const waMetrics = [
  { label: "Отправлено WA", value: 2730289, icon: "MessageCircle", color: "#8B5CF6" },
  { label: "Retail", value: 1125052, icon: "MapPin", color: "#D946EF" },
  { label: "WEBCOM", value: 1605237, icon: "Waves", color: "#0EA5E9" },
  { label: "WA Dann", value: 10377, icon: "Zap", color: "#F97316" },
  { label: "Отдали WA в ТГ", value: 329268, icon: "Send", color: "#0EA5E9" },
];

const clicksMetrics = [
  { label: "Сделано кликов", value: 263149, icon: "MousePointerClick", color: "#D946EF" },
  { label: "Ру клик", value: 162223, icon: "Flag", color: "#0EA5E9" },
  { label: "Ино клик", value: 100926, icon: "Globe", color: "#F97316" },
];

const otherMetrics = [
  { label: "ИМО", value: 100239, icon: "MessageSquare", color: "#8B5CF6" },
  { label: "Вайбер", value: 78243, icon: "Phone", color: "#D946EF" },
  { label: "Проектов WA", value: 50, icon: "Briefcase", color: "#0EA5E9" },
];

const pieChartData = [
  { name: "Retail", value: 1125052, fill: "#8B5CF6" },
  { name: "WEBCOM", value: 1605237, fill: "#D946EF" },
  { name: "WA Dann", value: 10377, fill: "#F97316" },
];

const monthlyComparisonData = [
  { name: "Октябрь", value: 2151700, fill: "#8B5CF6" },
  { name: "Ноябрь", value: 2730289, fill: "#D946EF" },
];

const clicksData = [
  { name: "Ру клик", value: 162223, fill: "#8B5CF6" },
  { name: "Ино клик", value: 100926, fill: "#D946EF" },
];

const AnimatedCounter = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString('ru-RU')}</span>;
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center space-y-4 animate-fade-in">
          <h1 className="md:text-7xl font-bold bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#0EA5E9] bg-clip-text text-transparent text-4xl">Отчет о работе галактического департамента спама за ноябрь 2025</h1>
          <p className="text-xl text-gray-300"></p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {waMetrics.map((metric, index) => (
            <Card 
              key={metric.label}
              className="p-6 bg-gradient-to-br from-[#1e1e2f] to-[#2a2a3e] border-[#3a3a4e] hover:border-[#8B5CF6] transition-all duration-300 hover:scale-105 animate-fade-in backdrop-blur-lg"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="p-3 rounded-xl"
                  style={{ 
                    background: `linear-gradient(135deg, ${metric.color}20, ${metric.color}40)`,
                    boxShadow: `0 0 20px ${metric.color}30`
                  }}
                >
                  <Icon name={metric.icon} size={24} style={{ color: metric.color }} />
                </div>
              </div>
              <h3 className="text-sm text-gray-400 mb-2">{metric.label}</h3>
              <p className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                <AnimatedCounter end={metric.value} />
              </p>
            </Card>
          ))}
        </div>

        <Card className="p-6 bg-gradient-to-br from-[#1e1e2f] to-[#2a2a3e] border-[#3a3a4e] animate-scale-in">
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
            <Icon name="PieChart" size={28} className="text-[#8B5CF6]" />
            Распределение WA
          </h2>
          <ChartContainer config={{}} className="h-[300px]">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-[#1e1e2f] to-[#2a2a3e] border-[#3a3a4e] animate-scale-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Icon name="TrendingUp" size={28} className="text-[#0EA5E9]" />
              Сравнение по месяцам: Отправлено WA
            </h2>
            <div className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/50 rounded-lg">
              <span className="text-green-400 font-bold text-lg">+26.9% 📈</span>
            </div>
          </div>
          <ChartContainer config={{}} className="h-[350px]">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={monthlyComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <XAxis 
                  dataKey="name" 
                  stroke="#9ca3af"
                  style={{ fontSize: '14px', fontWeight: 'bold' }}
                />
                <YAxis 
                  stroke="#9ca3af"
                  tickFormatter={(value) => (value / 1000000).toFixed(1) + 'M'}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} label={{ 
                  position: 'top', 
                  fill: '#fff',
                  formatter: (value: number) => value.toLocaleString('ru-RU'),
                  style: { fontSize: '14px', fontWeight: 'bold' }
                }}>
                  {monthlyComparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
                <Tooltip 
                  formatter={(value: number) => value.toLocaleString('ru-RU')}
                  labelStyle={{ color: '#fff' }}
                  contentStyle={{ backgroundColor: '#1e1e2f', border: '1px solid #3a3a4e' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clicksMetrics.map((metric, index) => (
            <Card 
              key={metric.label}
              className="p-6 bg-gradient-to-br from-[#1e1e2f] to-[#2a2a3e] border-[#3a3a4e] hover:border-[#8B5CF6] transition-all duration-300 hover:scale-105 animate-fade-in backdrop-blur-lg"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="p-3 rounded-xl"
                  style={{ 
                    background: `linear-gradient(135deg, ${metric.color}20, ${metric.color}40)`,
                    boxShadow: `0 0 20px ${metric.color}30`
                  }}
                >
                  <Icon name={metric.icon} size={24} style={{ color: metric.color }} />
                </div>
              </div>
              <h3 className="text-sm text-gray-400 mb-2">{metric.label}</h3>
              <p className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                <AnimatedCounter end={metric.value} />
              </p>
            </Card>
          ))}
        </div>

        <Card className="p-6 bg-gradient-to-br from-[#1e1e2f] to-[#2a2a3e] border-[#3a3a4e] animate-scale-in">
          <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
            <Icon name="BarChart3" size={28} className="text-[#D946EF]" />
            Клики по регионам
          </h2>
          <ChartContainer config={{}} className="h-[300px]">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={clicksData}>
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {clicksData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherMetrics.map((metric, index) => (
            <Card 
              key={metric.label}
              className="p-6 bg-gradient-to-br from-[#1e1e2f] to-[#2a2a3e] border-[#3a3a4e] hover:border-[#8B5CF6] transition-all duration-300 hover:scale-105 animate-fade-in backdrop-blur-lg"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="p-3 rounded-xl"
                  style={{ 
                    background: `linear-gradient(135deg, ${metric.color}20, ${metric.color}40)`,
                    boxShadow: `0 0 20px ${metric.color}30`
                  }}
                >
                  <Icon name={metric.icon} size={24} style={{ color: metric.color }} />
                </div>
              </div>
              <h3 className="text-sm text-gray-400 mb-2">{metric.label}</h3>
              <p className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                <AnimatedCounter end={metric.value} />
              </p>
            </Card>
          ))}
        </div>

        <Card className="p-8 bg-gradient-to-br from-[#1e1e2f] to-[#2a2a3e] border-[#3a3a4e] animate-fade-in animate-pulse-glow">
          <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
            <Icon name="TrendingUp" size={32} className="text-[#0EA5E9]" />
            Статистика за период (22.08 - 29.11)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3 p-6 rounded-xl bg-gradient-to-br from-[#8B5CF6]/10 to-[#D946EF]/10 border border-[#8B5CF6]/30">
              <div className="flex items-center gap-2">
                <Icon name="Coins" size={24} className="text-[#8B5CF6]" />
                <span className="text-gray-400">Депозиты</span>
              </div>
              <p className="text-4xl font-bold text-white">1,878</p>
            </div>

            <div className="space-y-3 p-6 rounded-xl bg-gradient-to-br from-[#D946EF]/10 to-[#0EA5E9]/10 border border-[#D946EF]/30">
              <div className="flex items-center gap-2">
                <Icon name="DollarSign" size={24} className="text-[#D946EF]" />
                <span className="text-gray-400">USDT</span>
              </div>
              <p className="text-4xl font-bold text-white">13,146</p>
            </div>

            <div className="space-y-3 p-6 rounded-xl bg-gradient-to-br from-[#0EA5E9]/10 to-[#F97316]/10 border border-[#0EA5E9]/30">
              <div className="flex items-center gap-2">
                <Icon name="Banknote" size={24} className="text-[#0EA5E9]" />
                <span className="text-gray-400">Рубли</span>
              </div>
              <p className="text-4xl font-bold text-white">1,051,680₽</p>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-[#F97316]/20 via-[#8B5CF6]/20 to-[#D946EF]/20 border border-[#F97316]/30">
            <h3 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
              <Icon name="Sparkles" size={24} className="text-[#F97316]" />
              Эквиваленты
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
              <div className="flex items-center gap-3">
                <Icon name="Activity" size={20} className="text-[#8B5CF6]" />
                <span>71 армянское возмущение</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Car" size={20} className="text-[#D946EF]" />
                <span>6 ВАЗ (LADA) 2107</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Trophy" size={20} className="text-[#0EA5E9]" />
                <span>Одно нихуя себе!</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;