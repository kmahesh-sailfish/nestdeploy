import { createParamDecorator } from '@nestjs/common';

export const UserDetails = createParamDecorator((data, req) => {
    console.log('data',req.rawHeaders);
     //return data ? req.user[data] : req.user;
 // return data ? req.body[data] :req.body;
});
