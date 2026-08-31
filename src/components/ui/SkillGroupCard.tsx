import type { SkillGroup } from '../../types/resume';

interface SkillGroupCardProps {
  group: SkillGroup;
}

export default function SkillGroupCard({ group }: SkillGroupCardProps) {
  return (
    <article className="skill-group" data-group={group.id}>
      <span className="tag">{`// ${group.id.toUpperCase()}`}</span>

      <h3 className="skill-group__label">{group.label}</h3>

      <ul className="skill-group__list">
        {group.items.map((item) => (
          <li className="skill-group__chip" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
