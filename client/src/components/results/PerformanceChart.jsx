import React, { useState } from 'react';
import { TrendingUp, Award } from 'lucide-react';

export const PerformanceChart = ({
  attempts = [],
  title = 'Your Performance',
}) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Default points matching user's diagram if minimal attempts exist
  const defaultChartData = [
    { day: 'Mon', score: 70, quiz: 'Computer Networks' },
    { day: 'Tue', score: 80, quiz: 'DBMS Fundamentals' },
    { day: 'Wed', score: 90, quiz: 'JavaScript Basics' },
    { day: 'Thu', score: 86, quiz: 'Web Development' },
  ];

  let chartPoints = defaultChartData;

  if (attempts && attempts.length >= 2) {
    // Take recent 6 attempts and reverse so oldest to newest left to right
    const recent = [...attempts].slice(0, 6).reverse();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    chartPoints = recent.map((att, idx) => {
      let dayLabel = `Attempt ${idx + 1}`;
      if (att.createdAt) {
        const d = new Date(att.createdAt);
        if (!isNaN(d.getTime())) {
          dayLabel = days[d.getDay()];
        }
      }
      return {
        day: dayLabel,
        score: Math.min(100, Math.max(0, Math.round(att.percentage || (att.score / (att.totalQuestions || 1)) * 100))),
        quiz: att.quizTitle || 'Quiz',
      };
    });
  }

  // SVG dimensions
  const svgWidth = 520;
  const svgHeight = 220;
  const paddingLeft = 55;
  const paddingRight = 35;
  const paddingTop = 25;
  const paddingBottom = 40;

  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;

  const yLevels = [100, 80, 60, 40, 20];

  const getX = (index) => {
    if (chartPoints.length <= 1) return paddingLeft + chartWidth / 2;
    return paddingLeft + (index / (chartPoints.length - 1)) * chartWidth;
  };

  const getY = (score) => {
    return paddingTop + chartHeight - (score / 100) * chartHeight;
  };

  // Generate SVG path string
  const pathD = chartPoints.reduce((acc, pt, idx) => {
    const x = getX(idx);
    const y = getY(pt.score);
    if (idx === 0) return `M ${x} ${y}`;

    // Smooth bezier curve control points
    const prevX = getX(idx - 1);
    const prevY = getY(chartPoints[idx - 1].score);
    const cpX1 = prevX + (x - prevX) / 2;
    const cpY1 = prevY;
    const cpX2 = prevX + (x - prevX) / 2;
    const cpY2 = y;
    return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x} ${y}`;
  }, '');

  const areaD = `${pathD} L ${getX(chartPoints.length - 1)} ${paddingTop + chartHeight} L ${getX(0)} ${paddingTop + chartHeight} Z`;

  return (
    <div className="qm-performance-chart-card">
      <div className="chart-header">
        <div className="chart-title-group">
          <TrendingUp size={20} className="chart-icon" />
          <h3 className="chart-title">{title}</h3>
        </div>
        <span className="chart-badge">
          <Award size={14} />
          <span>Optimal Trajectory</span>
        </span>
      </div>

      <div className="chart-svg-container">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="chart-svg"
          preserveAspectRatio="xMidYMid meet"
          aria-label="Performance progression graph"
        >
          <defs>
            {/* Area Fill Gradient */}
            <linearGradient id="scoreAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
            </linearGradient>

            {/* Line Stroke Gradient */}
            <linearGradient id="scoreLineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines and Y-axis tick marks */}
          {yLevels.map((lvl) => {
            const y = getY(lvl);
            return (
              <g key={lvl} className="grid-level-group">
                <text
                  x={paddingLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="axis-label y-axis-label"
                >
                  {lvl}% ┤
                </text>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={svgWidth - paddingRight}
                  y2={y}
                  className="grid-line"
                />
              </g>
            );
          })}

          {/* Baseline X-axis */}
          <line
            x1={paddingLeft - 4}
            y1={paddingTop + chartHeight}
            x2={svgWidth - paddingRight}
            y2={paddingTop + chartHeight}
            className="axis-baseline"
          />
          <text
            x={paddingLeft - 10}
            y={paddingTop + chartHeight + 4}
            textAnchor="end"
            className="axis-label y-axis-label"
          >
            0% ┤
          </text>

          {/* Area under curve */}
          <path d={areaD} fill="url(#scoreAreaGradient)" />

          {/* Curved trend line */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#scoreLineGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Data Points and X-axis Labels */}
          {chartPoints.map((pt, idx) => {
            const x = getX(idx);
            const y = getY(pt.score);
            const isHovered = hoveredPoint?.index === idx;

            return (
              <g key={idx} className="chart-node-group">
                {/* Vertical helper line on hover */}
                {isHovered && (
                  <line
                    x1={x}
                    y1={paddingTop}
                    x2={x}
                    y2={paddingTop + chartHeight}
                    stroke="#4f46e5"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    opacity="0.6"
                  />
                )}

                {/* Outer halo */}
                <circle
                  cx={x}
                  y={y}
                  r={isHovered ? 8 : 6}
                  className="node-circle-outer"
                  fill="#ffffff"
                  stroke="#4f46e5"
                  strokeWidth={isHovered ? 3.5 : 2.5}
                  onMouseEnter={() => setHoveredPoint({ ...pt, index: idx, x, y })}
                  onMouseLeave={() => setHoveredPoint(null)}
                  style={{ cursor: 'pointer', transition: 'r 0.15s ease' }}
                />

                {/* Inner dot */}
                <circle
                  cx={x}
                  y={y}
                  r={2.5}
                  fill="#4f46e5"
                  pointerEvents="none"
                />

                {/* X-axis Day Label */}
                <text
                  x={x}
                  y={paddingTop + chartHeight + 20}
                  textAnchor="middle"
                  className="axis-label x-axis-label"
                >
                  {pt.day}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <div
            className="chart-floating-tooltip"
            style={{
              left: `${(hoveredPoint.x / svgWidth) * 100}%`,
              top: `${(hoveredPoint.y / svgHeight) * 100}%`,
            }}
          >
            <div className="tooltip-score">{hoveredPoint.score}% Score</div>
            <div className="tooltip-quiz">{hoveredPoint.quiz}</div>
            <div className="tooltip-day">{hoveredPoint.day}</div>
          </div>
        )}
      </div>

      <div className="chart-footer-note">
        <span>● Scores calculated from practice sessions and quiz attempts</span>
      </div>
    </div>
  );
};

export default PerformanceChart;
