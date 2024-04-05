import fs from 'fs';
import path from 'path';

function fetchCollectionsData(): any[] {
    // Path to your JSON file
    const jsonFilePath = path.join(process.cwd(), 'src', 'data', 'collections.json');

    // Read the JSON file
    const jsonString = fs.readFileSync(jsonFilePath, 'utf8');
    const jsonData = JSON.parse(jsonString);

    // Sort jsonData by name
    jsonData.sort((a: any, b: any) => a.name.localeCompare(b.name));

    return jsonData;
}

export default fetchCollectionsData;