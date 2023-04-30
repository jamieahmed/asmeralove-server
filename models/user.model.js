import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define enums
const ethnicityEnum = ['Tigrinya', 'Tigre', 'Saho', 'Afar', 'Bilen', 'Kunama', 'Nara', 'Rashaida', 'Hedareb', 'Jeberti', 'Other'];
const religionEnum = ['Orthodox', 'Islam', 'Catholic', 'Protestant', 'Jehovah’s Witnesses', 'Evangelical'];
const genderEnum = ['male', 'female', 'non-binary', 'transgender', 'other'];
const relationshipTypeEnum = ['friendship', 'romance', 'marriage', 'sex'];

// Define User Schema
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 500,
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 120,
    },
    gender: {
        type: String,
        required: true,
        enum: genderEnum,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        },
        address: {
            type: String,
            required: true,
            maxlength: 100,
            trim: true
        },
        city: {
            type: String,
            required: true,
            maxlength: 50,
            trim: true
        },
        state: {
            type: String,
            required: true,
            maxlength: 50,
            trim: true
        },
        zipcode: {
            type: String,
            required: true,
            maxlength: 10,
            trim: true
        }
    },

    ethnicity: {
        type: String,
        required: true,
        enum: ethnicityEnum,
    },
    religion: {
        type: String,
        required: true,
        enum: religionEnum,
    },
    lookingFor: {
        type: {
            relationshipType: {
                type: String,
                required: true,
                enum: relationshipTypeEnum,
            },
            ageRange: {
                type: {
                    min: {
                        type: Number,
                        min: 18,
                        max: 120,
                    },
                    max: {
                        type: Number,
                        min: 18,
                        max: 120,
                    },
                },
                required: true,
            },
            gender: {
                type: String,
                required: true,
                enum: genderEnum,
            },
            location: {
                type: String,
                required: true,
                maxlength: 100,
                trim: true,
            },
            ethnicity: {
                type: String,
                required: true,
                enum: ethnicityEnum,
            },
            religion: {
                type: String,
                required: true,
                enum: religionEnum,
            },
        },
        required: true,
    },
    interests: {
        type: [String],
        required: true,
    },
    about: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500,
    },
    occupation: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        trim: true,
    },
});

// Export User model
export default mongoose.model('User', userSchema);
