import { readdirSync, statSync } from 'fs'

const dir = './public/photos/';

export function request() {
    const files = readdirSync(dir);

    let photos = [];

    files.filter(filename => filename !== '.DS_Store')
    .sort((a, b) => b.localeCompare(a))
    .forEach((filename) => {
        let location = filename.replace(/\.(jpg|JPG)/g, '');
        location = location.replace(/-[0-9]+/g, '');
        location = location.replace(/([0-9]+)_([0-9]+)_([0-9]+)/g, '');

        let photo = {
            'location': location,
            'filename': filename
        }

        photos.push(photo);
    });

    return photos;
}