export default {
    firstName: {
        presence: {
            allowEmpty: false,
            message: "^Please enter a firstName"
        },
        length: {
            minimum: 4,
            maximum: 15,
            message: "^Your firstName must be at least 5 characters"
        }
    },
    secondName: {
        presence: {
            allowEmpty: false,
            message: "^Please enter a secondName"
        },
        length: {
            minimum: 5,
            message: "^Your secondName must be at least 5 characters"
        }
    },
    email: {
        presence: {
            allowEmpty: false,
            message: "^Please enter an email address"
        },
        email: {
            message: "^Please enter a valid email address"
        }
    },

    password: {
        presence: {
            allowEmpty: false,
            message: "^Please enter a password"
        },
        length: {
            minimum: 5,
            message: "^Your password must be at least 5 characters"
        }
    }
};
