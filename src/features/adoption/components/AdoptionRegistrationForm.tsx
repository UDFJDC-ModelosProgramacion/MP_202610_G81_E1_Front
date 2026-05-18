
import React, { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { registerAdoption } from '../../../services/adoptionService';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';

export function AdoptionRegistrationForm() {
  // Estado del formulario — mismo patrón que ShelterRegistrationForm
  const [formData, setFormData] = useState({
    adoptionDate: '',
    status: 'CREATED',   // ProcessStatus por defecto
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

  // Validaciones inline
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Marcar todos como touched
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

      // Reset formulario
      setFormData({ adoptionDate: '', status: 'CREATED', adopterId: '', petId: '' });
      setTouched({ adoptionDate: false, adopterId: false, petId: false });
    } catch (err) {
      setSubmissionStatus('error');
      const message =
        err?.response?.data?.message ||
        'Failed to register adoption. Please verify the data and try again.';
      setErrorDialogMessage(message);
      setShowErrorDialog(true);
    } finally {
      setSubmissionStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">

        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Register Formal Adoption
          </h1>
          <p className="text-gray-600">
            Complete the form below to officially register an adoption and leave
            a formal record of the completed process.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
        >
          <div className="space-y-6">

            {/* Fecha de adopción — campo clave HU28 */}
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
              {touched.adoptionDate && !isDateValid && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Adoption date is required
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Once registered, the adoption date cannot be modified.
              </p>
            </div>

            {/* Estado de adopción */}
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

            {/* ID del Adoptante */}
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
              {touched.adopterId && !isAdopterIdValid && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  A valid adopter ID is required
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Enter the ID of the registered adopter.
              </p>
            </div>

            {/* ID de la Mascota */}
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
              {touched.petId && !isPetIdValid && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  A valid pet ID is required
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Enter the ID of the pet being adopted.
              </p>
            </div>

            {/* Nota informativa */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-sm text-orange-800">
                <strong>Note:</strong> This form creates an official adoption record.
                Make sure the adopter and pet IDs are correct before submitting.
              </p>
            </div>

          </div>

          {/* Botones — mismo patrón que ShelterRegistrationPage */}
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
      </div>

      {/* Dialog de Éxito */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center gap-2">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <span>Adoption Registered Successfully!</span>
            </DialogTitle>
            <DialogDescription className="text-center">
              The formal adoption record has been successfully created in the
              system.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm"
              onClick={() => {
                setShowSuccessDialog(false);
                globalThis.history.back();
              }}
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
              onClick={() => {
                setShowErrorDialog(false);
                setErrorDialogMessage(null);
              }}
            >
              Accept
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}