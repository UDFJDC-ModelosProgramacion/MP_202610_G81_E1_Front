
import React, { useState } from 'react';
import { FormError } from '../../../components/shared/FormError';
import { registerAdoption } from '../../../services/adoptionService';
import { FormPageLayout } from '../../../components/shared/FormPageLayout';
import { StatusDialogs } from '../../../components/shared/StatusDialogs';

export function AdoptionRegistrationForm() {
  const [formData, setFormData] = useState({
    adoptionDate: '',
    status: 'CREATED',
    adopterId: '',
    petId: '',
  });

  const [touched, setTouched] = useState({
    adoptionDate: false,
    adopterId: false,
    petId: false,
  });

  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorDialogMessage, setErrorDialogMessage] = useState<string | null>(null);

  const isAdopterIdValid = formData.adopterId !== '' && Number(formData.adopterId) > 0;
  const isPetIdValid = formData.petId !== '' && Number(formData.petId) > 0;
  const isDateValid = formData.adoptionDate !== '';

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setTouched({ adoptionDate: true, adopterId: true, petId: true });

    if (!isDateValid || !isAdopterIdValid || !isPetIdValid) {
      return;
    }

    setSubmissionStatus('loading');
    try {
      await registerAdoption({
        adoptionDate: formData.adoptionDate,
        status: formData.status,
        adopterId: Number(formData.adopterId),
        petId: Number(formData.petId),
      });

      setSubmissionStatus('success');
      setShowSuccessDialog(true);
      setFormData({ adoptionDate: '', status: 'CREATED', adopterId: '', petId: '' });
      setTouched({ adoptionDate: false, adopterId: false, petId: false });
    } catch (err) {
      setSubmissionStatus('error');
      const message = err?.response?.data?.message || 'Failed to register adoption. Please verify the data and try again.';
      setErrorDialogMessage(message);
      setShowErrorDialog(true);
    } finally {
      setSubmissionStatus('idle');
    }
  };

  return (
    <FormPageLayout
      title="Register Formal Adoption"
      description="Complete the form below to officially register an adoption and leave a formal record of the completed process."
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
      >
        <div className="space-y-6">
          <div>
            <label htmlFor="adoptionDate" className="block text-sm font-medium text-gray-700 mb-2">
              Adoption Date <span className="text-red-500">*</span>
            </label>
            <input
              id="adoptionDate"
              type="date"
              value={formData.adoptionDate}
              onChange={handleChange}
              onBlur={() => handleBlur('adoptionDate')}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                touched.adoptionDate && !isDateValid
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-orange-500'
              }`}
              required
            />
            {touched.adoptionDate && !isDateValid && <FormError message="Adoption date is required" />}
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Adoption Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-white"
            >
              <option value="CREATED">Created</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>

          <div>
            <label htmlFor="adopterId" className="block text-sm font-medium text-gray-700 mb-2">
              Adopter ID <span className="text-red-500">*</span>
            </label>
            <input
              id="adopterId"
              type="number"
              min="1"
              value={formData.adopterId}
              onChange={handleChange}
              onBlur={() => handleBlur('adopterId')}
              placeholder="e.g., 1"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                touched.adopterId && !isAdopterIdValid
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-orange-500'
              }`}
              required
            />
            {touched.adopterId && !isAdopterIdValid && <FormError message="A valid adopter ID is required" />}
          </div>

          <div>
            <label htmlFor="petId" className="block text-sm font-medium text-gray-700 mb-2">
              Pet ID <span className="text-red-500">*</span>
            </label>
            <input
              id="petId"
              type="number"
              min="1"
              value={formData.petId}
              onChange={handleChange}
              onBlur={() => handleBlur('petId')}
              placeholder="e.g., 5"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                touched.petId && !isPetIdValid
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-orange-500'
              }`}
              required
            />
            {touched.petId && !isPetIdValid && <FormError message="A valid pet ID is required" />}
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-sm text-orange-800">
              <strong>Note:</strong> This form creates an official adoption record. Make sure the adopter and pet IDs are correct before submitting.
            </p>
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
            {submissionStatus === 'loading' ? 'Registering...' : 'Register Adoption'}
          </button>
        </div>
      </form>

      <StatusDialogs
        showSuccess={showSuccessDialog}
        onSuccessClose={() => {
          setShowSuccessDialog(false);
          globalThis.history.back();
        }}
        successTitle="Adoption Registered Successfully!"
        successDescription="The formal adoption record has been successfully created in the system."
        showError={showErrorDialog}
        onErrorClose={() => setShowErrorDialog(false)}
        errorMessage={errorDialogMessage}
      />
    </FormPageLayout>
  );
}
