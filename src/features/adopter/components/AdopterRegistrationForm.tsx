
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import axios from 'axios';
import { FormError } from '../../../components/shared/FormError';
import { registerAdopter } from '../../../services/adopterService';
import { FormPageLayout } from '../../../components/shared/FormPageLayout';
import { StatusDialogs } from '../../../components/shared/StatusDialogs';

export function AdopterRegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    housingType: '',
    hasChildren: '',
    hasOtherPets: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
    housingType: false,
    hasChildren: false,
    hasOtherPets: false,
  });

  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorDialogMessage, setErrorDialogMessage] = useState<string | null>(null);

  const isEmailValid = formData.email.length > 0 && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email);
  const isPhoneValid = formData.phone.length >= 7;
  const isPasswordValid = formData.password.length >= 6;

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    setTouched({
      name: true,
      email: true,
      phone: true,
      password: true,
      housingType: true,
      hasChildren: true,
      hasOtherPets: true,
    });

    return !!(
      formData.name &&
      isEmailValid &&
      isPhoneValid &&
      isPasswordValid &&
      formData.housingType &&
      formData.hasChildren !== '' &&
      formData.hasOtherPets !== ''
    );
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      housingType: '',
      hasChildren: '',
      hasOtherPets: '',
    });
    setTouched({
      name: false,
      email: false,
      phone: false,
      password: false,
      housingType: false,
      hasChildren: false,
      hasOtherPets: false,
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmissionStatus('loading');
    try {
      await registerAdopter({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        housingType: formData.housingType,
        hasChildren: formData.hasChildren === 'true',
        hasOtherPets: formData.hasOtherPets === 'true',
        role: 'ADOPTER',
      });

      setSubmissionStatus('success');
      setShowSuccessDialog(true);
      resetForm();
    } catch (err) {
      setSubmissionStatus('error');
      let message = 'Failed to register adopter. Please try again.';
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        message = err.response.data.message;
      }
      setErrorDialogMessage(message);
      setShowErrorDialog(true);
    } finally {
      setSubmissionStatus('idle');
    }
  };

  return (
    <FormPageLayout
      title="Register as Adopter"
      description="Complete the form below to register as an adopter and start the pet adoption process."
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
      >
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              onBlur={() => handleBlur('name')}
              placeholder="e.g., María González"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                touched.name && !formData.name
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-orange-500'
              }`}
              required
            />
            {touched.name && !formData.name && <FormError message="Full name is required" />}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                placeholder="e.g., maria@email.com"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  touched.email && !isEmailValid
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-orange-500'
                }`}
                required
              />
              {isEmailValid && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                </div>
              )}
            </div>
            {touched.email && !isEmailValid && <FormError message="Please enter a valid email address" />}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              onBlur={() => handleBlur('phone')}
              placeholder="e.g., 3001234567"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                touched.phone && !isPhoneValid
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-orange-500'
              }`}
              required
            />
            {touched.phone && !isPhoneValid && <FormError message="Phone number must be at least 7 digits" />}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={() => handleBlur('password')}
              placeholder="At least 6 characters"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                touched.password && !isPasswordValid
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-orange-500'
              }`}
              required
            />
            {touched.password && !isPasswordValid && <FormError message="Password must be at least 6 characters" />}
          </div>

          <div>
            <label htmlFor="housingType" className="block text-sm font-medium text-gray-700 mb-2">
              Housing Type <span className="text-red-500">*</span>
            </label>
            <select
              id="housingType"
              value={formData.housingType}
              onChange={handleChange}
              onBlur={() => handleBlur('housingType')}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all bg-white ${
                touched.housingType && !formData.housingType
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-orange-500'
              }`}
              required
            >
              <option value="">Select housing type</option>
              <option value="HOUSE">House</option>
              <option value="APARTMENT">Apartment</option>
              <option value="FARM">Farm / Rural</option>
            </select>
            {touched.housingType && !formData.housingType && <FormError message="Housing type is required" />}
          </div>

          <div>
            <label htmlFor="hasChildren" className="block text-sm font-medium text-gray-700 mb-2">
              Do you have children at home? <span className="text-red-500">*</span>
            </label>
            <select
              id="hasChildren"
              value={formData.hasChildren}
              onChange={handleChange}
              onBlur={() => handleBlur('hasChildren')}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all bg-white ${
                touched.hasChildren && formData.hasChildren === ''
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-orange-500'
              }`}
              required
            >
              <option value="">Select an option</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {touched.hasChildren && formData.hasChildren === '' && <FormError message="This field is required" />}
          </div>

          <div>
            <label htmlFor="hasOtherPets" className="block text-sm font-medium text-gray-700 mb-2">
              Do you have other pets at home? <span className="text-red-500">*</span>
            </label>
            <select
              id="hasOtherPets"
              value={formData.hasOtherPets}
              onChange={handleChange}
              onBlur={() => handleBlur('hasOtherPets')}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all bg-white ${
                touched.hasOtherPets && formData.hasOtherPets === ''
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-orange-500'
              }`}
              required
            >
              <option value="">Select an option</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {touched.hasOtherPets && formData.hasOtherPets === '' && <FormError message="This field is required" />}
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
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm disabled:opacity-50"
          >
            {submissionStatus === 'loading' ? 'Registering...' : 'Register as Adopter'}
          </button>
        </div>
      </form>

      <StatusDialogs
        showSuccess={showSuccessDialog}
        onSuccessClose={() => {
          setShowSuccessDialog(false);
          navigate('/login');
        }}
        successTitle="Adopter Registered Successfully!"
        successDescription="Your adopter profile has been successfully registered. You can now log in with your email and password."
        showError={showErrorDialog}
        onErrorClose={() => setShowErrorDialog(false)}
        errorMessage={errorDialogMessage}
      />
    </FormPageLayout>
  );
}
