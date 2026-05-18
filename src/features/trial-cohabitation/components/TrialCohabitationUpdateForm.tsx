import React, { useState, FormEvent } from 'react';
import { AlertCircle, CheckCircle, Search } from 'lucide-react';
import {
  getTrialCohabitationById,
  updateTrialCohabitation,
} from '../../../services/trialCohabitationService';
import { type TrialCohabitationDTO, type TrialCohabitationResult } from '../../../types/trialCohabitation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
 
export function TrialCohabitationUpdateForm() {
  // Estado de búsqueda por ID
  const [searchId, setSearchId] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
 
  // Registro cargado
  const [trialData, setTrialData] = useState<TrialCohabitationDTO | null>(null);
 
  // Estado del resultado a actualizar — campo clave HU30
  const [newResult, setNewResult] = useState<TrialCohabitationResult>('EN_PROCESO');
 
  // Estado de envío
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorDialogMessage, setErrorDialogMessage] = useState<string | null>(null);
 
  // Etiquetas legibles para resultados — valores del catálogo backend
  const resultLabels: Record<TrialCohabitationResult, string> = {
    EN_PROCESO: 'In Progress (EN_PROCESO)',
    EXITOSA:    'Successful (EXITOSA)',
    FALLIDA:    'Failed (FALLIDA)',
    CANCELADA:  'Cancelled (CANCELADA)',
  };
 
  // Color por resultado para feedback visual
  const resultColors: Record<TrialCohabitationResult, string> = {
    EN_PROCESO: 'bg-blue-100 text-blue-700 border-blue-200',
    EXITOSA:    'bg-green-100 text-green-700 border-green-200',
    FALLIDA:    'bg-red-100 text-red-700 border-red-200',
    CANCELADA:  'bg-gray-100 text-gray-700 border-gray-200',
  };
 
  // Buscar convivencia de prueba por ID
  const handleSearch = async () => {
    if (!searchId || Number(searchId) <= 0) {
      setSearchError('Please enter a valid ID.');
      return;
    }
    setSearchLoading(true);
    setSearchError(null);
    setTrialData(null);
    try {
      const data = await getTrialCohabitationById(Number(searchId));
      setTrialData(data);
      setNewResult((data.result as TrialCohabitationResult) || 'EN_PROCESO');
    } catch (err) {
      setSearchError(
        err?.response?.status === 404
          ? `Trial cohabitation with ID ${searchId} not found.`
          : 'Error fetching the record. Check the ID and try again.'
      );
    } finally {
      setSearchLoading(false);
    }
  };
 
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };
 
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!trialData || !trialData.id) return;
 
    setSubmissionStatus('loading');
    try {
      // Enviar el objeto completo con el resultado actualizado
      // El backend solo actualiza lo que cambia
      await updateTrialCohabitation(trialData.id, {
        ...trialData,
        result: newResult,
      });
 
      setSubmissionStatus('success');
      setShowSuccessDialog(true);
      setTrialData(null);
      setSearchId('');
      setNewResult('EN_PROCESO');
    } catch (err) {
      setSubmissionStatus('error');
      const message =
        err?.response?.data?.message ||
        'Failed to update the result. Verify the transition rules and try again.';
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
            Update Trial Cohabitation Result
          </h1>
          <p className="text-gray-600">
            Search for a trial cohabitation record and update its result to
            reflect the outcome of the trial period.
          </p>
        </div>
 
        {/* Sección de búsqueda */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Search Trial Cohabitation
          </h2>
          <div className="flex gap-3">
            <input
              type="number"
              min="1"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Enter trial cohabitation ID"
              className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                searchError
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-orange-500'
              }`}
            />
            <button
              type="button"
              onClick={handleSearch}
              disabled={searchLoading}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm disabled:opacity-50 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              {searchLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
          {searchError && (
            <p className="text-red-600 text-xs mt-2 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {searchError}
            </p>
          )}
        </div>
 
        {/* Formulario de actualización — aparece solo tras buscar */}
        {trialData && (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
          >
            <h2 className="text-lg font-medium text-gray-800 mb-6">
              Trial Cohabitation — ID: {trialData.id}
            </h2>
 
            <div className="space-y-6">
 
              {/* Info de solo lectura */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    Start Date
                  </p>
                  <p className="text-gray-800 font-medium">{trialData.startDate}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                    End Date
                  </p>
                  <p className="text-gray-800 font-medium">{trialData.endDate}</p>
                </div>
              </div>
 
              {/* Resultado actual */}
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Current Result
                </p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${
                    resultColors[(trialData.result as TrialCohabitationResult) || 'EN_PROCESO']
                  }`}
                >
                  {resultLabels[(trialData.result as TrialCohabitationResult) || 'EN_PROCESO']}
                </span>
              </div>
 
              {/* Selector de nuevo resultado — campo clave HU30 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Result <span className="text-red-500">*</span>
                </label>
                <select
                  value={newResult}
                  onChange={(e) => setNewResult(e.target.value as TrialCohabitationResult)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-white"
                  required
                >
                  <option value="EN_PROCESO">In Progress (EN_PROCESO)</option>
                  <option value="EXITOSA">Successful (EXITOSA)</option>
                  <option value="FALLIDA">Failed (FALLIDA)</option>
                  <option value="CANCELADA">Cancelled (CANCELADA)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Business rule: The result can only transition from EN_PROCESO to
                  another state.
                </p>
              </div>
 
              {/* Indicador visual del nuevo resultado seleccionado */}
              {newResult !== (trialData.result as TrialCohabitationResult) && (
                <div className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <p className="text-sm text-orange-800">
                    You are about to change the result from{' '}
                    <strong>{trialData.result || 'EN_PROCESO'}</strong> to{' '}
                    <strong>{newResult}</strong>.
                  </p>
                </div>
              )}
 
            </div>
 
            {/* Botones */}
            <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setTrialData(null);
                  setSearchId('');
                }}
                className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submissionStatus === 'loading'}
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm disabled:opacity-50"
              >
                {submissionStatus === 'loading' ? 'Updating...' : 'Update Result'}
              </button>
            </div>
          </form>
        )}
 
      </div>
 
      {/* Dialog de Éxito */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center gap-2">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <span>Result Updated Successfully!</span>
            </DialogTitle>
            <DialogDescription className="text-center">
              The trial cohabitation result has been updated in the system.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm"
              onClick={() => setShowSuccessDialog(false)}
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
              <span>Update Error</span>
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