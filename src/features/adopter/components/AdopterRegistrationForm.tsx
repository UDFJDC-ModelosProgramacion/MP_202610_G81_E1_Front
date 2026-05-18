
import React, { useState } from 'react';
import { Check, AlertCircle, CheckCircle } from 'lucide-react';
import { registerAdopter } from '../../../services/adopterService';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';

export function AdopterRegistrationForm() {
  // Estado del formulario — mismo patrón que ShelterRegistrationForm
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    housingType: '',
    hasChildren: '',      // se convierte a boolean en submit
    hasOtherPets: '',     // se convierte a boolean en submit
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

  // Validaciones inline — mismo patrón que ShelterRegistrationPage
  const isEmailValid =
    formData.email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Marcar todos como touched para mostrar errores
    setTouched({
      name: true,
      email: true,
      phone: true,
      password: true,
      housingType: true,
      hasChildren: true,
      hasOtherPets: true,
    });

    // Validar campos obligatorios
    if (
      !formData.name ||
      !isEmailValid ||
      !isPhoneValid ||
      !isPasswordValid ||
      !formData.housingType ||
      formData.hasChildren === '' ||
      formData.hasOtherPets === ''
    ) {
      return;
    }

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
      });

      setSubmissionStatus('success');
      setShowSuccessDialog(true);

      // Reset formulario
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
    } catch (err) {
      setSubmissionStatus('error');
      const message =
        err?.response?.data?.message ||
        'Failed to register adopter. Please try again.';
      setErrorDialogMessage(message);
      setShowErrorDialog(true);
    } finally {
      setSubmissionStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">

        {/* Encabezado — mismo estilo que ShelterRegistrationPage */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Register as Adopter
          </h1>
          <p className="text-gray-600">
            Complete the form below to register as an adopter and start the pet
            adoption process.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
        >
          <div className="space-y-6">

            {/* Nombre */}
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
              {touched.name && !formData.name && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Full name is required
                </p>
              )}
            </div>

            {/* Email */}
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
              {touched.email && !isEmailValid && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Please enter a valid email address
                </p>
              )}
            </div>

            {/* Teléfono */}
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
              {touched.phone && !isPhoneValid && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Phone number must be at least 7 digits
                </p>
              )}
            </div>

            {/* Contraseña */}
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
              {touched.password && !isPasswordValid && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            {/* Tipo de vivienda */}
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
              {touched.housingType && !formData.housingType && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Housing type is required
                </p>
              )}
            </div>

            {/* ¿Tiene hijos? */}
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
              {touched.hasChildren && formData.hasChildren === '' && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  This field is required
                </p>
              )}
            </div>

            {/* ¿Tiene otras mascotas? */}
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
              {touched.hasOtherPets && formData.hasOtherPets === '' && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  This field is required
                </p>
              )}
            </div>

          </div>

          {/* Botones — mismo patrón que ShelterRegistrationPage */}
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
              {submissionStatus === 'loading' ? 'Registering...' : 'Register as Adopter'}
            </button>
          </div>
        </form>
      </div>

      {/* Dialog de Éxito — mismo patrón que ShelterRegistrationPage */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center gap-2">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <span>Adopter Registered Successfully!</span>
            </DialogTitle>
            <DialogDescription className="text-center">
              Your adopter profile has been successfully registered. You can now
              request pet adoptions.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm"
              onClick={() => {
                setShowSuccessDialog(false);
                window.history.back();
              }}
            >
              Accept
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Error — mismo patrón que ShelterRegistrationPage */}
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