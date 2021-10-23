import { RouteComponentProps } from "react-router-dom";

export default function About(props: RouteComponentProps<{ id: string }>) {
  const { match } = props;

  return (
    <div>
      <h3>Profile page {match.params.id}.</h3>
    </div>
  );
}
