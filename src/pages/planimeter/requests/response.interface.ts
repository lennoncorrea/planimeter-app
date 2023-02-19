export default interface ApiResponse<T>{
    data: T;
    status: string;
}