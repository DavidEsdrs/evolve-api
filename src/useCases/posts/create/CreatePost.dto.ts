export interface ICreatePostDTO {
    file_name: string;
    description?: string;
    user_id: number;
    tags: string[];
}