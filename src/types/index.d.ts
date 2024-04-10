type Collection = {
    primary_sector: string;
    secondary_sector: string;
    name: string;
    url: string;
    slug: string;
    uuid: string;
    repo_url: string;
};


type Alignment = {
    id: string;
    skillName: string;
};

type RichSkillDescriptor = {
    type: string;
    author: string;
    creationDate: string;
    id: string;
    status: string;
    collections: Collection[];
    creator: string;
    updateDate: string;
    publishDate: string;
    archiveDate: string | null;
    skillName: string;
    skillStatement: string;
    keywords: string[];
    uuid: string;
    certifications: string[];
    occupations: string[];
    employers: string[];
    category: string;
    alignments: Alignment[];
    standards: string[];
    '@context': string;
};


export type { Collection, RichSkillDescriptor, Alignment };