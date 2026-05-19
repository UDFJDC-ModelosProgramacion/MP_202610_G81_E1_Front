import React, { useState } from 'react';
import { registerShelter, checkShelterNameExists, checkShelterEmailExists } from '../services/shelterService';
import { Check, Upload } from 'lucide-react';
import { FormError } from '../components/shared/FormError';
import { useNavigate } from 'react-router-dom';
import { FormPageLayout } from '../components/shared/FormPageLayout';
import { StatusDialogs } from '../components/shared/StatusDialogs';

export const ShelterRegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    email: '',
    gallery: '',
    description: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    city: false,
    email: false,
  });

  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorDialogMessage, setErrorDialogMessage] = useState<string | null>(null);
  const [nameExistsError, setNameExistsError] = useState(false);
  const [nameCheckLoading, setNameCheckLoading] = useState(false);
  const [emailExistsError, setEmailExistsError] = useState(false);
  const [emailCheckLoading, setEmailCheckLoading] = useState(false);

  const maxDescriptionLength = 500;
  const isEmailValid = formData.email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email);

  const handleBlur = (field: 'name' | 'city' | 'email') => {
    setTouched({ ...touched, [field]: true });
  };

  const handleNameBlur = async () => {
    setTouched((prev) => ({ ...prev, name: true }));
    if (formData.name.trim() === '') {
      setNameExistsError(false);
      return;
    }
    setNameCheckLoading(true);
    const exists = await checkShelterNameExists(formData.name);
    setNameExistsError(exists);
    setNameCheckLoading(false);
  };

  const handleEmailBlur = async () => {
    setTouched((prev) => ({ ...prev, email: true }));
    if (!isEmailValid) {
      setEmailExistsError(false);
      return;
    }
    setEmailCheckLoading(true);
    const exists = await checkShelterEmailExists(formData.email);
    setEmailExistsError(exists);
    setEmailCheckLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (id === 'description' && value.length > maxDescriptionLength) return;
    
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    if (id === 'name') setNameExistsError(false);
    if (id === 'email') setEmailExistsError(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameExistsError || emailExistsError) return;
    if (!formData.name || !formData.city || !isEmailValid) {
      setTouched({ name: true, city: true, email: true });
      return;
    }

    setSubmissionStatus('loading');
    try {
      await registerShelter(formData);
      setSubmissionStatus('success');
      setShowSuccessDialog(true);
      setFormData({ name: '', city: '', email: '', gallery: '', description: '' });
      setTouched({ name: false, city: false, email: false });
    } catch (err) {
      setSubmissionStatus('error');
      console.error('Failed to register shelter:', err);
      setErrorDialogMessage('Failed to register shelter. Please try again.');
      setShowErrorDialog(true);
    } finally {
      setSubmissionStatus('idle');
    }
  };

  return (
    <FormPageLayout
      title="Add New Shelter Profile"
      description="Complete the form below to register a new shelter in the PetMatch network."
    >
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Shelter Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleNameBlur}
              placeholder="e.g., Happy Tails Sanctuary"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                (touched.name && !formData.name) || nameExistsError
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-green-500'
              }`}
              required
            />
            {nameCheckLoading && <p className="text-gray-500 text-xs mt-1">Checking name...</p>}
            {nameExistsError && <FormError message="This shelter name already exists" />}
            {touched.name && !formData.name && <FormError message="Shelter name is required" />}
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <select
              id="city"
              value={formData.city}
              onChange={handleChange}
              onBlur={() => handleBlur('city')}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all bg-white ${
                touched.city && !formData.city
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-green-500'
              }`}
              required
            >
              <option value="">Select a city</option>
              <option value="Bogotá">Bogotá</option>
              <option value="Medellín">Medellín</option>
              <option value="Cali">Cali</option>
              <option value="Barranquilla">Barranquilla</option>
              <option value="Cartagena">Cartagena</option>
              <option value="Cúcuta">Cúcuta</option>
              <option value="Bucaramanga">Bucaramanga</option>
              <option value="Pereira">Pereira</option>
              <option value="Santa Marta">Santa Marta</option>
              <option value="Ibagué">Ibagué</option>
            </select>
            {touched.city && !formData.city && <FormError message="City is required" />}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Official Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleEmailBlur}
                placeholder="e.g., contact@happytails.org"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  (touched.email && !isEmailValid) || emailExistsError
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-green-500'
                }`}
                required
              />
              {emailCheckLoading && <p className="text-gray-500 text-xs mt-1">Checking email...</p>}
              {isEmailValid && !emailExistsError && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                </div>
              )}
            </div>
            {emailExistsError && <FormError message="This shelter email already exists" />}
            {touched.email && !isEmailValid && <FormError message="Please enter a valid email address" />}
          </div>

          <div>
            <label htmlFor="gallery" className="block text-sm font-medium text-gray-700 mb-2">
              Gallery Link or Image URL
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-green-400 transition-colors">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  <Upload className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-700 mb-1">Enter a URL for the shelter's gallery</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
                <input
                  id="gallery"
                  type="text"
                  value={formData.gallery}
                  onChange={handleChange}
                  placeholder="https://example.com/gallery"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              About the Shelter
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the shelter's mission, facilities, and services..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all resize-none"
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-500">Provide details about the shelter's mission and services</p>
              <p className="text-xs text-gray-500">{formData.description.length}/{maxDescriptionLength}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => globalThis.history.back()}
            className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submissionStatus === 'loading'}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm disabled:opacity-50"
          >
            {submissionStatus === 'loading' ? 'Creating...' : 'Create Shelter'}
          </button>
        </div>
      </form>

      <StatusDialogs
        showSuccess={showSuccessDialog}
        onSuccessClose={() => {
          setShowSuccessDialog(false);
          navigate('/');
        }}
        successTitle="Shelter Created Successfully!"
        successDescription="Your shelter profile has been successfully registered."
        showError={showErrorDialog}
        onErrorClose={() => setShowErrorDialog(false)}
        errorMessage={errorDialogMessage}
      />
    </FormPageLayout>
  );
};
