import bcryptjs from 'bcryptjs'
import { sendEmail } from '@helpers/mailer'
import { connect } from '@dbConfig/dbConfig'
import User from '@models/UserModel'
import { NextResponse } from 'next/server'


//Connection to database
connect();

export async function POST(request) {
    try {
        const reqBody=await request.json();

        const { name, email, password, confirm_password }= reqBody;

        console.log(reqBody)

        const user= await User.findOne({ email });

        if(user){
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        if(password!=confirm_password) return NextResponse.json({ error: "Passwords aren't matching" }, { status: 400 });

        //hash Password

        const salt= await bcryptjs.genSalt(Number(process.env.SALT));
        const hashedPassword= await bcryptjs.hash(password, salt);

        const newUser= new User({
            name, 
            email,
            password:hashedPassword
        });

        const savedUser= await newUser.save();
        // console.log(savedUser);

        //send a verification mail
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id});

        return NextResponse.json({
            message: "Verification link sent successfully, Please verify your email",
            success: true,
            savedUser
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
