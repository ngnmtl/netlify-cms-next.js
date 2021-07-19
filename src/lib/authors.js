import authors from "../../meta/authors.yml";
export function getAuthor() {
    let result = {};
    for (const author of authors.authors) {
        result = author;
    }
    return result;
}
