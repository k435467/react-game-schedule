import { useLocation } from "react-router-dom";

interface gameDatesBlockProps {
  year: number;
  month: number;
}

export default function gameDatesBlock(props: gameDatesBlockProps) {
  const { year, month } = props;
  const location = useLocation();
  console.log(location);
  return (
    <div className="date-block">
      {year}年{month}月
    </div>
  );
}
