const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID );

const googleVerify = async( token = '' ) => {

  //console.log( token ) 
  const { id_token } = token;
  //console.log( id_token )
  const ticket = await client.verifyIdToken({
    idToken: id_token,
    audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
});

  const { name: nombre, 
          picture: img, 
          email
        } = ticket.getPayload();
  
  return { nombre, img, email };
  // const payload = ticket.getPayload();

  // return payload

}


module.exports = {
    googleVerify
}