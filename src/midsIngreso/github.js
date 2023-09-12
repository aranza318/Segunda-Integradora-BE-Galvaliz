import passport from "passport";
import GitHubStrategy from "passport-github2";
import usersModel from "../dao/models/user.model.js"

//Portal para inicio con GitHub

const initializeGitHubPassport = () => {
    
    passport.use("github", new GitHubStrategy({
        clientID:"Iv1.d2c45899cd6168de",
        clientSecret:"e14191a30a643a267faa54cd43b85f6d4bfaa3cc",
        callbackURL:"http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            let user = await usersModel.findOne({email:profile._json.email});

            if (user) {
                return done(null, user);
            } else {
                let newUser = { 
                    first_name:profile._json.name,
                    last_name:"",
                    email:profile._json.email,
                    age:100,
                    password:""
                    
                    
                }
                let result = await usersModel.create(newUser);

                return done(null, result);
            }
        } catch(error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await usersModel.findById(id);
        done(null, user);
    });
};

export default initializeGitHubPassport;
