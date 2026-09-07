import type { Experience } from '../../types/resume';

interface ExperienceCardProps {
  job: Experience;
}

export default function ExperienceCard({ job }: ExperienceCardProps) {
  return (
    <article className="job" data-current={job.current}>
      <header className="job__header">
        {/* The card's own HUD marker: currently-held roles read as live. */}
        <span className={`tag ${job.current ? 'tag--live' : ''}`}>
          {job.current ? '[STATUS: ACTIVE]' : '[STATUS: COMPLETE]'}
        </span>

        <h3 className="job__role">{job.role}</h3>

        <p className="job__company">
          <span className="job__company-name">{job.company}</span>
          <span className="job__separator"> &middot; </span>
          <span className="job__location">{job.location}</span>
        </p>

        <p className="job__dates">
          <time className="job__date job__date--start">{job.startDate}</time>
          <span className="job__dash"> &ndash; </span>
          <time className="job__date job__date--end">{job.endDate}</time>
        </p>
      </header>

      <ul className="job__highlights">
        {job.highlights.map((highlight) => (
          <li className="highlight" key={highlight.id}>
            <h4 className="highlight__title">{highlight.title}</h4>
            <p className="highlight__description">{highlight.description}</p>
            {highlight.metric && (
              <span className="highlight__metric">{highlight.metric}</span>
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}
