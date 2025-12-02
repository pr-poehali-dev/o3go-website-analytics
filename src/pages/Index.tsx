import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const metricsData = [
  { label: "Отправлено WA", value: 2730289, icon: "MessageCircle", color: "#8B5CF6" },
  { label: "WA piter", value: 1125052, icon: "MapPin", color: "#D946EF" },
  { label: "WA Volga", value: 1605237, icon: "Waves", color: "#0EA5E9" },
  { label: "Отдали WA в ТГ", value: 329268, icon: "Send", color: "#F97316" },
  { label: "Dann", value: 10737, icon: "Zap", color: "#8B5CF6" },
  { label: "Сделано кликов", value: 263149, icon: "MousePointerClick", color: "#D946EF" },
  { label: "Ру клик", value: 162223, icon: "Flag", color: "#0EA5E9" },
  { label: "Ино клик", value: 100926, icon: "Globe", color: "#F97316" },
  { label: "ИМО", value: 100239, icon: "MessageSquare", color: "#8B5CF6" },
  { label: "Вайбер", value: 78243, icon: "Phone", color: "#D946EF" },
  { label: "Проектов WA", value: 50, icon: "Briefcase", color: "#0EA5E9" },
];

const pieChartData = [
  { name: "WA piter", value: 1125052, fill: "#8B5CF6" },
  { name: "WA Volga", value: 1605237, fill: "#D946EF" },
  { name: "Отдали в ТГ", value: 329268, fill: "#0EA5E9" },
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
  const handleExportPDF = () => {
    window.print();
  };

  const handleExportExcel = () => {
    const csvContent = [
      ['Метрика', 'Значение'],
      ...metricsData.map(m => [m.label, m.value]),
      ['', ''],
      ['Период', '22.08 - 29.11'],
      ['Депозиты', '1878'],
      ['USDT', '13.146'],
      ['Рубли', '1.051.680'],
      ['ВАЗ (LADA) 2107', '6']
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'o3goTeaM_stats.csv';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center space-y-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#0EA5E9] bg-clip-text text-transparent">
            o3goTeaM
          </h1>
          <p className="text-xl text-gray-300">Дашборд метрик и статистики</p>
          
          <div className="flex gap-4 justify-center pt-4">
            <Button 
              onClick={handleExportPDF}
              className="bg-gradient-to-r from-[#8B5CF6] to-[#D946EF] hover:opacity-90 transition-all duration-300 hover:scale-105"
            >
              <Icon name="FileDown" className="mr-2" size={20} />
              Экспорт PDF
            </Button>
            <Button 
              onClick={handleExportExcel}
              className="bg-gradient-to-r from-[#0EA5E9] to-[#F97316] hover:opacity-90 transition-all duration-300 hover:scale-105"
            >
              <Icon name="Table" className="mr-2" size={20} />
              Экспорт Excel
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {metricsData.map((metric, index) => (
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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

          <Card className="p-6 bg-gradient-to-br from-[#1e1e2f] to-[#2a2a3e] border-[#3a3a4e] animate-scale-in" style={{ animationDelay: '100ms' }}>
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