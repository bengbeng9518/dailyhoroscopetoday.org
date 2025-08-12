import React from 'react';

const HoroscopeChart = ({ horoscope, content }) => {
  const categories = [
    { key: 'overall', label: content.categories.overall, color: 'bg-purple-500' },
    { key: 'love', label: content.categories.love, color: 'bg-pink-500' },
    { key: 'career', label: content.categories.career, color: 'bg-blue-500' },
    { key: 'money', label: content.categories.money, color: 'bg-green-500' },
    { key: 'health', label: content.categories.health, color: 'bg-orange-500' }
  ];

  const RadarChart = () => {
    const size = 200;
    const center = size / 2;
    const radius = 70;
    const levels = 5;
    
    const angleStep = (2 * Math.PI) / categories.length;
    
    const getPoint = (value, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const r = (value / 5) * radius;
      return {
        x: center + r * Math.cos(angle),
        y: center + r * Math.sin(angle)
      };
    };

    const dataPoints = categories.map((cat, index) => 
      getPoint(horoscope?.[cat.key] || 0, index)
    );

    const pathData = dataPoints.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ') + ' Z';

    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-center mb-4 text-gray-800">
          📊 {content.radarChart}
        </h3>
        <div className="flex justify-center">
          <svg width={size} height={size} className="overflow-visible">
            {/* 背景网格 */}
            {[...Array(levels)].map((_, i) => {
              const r = ((i + 1) / levels) * radius;
              const points = categories.map((_, index) => {
                const angle = index * angleStep - Math.PI / 2;
                return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
              }).join(' ');
              
              return (
                <polygon
                  key={i}
                  points={points}
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              );
            })}
            
            {/* 轴线 */}
            {categories.map((_, index) => {
              const angle = index * angleStep - Math.PI / 2;
              return (
                <line
                  key={index}
                  x1={center}
                  y1={center}
                  x2={center + radius * Math.cos(angle)}
                  y2={center + radius * Math.sin(angle)}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              );
            })}
            
            {/* 数据区域 */}
            <path
              d={pathData}
              fill="rgba(147, 51, 234, 0.2)"
              stroke="#9333ea"
              strokeWidth="2"
            />
            
            {/* 数据点 */}
            {dataPoints.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#9333ea"
              />
            ))}
            
            {/* 标签 */}
            {categories.map((cat, index) => {
              const angle = index * angleStep - Math.PI / 2;
              const labelRadius = radius + 20;
              const x = center + labelRadius * Math.cos(angle);
              const y = center + labelRadius * Math.sin(angle);
              
              return (
                <text
                  key={index}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs fill-gray-600"
                >
                  {cat.label}
                </text>
              );
            })}
          </svg>
        </div>
      </div>
    );
  };

  const BarChart = () => {
    const maxValue = 5;
    
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-center mb-4 text-gray-800">
          📊 {content.barChart}
        </h3>
        <div className="space-y-4">
          {categories.map((cat) => {
            const value = horoscope?.[cat.key] || 0;
            const percentage = (value / maxValue) * 100;
            
            return (
              <div key={cat.key} className="flex items-center space-x-3">
                <div className="w-16 text-sm text-gray-600">{cat.label}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                  <div 
                    className={`h-3 rounded-full ${cat.color} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="w-8 text-sm font-semibold text-gray-700">{value}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <RadarChart />
      <BarChart />
    </div>
  );
};

export default HoroscopeChart;