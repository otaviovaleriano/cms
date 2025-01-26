export class Document {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public url: string,
        public children: Document[]
    ) {}
}