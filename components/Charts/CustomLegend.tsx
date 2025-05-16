"use client";

const CustomLegend = (props: any) => {
  const { payload } = props;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center justify-center gap-1">
          <div
            className={`w-2 h-2 rounded-[2px]`}
            style={{ background: p.color }}
          ></div>
          <span>{p?.payload?.name || p.dataKey}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
