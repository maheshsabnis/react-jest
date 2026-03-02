export class ResponseObject<T> {
    public Records!:T[];
    public Record!:T;
    public StatusCode!:number;
    public Message!:string; 
}