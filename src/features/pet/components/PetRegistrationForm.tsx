
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormError } from '../../../components/shared/FormError';
import { createPet } from '../../../services/petService';
import { FormPageLayout } from '../../../components/shared/FormPageLayout';
import { StatusDialogs } from '../../../components/shared/StatusDialogs';

export function PetRegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    sex: '',
    size: '',
    age: '',
    origin: '',
    goodWithKids: '',
    goodWithPets: '',
    spaceRequired: '',
    description: '',
  });

  const [touched, setTouched] = useState({
    name: false, species: false, breed: false, sex: false,
    size: false, age: false, origin: false,
    goodWithKids: false, goodWithPets: false, spaceRequired: false,
  });

  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorDialogMessage, setErrorDialogMessage] = useState<string | null>(null);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const validateForm = () => {
    setTouched({
      name: true, species: true, breed: true, sex: true,
      size: true, age: true, origin: true,
      goodWithKids: true, goodWithPets: true, spaceRequired: true,
    });
    return !!(
      formData.name && formData.species && formData.breed && formData.sex &&
      formData.size && formData.age && formData.origin &&
      formData.goodWithKids !== '' && formData.goodWithPets !== '' && formData.spaceRequired
    );
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmissionStatus('loading');
    try {
      await createPet({
        name: formData.name,
        species: formData.species,
        breed: formData.breed,
        sex: formData.sex,
        size: formData.size,
        age: Number(formData.age),
        origin: formData.origin,
        goodWithKids: formData.goodWithKids === 'true',
        goodWithPets: formData.goodWithPets === 'true',
        spaceRequired: formData.spaceRequired,
        description: formData.description || undefined,
      });

      setSubmissionStatus('success');
      setShowSuccessDialog(true);
      setFormData({
        name: '', species: '', breed: '', sex: '', size: '', age: '',
        origin: '', goodWithKids: '', goodWithPets: '', spaceRequired: '', description: '',
      });
    } catch (err) {
      setSubmissionStatus('error');
      let message = 'Failed to register pet. Please try again.';
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        message = err.response.data.message;
      }
      setErrorDialogMessage(message);
      setShowErrorDialog(true);
    } finally {
      setSubmissionStatus('idle');
    }
  };

  const inputClass = (field: string, invalid: boolean) =>
    `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
      invalid ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'
    }`;

  return (
    <FormPageLayout
      title="Register Pet"
      description="Register a new pet in the system."
    >
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
              <input id="name" type="text" value={formData.name} onChange={handleChange} onBlur={() => handleBlur('name')}
                placeholder="e.g., Luna" className={inputClass('name', touched.name && !formData.name)} />
              {touched.name && !formData.name && <FormError message="Name is required" />}
            </div>

            <div>
              <label htmlFor="species" className="block text-sm font-medium text-gray-700 mb-2">Species *</label>
              <select id="species" value={formData.species} onChange={handleChange} onBlur={() => handleBlur('species')}
                className={inputClass('species', touched.species && !formData.species)}>
                <option value="">Select species</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Other">Other</option>
              </select>
              {touched.species && !formData.species && <FormError message="Species is required" />}
            </div>

            <div>
              <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-2">Breed *</label>
              <input id="breed" type="text" value={formData.breed} onChange={handleChange} onBlur={() => handleBlur('breed')}
                placeholder="e.g., Labrador" className={inputClass('breed', touched.breed && !formData.breed)} />
              {touched.breed && !formData.breed && <FormError message="Breed is required" />}
            </div>

            <div>
              <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-2">Sex *</label>
              <select id="sex" value={formData.sex} onChange={handleChange} onBlur={() => handleBlur('sex')}
                className={inputClass('sex', touched.sex && !formData.sex)}>
                <option value="">Select sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {touched.sex && !formData.sex && <FormError message="Sex is required" />}
            </div>

            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">Size *</label>
              <select id="size" value={formData.size} onChange={handleChange} onBlur={() => handleBlur('size')}
                className={inputClass('size', touched.size && !formData.size)}>
                <option value="">Select size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
              {touched.size && !formData.size && <FormError message="Size is required" />}
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">Age (years) *</label>
              <input id="age" type="number" min="1" value={formData.age} onChange={handleChange} onBlur={() => handleBlur('age')}
                placeholder="e.g., 3" className={inputClass('age', touched.age && !formData.age)} />
              {touched.age && !formData.age && <FormError message="Age is required" />}
            </div>

            <div>
              <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-2">Origin *</label>
              <select id="origin" value={formData.origin} onChange={handleChange} onBlur={() => handleBlur('origin')}
                className={inputClass('origin', touched.origin && !formData.origin)}>
                <option value="">Select origin</option>
                <option value="Rescued">Rescued</option>
                <option value="Born in shelter">Born in shelter</option>
                <option value="Surrendered">Surrendered</option>
              </select>
              {touched.origin && !formData.origin && <FormError message="Origin is required" />}
            </div>

            <div>
              <label htmlFor="spaceRequired" className="block text-sm font-medium text-gray-700 mb-2">Space Required *</label>
              <select id="spaceRequired" value={formData.spaceRequired} onChange={handleChange} onBlur={() => handleBlur('spaceRequired')}
                className={inputClass('spaceRequired', touched.spaceRequired && !formData.spaceRequired)}>
                <option value="">Select space</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Both">Both</option>
              </select>
              {touched.spaceRequired && !formData.spaceRequired && <FormError message="Space requirement is required" />}
            </div>

            <div>
              <label htmlFor="goodWithKids" className="block text-sm font-medium text-gray-700 mb-2">Good with Kids *</label>
              <select id="goodWithKids" value={formData.goodWithKids} onChange={handleChange} onBlur={() => handleBlur('goodWithKids')}
                className={inputClass('goodWithKids', touched.goodWithKids && formData.goodWithKids === '')}>
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              {touched.goodWithKids && formData.goodWithKids === '' && <FormError message="This field is required" />}
            </div>

            <div>
              <label htmlFor="goodWithPets" className="block text-sm font-medium text-gray-700 mb-2">Good with other Pets *</label>
              <select id="goodWithPets" value={formData.goodWithPets} onChange={handleChange} onBlur={() => handleBlur('goodWithPets')}
                className={inputClass('goodWithPets', touched.goodWithPets && formData.goodWithPets === '')}>
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              {touched.goodWithPets && formData.goodWithPets === '' && <FormError message="This field is required" />}
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea id="description" rows={3} value={formData.description} onChange={handleChange}
              placeholder="Any additional information about the pet..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all" />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
          <button type="button" onClick={() => globalThis.history.back()}
            className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Cancel
          </button>
          <button type="submit" disabled={submissionStatus === 'loading'}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm disabled:opacity-50">
            {submissionStatus === 'loading' ? 'Registering...' : 'Register Pet'}
          </button>
        </div>
      </form>

      <StatusDialogs
        showSuccess={showSuccessDialog}
        onSuccessClose={() => { setShowSuccessDialog(false); navigate('/register-pet'); }}
        successTitle="Pet Registered Successfully!"
        successDescription="The pet has been registered and is now available for adoption."
        showError={showErrorDialog}
        onErrorClose={() => setShowErrorDialog(false)}
        errorMessage={errorDialogMessage}
      />
    </FormPageLayout>
  );
}
