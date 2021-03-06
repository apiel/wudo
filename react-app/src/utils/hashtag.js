// https://stackoverflow.com/questions/20690499/concrete-javascript-regex-for-accented-characters-diacritics

export default function getHashTags(inputText) {
    var regex = /(?:^|\s)(?:#)([A-Za-zÀ-ÿ\d\-_]+)(?:$|\s)/gm;
    var matches = [];
    var match;

    while ((match = regex.exec(inputText))) {
        matches.push(match[1]);
    }

    return matches;
}
