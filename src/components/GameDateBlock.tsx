interface gameDateBlockProps {
  year: number;
  month: number;
}

export default function GameDateBlock(props: gameDateBlockProps) {
  const { year, month } = props;
  return (
    <div className="date-block">
      {year}年{month}月
    </div>
  );
}
