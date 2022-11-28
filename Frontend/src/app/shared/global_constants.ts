export class GlobalConstants {
    //message
    public static genericError: string = "Something went wrong. Please try again later.";
    public static unathorized: string = "You are not a authorized user to access this page."

    //regex
    public static nameRegex: string = "[a-zA-z0-9]*";
    public static emailRegex: string = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
    public static contcatNumberRegex: string = "^[e0-9]{10,10}$";

    //variable
    public static error: string = "error";
} 