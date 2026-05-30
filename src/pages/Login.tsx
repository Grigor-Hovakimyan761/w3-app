import './Login.css';
import { useEffect, useState, type FormEvent } from 'react';
import { FaEnvelope, FaTimes, FaWallet } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithEmail, loginWithWallet } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isConsentOpen, setIsConsentOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleWalletLogin = () => {
    loginWithWallet();
    navigate('/', { replace: true });
  };

  const handleEmailSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !normalizedEmail.includes('@')) {
      setError('Մուտքագրեք ճիշտ էլ. հասցե');
      return;
    }

    setError('');
    setIsConsentOpen(true);
  };

  const handleEmailConsent = () => {
    loginWithEmail(email.trim().toLowerCase());
    navigate('/', { replace: true });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        {/* Լոգո և Ողջույնի տեքստ */}
        <h1 className="brand-logo">UniBoard</h1>
        <p className="welcome-text">Մուտք գործեք՝ ձեր ակադեմիական ճամփորդությունը շարունակելու համար</p>

        {/* Web3 և սոցիալական ցանցերով մուտք */}
        <div className="web3-login-section">
          <button className="connect-wallet-btn"
            type="button"
            onClick={handleWalletLogin}
          >
            <FaWallet className="btn-icon" /> Միանալ Դրամապանակով
          </button>
        </div>

        {/* Բաժանարար գիծ */}
        <div className="divider-container">
          <span className="divider-line"></span>
          <span className="divider-text">կամ</span>
          <span className="divider-line"></span>
        </div>

        <form className="standard-login-form" onSubmit={handleEmailSubmit}>
          <div className="input-group">
            <label>Էլ. հասցե</label>
            <input
              type="email"
              placeholder="student@university.am"
              className="login-input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <p className="email-wallet-note">
            Եթե wallet չունեք, email-ով մուտքից հետո ձեզ համար կստեղծվի demo Web3 wallet:
          </p>

          {error ? <p className="login-error">{error}</p> : null}

          <button type="submit" className="main-login-btn">
            <FaEnvelope className="btn-icon" /> Մուտք email-ով
          </button>
        </form>

        <p className="signup-prompt">
          MVP տարբերակ է․ իրական Web3Auth ինտեգրումը կավելացնենք հաջորդ փուլում։
        </p>

      </div>

      {isConsentOpen ? (
        <div className="consent-overlay" role="dialog" aria-modal="true">
          <div className="consent-modal">
            <button
              className="consent-close-btn"
              type="button"
              aria-label="Փակել"
              onClick={() => setIsConsentOpen(false)}
            >
              <FaTimes />
            </button>
            <h2>Email մուտք և wallet</h2>
            <p>
              Email-ով շարունակելու դեպքում ձեր հաշվի տակ կստեղծվի demo Web3 wallet:
              Հետագայում այս քայլը կփոխարինվի Web3Auth-ի իրական embedded wallet-ով:
            </p>
            <div className="consent-actions">
              <button
                className="secondary-action-btn"
                type="button"
                onClick={() => setIsConsentOpen(false)}
              >
                Չեղարկել
              </button>
              <button className="main-login-btn" type="button" onClick={handleEmailConsent}>
                Շարունակել
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Login;
