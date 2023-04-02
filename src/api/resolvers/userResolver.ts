// TODO: Add resolvers for user
// 1. Queries
// 1.1. users
// 1.2. userById
// 2. Mutations
// 2.1. createUser
// 2.2. updateUser
// 2.3. deleteUser

import { User } from "../../interfaces/User";
import userModel from "../models/userModel";

export default {
    Query: {
        users: async () => {
            return await userModel.find();
        },
        userById: async (_parent: undefined, args: User) => {
            return await userModel.findById(args.id);
        },
    },

    Mutation: {
        createUser: async (_parent: undefined, args: User) => {
            const user = new userModel(args);
            return await user.save();
        },
        updateUser: async (_parent: undefined, args: User) => {
            return await userModel.findByIdAndUpdate(args.id, args, {
                new: true,
            });
        },
        deleteUser: async (_parent: undefined, args: User) => {
            return await userModel.findByIdAndDelete(args.id);
        },
    }  
}