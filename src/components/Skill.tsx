import { RichSkillDescriptor } from '@/types';
import React from 'react';

interface SkillProps {
    skill: RichSkillDescriptor;
}

const Skill: React.FC<SkillProps> = ({ skill }) => {
    return <div>{skill.skillName}</div>;
};

export default Skill;