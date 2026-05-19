import React, { useState, FormEvent } from 'react';
import { CalendarPlus } from 'lucide-react';
import { createShelterEvent } from '../../../services/shelterEventService';
import { FormPageLayout } from '../../../components/shared/FormPageLayout';
import { StatusDialogs } from '../../../components/shared/StatusDialogs';
import { FormError } from '../../../components/shared/FormError';

export function ShelterEventRegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    eventDate: '',
    shelterId: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    eventDate: false,
    shelterId: false,
  });

  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorDialogMessage, setErrorDialogMessage] = useState<string | null>(null);

  const isNameValid = formData.name.trim().length > 0;
  const isShelterIdValid = formData.shelterId !== '' && Number(formData.shelterId) > 0;

  const isDateValid = (() => {
    if (!formData.eventDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(formData.eventDate) >= today;
  })();

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, eventDate: true, shelterId: true });

    if (!isNameValid || !isDateValid || !isShelterIdValid) {
      return;
    }

    setSubmissionStatus('loading');
    try {
      await createShelterEvent({
        name: formData.name.trim(),
        eventDate: formData.eventDate,
        shelterId: Number(formData.shelterId),
      });

      setSubmissionStatus('success');
      setShowSuccessDialog(true);
      setFormData({ name: '', eventDate: '', shelterId: '' });
      setTouched({ name: false, eventDate: false, shelterId: false });
    } catch (err: any) {
      setSubmissionStatus('error');
      console.error('Failed to register event:', err);
      const message = err?.response?.data?.message || 'Failed to register the event. Please verify the data and try again.';
      setErrorDialogMessage(message);
      setShowErrorDialog(true);
    } finally {
      setSubmissionStatus('idle');
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <FormPageLayout
      title="Register Shelter Event"
      description="Register a new event organized by a shelter to inform users about available activities."
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
      >
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Event Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              onBlur={() => handleBlur('name')}
              placeholder="e.g., Adoption Fair 2025"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                touched.name && !isNameValid
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-orange-500'
              }`}
              required
            />
            {touched.name && !isNameValid && <FormError message="Event name is required" />}
          </div>

          <div>
            <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-2">
              Event Date <span className="text-red-500">*</span>
            </label>
            <input
              id="eventDate"
              type="date"
              min={todayStr}
              value={formData.eventDate}
              onChange={handleChange}
              onBlur={() => handleBlur('eventDate')}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                touched.eventDate && !isDateValid
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-orange-500'
              }`}
              required
            />
            {touched.eventDate && !formData.eventDate && <FormError message="Event date is required" />}
            {touched.eventDate && formData.eventDate && !isDateValid && <FormError message="Event date cannot be in the past" />}
            <p className="text-xs text-gray-500 mt-1">The event date must be today or a future date.</p>
          </div>

          <div>
            <label htmlFor="shelterId" className="block text-sm font-medium text-gray-700 mb-2">
              Shelter ID <span className="text-red-500">*</span>
            </label>
            <input
              id="shelterId"
              type="number"
              min="1"
              value={formData.shelterId}
              onChange={handleChange}
              onBlur={() => handleBlur('shelterId')}
              placeholder="e.g., 1"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                touched.shelterId && !isShelterIdValid
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-orange-500'
              }`}
              required
            />
            {touched.shelterId && !isShelterIdValid && <FormError message="A valid shelter ID is required" />}
            <p className="text-xs text-gray-500 mt-1">Enter the ID of the shelter organizing this event.</p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-sm text-orange-800">
              <strong>Note:</strong> Once registered, the event will be immediately visible to all platform users.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submissionStatus === 'loading'}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm disabled:opacity-50 flex items-center gap-2"
          >
            <CalendarPlus className="w-4 h-4" />
            {submissionStatus === 'loading' ? 'Registering...' : 'Register Event'}
          </button>
        </div>
      </form>

      <StatusDialogs
        showSuccess={showSuccessDialog}
        onSuccessClose={() => { setShowSuccessDialog(false); window.history.back(); }}
        successTitle="Event Registered Successfully!"
        successDescription="The shelter event has been registered and is now visible to all users on the platform."
        showError={showErrorDialog}
        onErrorClose={() => setShowErrorDialog(false)}
        errorMessage={errorDialogMessage}
      />
    </FormPageLayout>
  );
}
