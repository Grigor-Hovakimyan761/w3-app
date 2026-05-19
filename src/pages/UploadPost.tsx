import './UploadPost.css';
import { FaFileAlt } from "react-icons/fa";


const UploadPost = () => {
  return (
    <div className="upload-page-container">
      <div className="upload-card">
        <h2 className="upload-title">Կիսվիր գիտելիքով</h2>
        <p className="upload-subtitle">Ավելացրու նոր կոնսպեկտ, թեստ կամ առաջադրանքի լուծում</p>

        <form className="upload-form">
          
          {/* Վերնագրի դաշտ */}
          <div className="form-group">
            <label htmlFor="post-title">Վերնագիր</label>
            <input 
              type="text" 
              id="post-title" 
              className="custom-input" 
              placeholder="Օրինակ՝ Ֆիզիկայի 3-րդ լաբորատոր աշխատանք..." 
            />
          </div>

          {/* Առարկայի ընտրություն */}
          <div className="form-group">
            <label htmlFor="subject-select">Առարկա</label>
            <select id="subject-select" className="custom-input">
              <option value="" disabled selected>Ընտրիր առարկան</option>
              <option value="math">Մաթեմատիկա</option>
              <option value="physics">Ֆիզիկա</option>
              <option value="chemistry">Քիմիա</option>
              <option value="programming">Ծրագրավորում</option>
            </select>
          </div>

          {/* Ֆայլի վերբեռնման հատված */}
          <div className="form-group">
            <label>Կցել ֆայլ (PDF կամ Նկար)</label>
            <div className="file-drop-area">
              <span className="file-icon"><FaFileAlt /></span>
              <span className="file-text">Սեղմիր այստեղ կամ քաշիր ֆայլը</span>
              <input type="file" className="file-input-hidden" />
            </div>
          </div>

          {/* Հաստատման կոճակ */}
          <button type="button" className="submit-btn">Տեղադրել նյութը</button>
          
        </form>
      </div>
    </div>
  );
};

export default UploadPost;