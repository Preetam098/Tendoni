class UserData {

    public username: string;
    public password: string;
    
    public errors: { username: string | null; password: string | null };
  
    constructor (username: string, password: string)
    {
      this.username = username;
      this.password = password;
      this.errors = { username: null, password: null };
    }
  
}

export default UserData;