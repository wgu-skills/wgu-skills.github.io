import React from 'react';

interface SkillProps {
    skill: {
        name: string;
    };
}

const Skill: React.FC<SkillProps> = ({ skill }) => {
    return <div>{skill.name}</div>;
};

export default Skill;