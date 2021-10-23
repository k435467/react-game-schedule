interface GameBlockProps {
  month: number;
  day: number;
  dayOfWeek: string;
  time: string;
  raceType: string;
  local: string;
  team1: string;
  team1num: number;
  team2: string;
  team2num: number;
}

export default function GameBlock(props: GameBlockProps) {
  return (
    <div>
      <div className="flex-space-between">
        <span>1</span>
        <span>2</span>
      </div>
    </div>
  );
}
