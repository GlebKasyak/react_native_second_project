export const UserTypes = `
    type User {
        _id: ID!
        firstName: String
        secondName: String
        email: String
    }
    
    type AuthData {
        token: String!
    }
    
    input RegisterInput {
        firstName: String
        secondName: String
        email: String
        password: String
    }
`;

export const UserQueries = `
    login(email: String!, password: String!): AuthData!,
    auth: User!
`;

export const UserMutations = `
    register(registerInput: RegisterInput) : AuthData!
`;
