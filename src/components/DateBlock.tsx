import { useLocation } from "react-router-dom";

interface DateBlcokProps {
  year: string;
  month: string;
}

export default function DateBlock(props: DateBlcokProps) {
  const { year, month } = props;
  const location = useLocation();
  console.log(location);
  return (
    <div>
      DateBlock, year{year}, month{month}
    </div>
  );
}
