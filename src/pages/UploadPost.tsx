import './UploadPost.css';
import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { FaCheckCircle, FaFileAlt } from "react-icons/fa";
import type { PostSubject } from '../types/database';

type FormState = {
  title: string;
  description: string;
  subject: PostSubject | '';
  file: File | null;
};

const subjectOptions: Array<{ value: PostSubject; label: string }> = [
  { value: 'math', label: 'Մաթեմատիկա' },
  { value: 'physics', label: 'Ֆիզիկա' },
  { value: 'chemistry', label: 'Քիմիա' },
  { value: 'programming', label: 'Ծրագրավորում' },
  { value: 'biology', label: 'Կենսաբանություն' },
  { value: 'general', label: 'Ընդհանուր' },
];

const allowedFileTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/webp'];
const maxFileSizeBytes = 20 * 1024 * 1024;

const formatFileSize = (size: number) => {
  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

const UploadPost = () => {
  const [formState, setFormState] = useState<FormState>({
    title: '',
    description: '',
    subject: '',
    file: null,
  });
  const [error, setError] = useState('');
  const [mockCid, setMockCid] = useState('');

  const selectedFileMeta = useMemo(() => {
    if (!formState.file) {
      return null;
    }

    return `${formState.file.name} • ${formatFileSize(formState.file.size)}`;
  }, [formState.file]);

  const updateField = (field: keyof Omit<FormState, 'file'>, value: string) => {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
    setError('');
    setMockCid('');
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      setFormState((current) => ({ ...current, file: null }));
      return;
    }

    if (!allowedFileTypes.includes(file.type)) {
      setError('Կարելի է կցել միայն PDF կամ նկար');
      event.target.value = '';
      return;
    }

    if (file.size > maxFileSizeBytes) {
      setError('Ֆայլը պետք է լինի մինչև 20 MB');
      event.target.value = '';
      return;
    }

    setFormState((current) => ({ ...current, file }));
    setError('');
    setMockCid('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formState.title.trim().length < 3) {
      setError('Վերնագիրը պետք է լինի առնվազն 3 նիշ');
      return;
    }

    if (!formState.description.trim()) {
      setError('Ավելացրեք կարճ նկարագրություն');
      return;
    }

    if (!formState.subject) {
      setError('Ընտրեք առարկան');
      return;
    }

    if (!formState.file) {
      setError('Կցեք PDF կամ նկար');
      return;
    }

    const fakeCid = `bafy-demo-${crypto.randomUUID().replaceAll('-', '').slice(0, 24)}`;
    setMockCid(fakeCid);
    setError('');
  };

  return (
    <div className="upload-page-container">
      <div className="upload-card">
        <h2 className="upload-title">Կիսվիր գիտելիքով</h2>
        <p className="upload-subtitle">Ավելացրու նոր կոնսպեկտ, թեստ կամ առաջադրանքի լուծում</p>

        <form className="upload-form" onSubmit={handleSubmit}>
          
          {/* Վերնագրի դաշտ */}
          <div className="form-group">
            <label htmlFor="post-title">Վերնագիր</label>
            <input 
              type="text" 
              id="post-title" 
              className="custom-input" 
              placeholder="Օրինակ՝ Ֆիզիկայի 3-րդ լաբորատոր աշխատանք..." 
              value={formState.title}
              onChange={(event) => updateField('title', event.target.value)}
              maxLength={140}
            />
          </div>

          <div className="form-group">
            <label htmlFor="post-description">Նկարագրություն</label>
            <textarea
              id="post-description"
              className="custom-input custom-textarea"
              placeholder="Կարճ գրիր՝ ինչ նյութ է, ում համար է օգտակար, ինչ է պարունակում..."
              value={formState.description}
              onChange={(event) => updateField('description', event.target.value)}
              maxLength={4000}
            />
          </div>

          {/* Առարկայի ընտրություն */}
          <div className="form-group">
            <label htmlFor="subject-select">Առարկա</label>
            <select
              id="subject-select"
              className="custom-input"
              value={formState.subject}
              onChange={(event) => updateField('subject', event.target.value)}
            >
              <option value="" disabled>Ընտրիր առարկան</option>
              {subjectOptions.map((subject) => (
                <option key={subject.value} value={subject.value}>
                  {subject.label}
                </option>
              ))}
            </select>
          </div>

          {/* Ֆայլի վերբեռնման հատված */}
          <div className="form-group">
            <label>Կցել ֆայլ (PDF կամ Նկար)</label>
            <div className="file-drop-area">
              <span className="file-icon"><FaFileAlt /></span>
              <span className="file-text">
                {selectedFileMeta ?? 'Սեղմիր այստեղ կամ քաշիր ֆայլը'}
              </span>
              <span className="file-hint">PDF, PNG, JPG, WEBP • մինչև 20 MB</span>
              <input
                type="file"
                className="file-input-hidden"
                accept=".pdf,image/png,image/jpeg,image/webp"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {error ? <p className="upload-error">{error}</p> : null}

          {mockCid ? (
            <div className="upload-success">
              <FaCheckCircle />
              <div>
                <strong>Mock upload պատրաստ է</strong>
                <span>Հաջորդ փուլում այս CID-ը կգա իրական IPFS-ից՝ {mockCid}</span>
              </div>
            </div>
          ) : null}

          {/* Հաստատման կոճակ */}
          <button type="submit" className="submit-btn">Տեղադրել նյութը</button>
          
        </form>
      </div>
    </div>
  );
};

export default UploadPost;
