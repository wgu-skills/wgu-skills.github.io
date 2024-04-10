import React from 'react';
import Skill from './Skill';
import { RichSkillDescriptor } from '../types';


interface SkillsListProps {
    skills: RichSkillDescriptor[];
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