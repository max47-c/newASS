const mongoose = require('mongoose');

// Enums
const RoleEnum = Object.freeze(['ADMIN', 'REGULAR', 'GUEST', 'VIP']);
const BloodTypeEnum = Object.freeze([
  'A_positive',
  'A_negative',
  'B_positive',
  'B_negative',
  'AB_positive',
  'AB_negative',
  'O_positive',
  'O_negative',
  'Unknown',
]);
const SexEnum = Object.freeze(['Male', 'Female', 'Other', 'Unknown']);
const StatusEnum = Object.freeze(['done', 'pending']);

// User Schema
const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, unique: true, required: true },
    sex: { type: String, enum: SexEnum, default: 'Unknown' },
    emailVerified: { type: Date },
    role: { type: String, enum: RoleEnum, default: 'REGULAR' },
    image: { type: String },
    phone: { type: String },
    numReq: { type: Number, default: 0 },
    numDon: { type: Number, default: 0 },
    donorStatus: { type: Boolean, default: false },
    address: { type: String },
    bloodType: { type: String, enum: BloodTypeEnum, default: 'Unknown' },
    bio: { type: String },
    birthday: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Account Schema
const AccountSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    type: { type: String, required: true },
    provider: { type: String, required: true },
    providerAccountId: { type: String, required: true },
    refresh_token: { type: String },
    access_token: { type: String },
    expires_at: { type: Number },
    token_type: { type: String },
    scope: { type: String },
    id_token: { type: String },
    session_state: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// BloodBank Schema
const BloodBankSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    address: { type: String, required: true },
    contact: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    A_positive: { type: Number, default: 0 },
    A_negative: { type: Number, default: 0 },
    B_positive: { type: Number, default: 0 },
    B_negative: { type: Number, default: 0 },
    AB_positive: { type: Number, default: 0 },
    AB_negative: { type: Number, default: 0 },
    O_positive: { type: Number, default: 0 },
    O_negative: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// BloodRequest Schema
const BloodRequestSchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    sex: { type: String, enum: SexEnum, required: true },
    age: { type: Number, required: true },
    name: { type: String, required: true },
    bloodType: { type: String, enum: BloodTypeEnum, required: true },
    bloodQty: { type: Number, required: true },
    role: { type: String, enum: RoleEnum, default: 'GUEST' },
    urgency: { type: String, enum: ['high', 'medium', 'low'], required: true },
    status: { type: String, enum: StatusEnum, default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Event Schema
const EventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: String, required: true },
    stopDate: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// VerificationToken Schema
const VerificationTokenSchema = new mongoose.Schema(
  {
    identifier: { type: String, required: true },
    token: { type: String, required: true },
    expires: { type: Date, required: true },
  },
  { timestamps: true }
);

// Authenticator Schema (Optional for WebAuthn support)
const AuthenticatorSchema = new mongoose.Schema(
  {
    credentialID: { type: String, unique: true, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    providerAccountId: { type: String, required: true },
    credentialPublicKey: { type: String, required: true },
    counter: { type: Number, required: true },
    credentialDeviceType: { type: String, required: true },
    credentialBackedUp: { type: Boolean, default: false },
    transports: { type: String },
  },
  { timestamps: true }
);

// Session Schema
const SessionSchema = new mongoose.Schema(
  {
    sessionToken: { type: String, unique: true, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    expires: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = {
  User: mongoose.model('User', UserSchema),
  Account: mongoose.model('Account', AccountSchema),
  BloodBank: mongoose.model('BloodBank', BloodBankSchema),
  BloodRequest: mongoose.model('BloodRequest', BloodRequestSchema),
  Event: mongoose.model('Event', EventSchema),
  VerificationToken: mongoose.model('VerificationToken', VerificationTokenSchema),
  Authenticator: mongoose.model('Authenticator', AuthenticatorSchema),
  Session: mongoose.model('Session', SessionSchema),
};
