import passport from 'passport';
import passportJWT from 'passport-jwt';
import UserModel from '.../users/userModel';
import dotenv from 'dotenv';

dotenv.config();

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.secret;
const strategy = new JWTStrategy(jwtOptions, async function(payload, next) {
    const user = await UserModel.findByEmal(payload);
    if(user) {
        next(null,user);
    }else {
        next(null,false);
    }
});

passport.use(strategy);

export default passport;