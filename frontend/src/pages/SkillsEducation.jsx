import ContentCollection from "../components/ContentCollection";

export default function SkillsEducation() {
  return (
    <ContentCollection
      title="Skills & Education"
      description="Explore Johnny Zhu's education and skills in front-end web development"
      endpoint="skills-and-education"
      headingId="skills-education-title"
      variant="education-cards"
      priorityIds={[71, 72]}
    />
  );
}
