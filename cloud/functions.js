//Login cloud function
Parse.Cloud.define("login", async (req) => {
       
  const user = await Parse.User.logIn(req.params.username, req.params.password)

  return {
    "token": user.get("sessionToken"),
    "objectId": user.id,
  }
     
  },
  {
    fields: {
      username: {
        required: true,
        type: String
      },
      password: {
        required: true,
        type: String
      }
    }
  });


  
//Fetch Landmarks cloud function
//By default some fields are returned(createdAt,updatedAt) despite the selection of columns so we neeed to filter 
Parse.Cloud.define("fetchLandmarks", async (req) => {

  const query = new Parse.Query("Landmark");
  
  //If objectId exists we return only the matching document with all fields
  if(req.params.objectId){

    return query.get(req.params.objectId);
  }
  
  //Select limited fields and bring them with asc on order field
  query.ascending("order");
  query.select("title","short_info","photo_thumb","photo")
  
  const result = await query.find()
  
  //Filter to get rid of unneccesary columns
  return result.flatMap(item => 
    [
      {
        title: item.get("title"), 
        short_info: item.get("short_info"), 
        photo_thumb: item.get("photo_thumb"),
        photo: item.get("photo")
      }
    ]) 
});


//Update cloud function
//For updating i need to need to give access to authenticated users(from dashboard) to update when they include token
Parse.Cloud.define("saveLandmark", async (req) => {
 
  //Token is required
  if(!req.user){
    return 'You need a token to perform this Action'
  }
  
  //Create the object based on given values
  const Landmark = Parse.Object.extend("Landmark");
  let landMark = new Landmark();
  landMark.set(req.params)
  
  try {
   
    return await landMark.save(null, {sessionToken: req.user.getSessionToken()} )
 
  }catch(error){

    return error.message
  }

},
{
  fields: {
    objectId: {
      required: true,
      type: String
    }
  }
}
)


//Here we validate the given fields from user to avoid creating a new column when user gives a different column name
//We can do that configuration also from dashboard but it's good to know
Parse.Cloud.beforeSave("Landmark", async (request) => {

  const landmarkSchema = new Parse.Schema('Landmark');
  const schemaFields = await landmarkSchema.get()
  const requestFields = request.object;
  const keyNames = Object.keys(schemaFields.fields)

  for( let key in requestFields.dirtyKeys() ) {
    if(!keyNames.includes(requestFields.dirtyKeys()[key]) ){
      throw new Parse.Error(404, `Invalid column name ${requestFields.dirtyKeys()[key]}`)
    }
    }

})

  


 






