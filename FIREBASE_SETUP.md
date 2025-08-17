# 🔥 Firebase Authentication Setup Guide for FastCare

This guide will walk you through setting up Firebase Authentication for your FastCare healthcare application.

## 📋 Prerequisites

- A Google account
- Node.js and npm installed
- FastCare project set up

## 🚀 Step-by-Step Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** or select an existing project
3. Enter project name: `fastcare-healthcare`
4. Enable Google Analytics (optional but recommended)
5. Click **"Create project"**

### 2. Enable Authentication

1. In your Firebase project, click **"Authentication"** in the left sidebar
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Enable these providers:

#### Email/Password Authentication
- Click **"Email/Password"**
- Toggle **"Enable"** to ON
- Toggle **"Email link (passwordless sign-in)"** to OFF (we'll use password-based auth)
- Click **"Save"**

#### Google Authentication
- Click **"Google"**
- Toggle **"Enable"** to ON
- Enter a **Project support email** (your email)
- Click **"Save"**

#### Phone Authentication (Optional)
- Click **"Phone"**
- Toggle **"Enable"** to ON
- Enter a **Project support email**
- Click **"Save"**

### 3. Get Firebase Configuration

1. In Firebase Console, click the **gear icon** ⚙️ next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click **"Add app"** and select **"Web"** (</>)
5. Enter app nickname: `fastcare-web`
6. Click **"Register app"**
7. Copy the configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
  measurementId: "G-XXXXXXXXXX"
};
```

### 4. Configure Environment Variables

1. In your FastCare project root, create a `.env.local` file
2. Add your Firebase configuration:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-actual-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# JWT Secret (for additional security if needed)
JWT_SECRET=your-super-secret-jwt-key

# Database URLs (for future use)
DATABASE_URL=postgresql://user:password@localhost:5432/fastcare
REDIS_URL=redis://localhost:6379
```

**⚠️ Important:** Replace all placeholder values with your actual Firebase configuration!

### 5. Configure Authentication Rules (Optional)

1. In Firebase Console, go to **"Authentication"** → **"Settings"**
2. Under **"Authorized domains"**, add your domain (e.g., `localhost` for development)
3. Under **"User actions"**, you can customize:
   - Email templates
   - Action code settings
   - Advanced settings

### 6. Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to `/auth/signup` to create a new account
3. Try logging in with the created account
4. Test Google sign-in functionality

## 🔧 Advanced Configuration

### Custom User Claims

For role-based access (patient/hospital), you can add custom claims:

```typescript
// In Firebase Functions or Admin SDK
await admin.auth().setCustomUserClaims(uid, {
  role: 'patient',
  hospitalId: null
});
```

### Password Reset

Password reset is automatically enabled with Firebase Auth. Users can:
1. Click "Forgot password?" on login page
2. Enter their email
3. Receive a password reset link via email

### Email Verification

To enable email verification:

```typescript
// In your signup function
await updateProfile(user, { displayName: displayName })
await sendEmailVerification(user)
```

## 🚨 Security Best Practices

1. **Never commit `.env.local` to version control**
2. **Use strong passwords** (Firebase enforces minimum 6 characters)
3. **Enable Firebase App Check** for production
4. **Set up proper Firebase Security Rules** for Firestore
5. **Monitor authentication logs** in Firebase Console

## 🐛 Troubleshooting

### Common Issues

1. **"Firebase App named '[DEFAULT]' already exists"**
   - This is normal in development with hot reloading
   - The error is handled in our config

2. **"auth/popup-closed-by-user"**
   - User closed the Google sign-in popup
   - This is normal user behavior

3. **"auth/popup-blocked"**
   - Browser blocked the popup
   - Ask user to allow pop-ups for your domain

4. **"auth/email-already-in-use"**
   - User already has an account
   - Redirect them to login page

### Debug Mode

Enable debug mode in development:

```typescript
// In lib/firebase/config.ts
if (process.env.NODE_ENV === 'development') {
  console.log('Firebase config:', firebaseConfig)
}
```

## 📱 Mobile Considerations

For future mobile app development:

1. **Firebase Auth works seamlessly** with React Native
2. **Phone authentication** is great for mobile
3. **Biometric authentication** can be added
4. **Deep linking** for email verification

## 🚀 Production Deployment

1. **Update authorized domains** in Firebase Console
2. **Set up custom domain** if needed
3. **Configure Firebase Hosting** (optional)
4. **Set up monitoring** and alerts
5. **Enable App Check** for security

## 📚 Additional Resources

- [Firebase Auth Documentation](https://firebase.google.com/docs/auth)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin)
- [Firebase Functions](https://firebase.google.com/docs/functions)

## 🎯 Next Steps

After setting up Firebase Authentication:

1. **Test all authentication flows**
2. **Set up user roles and permissions**
3. **Integrate with your database**
4. **Add email verification**
5. **Set up password reset**
6. **Configure user profiles**

---

**🎉 Congratulations!** Your FastCare application now has enterprise-grade authentication powered by Firebase!

For support, check the Firebase documentation or create an issue in your project repository.
