import React from 'react';
import Skill from './Skill';

interface SkillsListProps {
    skills: string[];
}

const SkillsList: React.FC<SkillsListProps> = ({ skills }) => {

    if (!skills) {
        return null;
    }
    
    return (
        <div>
            {skills.map((skill, index) => (
                <Skill key={index} skill={skill} />
            ))}
        </div>
    );
};

export default SkillsList;