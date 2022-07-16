
  

# React/Firebase Email/Password Auth with Context and User Table Creation.

### `1. Create your .env files`

Included is a file named .env.example which includes items for your Firebase project and routing. You will need to create a file named **.env.development** and **.env.production**. These are already in the .gitignore file.


**.env.example**


REACT_APP_SITE_NAME=Site Name

REACT_APP_DEFAULT_AVATAR_URL=/img/react-logo.png

`##` Firebase API Configs`

REACT_APP_API_KEY=

REACT_APP_AUTH_DOMAIN=

REACT_APP_PROECT_ID=

REACT_APP_STORAGE_BUCKET=

REACT_APP_MESSAGING_SENDER_ID=

REACT_APP_APP_ID=

REACT_APP_MEASUREMENT_ID=

`##` Roles

REACT_APP_ADMIN_TITLE=admin

REACT_APP_USER_TITLE=user

`##` Routes

REACT_APP_LOGIN_ROUTE=/login

REACT_APP_LOGOUT_ROUTE=/logout

REACT_APP_REGISTER_ROUTE=/register

REACT_APP_FORGOTPASSWORD_ROUTE=/reset-password

REACT_APP_TOS_ROUTE=/terms

REACT_APP_PRIVACY_ROUTE=/privacy

REACT_APP_MANAGE_USERS_ROUTE=/manage-users

REACT_APP_USER_SETTINGS_ROUTE=/settings


### 2. Update Your Firebase Firestore Rules for the Users Table and Admin privileges and usernames table

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null || request.auth == null;
      allow delete: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
      // don't let users update active or role to be different from what is there already
      allow update: if request.auth.uid == userId && (!request.resource.data.diff(resource.data).affectedKeys()
        .hasAny(['active', 'role']));
      // admins can edit all users info
      allow create, update, delete: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'YourAdminRole';
    }

    match /usernames/{document=**} {
      allow create: if request.auth != null;
      allow read: if request.auth != null || request.auth == null;
      allow read, update, delete: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'YourAdminRole';
    }
  }
}

### 3. Run Yarn

This app uses the following packages:

- "bootstrap": "^5.0.2"

- "firebase": "^9.9.0"

- "react-router-dom": "^6.0.2"

- "styled-components": "^5.3.0"

  

### Some Base Page Templates are Included as are Private, Public, and Admin Route Components

  
- Global Navigation

- Global Footer

- Landing

- Privacy Policy

- Terms of Use

- Sign In

- Sign Out

- Reset Password

- Register

- Profile Settings

- (Admin) User Management

- Error 404
