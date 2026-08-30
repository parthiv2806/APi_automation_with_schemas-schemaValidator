export const Login_Schema = {
  type: "object",

  properties: {
    token: {
      type: "string",
    },
  },
  required: ["token"],
};
//additionalProperties: false   ye kya karta hai ki man lo apke response mai 2 chiz hai token and message ab additaion property ap fasle kare to bhi ye schema pass ho jaega kyu ki toen schema mai diya hua hai message nai to false karenge to ye hoga uske bina run ho jaega aur ha ye by default true hota hai
