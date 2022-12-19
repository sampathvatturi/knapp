export class GlobalConstants {
    //message
    public static genericError: string = "Something went wrong. Please try again later.";
    public static unathorized: string = "You are not a authorized user to access this page.";
    public static amountError: string = "Maximum 10 digits before decimal and 2 digits after decimal";
    public static numberError: string = "Only numbers are allowed";



    //regex
    public static nameRegex: string = "[a-zA-z0-9 ]*";
    public static emailRegex: string = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
    public static contactNumberRegex: string = "[0-9]*";
    public static numberRegex: string  = "[0-9]*"
    public static addressRegex: string = "[-a-zA-z0-9 /:,.\n]*";
    public static firstLastNameRegex: string = "[a-zA-z ]*";    
    public static amountRegex = /^\d{0,10}(\.?\d{0,2})$/;
    public static accountsRegex:string = "[a-zA-z0-9&.,-/ ]*";

    public static error: string = "error";

    //department
    public static globalDept:any ={};
}
