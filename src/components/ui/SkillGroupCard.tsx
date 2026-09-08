import type { SkillGroup } from '../../types/resume';

interface SkillGroupCardProps {
  group: SkillGroup;
}

export default function SkillGroupCard({ group }: SkillGroupCardProps) {
  const stats = group.tunerStats || { topSpeed: 90, acceleration: 92, handling: 88, nitro: 95 };

  return (
    <article className="skill-group" data-group={group.id}>
      <div className="skill-group__header">
        <span className="tag">{`// TUNER_SPEC_${group.id.toUpperCase()}`}</span>
        <h3 className="skill-group__label">{group.label}</h3>
      </div>

      <ul className="skill-group__list">
        {group.items.map((item) => (
          <li className="skill-group__chip" key={item}>
            {item}
          </li>
        ))}
      </ul>

      {/* Tuner Performance Ratings */}
      <div className="skill-group__tuner-sheet">
        <div className="tuner-mini">
          <span className="tuner-mini__label">TOP SPEED</span>
          <div className="tuner-mini__track">
            <div className="tuner-mini__fill" style={{ width: `${stats.topSpeed}%` }} />
          </div>
        </div>

        <div className="tuner-mini">
          <span className="tuner-mini__label">ACCELERATION</span>
          <div className="tuner-mini__track">
            <div className="tuner-mini__fill" style={{ width: `${stats.acceleration}%` }} />
          </div>
        </div>

        <div className="tuner-mini">
          <span className="tuner-mini__label">HANDLING</span>
          <div className="tuner-mini__track">
            <div className="tuner-mini__fill" style={{ width: `${stats.handling}%` }} />
          </div>
        </div>

        <div className="tuner-mini">
          <span className="tuner-mini__label">NOS INJECTION</span>
          <div className="tuner-mini__track">
            <div className="tuner-mini__fill tuner-mini__fill--nos" style={{ width: `${stats.nitro}%` }} />
          </div>
        </div>
      </div>
    </article>
  );
}
