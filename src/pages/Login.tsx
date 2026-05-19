import './Login.css';
import { FaWallet, FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-card">
        
        {/* Լոգո և Ողջույնի տեքստ */}
        <h1 className="brand-logo">UniBoard</h1>
        <p className="welcome-text">Մուտք գործեք՝ ձեր ակադեմիական ճամփորդությունը շարունակելու համար</p>

        {/* Web3 և սոցիալական ցանցերով մուտք */}
        <div className="web3-login-section">
          <button className="connect-wallet-btn"
            onClick={() => navigate('/connect-wallet')}
          >
            <FaWallet className="btn-icon" /> Միանալ Դրամապանակով
          </button>
          <button className="social-login-btn">
            <FaGoogle className="btn-icon" /> Շարունակել Google-ով
          </button>
        </div>

        {/* Բաժանարար գիծ */}
        <div className="divider-container">
          <span className="divider-line"></span>
          <span className="divider-text">կամ</span>
          <span className="divider-line"></span>
        </div>

        {/* Ստանդարտ էլ. փոստով մուտքի ձևանմուշ */}
        <form className="standard-login-form">
          <div className="input-group">
            <label>Էլ. հասցե</label>
            <input type="email" placeholder="student@university.am" className="login-input" />
          </div>
          
          <div className="input-group">
            <label>Գաղտնաբառ</label>
            <input type="password" placeholder="••••••••" className="login-input" />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" /> Հիշել ինձ
            </label>
            <a href="#" className="forgot-password">Մոռացե՞լ եք գաղտնաբառը</a>
          </div>

          <button type="button" className="main-login-btn">Մուտք</button>
        </form>

        {/* Գրանցման հղում */}
        <p className="signup-prompt">
          Դեռ չունե՞ք հաշիվ: <span className="signup-link">Գրանցվել</span>
        </p>

      </div>
    </div>
  );
};

export default Login;