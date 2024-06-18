
export interface IArticle{
    id?: number,
    boardId?: number,
    title?: string,
    content?: string,
    registerDate?: string,
    writer?: number,
    writerUsername?: string,
    regDate?: string,
    modDate?: string,
    array?: IArticle[],
    json?: IArticle
    message?: string
}