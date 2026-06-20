const configs = {
  solved: { label: 'Solved problems', color: '#38bdf8', field: 'solvedCount', suffix: '', source: 'snapshots' },
  wrongAnswerRate: { label: 'Wrong answer rate', color: '#fb7185', field: 'wrongAnswerRate', suffix: '%', source: 'snapshots' },
  contestRank: { label: 'Contest rank', color: '#a78bfa', field: 'rank', suffix: '', source: 'contests', lowerIsBetter: true },
};

const dateLabel = (value) => new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(value));

export default function TrendChart({ metric, snapshots, contests }) {
  const config = configs[metric];
  const raw = config.source === 'contests'
    ? contests.map((item) => ({ date: item.ratedAt, value: item[config.field], label: item.contestName }))
    : snapshots.map((item) => ({ date: item.date, value: item[config.field] }));
  const stride = Math.max(1, Math.ceil(raw.length / 60));
  const data = raw.filter((_, index) => index % stride === 0 || index === raw.length - 1);

  if (!data.length) return <div className="grid h-72 place-items-center rounded-2xl border border-dashed border-white/10 text-sm text-slate-500">No {config.label.toLowerCase()} data yet.</div>;

  const width = 760;
  const height = 290;
  const padding = { top: 24, right: 28, bottom: 42, left: 52 };
  const values = data.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const spread = Math.max(1, max - min);
  const x = (index) => padding.left + (index / Math.max(1, data.length - 1)) * (width - padding.left - padding.right);
  const y = (value) => {
    const ratio = (value - min) / spread;
    return config.lowerIsBetter
      ? padding.top + ratio * (height - padding.top - padding.bottom)
      : height - padding.bottom - ratio * (height - padding.top - padding.bottom);
  };
  const path = data.map((point, index) => `${index ? 'L' : 'M'} ${x(index)} ${y(point.value)}`).join(' ');
  const area = `${path} L ${x(data.length - 1)} ${height - padding.bottom} L ${x(0)} ${height - padding.bottom} Z`;
  const guideValues = config.lowerIsBetter
    ? [min, min + spread / 2, max]
    : [max, min + spread / 2, min];

  return (
    <div className="overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label={`${config.label} trend chart`}>
        <defs><linearGradient id={`fill-${metric}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={config.color} stopOpacity=".25" /><stop offset="100%" stopColor={config.color} stopOpacity="0" /></linearGradient></defs>
        {guideValues.map((value, index) => {
          const guideY = padding.top + index * ((height - padding.top - padding.bottom) / 2);
          return <g key={value}><line x1={padding.left} x2={width - padding.right} y1={guideY} y2={guideY} stroke="rgba(148,163,184,.12)" strokeDasharray="4 6" /><text x={padding.left - 10} y={guideY + 4} textAnchor="end" fill="#64748b" fontSize="11">{Math.round(value * 10) / 10}{config.suffix}</text></g>;
        })}
        <path d={area} fill={`url(#fill-${metric})`} />
        <path d={path} fill="none" stroke={config.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((point, index) => <circle key={`${point.date}-${index}`} cx={x(index)} cy={y(point.value)} r="4" fill="#0f172a" stroke={config.color} strokeWidth="2"><title>{point.label ? `${point.label}: ` : ''}${point.value}${config.suffix} · ${dateLabel(point.date)}</title></circle>)}
        <text x={padding.left} y={height - 12} fill="#64748b" fontSize="11">{dateLabel(data[0].date)}</text>
        <text x={width - padding.right} y={height - 12} textAnchor="end" fill="#64748b" fontSize="11">{dateLabel(data.at(-1).date)}</text>
      </svg>
    </div>
  );
}
