import React, { useState, FormEvent } from 'react';
import { CalendarPlus, AlertCircle, CheckCircle } from 'lucide-react';
import { createShelterEvent } from '../../../services/shelterEventService';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';

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

  // HU23 criterio 2: la fecha no debe ser anterior a hoy
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
      const message =
        err?.response?.data?.message ||
        'Failed to register the event. Please verify the data and try again.';
      setErrorDialogMessage(message);
      setShowErrorDialog(true);
    } finally {
      setSubmissionStatus('idle');
    }
  };

  // Fecha mínima para el picker (hoy)
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">

        {/* Encabezado */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <CalendarPlus className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl font-semibold text-gray-900">
              Register Shelter Event
            </h1>
          </div>
          <p className="text-gray-600">
            Register a new event organized by a shelter to inform users about
            available activities.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
        >
          <div className="space-y-6">

            {/* Nombre del evento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
              {touched.name && !isNameValid && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Event name is required
                </p>
              )}
            </div>

            {/* Fecha del evento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
              {touched.eventDate && !formData.eventDate && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Event date is required
                </p>
              )}
              {touched.eventDate && formData.eventDate && !isDateValid && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Event date cannot be in the past
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                The event date must be today or a future date.
              </p>
            </div>

            {/* ID del refugio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
              {touched.shelterId && !isShelterIdValid && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  A valid shelter ID is required
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Enter the ID of the shelter organizing this event.
              </p>
            </div>

            {/* Nota informativa */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-sm text-orange-800">
                <strong>Note:</strong> Once registered, the event will be
                immediately visible to all platform users.
              </p>
            </div>

          </div>

          {/* Botones */}
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
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm disabled:opacity-50"
            >
              {submissionStatus === 'loading' ? 'Registering...' : 'Register Event'}
            </button>
          </div>
        </form>
      </div>

      {/* Dialog de Éxito */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center gap-2">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <span>Event Registered Successfully!</span>
            </DialogTitle>
            <DialogDescription className="text-center">
              The shelter event has been registered and is now visible to all
              users on the platform.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm"
              onClick={() => { setShowSuccessDialog(false); window.history.back(); }}
            >
              Accept
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Error */}
      <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center gap-2 text-red-600">
              <AlertCircle className="h-12 w-12" />
              <span>Registration Error</span>
            </DialogTitle>
            <DialogDescription className="text-center text-red-500">
              {errorDialogMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm"
              onClick={() => { setShowErrorDialog(false); setErrorDialogMessage(null); }}
            >
              Accept
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
