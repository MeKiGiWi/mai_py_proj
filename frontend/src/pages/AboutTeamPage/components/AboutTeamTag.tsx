import { Link } from 'react-router';

export default function AboutTeamTag() {
  return (
    <Link to={'/about'} className="link link-hover">
      <span className="text-primary">23*73</span>
    </Link>
  );
}
