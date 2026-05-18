import React, { useState, FormEvent } from 'react';
import { Send, AlertCircle, CheckCircle } from 'lucide-react';
import { sendMessage } from '../../../services/messageService';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';

export function SendMessageForm() {
  const [formData, setFormData] = useState({
    content: '',
    sendDate: '',
    senderId: '',
    receiverId: '',
  });

  const [touched, setTouched] = useState({
    content: false,
    sendDate: false,
    senderId: false,
    receiverId: false,
  });

  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorDialogMessage, setErrorDialogMessage] = useState<string | null>(null);

  const isSenderIdValid = formData.senderId !== '' && Number(formData.senderId) > 0;
  const isReceiverIdValid = formData.receiverId !== '' && Number(formData.receiverId) > 0;
  const isContentValid = formData.content.trim().length > 0;
  const isDateValid = formData.sendDate !== '';

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setTouched({ content: true, sendDate: true, senderId: true, receiverId: true });

    if (!isContentValid || !isDateValid || !isSenderIdValid || !isReceiverIdValid) {
      return;
    }

    setSubmissionStatus('loading');
    try {
      await sendMessage({
        content: formData.content.trim(),
        sendDate: formData.sendDate,
        senderId: Number(formData.senderId),
        receiverId: Number(formData.receiverId),
      });

      setSubmissionStatus('success');
      setShowSuccessDialog(true);

      setFormData({ content: '', sendDate: '', senderId: '', receiverId: '' });
      setTouched({ content: false, sendDate: false, senderId: false, receiverId: false });
    } catch (err: any) {
      setSubmissionStatus('error');
      const message =
        err?.response?.data?.message ||
        'Failed to send message. The recipient may not exist. Please try again.';
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
          <div className="flex items-center gap-3 mb-2">
            <Send className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl font-semibold text-gray-900">Send Message</h1>
          </div>
          <p className="text-gray-600">
            Send a message to another user to communicate within the platform.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
        >
          <div className="space-y-6">

            {/* ID del remitente */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sender ID <span className="text-red-500">*</span>
              </label>
              <input
                id="senderId"
                type="number"
                min="1"
                value={formData.senderId}
                onChange={handleChange}
                onBlur={() => handleBlur('senderId')}
                placeholder="e.g., 1"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  touched.senderId && !isSenderIdValid
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-orange-500'
                }`}
                required
              />
              {touched.senderId && !isSenderIdValid && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  A valid sender ID is required
                </p>
              )}
            </div>

            {/* ID del destinatario */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Receiver ID <span className="text-red-500">*</span>
              </label>
              <input
                id="receiverId"
                type="number"
                min="1"
                value={formData.receiverId}
                onChange={handleChange}
                onBlur={() => handleBlur('receiverId')}
                placeholder="e.g., 2"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  touched.receiverId && !isReceiverIdValid
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-orange-500'
                }`}
                required
              />
              {touched.receiverId && !isReceiverIdValid && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  A valid receiver ID is required
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                The system will reject the message if the recipient does not exist.
              </p>
            </div>

            {/* Fecha de envío */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Send Date <span className="text-red-500">*</span>
              </label>
              <input
                id="sendDate"
                type="date"
                value={formData.sendDate}
                onChange={handleChange}
                onBlur={() => handleBlur('sendDate')}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  touched.sendDate && !isDateValid
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-orange-500'
                }`}
                required
              />
              {touched.sendDate && !isDateValid && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Send date is required
                </p>
              )}
            </div>

            {/* Contenido del mensaje */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                rows={5}
                value={formData.content}
                onChange={handleChange}
                onBlur={() => handleBlur('content')}
                placeholder="Write your message here..."
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
                  touched.content && !isContentValid
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-orange-500'
                }`}
                required
              />
              {touched.content && !isContentValid && (
                <p className="text-red-600 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Message content is required
                </p>
              )}
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
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-sm disabled:opacity-50 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              {submissionStatus === 'loading' ? 'Sending...' : 'Send Message'}
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
              <span>Message Sent Successfully!</span>
            </DialogTitle>
            <DialogDescription className="text-center">
              Your message has been delivered and is now available to the
              recipient.
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
              <span>Error Sending Message</span>
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
