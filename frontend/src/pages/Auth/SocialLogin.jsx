import React, { useEffect } from 'react';
import { 
  signInWithPopup, 
  RecaptchaVerifier, 
  signInWithPhoneNumber,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink 
} from 'firebase/auth';
import { auth, googleProvider } from '../../services/firebase';
import { Mail, Phone } from 'lucide-react';
import { Button } from '../../components/ui';

export default function SocialLogin() {
  // Handle Email Link completion on component mount
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem('emailForSignIn');
          console.log('Email link login successful:', result.user);
          alert('Email verified successfully!');
        })
        .catch((error) => {
          console.error('Email link confirmation error:', error);
        });
    }
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google user logged in:', result.user);
      alert('Logged in via Google. Please complete profile setup.');
    } catch (error) {
      console.error('Google login error:', error);
      alert('Error during Google login: ' + error.message);
    }
  };

  const handlePhoneLogin = async () => {
    const phoneNumber = window.prompt("Enter your phone number (with country code, e.g., +15551234567):");
    if (!phoneNumber) return;

    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          'size': 'invisible'
        });
      }
      
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      
      const code = window.prompt("Enter the 6-digit verification code sent to your phone:");
      if (code) {
        const result = await confirmationResult.confirm(code);
        console.log('Phone user logged in:', result.user);
        alert('Phone login successful!');
      }
    } catch (error) {
      console.error('Phone login error:', error);
      alert('Phone auth error: ' + error.message);
    }
  };

  const handleEmailLinkLogin = async () => {
    const email = window.prompt("Enter your email for a sign-in link:");
    if (!email) return;

    const actionCodeSettings = {
      url: window.location.href, // Returns here to complete sign-in
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      alert('Sign-in link sent to ' + email + '. Check your inbox!');
    } catch (error) {
      console.error('Email link error:', error);
      alert('Error sending email link: ' + error.message);
    }
  };

  return (
    <div className="social-auth-section">
      <div id="recaptcha-container"></div>
      
      <div className="divider mb-6">
        <span>OR CONTINUE WITH</span>
      </div>
      
      <div className="social-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        <Button 
          variant="social" 
          onClick={handleGoogleLogin}
          title="Login with Google"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="20" style={{ marginRight: '8px' }} />
          <span>Google</span>
        </Button>
        
        <Button 
          variant="social" 
          onClick={handleEmailLinkLogin}
          icon={Mail}
          title="Login with Email"
        >
          <span>Email</span>
        </Button>

        <Button 
          variant="social" 
          onClick={handlePhoneLogin}
          icon={Phone}
          title="Login with Phone"
        >
          <span>Phone</span>
        </Button>
      </div>
    </div>
  );
}
