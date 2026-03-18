import mongoose from "mongoose";
import User from "../models/usermodel.js";
import Message from "../models/MessagesModel.js";

export const searchContacts = async(request,response,next)=>{
    try{
       const{searchTerm} = request.body;
       if(searchTerm === undefined || searchTerm === null){
          return response.status(400).send("searchTerm is required");
       }
       const sanitizedSerachTerm = searchTerm.replace(
        /[.*+?^${}|[\]\\]/g,
        "\\$&"
       )
       const regex = new RegExp(sanitizedSerachTerm,"i");
       const contacts = await User.find({
        $and: [{ _id: { $ne: request.userId}},
            {
            $or:[{firstName:regex},{lastName:regex},{empid:regex}],
        },
    ],
});
return response.status(200).json( {contacts});
        return response.status(200).send("Logout Sucessfull.");
    }catch(err){
console.log( {err} );
return response.status(500).send("Internal Server error");
    }
};

export const getContactsForDMList = async(request,response,next)=>{
    try{
       let {userId} = request;
       userId == new mongoose.Types.ObjectId(userId);
       const contacts = await Message.aggregate([
        {
            $match:{
                $or:[{sender:userId},{recipient: userId}]
            },
        },
        {
            $sort:{timestamp: -1},
        },
        {$group:{

            _id:{
                $cond:{
                    if:{$eq:["$sender",userId]},
                    then: "$recipient",
                    else: "$sender",
                },
            },
            lastMessageTime:{$first: "$timestamp" },

        },
    },
    {$lookup:{
        from:"users",
        localField:"_id",
        foreignField:"_id",
        as:"contactInfo",
    },
},
{
    $unwind:"$contactInfo",
},
{
    $project:{
        _id:1,
        lastMessageTime:1,
        empid:"$contactInfo.empid",
        firstName:"$contactInfo.firstName",
        lastName:"$contactInfo.lastName",
        image:"$contactInfo.image",
        color:"$contactInfo.color",
    },
},
{
    $sort:{lastMessageTime: -1},
}
       ]);
return response.status(200).json( {contacts});
        return response.status(200).send("Logout Sucessfull.");
    }catch(err){
console.log( {err} );
return response.status(500).send("Internal Server error");
    }
};
