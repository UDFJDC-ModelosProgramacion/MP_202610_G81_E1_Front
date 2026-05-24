
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import axios from 'axios';
import { FormError } from '../../../components/shared/FormError';
import { registerVeterinarian } from '../../../services/veterinarianService';
import { FormPageLayout } from '../../../components/shared/FormPageLayout';
import { StatusDialogs } from '../../../components/shared/StatusDialogs';

export function VeterinarianRegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    specialty: '',
    availability: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
    specialty: false,
    availability: false,
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
      specialty: true,
      availability: true,
    });

    return !!(
      formData.name &&
      isEmailValid &&
      isPhoneValid &&
      isPasswordValid &&
      formData.specialty &&
      formData.availability
    );
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      specialty: '',
      availability: '',
    });
    setTouched({
      name: false,
      email: false,
      phone: false,
      password: false,
      specialty: false,
      availability: false,
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmissionStatus('loading');
    try {
      await registerVeterinarian({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        specialty: formData.specialty,
        availability: formData.availability,
        role: 'VETERINARIAN',
      });

      setSubmissionStatus('success');
      setShowSuccessDialog(true);
      resetForm();
    } catch (err) {
      setSubmissionStatus('error');
      let message = 'Failed to register veterinarian. Please try again.';
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
      title="Register as Veterinarian"
      description="Complete the form below to register as a veterinarian and join our network."
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
              placeholder="e.g., Dr. Carlos Mendoza"
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
                placeholder="e.g., carlos@email.com"
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
            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-2">
              Medical Specialty <span className="text-red-500">*</span>
            </label>
            <select
              id="specialty"
              value={formData.specialty}
              onChange={handleChange}
              onBlur={() => handleBlur('specialty')}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all bg-white ${
                touched.specialty && !formData.specialty
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-orange-500'
              }`}
              required
            >
              <option value="">Select a specialty</option>
              <option value="General Practitioner">General Practitioner</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Surgery">Surgery</option>
              <option value="Vaccination">Vaccination</option>
            </select>
            {touched.specialty && !formData.specialty && <FormError message="Medical specialty is required" />}
          </div>

          <div>
            <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
              Availability <span className="text-red-500">*</span>
            </label>
            <select
              id="availability"
              value={formData.availability}
              onChange={handleChange}
              onBlur={() => handleBlur('availability')}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all bg-white ${
                touched.availability && !formData.availability
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-orange-500'
              }`}
              required
            >
              <option value="">Select availability</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Weekends">Weekends</option>
              <option value="On-call">On-call</option>
            </select>
            {touched.availability && !formData.availability && <FormError message="Availability is required" />}
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
            {submissionStatus === 'loading' ? 'Registering...' : 'Register as Veterinarian'}
          </button>
        </div>
      </form>

      <StatusDialogs
        showSuccess={showSuccessDialog}
        onSuccessClose={() => {
          setShowSuccessDialog(false);
          navigate('/login');
        }}
        successTitle="Veterinarian Registered Successfully!"
        successDescription="Your veterinarian profile has been successfully registered. You can now log in with your email and password."
        showError={showErrorDialog}
        onErrorClose={() => setShowErrorDialog(false)}
        errorMessage={errorDialogMessage}
      />
    </FormPageLayout>
  );
}
