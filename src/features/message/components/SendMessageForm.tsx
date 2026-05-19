import React, { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';
import { sendMessage } from '../../../services/messageService';
import { FormPageLayout } from '../../../components/shared/FormPageLayout';
import { StatusDialogs } from '../../../components/shared/StatusDialogs';
import { FormError } from '../../../components/shared/FormError';

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
      console.error('Failed to send message:', err);
      const message = err?.response?.data?.message || 'Failed to send message. The recipient may not exist. Please try again.';
      setErrorDialogMessage(message);
      setShowErrorDialog(true);
    } finally {
      setSubmissionStatus('idle');
    }
  };

  return (
    <FormPageLayout
      title="Send Message"
      description="Send a message to another user to communicate within the platform."
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
      >
        <div className="space-y-6">
          <div>
            <label htmlFor="senderId" className="block text-sm font-medium text-gray-700 mb-2">
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
            {touched.senderId && !isSenderIdValid && <FormError message="A valid sender ID is required" />}
          </div>

          <div>
            <label htmlFor="receiverId" className="block text-sm font-medium text-gray-700 mb-2">
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
            {touched.receiverId && !isReceiverIdValid && <FormError message="A valid receiver ID is required" />}
            <p className="text-xs text-gray-500 mt-1">The system will reject the message if the recipient does not exist.</p>
          </div>

          <div>
            <label htmlFor="sendDate" className="block text-sm font-medium text-gray-700 mb-2">
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
            {touched.sendDate && !isDateValid && <FormError message="Send date is required" />}
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
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
            {touched.content && !isContentValid && <FormError message="Message content is required" />}
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
            <Send className="w-4 h-4" />
            {submissionStatus === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>

      <StatusDialogs
        showSuccess={showSuccessDialog}
        onSuccessClose={() => { setShowSuccessDialog(false); window.history.back(); }}
        successTitle="Message Sent Successfully!"
        successDescription="Your message has been delivered and is now available to the recipient."
        showError={showErrorDialog}
        onErrorClose={() => setShowErrorDialog(false)}
        errorTitle="Error Sending Message"
        errorMessage={errorDialogMessage}
      />
    </FormPageLayout>
  );
}
